import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

// Template A — Minimal / Clean (Barber: Elegant)
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const heroPhoto = data.photos?.[0] || '';
  const aboutPhoto = data.photos?.[1] || data.photos?.[0] || '';
  const galleryPhotos = data.photos?.slice(2) || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
${isBarber ? `<style>
  /* ── BARBER ELEGANT — inspired by exquisitbarberlounge.com ── */
  :root {
    --barber-gold: ${colors.accent || '#c9a84c'};
    --barber-dark: #0a0a0a;
    --barber-cream: #f5f0e8;
  }

  /* Hero — full-bleed, bottom-aligned text, italic serif subline */
  .sg-hero-elegant {
    position: relative;
    height: 100svh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .sg-hero-elegant__bg {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.06);
    animation: heroZoom 8s ease forwards;
  }
  @keyframes heroZoom {
    from { transform: scale(1.06); }
    to   { transform: scale(1); }
  }
  .sg-hero-elegant__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 55%, transparent 100%);
  }
  .sg-hero-elegant__content {
    position: relative; z-index: 2;
    padding: 0 0 80px;
    width: 100%;
  }
  .sg-hero-elegant__rule {
    display: flex; align-items: center; gap: 20px;
    margin-bottom: 20px;
  }
  .sg-hero-elegant__rule::before,
  .sg-hero-elegant__rule::after {
    content: ''; flex: 0 0 60px; height: 1px;
    background: var(--barber-gold);
  }
  .sg-hero-elegant__eyebrow {
    font-size: 0.7rem; font-weight: 400; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--barber-gold);
    font-family: var(--f-body);
  }
  .sg-hero-elegant__title {
    font-size: clamp(3.2rem, 7vw, 7rem);
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    line-height: 1;
    margin-bottom: 16px;
  }
  .sg-hero-elegant__sub {
    font-style: italic;
    font-size: 1.15rem;
    color: rgba(255,255,255,0.65);
    margin-bottom: 44px;
    font-family: var(--f-heading);
    font-weight: 300;
  }
  .sg-hero-elegant__actions { display: flex; gap: 16px; flex-wrap: wrap; }

  /* Services — elegant price list */
  .sg-services-elegant { background: var(--c-bg); }
  .sg-pricelist { display: flex; flex-direction: column; }
  .sg-pricelist__cat {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--barber-gold);
    padding: 40px 0 16px;
    border-bottom: 1px solid var(--c-border);
    margin-bottom: 0;
  }
  .sg-pricelist__item {
    display: flex; align-items: baseline;
    gap: 12px; padding: 18px 0;
    border-bottom: 1px solid var(--c-border);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .sg-pricelist__item.visible { opacity: 1; transform: none; }
  .sg-pricelist__dots {
    flex: 1; border-bottom: 1px dotted var(--c-border);
    margin-bottom: 4px;
  }
  .sg-pricelist__name {
    font-family: var(--f-heading); font-size: 1.05rem; font-weight: 400;
    letter-spacing: 0.02em;
  }
  .sg-pricelist__desc { font-size: 0.8rem; color: var(--c-text-muted); margin-top: 2px; }
  .sg-pricelist__price {
    font-size: 1rem; font-weight: 600; color: var(--barber-gold);
    white-space: nowrap;
  }

  /* About — refined side-by-side */
  .sg-about-elegant { background: var(--c-surface); }
  .sg-about-elegant__inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .sg-about-elegant__img {
    position: relative; aspect-ratio: 3/4; overflow: hidden;
  }
  .sg-about-elegant__img img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .sg-about-elegant__img::after {
    content: ''; position: absolute;
    bottom: -20px; right: -20px;
    width: 80%; height: 80%;
    border: 1px solid var(--barber-gold);
    z-index: -1;
  }
  .sg-about-elegant__label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--barber-gold); margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .sg-about-elegant__label::after {
    content: ''; flex: 0 0 40px; height: 1px; background: var(--barber-gold);
  }
  .sg-about-elegant__title {
    font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 300;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 28px; line-height: 1.15;
  }

  @media (max-width: 768px) {
    .sg-about-elegant__inner { grid-template-columns: 1fr; gap: 40px; }
    .sg-about-elegant__img::after { display: none; }
  }
</style>` : ''}`;

  // ── BARBER ELEGANT BODY ──
  if (isBarber) {
    const heroStyle = heroPhoto
      ? `background-image: url('${heroPhoto}')`
      : `background: linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 100%)`;

    const body = `
