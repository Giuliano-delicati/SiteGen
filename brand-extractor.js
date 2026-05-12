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

// --- Mode 4: URL → services list ---
export async function extractServicesFromUrl(url) {
  const html = await fetchViaProxy(url);
  if (!html) return { services: [], error: 'Website nicht erreichbar' };
  return { services: parseHtmlForServices(html) };
}

function parseHtmlForServices(html) {
  const services = [];
  const seen = new Set();

  // 1. Schema.org JSON-LD (Offer / hasOfferCatalog)
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = [data, ...(Array.isArray(data['@graph']) ? data['@graph'] : [])].flat();
      for (const node of nodes) {
        const offerItems = [
          ...(node.hasOfferCatalog?.itemListElement || []),
          ...(Array.isArray(node.offers) ? node.offers : node.offers ? [node.offers] : []),
        ];
        for (const o of offerItems) {
          if (!o.name) continue;
          const name = String(o.name).trim();
          const price = o.price != null ? `${String(o.price).replace('.', ',')} ${o.priceCurrency || '€'}` : '';
          if (name.length > 1 && name.length < 70 && !seen.has(name)) {
            services.push({ name, price, desc: String(o.description || '').trim().slice(0, 80) });
            seen.add(name);
          }
        }
      }
    } catch {}
  }
  if (services.length >= 3) return services.slice(0, 8);

  // 2. Table rows  <tr><td>Name</td><td>25 €</td></tr>
  for (const row of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)]
      .map(c => c[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (cells.length < 2) continue;
    const name = cells[0];
    const priceCell = cells.find(c => /\d+[,.]?\d*\s*€/.test(c) || /€\s*\d/.test(c)) || '';
    const pm = priceCell.match(/(\d+(?:[,.]\d{1,2})?)\s*€/) || priceCell.match(/€\s*(\d+(?:[,.]\d{1,2})?)/);
    if (pm && name.length > 2 && name.length < 70 && !seen.has(name)) {
      services.push({ name, price: pm[1].replace('.', ',') + ' €', desc: '' });
      seen.add(name);
    }
  }
  if (services.length >= 3) return services.slice(0, 8);

  // 3. Plain text lines: "Service Name .... 25 €"
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');

  for (const raw of text.split('\n')) {
    const l = raw.trim();
    if (l.length < 4 || l.length > 100) continue;
    // "Name ...... 25 €"
    const m1 = l.match(/^(.{3,55}?)\s{1,20}(?:ab\s+)?(\d{1,3}(?:[,.]\d{2})?)\s*€\s*$/);
    // "25 € Name"
    const m2 = l.match(/^(\d{1,3}(?:[,.]\d{2})?)\s*€\s+(.{3,55})$/);
    const m = m1 || m2;
    if (!m) continue;
    const name = (m1 ? m[1] : m[2]).trim();
    const price = (m1 ? m[2] : m[1]).replace('.', ',') + ' €';
    if (name.length > 2 && !/^\d+$/.test(name) && !seen.has(name)) {
      services.push({ name, price, desc: '' });
      seen.add(name);
    }
  }

  return services.slice(0, 8);
}

// --- Mode 5: URL → image URLs ---
export async function extractImagesFromUrl(url) {
  const html = await fetchViaProxy(url);
  if (!html) return { images: [], error: 'Website nicht erreichbar' };
  return { images: parseHtmlForImages(html, url) };
}

function isSkippableImg(src) {
  if (!src || src.startsWith('data:')) return true;
  const l = src.toLowerCase();
  return l.endsWith('.svg') || l.endsWith('.gif') || l.endsWith('.ico') || l.endsWith('.webp') === false && false
    || /icon|logo|sprite|pixel|track|analyt|1x1|spacer|blank|load|spin|arrow|close|menu|button|badge|star|flag/i.test(l);
}

function resolveImgUrl(src, base) {
  try {
    if (!src || src.startsWith('data:')) return null;
    if (src.startsWith('//')) return 'https:' + src;
    if (/^https?:\/\//.test(src)) return src;
    return new URL(src, base).href;
  } catch { return null; }
}

function parseHtmlForImages(html, baseUrl) {
  const urls = [];
  const seen = new Set();
  const add = (src) => {
    const u = resolveImgUrl(src, baseUrl);
    if (u && !isSkippableImg(u) && !seen.has(u) && urls.length < 24) {
      urls.push(u); seen.add(u);
    }
  };

  // og:image first — usually the best photo
  const og = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (og) add(og[1]);

  // <img src="...">
  for (const m of html.matchAll(/<img[^>]+src=["']([^"'>\s]+)["']/gi)) add(m[1]);

  // srcset="url 1x, url2 2x" — take first per set
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    const first = m[1].trim().split(',')[0].trim().split(/\s+/)[0];
    if (first) add(first);
  }

  // background-image: url(...)
  for (const m of html.matchAll(/url\(['"]?(https?:\/\/[^'")\s]+)['"]?\)/gi)) add(m[1]);

  return urls;
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

// ─────────────────────────────────────────────────────────
// ── CENTRAL URL ANALYZER ─────────────────────────────────
// ─────────────────────────────────────────────────────────

function detectUrlType(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram';
    if (host === 'facebook.com'  || host.endsWith('.facebook.com'))  return 'facebook';
    if (host === 'tiktok.com'    || host.endsWith('.tiktok.com'))    return 'tiktok';
  } catch {}
  return 'website';
}

