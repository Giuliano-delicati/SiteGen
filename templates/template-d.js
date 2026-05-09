import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

// Template D — Warm / Organic
// Soft corners, warm palette, horizontal scroll cards, asymmetric layout
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  :root {
    --radius: 16px;
    --radius-lg: 24px;
  }

  /* Hero D — Centered soft */
  .sg-hero-d {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 120px 24px 80px;
  }
  .sg-hero-d__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.45);
  }
  .sg-hero-d__blob {
    position: absolute;
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
    background: radial-gradient(circle, ${colors.accent}33 0%, transparent 70%);
    top: -20vw; right: -10vw;
    pointer-events: none;
  }
  .sg-hero-d__content { position: relative; z-index: 2; max-width: 720px; }
  .sg-hero-d__pill {
    display: inline-block;
    background: ${colors.accent}22;
    border: 1px solid ${colors.accent}55;
    color: var(--c-accent);
    padding: 8px 20px;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
  }
  .sg-hero-d__title {
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    font-weight: 900;
    color: ${dark ? '#fff' : 'var(--c-text)'};
    margin-bottom: 20px;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }
  .sg-hero-d__sub {
    font-size: 1.15rem;
    color: ${dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)'};
    margin-bottom: 40px;
    line-height: 1.7;
  }
  .sg-hero-d__scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0.5;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: currentColor;
  }
  .sg-hero-d__scroll::after {
    content: '';
    width: 1px;
    height: 40px;
    background: currentColor;
    display: block;
  }

  /* Services D — Horizontal scroll on mobile, grid on desktop */
  .sg-services-d { background: var(--c-bg); }
  .sg-cards-scroll {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }
  .sg-card-d {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: 32px 24px;
    border: 1px solid var(--c-border);
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }
  .sg-card-d::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--c-accent), var(--c-primary));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .sg-card-d:hover::after { transform: scaleX(1); }
  .sg-card-d:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .sg-card-d__name { font-family: var(--f-heading); font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
  .sg-card-d__desc { font-size: 0.88rem; color: var(--c-text-muted); margin-bottom: 20px; line-height: 1.6; }
  .sg-card-d__price { font-size: 1.35rem; font-weight: 700; color: var(--c-accent); }

  /* About D — Asymmetric with accent strip */
  .sg-about-d { background: var(--c-surface); }
  .sg-about-d__inner {
    display: grid;
    grid-template-columns: 5fr 4fr;
    gap: 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }
  .sg-about-d__img { min-height: 460px; }
  .sg-about-d__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about-d__text {
    padding: 64px 48px;
    background: var(--c-accent);
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .sg-about-d__text h2 { color: #000; margin-bottom: 20px; font-size: clamp(1.5rem, 3vw, 2.2rem); }
  .sg-about-d__text p { opacity: 0.75; line-height: 1.8; margin-bottom: 28px; }
  .sg-about-d__text .btn { background: #000; color: #fff; }
  .sg-about-d__text .btn:hover { background: rgba(0,0,0,0.8); }

  @media (max-width: 768px) {
    .sg-about-d__inner { grid-template-columns: 1fr; }
    .sg-about-d__text { padding: 40px 28px; }
  }
</style>`;

  const heroStyle = photos[0]
    ? `background-image: url('${photos[0]}')`
    : '';

  const body = `
${buildNav(data, niche)}

<!-- Hero D — Centered Warm -->
<section class="sg-hero-d" id="hero" style="background: ${!photos[0] ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}66 100%)` : 'var(--c-bg)'}">
  ${photos[0] ? `<div class="sg-hero-d__bg" style="${heroStyle}"></div>` : `<div class="sg-hero-d__blob"></div>`}
  <div class="sg-hero-d__content">
    <div class="sg-hero-d__pill">${niche.label}</div>
    <h1 class="sg-hero-d__title">${data.businessName || niche.label}</h1>
    <p class="sg-hero-d__sub">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="sg-hero-d__scroll">Scroll</div>
</section>

<!-- Services D -->
<section class="sg-services-d section" id="services">
  <div class="container">
    <h2 class="section-title">${niche.servicesLabel}</h2>
    <p class="section-subtitle">${data.tagline || niche.heroTagline}</p>
    <div class="sg-cards-scroll">
      ${services.map(s => `
      <div class="sg-card-d">
        <div class="sg-card-d__name">${s.name}</div>
        <div class="sg-card-d__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-card-d__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- About D -->
<section class="sg-about-d section" id="about">
  <div class="container">
    <div class="sg-about-d__inner">
      ${photos[1]
        ? `<div class="sg-about-d__img"><img src="${photos[1]}" alt="${data.businessName}"></div>`
        : `<div class="sg-about-d__img" style="background:var(--c-border)"></div>`}
      <div class="sg-about-d__text">
        <h2>${niche.aboutLabel}</h2>
        <p>${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.85rem">${data.address}</p>` : ''}
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      </div>
    </div>
  </div>
</section>

${buildGallery(photos.slice(2), niche)}
${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
