import { NICHES, FONT_COMBOS } from './templates/niche-configs.js';
import { generate as genA } from './templates/template-a.js';
import { generate as genB } from './templates/template-b.js';
import { generate as genC } from './templates/template-c.js';
import { generate as genD } from './templates/template-d.js';

const TEMPLATE_FNS = { a: genA, b: genB, c: genC, d: genD };

/**
 * Main entry point. Assembles a complete HTML string from form data.
 * @param {object} formData - All collected form data
 * @returns {string} - Full standalone HTML document
 */
export function generateWebsite(formData) {
  const niche = NICHES[formData.niche] || NICHES.friser;
  const templateFn = TEMPLATE_FNS[formData.template] || genA;

  const colors = {
    primary: formData.primaryColor || niche.primaryColor,
    accent: formData.accentColor || niche.accentColor,
    bg: formData.darkMode ? (niche.bgColor || '#0d0d0d') : '#ffffff',
    text: formData.darkMode ? (niche.textColor || '#f5f0e8') : '#1a1a1a',
  };

  const fontCombo = FONT_COMBOS.find(f => f.id === formData.fontCombo);
  const fonts = fontCombo || {
    heading: niche.fontHeading,
    body: niche.fontBody,
    gfonts: niche.googleFonts,
  };

  const data = {
    businessName: formData.businessName || '',
    tagline: formData.tagline || '',
    about: formData.about || '',
    address: formData.address || '',
    phone: formData.phone || '',
    email: formData.email || '',
    website: formData.website || '',
    bookingUrl: formData.bookingUrl || '',
    hours: formData.hours || '',
    darkMode: formData.darkMode ?? niche.defaultDark,
    logoDataUrl: formData.logoDataUrl || null,
    photos: formData.photos || [],
    services: formData.services || [],
    team: formData.team || [],
    showTeam: formData.showTeam && formData.team?.length > 0,
    formspreeId: formData.formspreeId || '',
  };

  return templateFn(data, niche, colors, fonts);
}

/**
 * Triggers a browser download of the generated HTML.
 */
export function downloadWebsite(formData) {
  const html = generateWebsite(formData);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const name = (formData.businessName || 'website').toLowerCase().replace(/\s+/g, '-');
  a.href = url;
  a.download = `${name}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Returns a preview-ready HTML string (same as generate, can be injected into iframe).
 */
export function previewWebsite(formData) {
  return generateWebsite(formData);
}
