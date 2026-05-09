// Brand Extractor — 3 modes: Logo→Canvas, URL-Scan, Manual

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
        if (a < 30) continue; // skip transparent pixels
        // Quantize to reduce noise
        const qr = Math.round(r / 32) * 32;
        const qg = Math.round(g / 32) * 32;
        const qb = Math.round(b / 32) * 32;
        // Skip near-white and near-black
        if (qr > 220 && qg > 220 && qb > 220) continue;
        if (qr < 20 && qg < 20 && qb < 20) continue;
        const key = `${qr},${qg},${qb}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }

      const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
      const top = sorted.slice(0, 3).map(([key]) => {
        const [r, g, b] = key.split(',').map(Number);
        return rgbToHex(r, g, b);
      });

      resolve(top.length > 0 ? top : ['#1a1a1a', '#c9a84c', '#f5f0e8']);
    } catch {
      resolve(['#1a1a1a', '#c9a84c', '#f5f0e8']);
    }
  });
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

export function hexToRgb(hex) {
  const m = hex.replace('#', '').match(/.{2}/g);
  return m ? m.map(x => parseInt(x, 16)) : [0, 0, 0];
}

// Contrast ratio (WCAG) between two hex colors
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

// Auto-pick black or white for text on a background
export function autoTextColor(bgHex) {
  return contrastRatio(bgHex, '#ffffff') >= 4.5 ? '#ffffff' : '#000000';
}

// --- Mode 2: URL → brand colors ---
export async function extractFromUrl(url) {
  // Use allorigins.win as CORS proxy
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error('fetch failed');
    const json = await res.json();
    const html = json.contents || '';
    return parseHtmlForColors(html, url);
  } catch {
    return null;
  }
}

function parseHtmlForColors(html, _url) {
  const result = { colors: [], fonts: [] };

  // meta theme-color
  const themeMatch = html.match(/name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/content=["']([#\w()%, ]+)["'][^>]*name=["']theme-color["']/i);
  if (themeMatch) result.colors.push(themeMatch[1].trim());

  // CSS hex colors in style tags
  const hexMatches = html.matchAll(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g);
  const freq = new Map();
  for (const m of hexMatches) {
    const hex = m[1].length === 3
      ? '#' + m[1].split('').map(c => c + c).join('')
      : '#' + m[1];
    freq.set(hex.toLowerCase(), (freq.get(hex.toLowerCase()) || 0) + 1);
  }
  const sorted = [...freq.entries()]
    .filter(([h]) => {
      const [r, g, b] = hexToRgb(h);
      return !(r > 220 && g > 220 && b > 220) && !(r < 20 && g < 20 && b < 20);
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hex]) => hex);
  result.colors.push(...sorted);

  // Font families
  const fontMatches = html.matchAll(/font-family\s*:\s*['"]?([^;'"}{]+)/gi);
  for (const m of fontMatches) {
    const f = m[1].split(',')[0].trim().replace(/['"]/g, '');
    if (f && !result.fonts.includes(f)) result.fonts.push(f);
  }

  return {
    colors: [...new Set(result.colors)].slice(0, 5),
    fonts: result.fonts.slice(0, 3),
  };
}

// --- Color swatch renderer ---
export function renderSwatches(colors, containerId, onSelect) {
  const el = document.getElementById(containerId);
  if (!el || !colors.length) return;
  el.innerHTML = colors.map(c => `
    <button class="color-swatch" style="background:${c}" title="${c}"
      data-color="${c}" onclick="(${onSelect.toString()})(this.dataset.color)">
    </button>`).join('');
}
