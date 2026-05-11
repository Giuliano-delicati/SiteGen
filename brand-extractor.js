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

// --- Mode 3: URL → contact info (phone, email, address, name, description) ---
export async function extractContactFromUrl(url) {
  const html = await fetchViaProxy(url);
  if (!html) return { error: 'Website nicht erreichbar (CORS)' };
  return parseHtmlForContact(html);
}

function parseHtmlForContact(html) {
  const result = {};
  const stripTags = s => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();

  // ── Name: og:title → title tag ──
  const ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']{2,80})["']/i)
    || html.match(/content=["']([^"']{2,80})["'][^>]*property=["']og:title["']/i);
  if (ogTitle) {
    result.name = ogTitle[1].trim().replace(/\s*[|–\-—·•].*$/, '').trim();
  } else {
    const t = html.match(/<title[^>]*>([^<]{2,80})<\/title>/i);
    if (t) result.name = t[1].replace(/\s*[|–\-—·•].*$/, '').trim();
  }

  // ── Description: og:description → meta description ──
  const ogDesc = html.match(/property=["']og:description["'][^>]*content=["']([^"']{5,300})["']/i)
    || html.match(/content=["']([^"']{5,300})["'][^>]*property=["']og:description["']/i)
    || html.match(/name=["']description["'][^>]*content=["']([^"']{5,300})["']/i)
    || html.match(/content=["']([^"']{5,300})["'][^>]*name=["']description["']/i);
  if (ogDesc) result.description = ogDesc[1].trim();

  // ── Phone: tel: href (most reliable) → text patterns ──
  const telHref = html.match(/href=["']tel:([+\d\s\-().]{7,22})["']/i);
  if (telHref) {
    result.phone = telHref[1].trim();
  } else {
    const phoneText = html.match(/(?:Tel\.?|Telefon|Fon|Phone|☎|📞|📱)[^\d+<\n]{0,10}([+]?(?:49|0)\d[\d\s\-\/.()]{6,18})/i);
    if (phoneText) result.phone = phoneText[1].replace(/\s+/g,' ').trim();
  }

  // ── Email: mailto: href → plain text ──
  const mailto = html.match(/href=["']mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,6})["']/i);
  if (mailto) {
    result.email = mailto[1].trim();
  } else {
    const emailText = html.match(/\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]{3,}\.[a-zA-Z]{2,6})\b/);
    if (emailText && !/example|test@|noreply|no-reply|privacy|datenschutz/i.test(emailText[1])) {
      result.email = emailText[1].trim();
    }
  }

  // ── Address: schema.org JSON-LD → itemprop → <address> tag ──
  const street  = html.match(/"streetAddress"\s*:\s*"([^"]{3,80})"/i)
    || html.match(/itemprop=["']streetAddress["'][^>]*>([^<]{3,80})</i);
  const postal  = html.match(/"postalCode"\s*:\s*"([^"]{4,10})"/i)
    || html.match(/itemprop=["']postalCode["'][^>]*>([^<]{4,10})</i);
  const city    = html.match(/"addressLocality"\s*:\s*"([^"]{2,60})"/i)
    || html.match(/itemprop=["']addressLocality["'][^>]*>([^<]{2,60})</i);

  if (street) {
    const parts = [stripTags(street[1]).trim()];
    const postalCity = [postal?.[1], city?.[1]].filter(Boolean).join(' ');
    if (postalCity) parts.push(postalCity.trim());
    result.address = parts.filter(Boolean).join(', ');
  } else {
    const addr = html.match(/<address[^>]*>([\s\S]{5,300}?)<\/address>/i);
    if (addr) result.address = stripTags(addr[1]).slice(0, 100).trim();
  }

  return result;
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
