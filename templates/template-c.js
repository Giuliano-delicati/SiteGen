import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildTeam, svgIcon, buildServicesTicker, buildBookingWidget } from './base-shell.js';

// Template C — Editorial / Photo-Heavy
// Barber variant: VERSPIELT — Navy + Signalrot, inspiriert von gentlemanbarbers.de
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 6);

  // ─────────────────────────────────────────────────────
  // BARBER VERSPIELT — Navy + Signalrot
  // Navy #0e1623 · Rot #e63535 · Weiss #f2f0eb
  // Energetisch, strukturiert, farbige Kacheln
  // ─────────────────────────────────────────────────────
  if (isBarber) {
    const barberHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════
     BARBER VERSPIELT — Navy + Signalrot
     Navy #0e1623 · Rot #e63535
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0e1623;
    --navy2:  #14202f;
    --navy3:  #1c2d42;
    --red:    #e63535;
    --red2:   #ff4545;
    --white:  #f2f0eb;
    --muted:  rgba(242,240,235,0.5);
    --border: rgba(242,240,235,0.1);
    --ff-head: 'Barlow Condensed', 'Arial Narrow', sans-serif;
    --ff-body: 'Barlow', system-ui, sans-serif;
  }

  body { background: var(--navy); color: var(--white); font-family: var(--ff-body); font-weight: 300; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }

  /* NAV */
  .vp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px; transition: background 0.3s, padding 0.3s;
  }
  .vp-nav.scrolled { background: rgba(14,22,35,0.97); backdrop-filter: blur(16px); padding: 16px 48px; border-bottom: 1px solid var(--border); }
  .vp-nav__logo {
    font-family: var(--ff-head); font-size: 1.6rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--white); text-decoration: none;
  }
  .vp-nav__logo span { color: var(--red); }
  .vp-nav__links { display: flex; gap: 40px; list-style: none; }
  .vp-nav__links a { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .vp-nav__links a:hover { color: var(--red); }
  .vp-nav__cta {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    background: var(--red); color: var(--white); padding: 11px 24px; text-decoration: none; transition: background 0.2s;
  }
  .vp-nav__cta:hover { background: var(--red2); }
  @media (max-width: 768px) { .vp-nav { padding: 18px 20px; } .vp-nav__links { display: none; } }

  /* HERO — Full-bleed mit rotem Kicker-Badge */
  .vp-hero {
    position: relative; height: 100svh; overflow: hidden;
    display: flex; align-items: center;
  }
  .vp-hero__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    transform: scale(1.04); animation: vpZoom 9s ease forwards;
  }
  @keyframes vpZoom { to { transform: scale(1); } }
  .vp-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(110deg, rgba(14,22,35,0.93) 0%, rgba(14,22,35,0.65) 55%, rgba(14,22,35,0.2) 100%);
  }
  .vp-hero__no-photo { position: absolute; inset: 0; background: var(--navy2); }
  .vp-hero__content { position: relative; z-index: 2; max-width: 740px; }
  .vp-hero__kicker {
    display: inline-flex; align-items: center; gap: 12px;
    background: var(--red); color: var(--white);
    padding: 7px 20px; margin-bottom: 28px;
    font-family: var(--ff-head); font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
  }
  .vp-hero__title {
    font-family: var(--ff-head);
    font-size: clamp(4rem, 9vw, 9.5rem);
    font-weight: 800; text-transform: uppercase;
    line-height: 0.88; letter-spacing: -0.01em;
    color: var(--white); margin-bottom: 28px;
  }
  .vp-hero__title .accent { color: var(--red); }
  .vp-hero__sub { font-size: 1.05rem; color: var(--muted); line-height: 1.75; max-width: 440px; margin-bottom: 44px; }
  .vp-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--ff-head); font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none;
    padding: 15px 36px; transition: all 0.22s;
  }
  .vp-btn-red { background: var(--red); color: var(--white); }
  .vp-btn-red:hover { background: var(--red2); }
  .vp-btn-outline { border: 1px solid rgba(242,240,235,0.25); color: var(--white); }
  .vp-btn-outline:hover { border-color: var(--red); color: var(--red); }

  /* SERVICES — Farbige Kacheln */
  .vp-services { background: var(--navy2); padding: 100px 0; }
  .vp-services__head {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 56px; flex-wrap: wrap; gap: 24px;
  }
  .vp-section-tag {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--red); color: var(--white);
    padding: 5px 16px; margin-bottom: 14px;
    font-family: var(--ff-head); font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
  }
  .vp-section-title {
    font-family: var(--ff-head); font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 800; text-transform: uppercase; color: var(--white); line-height: 1;
  }
  .vp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; background: var(--navy3); }
  .vp-card {
    background: var(--navy2); padding: 36px 28px; position: relative; overflow: hidden;
    transition: background 0.25s;
  }
  .vp-card:hover { background: var(--navy3); }
  .vp-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--red); transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
  }
  .vp-card:hover::after { transform: scaleX(1); }
  .vp-card:first-child { background: var(--red); }
  .vp-card:first-child::after { display: none; }
  .vp-card:first-child:hover { background: var(--red2); }
  .vp-card__num {
    font-family: var(--ff-head); font-size: 4rem; font-weight: 800;
    line-height: 1; opacity: 0.12; position: absolute; top: 12px; right: 16px; color: var(--white);
  }
  .vp-card__name {
    font-family: var(--ff-head); font-size: 1.25rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; color: var(--white);
  }
  .vp-card__desc { font-size: 0.85rem; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
  .vp-card:first-child .vp-card__desc { color: rgba(255,255,255,0.7); }
  .vp-card__price {
    font-family: var(--ff-head); font-size: 1.5rem; font-weight: 700; color: var(--red);
  }
  .vp-card:first-child .vp-card__price { color: var(--white); }

  /* ABOUT — Foto + Roter Akzent-Panel */
  .vp-about { background: var(--navy); }
  .vp-about__inner { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  .vp-about__img { overflow: hidden; }
  .vp-about__img img { width: 100%; height: 100%; object-fit: cover; }
  .vp-about__img-ph { width: 100%; height: 100%; background: var(--navy3); }
  .vp-about__text {
    background: var(--navy2); padding: 80px 56px;
    display: flex; flex-direction: column; justify-content: center;
    border-left: 4px solid var(--red);
  }
  .vp-about__label {
    font-family: var(--ff-head); font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.28em; text-transform: uppercase; color: var(--red);
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .vp-about__label::after { content: ''; flex: 0 0 32px; height: 2px; background: var(--red); }
  .vp-about__title {
    font-family: var(--ff-head); font-size: clamp(2rem, 3vw, 3rem);
    font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;
    color: var(--white); margin-bottom: 24px; line-height: 1.05;
  }
  .vp-about__copy { font-size: 0.92rem; color: var(--muted); line-height: 1.85; margin-bottom: 14px; }
  .vp-about__addr { font-size: 0.8rem; color: rgba(242,240,235,0.35); margin-bottom: 36px; }

  /* GALLERY */
  .vp-gallery { background: var(--navy2); padding: 80px 0; }
  .vp-gallery__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-top: 48px; }
  .vp-gallery__item { overflow: hidden; aspect-ratio: 1; }
  .vp-gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
  .vp-gallery__item:hover img { transform: scale(1.08); }

  /* FOOTER */
  .vp-footer { background: var(--navy); border-top: 1px solid var(--border); padding: 64px 0 40px; }
  .vp-footer__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .vp-footer__logo {
    font-family: var(--ff-head); font-size: 2rem; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.06em; color: var(--white);
    margin-bottom: 16px;
  }
  .vp-footer__logo span { color: var(--red); }
  .vp-footer__tagline { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }
  .vp-footer__contact { font-size: 0.82rem; color: var(--muted); line-height: 2.1; }
  .vp-footer__copy { font-size: 0.72rem; color: rgba(242,240,235,0.2); border-top: 1px solid var(--border); padding-top: 24px; }

  @media (max-width: 768px) {
    .vp-grid { grid-template-columns: 1fr; }
    .vp-about__inner { grid-template-columns: 1fr; }
    .vp-about__text { padding: 56px 28px; border-left: none; border-top: 4px solid var(--red); }
    .vp-gallery__grid { grid-template-columns: 1fr 1fr; }
    .vp-footer__inner { grid-template-columns: 1fr; }
  }

  [data-animate] { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  [data-animate="left"]  { transform: translateX(-40px); }
  [data-animate="right"] { transform: translateX(40px); }
  [data-animate="scale"] { transform: scale(0.94); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.1s; } [data-animate-delay="2"] { transition-delay: 0.2s; }
  [data-animate-delay="3"] { transition-delay: 0.3s; } [data-animate-delay="4"] { transition-delay: 0.4s; }
  [data-animate-delay="5"] { transition-delay: 0.5s; }
  @media (prefers-reduced-motion: reduce) { [data-animate] { opacity: 1; transform: none; transition: none; } }
</style>`;

    const words = (data.businessName || niche.label).split(' ');
    const heroTitle = words.length > 1
      ? `${words[0]}<br><span class="accent">${words.slice(1).join(' ')}</span>`
      : `<span class="accent">${words[0]}</span>`;

    const barberBookingVars = `<style>
  .bk-section { --c-bg:#0e1623; --c-surface:#141c2e; --c-text:#e8edf8; --c-accent:#e63535; --c-border:rgba(255,255,255,0.1); --c-text-muted:rgba(232,237,248,0.45); --f-heading:'Barlow Condensed',sans-serif; --f-body:'Barlow',sans-serif; }
</style>`;

    const barberBody = `
<nav class="vp-nav" id="vp-nav">
  <a href="#hero" class="vp-nav__logo">${words[0]}<span>${words.length > 1 ? words.slice(1).join(' ') : '.'}</span></a>
  <ul class="vp-nav__links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">Über uns</a></li>
    ${photos.length > 2 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="vp-nav__cta">${niche.heroCta} →</a>` : (data.phone ? `<a href="tel:${data.phone}" class="vp-nav__cta">${data.phone}</a>` : '')}
</nav>
${buildServicesTicker(services, '#e63535')}

<section class="vp-hero" id="hero">
  ${photos[0]
    ? `<div class="vp-hero__bg" style="background-image:url('${photos[0]}')"></div><div class="vp-hero__overlay"></div>`
    : `<div class="vp-hero__no-photo"></div>`}
  <div class="container">
    <div class="vp-hero__content" data-animate="left">
      <div class="vp-hero__kicker">${niche.label}</div>
      <h1 class="vp-hero__title">${heroTitle}</h1>
      <p class="vp-hero__sub">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="vp-btn vp-btn-red">${niche.heroCta} →</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="vp-btn vp-btn-outline">☎ ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<section class="vp-services" id="services">
  <div class="container">
    <div class="vp-services__head" data-animate="fade">
      <div>
        <div class="vp-section-tag">${niche.label}</div>
        <h2 class="vp-section-title">${niche.servicesLabel}</h2>
      </div>
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="vp-btn vp-btn-red">${niche.heroCta} →</a>` : ''}
    </div>
    <div class="vp-grid">
      ${services.map((s, i) => `
      <div class="vp-card" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="vp-card__num">${String(i + 1).padStart(2, '0')}</div>
        <div class="vp-card__name">${s.name}</div>
        <div class="vp-card__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="vp-card__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="vp-about" id="about">
  <div class="vp-about__inner">
    <div class="vp-about__img" data-animate="left">
      ${photos[1] ? `<img src="${photos[1]}" alt="${data.businessName}">` : `<div class="vp-about__img-ph"></div>`}
    </div>
    <div class="vp-about__text" data-animate="right">
      <p class="vp-about__label">${niche.aboutLabel}</p>
      <h2 class="vp-about__title">${data.businessName || niche.label}</h2>
      <p class="vp-about__copy">${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p class="vp-about__addr">📍 ${data.address}</p>` : ''}
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="vp-btn vp-btn-red">${niche.heroCta} →</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="vp-btn vp-btn-outline">☎ Anrufen</a>` : ''}
      </div>
    </div>
  </div>
</section>

${photos.length > 2 ? `
<section class="vp-gallery" id="gallery">
  <div class="container">
    <div data-animate="fade">
      <div class="vp-section-tag">Einblicke</div>
      <h2 class="vp-section-title">Galerie</h2>
    </div>
    <div class="vp-gallery__grid">
      ${photos.slice(2, 8).map((src, i) => `
      <div class="vp-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <img src="${src}" alt="Galerie ${i + 1}" loading="lazy">
      </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${barberBookingVars}
${buildBookingWidget(data, niche)}
${buildContactSection(data, niche)}

<footer class="vp-footer">
  <div class="container">
    <div class="vp-footer__inner">
      <div>
        <div class="vp-footer__logo">${words[0]}<span>${words.length > 1 ? words.slice(1).join(' ') : ''}</span></div>
        <p class="vp-footer__tagline">${data.tagline || niche.heroTagline}</p>
      </div>
      <div class="vp-footer__contact">
        ${data.address ? `<div>📍 ${data.address}</div>` : ''}
        ${data.phone ? `<div>☎ ${data.phone}</div>` : ''}
        ${data.email ? `<div>✉ ${data.email}</div>` : ''}
      </div>
    </div>
    <div class="vp-footer__copy">© ${new Date().getFullYear()} ${data.businessName || niche.label}</div>
  </div>
</footer>

${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('vp-nav').classList.toggle('scrolled', window.scrollY > 50);
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
</script>`;

    return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${barberHead}
</head>
<body>
${barberBody}
</body>
</html>`;
  }

  // ── STANDARD TEMPLATE C ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  .sg-hero-c { position: relative; height: 100svh; display: flex; align-items: flex-end; padding-bottom: 80px; overflow: hidden; }
  .sg-hero-c__bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .sg-hero-c__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%); }
  .sg-hero-c__content { position: relative; z-index: 2; width: 100%; }
  .sg-hero-c__tag { display: inline-block; padding: 6px 16px; border: 1px solid rgba(255,255,255,0.4); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 20px; border-radius: 2px; }
  .sg-hero-c__title { font-size: clamp(3rem, 8vw, 7rem); font-weight: 900; color: #fff; line-height: 0.9; margin-bottom: 24px; letter-spacing: -0.04em; }
  .sg-hero-c__sub { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 500px; margin-bottom: 36px; }
  .sg-services-c { background: var(--c-bg); }
  .sg-services-c__header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
  .sg-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .sg-bento__card { background: var(--c-surface); border-radius: var(--radius-lg); padding: 36px 28px; border: 1px solid var(--c-border); display: flex; flex-direction: column; gap: 12px; transition: var(--transition); position: relative; overflow: hidden; }
  .sg-bento__card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0; background: var(--c-accent); transition: height 0.4s ease; }
  .sg-bento__card:hover::before { height: 100%; }
  .sg-bento__card:hover { border-color: transparent; box-shadow: var(--shadow); }
  .sg-bento__card:first-child { grid-column: 1 / 3; background: var(--c-primary); border-color: transparent; color: #fff; }
  .sg-bento__card:first-child .sg-bento__price { color: var(--c-accent); }
  .sg-bento__name { font-family: var(--f-heading); font-size: 1.3rem; font-weight: 700; color: inherit; }
  .sg-bento__desc { font-size: 0.9rem; color: var(--c-text-muted); flex: 1; }
  .sg-bento__card:first-child .sg-bento__desc { color: rgba(255,255,255,0.65); }
  .sg-bento__price { font-size: 1.5rem; font-weight: 700; color: var(--c-accent); }
  .sg-about-c { background: var(--c-surface); }
  .sg-about-c__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .sg-about-c__mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 8px; height: 480px; }
  .sg-about-c__mosaic-item { overflow: hidden; border-radius: var(--radius); background: var(--c-border); }
  .sg-about-c__mosaic-item:first-child { grid-row: 1 / 3; }
  .sg-about-c__mosaic-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .sg-about-c__mosaic-item:hover img { transform: scale(1.05); }
  @media (max-width: 768px) {
    .sg-bento { grid-template-columns: 1fr; } .sg-bento__card:first-child { grid-column: 1; }
    .sg-about-c__inner { grid-template-columns: 1fr; } .sg-about-c__mosaic { height: 320px; }
  }
</style>`;

  const heroStyle = photos[0]
    ? `background-image: url('${photos[0]}')`
    : `background: linear-gradient(135deg, ${colors.primary} 0%, #000 100%)`;

  const body = `
${buildNav(data, niche)}
${niche.id === 'friser' ? buildServicesTicker(services, colors.accent) : ''}
<section class="sg-hero-c" id="hero">
  <div class="sg-hero-c__bg" style="${heroStyle}"></div>
  <div class="sg-hero-c__overlay"></div>
  <div class="container">
    <div class="sg-hero-c__content" data-animate="fade">
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
<section class="sg-services-c section" id="services">
  <div class="container">
    <div class="sg-services-c__header" data-animate="fade">
      <div>
        <h2 class="section-title">${niche.servicesLabel}</h2>
        <p class="section-subtitle" style="margin-bottom:0">${data.tagline || niche.heroTagline}</p>
      </div>
    </div>
    <div class="sg-bento">
      ${services.map((s, i) => `
      <div class="sg-bento__card" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-bento__name">${s.name}</div>
        <div class="sg-bento__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-bento__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>
<section class="sg-about-c section" id="about">
  <div class="container">
    <div class="sg-about-c__inner">
      <div class="sg-about-c__mosaic" data-animate="left">
        ${[0, 1, 2].map(i => `<div class="sg-about-c__mosaic-item">${photos[i] ? `<img src="${photos[i]}" alt="Galerie ${i + 1}">` : ''}</div>`).join('')}
      </div>
      <div data-animate="right">
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
${photos.length > 3 ? `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title" data-animate="fade">Galerie</h2>
    <div class="sg-gallery__grid">
      ${photos.slice(3, 9).map((src, i) => `<div class="sg-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}"><img src="${src}" alt="Galerie ${i + 4}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>` : ''}
${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${niche.id === 'friser' ? buildBookingWidget(data, niche) : ''}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
