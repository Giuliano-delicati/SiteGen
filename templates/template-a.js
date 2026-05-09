import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

// Template A — Minimal / Clean
// Full-bleed hero, clean typography, card-based services, about with side image
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;

  const heroPhoto = data.photos?.[0] || '';
  const aboutPhoto = data.photos?.[1] || data.photos?.[0] || '';
  const galleryPhotos = data.photos?.slice(2) || [];

  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">`;

  const heroStyle = heroPhoto
    ? `background-image: url('${heroPhoto}')`
    : `background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}44 100%)`;

  const body = `
${buildNav(data, niche)}

<!-- Hero -->
<section class="sg-hero" id="hero">
  <div class="sg-hero__bg" style="${heroStyle}"></div>
  <div class="sg-hero__overlay"></div>
  <div class="container">
    <div class="sg-hero__content">
      <span class="sg-hero__eyebrow">${niche.label}</span>
      <h1 class="sg-hero__title">${data.businessName || niche.label}</h1>
      <p class="sg-hero__sub">${data.tagline || niche.heroTagline}</p>
      <div class="sg-hero__actions">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- About -->
<section class="sg-about section" id="about">
  <div class="container">
    <div class="sg-about__inner">
      ${aboutPhoto ? `<div class="sg-about__img"><img src="${aboutPhoto}" alt="${data.businessName}"></div>` : '<div class="sg-about__img" style="background:var(--c-surface)"></div>'}
      <div class="sg-about__text">
        <span style="display:block;font-size:0.8rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--c-accent);margin-bottom:16px">${niche.aboutLabel}</span>
        <h2 class="section-title">${data.businessName || niche.label}</h2>
        <p>${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.9rem;color:var(--c-text-muted)">${svgIcon('map')} ${data.address}</p>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- Services -->
<section class="sg-services section" id="services">
  <div class="container">
    <h2 class="section-title">${niche.servicesLabel}</h2>
    <p class="section-subtitle">${niche.hasPricelist ? 'Unsere Preisliste' : niche.hasMenu ? 'Was wir anbieten' : 'Was wir für Sie tun'}</p>
    <div class="sg-services__grid">
      ${services.map(s => `
      <div class="sg-service-card">
        <div class="sg-service-card__name">${s.name}</div>
        <div class="sg-service-card__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-service-card__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

${buildGallery(galleryPhotos.length ? galleryPhotos : data.photos?.slice(1) || [], niche)}
${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
