import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

// Template D — Warm / Organic (Barber: Oldschool — beardy-boys.de style)
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  // ── BARBER OLDSCHOOL ──
  if (isBarber) {
    const gold = colors.accent || '#B7975F';
    const dark1 = colors.primary || '#2a2420';

    const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  /* ── BARBER OLDSCHOOL — inspired by beardy-boys.de ── */
  :root { --gold: ${gold}; --bark: ${dark1}; }

  /* Ornamental divider helper */
  .sg-ornament {
    display: flex; align-items: center; gap: 16px;
    margin: 0 0 28px;
    color: var(--gold); font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
  }
  .sg-ornament::before, .sg-ornament::after {
    content: ''; flex: 1; height: 1px; background: var(--gold); opacity: 0.4;
  }

  /* Hero — centered, dark + texture feel */
  .sg-hero-old {
    position: relative; min-height: 100svh;
    display: flex; align-items: center; justify-content: center;
    text-align: center; overflow: hidden; padding: 120px 24px 80px;
    background: var(--bark);
  }
  .sg-hero-old__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    filter: brightness(0.35) sepia(0.3);
    animation: oldZoom 9s ease forwards;
    transform: scale(1.05);
  }
  @keyframes oldZoom { to { transform: scale(1); filter: brightness(0.3) sepia(0.4); } }
  .sg-hero-old__grain {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 128px;
    pointer-events: none;
  }
  .sg-hero-old__content { position: relative; z-index: 2; }
  .sg-hero-old__crest {
    display: inline-block;
    border: 1px solid var(--gold);
    padding: 6px 24px; margin-bottom: 28px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold);
  }
  .sg-hero-old__title {
    font-size: clamp(3rem, 7vw, 6.5rem);
    font-weight: 400; color: #fff;
    letter-spacing: 0.1em; text-transform: uppercase;
    line-height: 1; margin-bottom: 8px;
    font-family: var(--f-heading);
  }
  .sg-hero-old__sub-title {
    font-size: clamp(1rem, 2vw, 1.6rem);
    color: var(--gold); letter-spacing: 0.2em;
    text-transform: uppercase; margin-bottom: 28px;
    font-style: italic; font-family: var(--f-heading);
  }
  .sg-hero-old__tagline {
    font-size: 1rem; color: rgba(255,255,255,0.55);
    margin-bottom: 48px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.7;
  }
  .sg-hero-old__scroll {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: rgba(255,255,255,0.3); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
  }
  .sg-hero-old__scroll::after { content: ''; width: 1px; height: 36px; background: currentColor; display: block; }

  /* Services — classic price board */
  .sg-services-old { background: var(--c-bg); }
  .sg-priceboard { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; background: var(--c-border); }
  .sg-priceboard__item {
    background: var(--c-surface); padding: 32px 28px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
    border-bottom: 0; transition: background 0.2s;
  }
  .sg-priceboard__item:hover { background: var(--c-bg); }
  .sg-priceboard__name {
    font-family: var(--f-heading); font-size: 1.05rem; font-weight: 600;
    letter-spacing: 0.02em; margin-bottom: 6px;
  }
  .sg-priceboard__desc { font-size: 0.8rem; color: var(--c-text-muted); line-height: 1.5; }
  .sg-priceboard__price {
    font-size: 1.2rem; font-weight: 700; color: var(--gold);
    white-space: nowrap; flex-shrink: 0;
  }

  /* About — vintage feel */
  .sg-about-old { background: var(--bark); color: #fff; }
  .sg-about-old__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .sg-about-old__img {
    position: relative;
    border: 1px solid rgba(255,255,255,0.1);
    padding: 12px;
  }
  .sg-about-old__img img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; filter: sepia(0.15) contrast(1.05); }
  .sg-about-old__img::before {
    content: ''; position: absolute; inset: 4px;
    border: 1px solid rgba(183,151,95,0.3); z-index: 0; pointer-events: none;
  }
  .sg-about-old__text .section-title { color: #fff; margin-bottom: 20px; }
  .sg-about-old__text p { color: rgba(255,255,255,0.6); line-height: 1.9; margin-bottom: 24px; }
  .sg-about-old__text .btn-outline { border-color: var(--gold); color: var(--gold); }
  .sg-about-old__text .btn-outline:hover { background: var(--gold); color: #000; }

  @media (max-width: 768px) {
    .sg-priceboard { grid-template-columns: 1fr; }
    .sg-about-old__inner { grid-template-columns: 1fr; gap: 40px; }
  }
</style>`;

    const heroStyle = photos[0] ? `background-image: url('${photos[0]}')` : '';

    const body = `
${buildNav(data, niche)}

<section class="sg-hero-old" id="hero">
  ${photos[0] ? `<div class="sg-hero-old__bg" style="${heroStyle}"></div>` : ''}
  <div class="sg-hero-old__grain"></div>
  <div class="sg-hero-old__content" data-animate="fade">
    <div class="sg-hero-old__crest">${niche.label} · Est. ${new Date().getFullYear()}</div>
    <h1 class="sg-hero-old__title">${(data.businessName || niche.label).toUpperCase()}</h1>
    <p class="sg-hero-old__sub-title">Barber Shop</p>
    <p class="sg-hero-old__tagline">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="border-color:var(--gold);color:var(--gold)">${svgIcon('phone')} ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="sg-hero-old__scroll">Scroll</div>
</section>

<section class="sg-services-old section" id="services">
  <div class="container">
    <div class="sg-ornament" data-animate="fade">${niche.label}</div>
    <h2 class="section-title" style="text-align:center;text-transform:uppercase;letter-spacing:0.1em" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" style="text-align:center" data-animate="fade" data-animate-delay="1">Preisliste</p>
    <div class="sg-priceboard" style="margin-top:40px">
      ${services.map((s, i) => `
      <div class="sg-priceboard__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div>
          <div class="sg-priceboard__name">${s.name}</div>
          ${s.desc ? `<div class="sg-priceboard__desc">${s.desc}</div>` : ''}
        </div>
        ${s.price ? `<div class="sg-priceboard__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-old section" id="about">
  <div class="container">
    <div class="sg-about-old__inner">
      <div class="sg-about-old__img" data-animate="left">
        ${photos[1] ? `<img src="${photos[1]}" alt="${data.businessName}">` : `<div style="width:100%;aspect-ratio:3/4;background:#3a2f28"></div>`}
      </div>
      <div data-animate="right">
        <div class="sg-ornament">${niche.aboutLabel}</div>
        <h2 class="section-title" style="color:#fff;text-transform:uppercase;letter-spacing:0.08em">${data.businessName || niche.label}</h2>
        <p>${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.85rem;opacity:0.4;margin-bottom:28px">${data.address}</p>` : ''}
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} Anrufen</a>` : ''}
        </div>
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

  // ── STANDARD TEMPLATE D ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  :root { --radius: 16px; --radius-lg: 24px; }
  .sg-hero-d {
    min-height: 100svh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    position: relative; overflow: hidden; padding: 120px 24px 80px;
  }
  .sg-hero-d__bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.45); }
  .sg-hero-d__blob {
    position: absolute; width: 60vw; height: 60vw; border-radius: 50%;
    background: radial-gradient(circle, ${colors.accent}33 0%, transparent 70%);
    top: -20vw; right: -10vw; pointer-events: none;
  }
  .sg-hero-d__content { position: relative; z-index: 2; max-width: 720px; }
  .sg-hero-d__pill {
    display: inline-block; background: ${colors.accent}22; border: 1px solid ${colors.accent}55;
    color: var(--c-accent); padding: 8px 20px; border-radius: 100px;
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 24px;
  }
  .sg-hero-d__title {
    font-size: clamp(2.8rem, 6vw, 5.5rem); font-weight: 900;
    color: ${dark ? '#fff' : 'var(--c-text)'};
    margin-bottom: 20px; line-height: 1.05; letter-spacing: -0.03em;
  }
  .sg-hero-d__sub {
    font-size: 1.15rem; color: ${dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)'};
    margin-bottom: 40px; line-height: 1.7;
  }
  .sg-hero-d__scroll {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    opacity: 0.5; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  }
  .sg-hero-d__scroll::after { content: ''; width: 1px; height: 40px; background: currentColor; display: block; }
  .sg-services-d { background: var(--c-bg); }
  .sg-cards-scroll { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  .sg-card-d {
    background: var(--c-surface); border-radius: var(--radius-lg);
    padding: 32px 24px; border: 1px solid var(--c-border);
    position: relative; overflow: hidden; transition: var(--transition);
  }
  .sg-card-d::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--c-accent), var(--c-primary));
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .sg-card-d:hover::after { transform: scaleX(1); }
  .sg-card-d:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .sg-card-d__name { font-family: var(--f-heading); font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
  .sg-card-d__desc { font-size: 0.88rem; color: var(--c-text-muted); margin-bottom: 20px; line-height: 1.6; }
  .sg-card-d__price { font-size: 1.35rem; font-weight: 700; color: var(--c-accent); }
  .sg-about-d { background: var(--c-surface); }
  .sg-about-d__inner {
    display: grid; grid-template-columns: 5fr 4fr; gap: 0;
    border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg);
  }
  .sg-about-d__img { min-height: 460px; }
  .sg-about-d__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about-d__text {
    padding: 64px 48px; background: var(--c-accent); color: #000;
    display: flex; flex-direction: column; justify-content: center;
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

  const heroStyle = photos[0] ? `background-image: url('${photos[0]}')` : '';

  const body = `
${buildNav(data, niche)}

<section class="sg-hero-d" id="hero" style="background: ${!photos[0] ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}66 100%)` : 'var(--c-bg)'}">
  ${photos[0] ? `<div class="sg-hero-d__bg" style="${heroStyle}"></div>` : `<div class="sg-hero-d__blob"></div>`}
  <div class="sg-hero-d__content" data-animate="fade">
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

<section class="sg-services-d section" id="services">
  <div class="container">
    <h2 class="section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">${data.tagline || niche.heroTagline}</p>
    <div class="sg-cards-scroll">
      ${services.map((s, i) => `
      <div class="sg-card-d" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-card-d__name">${s.name}</div>
        <div class="sg-card-d__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-card-d__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-d section" id="about">
  <div class="container">
    <div class="sg-about-d__inner">
      <div class="sg-about-d__img" data-animate="left">
        ${photos[1]
          ? `<img src="${photos[1]}" alt="${data.businessName}">`
          : `<div style="width:100%;height:100%;background:var(--c-border)"></div>`}
      </div>
      <div class="sg-about-d__text" data-animate="right">
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