const GENERIC_NAMES_RE = /^(home(?:page)?|startseite|welcome|willkommen|untitled|instagram|facebook|twitter|tiktok|youtube|pinterest|linkedin)$/i;
// Phrases that appear in login-wall or error pages — never real business names
const LOGIN_PHRASES_RE = /^(log\s*in|create\s*(an?\s*)?account|sign\s*up|page\s*not\s*found|join\s*(instagram|facebook)|error\s*\d*|not\s*found|404)/i;

/** Convert an Instagram handle to a readable business name.
 *  larimar_studios → Larimar Studios  |  hair.by.mina → Hair By Mina
 */
export function handleToName(handle) {
  const clean = String(handle).replace(/^@/, '').replace(/[/?#].*$/, '').trim();
  if (!clean) return '';
  return clean
    .split(/[_.\-]+/)
    .filter(w => w.length > 0)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function extractBestName(html, url) {
  // Returns the first non-generic, non-login segment from a title string.
  // Tries prefix first (typical for EN sites), then suffix (typical for DE: "Startseite | Brand").
  function bestSegment(raw) {
    const parts = raw.split(/\s*[|–\-—·•:]\s*/);
    for (const candidate of [parts[0], parts[parts.length - 1]]) {
      const n = candidate.trim();
      if (n.length > 1 && !GENERIC_NAMES_RE.test(n) && !LOGIN_PHRASES_RE.test(n)) return n;
    }
    return null;
  }

  // 1. og:site_name — explicit brand name, most reliable
  const ogSite = html.match(/property=["']og:site_name["'][^>]*content=["']([^"']{2,80})["']/i)
    || html.match(/content=["']([^"']{2,80})["'][^>]*property=["']og:site_name["']/i);
  if (ogSite) {
    const n = ogSite[1].trim();
    if (n.length > 1 && !GENERIC_NAMES_RE.test(n) && !LOGIN_PHRASES_RE.test(n)) return n;
  }

  // 2. og:title — try prefix, then suffix
  const ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']{2,120})["']/i)
    || html.match(/content=["']([^"']{2,120})["'][^>]*property=["']og:title["']/i);
  if (ogTitle) {
    const n = bestSegment(ogTitle[1]);
    if (n) return n;
  }

  // 3. <title> — try prefix, then suffix
  const titleM = html.match(/<title[^>]*>([^<]{2,120})<\/title>/i);
  if (titleM) {
    const n = bestSegment(titleM[1]);
    if (n) return n;
  }

  // 4. Domain name as last resort
  try {
    const domain = new URL(url).hostname.replace(/^www\./, '').split('.')[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch { return null; }
}

function extractLogoFromHtml(html, baseUrl) {
  // 1. <img> with "logo" anywhere in its attributes
  for (const m of html.matchAll(/<img([^>]+)>/gi)) {
    const attrs = m[1];
    if (!/logo/i.test(attrs)) continue;
    const srcM = attrs.match(/src=["']([^"'>\s]+)["']/i);
    if (!srcM) continue;
    const resolved = resolveImgUrl(srcM[1], baseUrl);
    if (resolved && !/\.svg$/i.test(resolved)) return resolved;
  }
  // 2. apple-touch-icon — high-quality square icon, usually the brand mark
  const apple = html.match(/<link[^>]*rel=["'][^"']*apple-touch-icon[^"']*["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*apple-touch-icon[^"']*["']/i);
  if (apple) { const r = resolveImgUrl(apple[1], baseUrl); if (r) return r; }
  return null;
}

function extractHoursFromHtml(html) {
  const DE = {
    Mo:'Mo', Tu:'Di', We:'Mi', Th:'Do', Fr:'Fr', Sa:'Sa', Su:'So',
    Monday:'Mo', Tuesday:'Di', Wednesday:'Mi', Thursday:'Do', Friday:'Fr', Saturday:'Sa', Sunday:'So',
  };
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const nodes = [data, ...(Array.isArray(data['@graph']) ? data['@graph'] : [])].flat();
      for (const node of nodes) {
        if (node.openingHours) {
          const hrs = Array.isArray(node.openingHours) ? node.openingHours : [node.openingHours];
          return hrs.map(h =>
            h.replace(/^(\w+)-(\w+)\s/, (_, d1, d2) => `${DE[d1]||d1}–${DE[d2]||d2}: `)
             .replace(/^(\w+)\s/, (_, d) => `${DE[d]||d}: `)
             .replace(/-/g, '–')
          ).join('\n');
        }
        if (node.openingHoursSpecification) {
          const specs = Array.isArray(node.openingHoursSpecification)
            ? node.openingHoursSpecification : [node.openingHoursSpecification];
          const lines = specs.map(s => {
            const days = (Array.isArray(s.dayOfWeek) ? s.dayOfWeek : [s.dayOfWeek||''])
              .map(d => DE[d.replace('https://schema.org/', '')] || d).join(', ');
            const t = [s.opens, s.closes].filter(Boolean).join('–');
            return `${days}: ${t}`.trim();
          }).filter(l => l.length > 3);
          if (lines.length) return lines.join('\n');
        }
      }
    } catch {}
  }
  return null;
}

async function analyzeInstagram(url, result) {
  const m = url.match(/instagram\.com\/([^/?#@]+)/i);
  if (!m) { result.error = 'Handle nicht erkennbar'; return result; }

  const handle = m[1].replace(/^@/, '').toLowerCase().replace(/\/$/, '');
  result.socialUrl    = `https://www.instagram.com/${handle}/`;
  result.businessName = handleToName(handle);
  result.found.push('Name (aus Handle)');

  try {
    const html = await fetchViaProxy(url);
    if (html && html.includes('<html')) {
      // og:title format: "Real Name (@handle) • Instagram photos and videos"
      const ogTitle = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
      if (ogTitle) {
        const realName = ogTitle[1].trim().match(/^(.+?)\s*(?:\(@[\w.]+\)|•|\|)/);
        if (realName) {
          const n = realName[1].trim();
          if (n.length > 2 && !GENERIC_NAMES_RE.test(n) && !LOGIN_PHRASES_RE.test(n)) {
            result.businessName = n;
            result.found[0] = 'Name (aus Profil)';
          }
        }
      }

      // Bio — skip follower/following stats and login-page descriptions
      const ogDesc = html.match(/property=["']og:description["'][^>]*content=["']([^"']{5,400})["']/i)
        || html.match(/content=["']([^"']{5,400})["'][^>]*property=["']og:description["']/i);
      if (ogDesc) {
        const d = ogDesc[1].trim();
        const isLoginDesc = /\b(sign up|join|create.{0,10}account|log.?in to)\b/i.test(d);
        if (!isLoginDesc) {
          const bioOnly = d.match(/Posts\s*[-–•]\s*(.+)$/)?.[1]?.trim()
            || (!/\d[\d,]*\s+Follower/i.test(d) ? d : null);
          if (bioOnly?.length > 5) { result.description = bioOnly; result.found.push('Bio'); }
        }
      }

      // Profile image (og:image)
      const ogImg = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
      if (ogImg?.[1]) { result.logoUrl = ogImg[1]; result.found.push('Profilbild'); }

      const colorResult = parseHtmlForColors(html);
      if (colorResult.colors.length) {
        result.colors = colorResult.colors;
        result.found.push(`${colorResult.colors.length} Farben`);
      }
    }
  } catch { /* Instagram blocked — handle-derived name is sufficient */ }

  return result;
}

async function analyzeWebsite(url, result) {
  const html = await fetchViaProxy(url);
  if (!html) { result.error = 'Website nicht erreichbar (CORS-Proxy)'; return result; }

  const name = extractBestName(html, url);
  if (name) { result.businessName = name; result.found.push('Name'); }

  const contact = parseHtmlForContact(html);
  if (contact.phone)       { result.phone       = contact.phone;       result.found.push('Telefon'); }
  if (contact.email)       { result.email       = contact.email;       result.found.push('E-Mail'); }
  if (contact.address)     { result.address     = contact.address;     result.found.push('Adresse'); }
  if (contact.description) { result.description = contact.description; }

  const hours = extractHoursFromHtml(html);
  if (hours) { result.hours = hours; result.found.push('Öffnungszeiten'); }

  const logoUrl = extractLogoFromHtml(html, url);
  if (logoUrl) { result.logoUrl = logoUrl; result.found.push('Logo'); }

  const colorResult = parseHtmlForColors(html);
  if (colorResult.colors.length) {
    result.colors = colorResult.colors;
    result.found.push(`${colorResult.colors.length} Farben`);
  }

  result.images = parseHtmlForImages(html, url);
  if (result.images.length) result.found.push(`${result.images.length} Bilder`);

  return result;
}

/** Analyzes a URL (Instagram or regular website) and returns structured brand data.
 *  @returns {{ type, businessName, phone, email, address, description, hours,
 *              colors[], images[], logoUrl, socialUrl, found[], error }}
 */
export async function analyzeSourceUrl(url) {
  const raw = String(url).trim();

  // Detect @handle input — also catches https://@handle (index.html prepends https://)
  const atHandle = raw.match(/^(?:https?:\/\/)?@([\w.]+)\/?$/);
  const normalized = atHandle
    ? `https://www.instagram.com/${atHandle[1]}/`
    : /^https?:\/\//.test(raw) ? raw : 'https://' + raw;

  const type = detectUrlType(normalized);
  const result = {
    type,
    businessName: null, phone: null, email: null, address: null,
    description:  null, hours: null, colors: [],  images:  [],
    logoUrl:      null, socialUrl: null, found: [], error: null,
  };
  return type === 'instagram'
    ? analyzeInstagram(normalized, result)
    : analyzeWebsite(normalized, result);
}
