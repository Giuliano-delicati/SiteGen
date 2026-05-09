import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildTeam, svgIcon } from './base-shell.js';

// Template C — Editorial / Photo-Heavy
// Fullscreen image stack, overlapping text, magazine layout
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 6);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  /* Editorial Hero — fullscreen with center text over dark overlay */
  .sg-hero-c {
    position: relative;
    height: 100svh;
    display: flex;
    align-items: flex-end;
    padding-bottom: 80px;
    overflow: hidden;
  }
  .sg-hero-c__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .sg-hero-c__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%);
  }
  .sg-hero-c__content {
    position: relative;
    z-index: 2;
    width: 100%;
  }
  .sg-hero-c__tag {
    display: inline-block;
    padding: 6px 16px;
    border: 1px solid rgba(255,255,255,0.4);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
    margin-bottom: 20px;
    border-radius: 2px;
  }
  .sg-hero-c__title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 900;
    color: #fff;
    line-height: 0.9;
    margin-bottom: 24px;
    letter-spacing: -0.04em;
  }
  .sg-hero-c__sub {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.7);
    max-width: 500px;
    margin-bottom: 36px;
  }

  /* Editorial bento-grid services */
  .sg-services-c { background: var(--c-bg); }
  .sg-services-c__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 48px;
    gap: 24px;
    flex-wrap: wrap;
  }
  .sg-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .sg-bento__card {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: 36px 28px;
    border: 1px solid var(--c-border);
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }
  .sg-bento__card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: var(--c-accent);
    transition: height 0.4s ease;
  }
  .sg-bento__card:hover::before { height: 100%; }
  .sg-bento__card:hover { border-color: transparent; box-shadow: var(--shadow); }
  .sg-bento__card:first-child {
    grid-column: 1 / 3;
    background: var(--c-primary);
    border-color: transparent;
    color: #fff;
  }
  .sg-bento__card:first-child .sg-bento__price { color: var(--c-accent); }
  .sg-bento__name {
    font-family: var(--f-heading);
    font-size: 1.3rem;
    font-weight: 700;
    color: inherit;
  }
  .sg-bento__desc { font-size: 0.9rem; color: var(--c-text-muted); flex: 1; }
  .sg-bento__card:first-child .sg-bento__desc { color: rgba(255,255,255,0.65); }
  .sg-bento__price { font-size: 1.5rem; font-weight: 700; color: var(--c-accent); }

  /* Photo mosaic about */
  .sg-about-c { background: var(--c-surface); }
  .sg-about-c__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .sg-about-c__mosaic {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px;
    height: 480px;
  }
  .sg-about-c__mosaic-item {
    overflow: hidden;
    border-radius: var(--radius);
    background: var(--c-border);
  }
  .sg-about-c__mosaic-item:first-child {
    grid-row: 1 / 3;
  }
  .sg-about-c__mosaic-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .sg-about-c__mosaic-item:hover img { transform: scale(1.05); }

  @media (max-width: 768px) {
    .sg-bento { grid-template-columns: 1fr; }
    .sg-bento__card:first-child { grid-column: 1; }
    .sg-about-c__inner { grid-template-columns: 1fr; }
    .sg-about-c__mosaic { height: 320px; }
  }
</style>`;

  const heroStyle = photos[0]
    ? `background-image: url('${photos[0]}')`
    : `background: linear-gradient(135deg, ${colors.primary} 0%, #000 100%)`;

  const body = `
${buildNav(data, niche)}

<!-- Hero C — Editorial -->
<section class="sg-hero-c" id="hero">
  <div class="sg-hero-c__bg" style="${heroStyle}"></div>
  <div class="sg-hero-c__overlay"></div>
  <div class="container">
    <div class="sg-hero-c__content">
      <div class="sg-hero-c__tag">${niche.label}</div>
      <h1 class="sg-hero-c__title">${(data.businessName || niche.label).replace(' ', '<br>')}</h1>
      <p class="sg-hero-c__sub">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.3)">${svgIcon('phone')} ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- Services C — Bento Grid -->
<section class="sg-services-c section" id="services">
  <div class="container">
    <div class="sg-services-c__header">
      <div>
        <h2 class="section-title">${niche.servicesLabel}</h2>
        <p class="section-subtitle" style="margin-bottom:0">${data.tagline || niche.heroTagline}</p>
      </div>
    </div>
    <div class="sg-bento">
      ${services.map(s => `
      <div class="sg-bento__card">
        <div class="sg-bento__name">${s.name}</div>
        <div class="sg-bento__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-bento__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- About C — Mosaic -->
<section class="sg-about-c section" id="about">
  <div class="container">
    <div class="sg-about-c__inner">
      <div class="sg-about-c__mosaic">
        ${[0, 1, 2].map(i => `
        <div class="sg-about-c__mosaic-item">
          ${photos[i] ? `<img src="${photos[i]}" alt="Galerie ${i + 1}">` : ''}
        </div>`).join('')}
      </div>
      <div>
        <span style="display:block;font-size:0.8rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--c-accent);margin-bottom:16px">${niche.aboutLabel}</span>
        <h2 class="section-title" style="margin-bottom:24px">${data.businessName || niche.label}</h2>
        <p style="color:var(--c-text-muted);line-height:1.8;margin-bottom:24px">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.9rem;color:var(--c-text-muted)">${svgIcon('map')} ${data.address}</p>` : ''}
        <div style="margin-top:32px;display:flex;gap:16px;flex-wrap:wrap">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Gallery if enough photos -->
${photos.length > 3 ? `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title">Galerie</h2>
    <p class="section-subtitle">Einblicke in unsere Arbeit</p>
    <div class="sg-gallery__grid">
      ${photos.slice(3, 9).map((src, i) => `<div class="sg-gallery__item"><img src="${src}" alt="Galerie ${i + 4}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
