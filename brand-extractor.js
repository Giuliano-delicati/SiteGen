// Brand Extractor — 3 modes: Logo→Canvas, URL-Scan, Manual

const FALLBACK_COLORS = ['#1a1a1a', '#c9a84c', '#f5f0e8'];

function isNeutralColor(r, g, b) {
  return (r > 220 && g > 220 && b > 220) || (r < 20 && g < 20 && b < 20);
}

// --- Mode 1: Logo → dominant colors via Canvas ---
export function extractColorsFromLogo(imgElement) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const SIZE = 80;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    try {
      ctx.drawImage(imgElement, 0, 0, SIZE, SIZE);
      const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
      const colorMap = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 30) continue;
        const qr = Math.round(r / 32) * 32;
        const qg = Math.round(g / 32) * 32;
        const qb = Math.round(b / 32) * 32;
        if (isNeutralColor(qr, qg, qb)) continue;
        const key = `${qr},${qg},${qb}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }
      const top = [...colorMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => {
          const [r, g, b] = key.split(',').map(Number);
          return rgbToHex(r, g, b);
        });
      resolve(top.length > 0 ? top : FALLBACK_COLORS);
    } catch {
      resolve(FALLBACK_COLORS);
    }
  });
}

// --- Color utilities ---
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(hex) {
  const m = hex.replace('#', '').match(/.{2}/g);
  return m ? m.map(x => parseInt(x, 16)) : [0, 0, 0];
}

export function contrastRatio(hex1, hex2) {
  const lum = (hex) => {
    const [r, g, b] = hexToRgb(hex).map(v => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const l1 = lum(hex1), l2 = lum(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function autoTextColor(bgHex) {
  return contrastRatio(bgHex, '#ffffff') >= 4.5 ? '#ffffff' : '#000000';
}

// --- Mode 2: URL → brand colors ---
// Try multiple CORS proxies in sequence — stops at the first that returns HTML.
const CORS_PROXIES = [
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchViaProxy(url) {
  for (const buildUrl of CORS_PROXIES) {
    try {
      const res = await fetch(buildUrl(url), { signal: AbortSignal.timeout(7000) });
      if (!res.ok) continue;
      const text = await res.text();
      // allorigins wraps in JSON; the others return raw HTML
      try {
        const json = JSON.parse(text);
        if (json.contents) return json.contents;
      } catch {
        // raw HTML response
      }
      if (text.includes('<')) return text;
    } catch {
      // try next proxy
    }
  }
  return null;
}

export async function extractFromUrl(url) {
  const html = await fetchViaProxy(url);
  if (!html) return { colors: [], fonts: [], error: 'CORS-Proxy nicht erreichbar' };
  return parseHtmlForColors(html);
}

function parseHtmlForColors(html) {
  const colors = [];
  const fonts = [];

  // meta theme-color
  const themeMatch = html.match(/name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/content=["']([#\w()%, ]+)["'][^>]*name=["']theme-color["']/i);
  if (themeMatch) colors.push(themeMatch[1].trim());

  // Hex colors: #rrggbb and #rgb
  const freq = new Map();
  for (const m of html.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g)) {
    const hex = m[1].length === 3
      ? '#' + m[1].split('').map(c => c + c).join('')
      : '#' + m[1];
    const key = hex.toLowerCase();
    freq.set(key, (freq.get(key) || 0) + 1);
  }

  // rgb(r, g, b) colors
  for (const m of html.matchAll(/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g)) {
    const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (isNeutralColor(r, g, b)) continue;
    const key = rgbToHex(r, g, b);
    freq.set(key, (freq.get(key) || 0) + 1);
  }

  const topHex = [...freq.entries()]
    .filter(([h]) => !isNeutralColor(...hexToRgb(h)))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hex]) => hex);
  colors.push(...topHex);

  // Font families
  for (const m of html.matchAll(/font-family\s*:\s*['"]?([^;'"}{]+)/gi)) {
    const f = m[1].split(',')[0].trim().replace(/['"]/g, '');
    if (f && !fonts.includes(f)) fonts.push(f);
  }

  return {
    colors: [...new Set(colors)].slice(0, 5),
    fonts: fonts.slice(0, 3),
  };
}
