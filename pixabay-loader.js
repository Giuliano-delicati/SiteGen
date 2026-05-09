// Pixabay Demo-Foto Loader
// API-Key kostenlos unter: https://pixabay.com/api/docs/

const NICHE_QUERIES = {
  friser:   ['barber shop interior', 'hairdresser salon', 'barbershop scissors', 'hair cutting', 'barber pole'],
  fastfood: ['burger restaurant', 'fast food grill', 'street food', 'hamburger fresh', 'food truck'],
  cafe:     ['coffee shop interior', 'cafe table', 'espresso cup', 'barista coffee', 'cozy cafe'],
  handwerk: ['craftsman workshop', 'handyman tools', 'construction worker', 'carpenter wood', 'electrician work'],
  beauty:   ['beauty salon', 'nail salon', 'spa wellness', 'makeup cosmetics', 'nail art'],
};

const PIXABAY_BASE = 'https://pixabay.com/api/';

/**
 * Fetch demo photos for a given niche from Pixabay.
 * @param {string} niche - niche key (friser, fastfood, etc.)
 * @param {string} apiKey - Pixabay API key
 * @param {number} count - number of images to fetch (default: 5)
 * @returns {Promise<string[]>} - array of image URLs
 */
export async function fetchNichePhotos(niche, apiKey, count = 5) {
  if (!apiKey) throw new Error('Kein Pixabay API-Key angegeben');

  const queries = (NICHE_QUERIES[niche] || NICHE_QUERIES.friser).slice(0, count);

  const fetchOne = async (q) => {
    const url = new URL(PIXABAY_BASE);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('q', q);
    url.searchParams.set('image_type', 'photo');
    url.searchParams.set('orientation', 'horizontal');
    url.searchParams.set('per_page', '3');
    url.searchParams.set('safesearch', 'true');
    url.searchParams.set('min_width', '800');
    try {
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(6000) });
      if (!res.ok) return null;
      const data = await res.json();
      return data.hits?.[0]?.webformatURL ?? null;
    } catch {
      return null;
    }
  };

  const results = await Promise.all(queries.map(fetchOne));
  return results.filter(Boolean);
}

/**
 * Save & load API key from localStorage.
 */
export function saveApiKey(key) {
  try { localStorage.setItem('sitegen_pixabay_key', key); } catch {}
}

export function loadApiKey() {
  try { return localStorage.getItem('sitegen_pixabay_key') || ''; } catch { return ''; }
}