${buildNav(data, niche)}

<!-- Hero — Elegant Barber -->
<section class="sg-hero-elegant" id="hero">
  <div class="sg-hero-elegant__bg" style="${heroStyle}"></div>
  <div class="sg-hero-elegant__overlay"></div>
  <div class="container">
    <div class="sg-hero-elegant__content" data-animate="fade">
      <div class="sg-hero-elegant__rule">
        <span class="sg-hero-elegant__eyebrow">${niche.label} · Since ${new Date().getFullYear()}</span>
      </div>
      <h1 class="sg-hero-elegant__title">${data.businessName || niche.label}</h1>
      <p class="sg-hero-elegant__sub">${data.tagline || niche.heroTagline}</p>
      <div class="sg-hero-elegant__actions">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="border-color:rgba(255,255,255,0.25);color:#fff">${svgIcon('phone')} ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- Services — Elegant Price List -->
<section class="sg-services-elegant section" id="services">
  <div class="container" style="max-width:780px">
    <div data-animate="fade">
      <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--c-accent);margin-bottom:12px">${niche.label}</p>
      <h2 class="section-title" style="letter-spacing:0.08em;text-transform:uppercase;font-weight:300">${niche.servicesLabel}</h2>
    </div>
    <div class="sg-pricelist">
      ${services.map((s, i) => `
      <div class="sg-pricelist__item" data-animate="fade" data-animate-delay="${Math.min(i + 1, 5)}">
        <div>
          <div class="sg-pricelist__name">${s.name}</div>
          ${s.desc ? `<div class="sg-pricelist__desc">${s.desc}</div>` : ''}
        </div>
        <div class="sg-pricelist__dots"></div>
        ${s.price ? `<div class="sg-pricelist__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- About — Elegant -->
<section class="sg-about-elegant section" id="about">
  <div class="container">
    <div class="sg-about-elegant__inner">
      <div class="sg-about-elegant__img" data-animate="left">
        ${aboutPhoto ? `<img src="${aboutPhoto}" alt="${data.businessName}">` : `<div style="width:100%;height:100%;background:var(--c-border)"></div>`}
      </div>
      <div data-animate="right">
        <p class="sg-about-elegant__label">${niche.aboutLabel}</p>
        <h2 class="sg-about-elegant__title">${data.businessName || niche.label}</h2>
        <p style="color:var(--c-text-muted);line-height:1.9;margin-bottom:32px">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.85rem;color:var(--c-text-muted);margin-bottom:24px">${svgIcon('map')} ${data.address}</p>` : ''}
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      </div>
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

  // ── STANDARD TEMPLATE A BODY ──
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
    <div class="sg-hero__content" data-animate="fade">
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
      <div class="sg-about__img" data-animate="left">
        ${aboutPhoto ? `<img src="${aboutPhoto}" alt="${data.businessName}">` : '<div style="width:100%;height:100%;background:var(--c-surface)"></div>'}
      </div>
      <div class="sg-about__text" data-animate="right">
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
    <h2 class="section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">${niche.hasPricelist ? 'Unsere Preisliste' : niche.hasMenu ? 'Was wir anbieten' : 'Was wir für Sie tun'}</p>
    <div class="sg-services__grid">
      ${services.map((s, i) => `
      <div class="sg-service-card" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
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
