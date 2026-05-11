import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

// Template B — Bold / High-Contrast (Barber: Maskulin — house-of-fade.de style)
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const heroPhoto = data.photos?.[0] || '';
  const aboutPhoto = data.photos?.[1] || '';
  const galleryPhotos = data.photos?.slice(2) || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  // ── BARBER MASKULIN ──
  if (isBarber) {
    const gold = colors.accent || '#B7975F';

    const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  /* ── BARBER MASKULIN — inspired by house-of-fade.de ── */
  :root { --gold: ${gold}; --ink: #1E1D1E; }

  .sg-hero-mask {
    min-height: 100svh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--ink);
    padding-top: 70px;
    overflow: hidden;
  }
  .sg-hero-mask__left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 56px 80px 48px;
    position: relative; z-index: 2;
  }
  .sg-hero-mask__badge {
    display: inline-flex; align-items: center; gap: 12px;
    margin-bottom: 32px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--gold);
  }
  .sg-hero-mask__badge::before {
    content: ''; width: 48px; height: 1px; background: var(--gold);
  }
  .sg-hero-mask__title {
    font-size: clamp(3rem, 5.5vw, 5.5rem);
    font-weight: 700; line-height: 1;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 24px;
  }
  .sg-hero-mask__title span { color: var(--gold); display: block; }
  .sg-hero-mask__sub {
    font-size: 1rem; color: rgba(255,255,255,0.5);
    line-height: 1.8; margin-bottom: 48px; max-width: 380px;
  }
  .sg-hero-mask__right {
    position: relative; overflow: hidden;
    clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .sg-hero-mask__right img {
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.04);
    animation: maskZoom 7s ease forwards;
  }
  @keyframes maskZoom { to { transform: scale(1); } }
  .sg-hero-mask__right-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #2a2928, var(--ink));
  }

  .sg-services-mask { background: var(--ink); }
  .sg-services-mask .section-title { color: #fff; }
  .sg-services-mask .section-subtitle { color: rgba(255,255,255,0.4); }
  .sg-svc-list { display: flex; flex-direction: column; }
  .sg-svc-row {
    display: grid; grid-template-columns: 64px 1fr auto;
    align-items: center; gap: 24px; padding: 24px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: padding-left 0.2s; cursor: default;
  }
  .sg-svc-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .sg-svc-row:hover { padding-left: 12px; }
  .sg-svc-row__num {
    font-size: 1.8rem; font-weight: 700;
    color: var(--gold); opacity: 0.4; line-height: 1;
    font-family: var(--f-heading);
  }
  .sg-svc-row__name { font-size: 1.15rem; font-weight: 600; color: #fff; font-family: var(--f-heading); }
  .sg-svc-row__desc { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-top: 4px; }
  .sg-svc-row__price { font-size: 1.1rem; font-weight: 700; color: var(--gold); white-space: nowrap; }

  .sg-about-mask { background: #111; }
  .sg-about-mask__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 540px; }
  .sg-about-mask__img { overflow: hidden; }
  .sg-about-mask__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about-mask__text {
    padding: 80px 56px; background: var(--gold); color: #000;
    display: flex; flex-direction: column; justify-content: center;
  }
  .sg-about-mask__text h2 {
    font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700;
    color: #000; margin-bottom: 24px;
  }
  .sg-about-mask__text p { opacity: 0.7; line-height: 1.85; margin-bottom: 16px; }
  .sg-about-mask__text .btn { background: #000; color: #fff; margin-top: 16px; border-color: transparent; }
  .sg-about-mask__text .btn:hover { background: #222; }

  @media (max-width: 768px) {
    .sg-hero-mask { grid-template-columns: 1fr; }
    .sg-hero-mask__left { padding: 48px 24px; }
    .sg-hero-mask__right { min-height: 280px; clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%); }
    .sg-about-mask__inner { grid-template-columns: 1fr; }
    .sg-about-mask__text { padding: 48px 28px; }
    .sg-svc-row { grid-template-columns: 40px 1fr auto; gap: 12px; }
    .sg-svc-row__num { font-size: 1.3rem; }
  }
</style>`;

    const body = `
${buildNav(data, niche)}

<section class="sg-hero-mask" id="hero">
  <div class="sg-hero-mask__left" data-animate="left">
    <div class="sg-hero-mask__badge">${niche.label} · Premium</div>
    <h1 class="sg-hero-mask__title">
      ${(data.businessName || niche.label).split(' ')[0]}
      <span>${(data.businessName || niche.label).split(' ').slice(1).join(' ') || 'Barber'}</span>
    </h1>
    <p class="sg-hero-mask__sub">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="border-color:rgba(255,255,255,0.2);color:#fff">${svgIcon('phone')} ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="sg-hero-mask__right" data-animate="right">
    ${heroPhoto
      ? `<img src="${heroPhoto}" alt="${data.businessName}">`
      : `<div class="sg-hero-mask__right-placeholder"></div>`}
  </div>
</section>

<section class="sg-services-mask section" id="services">
  <div class="container">
    <h2 class="section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">${data.tagline || niche.heroTagline}</p>
    <div class="sg-svc-list">
      ${services.map((s, i) => `
      <div class="sg-svc-row" data-animate="left" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-svc-row__num">0${i + 1}</div>
        <div>
          <div class="sg-svc-row__name">${s.name}</div>
          ${s.desc ? `<div class="sg-svc-row__desc">${s.desc}</div>` : ''}
        </div>
        ${s.price ? `<div class="sg-svc-row__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-mask" id="about">
  <div class="sg-about-mask__inner">
    <div class="sg-about-mask__img" data-animate="left">
      ${aboutPhoto
        ? `<img src="${aboutPhoto}" alt="${data.businessName}">`
        : `<div style="width:100%;height:100%;background:#222"></div>`}
    </div>
    <div class="sg-about-mask__text" data-animate="right">
      <h2>${niche.aboutLabel}</h2>
      <p>${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p style="font-size:0.85rem">${data.address}</p>` : ''}
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
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

  // ── STANDARD TEMPLATE B ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  .sg-hero-b {
    min-height: 100svh; display: grid; grid-template-columns: 1fr 1fr; padding-top: 70px;
  }
  .sg-hero-b__left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 60px 80px 40px; max-width: 640px; margin-left: auto;
  }
  .sg-hero-b__eyebrow {
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--c-accent);
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  }
  .sg-hero-b__eyebrow::before { content: ''; display: block; width: 40px; height: 2px; background: var(--c-accent); }
  .sg-hero-b__title {
    font-size: clamp(3.5rem, 6vw, 6rem); font-weight: 900;
    line-height: 0.95; margin-bottom: 28px; letter-spacing: -0.03em;
  }
  .sg-hero-b__sub { font-size: 1.1rem; color: var(--c-text-muted); max-width: 400px; margin-bottom: 44px; line-height: 1.7; }
  .sg-hero-b__right { position: relative; overflow: hidden; }
  .sg-hero-b__right img { width: 100%; height: 100%; object-fit: cover; }
  .sg-hero-b__right-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--c-primary), var(--c-accent)); }
  .sg-hero-b__badge {
    position: absolute; bottom: 40px; left: -24px;
    background: var(--c-accent); color: #000;
    padding: 20px 28px; border-radius: 4px; font-weight: 700; font-size: 1.1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
  .sg-services-b { background: var(--c-surface); }
  .sg-services-b__list { display: flex; flex-direction: column; }
  .sg-service-row {
    display: grid; grid-template-columns: 80px 1fr auto;
    align-items: center; gap: 24px; padding: 28px 0;
    border-bottom: 1px solid var(--c-border); transition: padding-left 0.2s;
  }
  .sg-service-row:first-child { border-top: 1px solid var(--c-border); }
  .sg-service-row:hover { padding-left: 8px; }
  .sg-service-row__num { font-family: var(--f-heading); font-size: 2.5rem; font-weight: 900; color: var(--c-accent); opacity: 0.5; line-height: 1; }
  .sg-service-row__name { font-family: var(--f-heading); font-size: 1.4rem; font-weight: 700; }
  .sg-service-row__desc { font-size: 0.9rem; color: var(--c-text-muted); margin-top: 4px; }
  .sg-service-row__price { font-size: 1.3rem; font-weight: 700; color: var(--c-accent); white-space: nowrap; }
  .sg-about-b { background: var(--c-bg); }
  .sg-about-b__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 520px; }
  .sg-about-b__img { overflow: hidden; }
  .sg-about-b__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about-b__text {
    padding: 80px 60px; display: flex; flex-direction: column; justify-content: center;
    background: var(--c-primary); color: #fff;
  }
  .sg-about-b__text .section-title { color: #fff; margin-bottom: 24px; }
  .sg-about-b__text p { color: rgba(255,255,255,0.7); line-height: 1.8; }
  @media (max-width: 768px) {
    .sg-hero-b { grid-template-columns: 1fr; }
    .sg-hero-b__left { padding: 40px 24px; max-width: 100%; margin: 0; }
    .sg-hero-b__right { min-height: 300px; }
    .sg-about-b__inner { grid-template-columns: 1fr; }
    .sg-about-b__text { padding: 48px 24px; }
    .sg-service-row { grid-template-columns: 40px 1fr auto; gap: 12px; }
    .sg-service-row__num { font-size: 1.5rem; }
  }
</style>`;

  const body = `
${buildNav(data, niche)}

<section class="sg-hero-b" id="hero">
  <div class="sg-hero-b__left" data-animate="left">
    <div class="sg-hero-b__eyebrow">${niche.label}</div>
    <h1 class="sg-hero-b__title">${data.businessName || niche.label}</h1>
    <p class="sg-hero-b__sub">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="sg-hero-b__right" data-animate="right">
    ${heroPhoto
      ? `<img src="${heroPhoto}" alt="${data.businessName}">`
      : `<div class="sg-hero-b__right-placeholder"></div>`}
    ${data.tagline ? `<div class="sg-hero-b__badge">${data.tagline.split(' ').slice(0, 3).join(' ')}</div>` : ''}
  </div>
</section>

<section class="sg-services-b section" id="services">
  <div class="container">
    <h2 class="section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">${data.tagline || niche.heroTagline}</p>
    <div class="sg-services-b__list">
      ${services.map((s, i) => `
      <div class="sg-service-row" data-animate="left" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-service-row__num">0${i + 1}</div>
        <div>
          <div class="sg-service-row__name">${s.name}</div>
          ${s.desc ? `<div class="sg-service-row__desc">${s.desc}</div>` : ''}
        </div>
        ${s.price ? `<div class="sg-service-row__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-b" id="about">
  <div class="sg-about-b__inner">
    <div class="sg-about-b__img" data-animate="left">
      ${aboutPhoto
        ? `<img src="${aboutPhoto}" alt="${data.businessName}">`
        : `<div style="width:100%;height:100%;background:var(--c-surface)"></div>`}
    </div>
    <div class="sg-about-b__text" data-animate="right">
      <h2 class="section-title">${niche.aboutLabel}</h2>
      <p>${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p style="margin-top:20px;font-size:0.9rem;opacity:0.6">${data.address}</p>` : ''}
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
