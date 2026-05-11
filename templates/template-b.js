import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon, buildServicesTicker, buildBookingWidget } from './base-shell.js';

// Template B — Bold / High-Contrast
// Barber variant: MASKULIN — Reines Schwarz + Gold, inspiriert von house-of-fade.de
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const heroPhoto = data.photos?.[0] || '';
  const aboutPhoto = data.photos?.[1] || '';
  const galleryPhotos = data.photos?.slice(2) || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  // ─────────────────────────────────────────────────────
  // BARBER MASKULIN — Reines Schwarz + Gold
  // Schwarz #080808 · Gold #C9A55A · Weiß #f0ece4
  // Grosse Typografie, Split-Hero, schwere Nummern
  // ─────────────────────────────────────────────────────
  if (isBarber) {
    const barberHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════
     BARBER MASKULIN — Pure Black + Gold
     Schwarz #080808 · Gold #C9A55A
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:  #080808;
    --black2: #111111;
    --black3: #1c1c1c;
    --gold:   #C9A55A;
    --gold2:  #debb7a;
    --white:  #f0ece4;
    --muted:  rgba(240,236,228,0.45);
    --border: rgba(201,165,90,0.18);
    --ff-head: 'Oswald', 'Arial Narrow', sans-serif;
    --ff-body: 'Inter', system-ui, sans-serif;
  }

  body { background: var(--black); color: var(--white); font-family: var(--ff-body); font-weight: 300; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }

  /* NAV */
  .mk-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 48px;
    transition: background 0.3s, padding 0.3s;
  }
  .mk-nav.scrolled { background: rgba(8,8,8,0.96); backdrop-filter: blur(16px); padding: 18px 48px; border-bottom: 1px solid var(--border); }
  .mk-nav__logo {
    font-family: var(--ff-head); font-size: 1.5rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--white); text-decoration: none;
  }
  .mk-nav__logo span { color: var(--gold); }
  .mk-nav__links { display: flex; gap: 44px; list-style: none; }
  .mk-nav__links a {
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .mk-nav__links a:hover { color: var(--gold); }
  /* ── Termin-CTA in Nav ── */
  .mk-nav__links a[href="#buchen"] {
    background: var(--gold); color: #0a0a0a;
    padding: 8px 20px; border-radius: 2px;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    animation: navBookGlow 2.8s ease-in-out infinite;
  }
  .mk-nav__links a[href="#buchen"]:hover { opacity: 0.85; }
  @keyframes navBookGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201,165,90,0.55); }
    55%       { box-shadow: 0 0 0 8px rgba(201,165,90,0); }
  }
  @media (prefers-reduced-motion: reduce) { .mk-nav__links a[href="#buchen"] { animation: none; } }
  .mk-nav__cta {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--black); background: var(--gold); padding: 11px 28px; text-decoration: none;
    transition: background 0.2s;
  }
  .mk-nav__cta:hover { background: var(--gold2); }
  @media (max-width: 768px) { .mk-nav { padding: 18px 20px; } .mk-nav__links { display: none; } }

  /* HERO — Full-bleed, giant title bottom-left */
  .mk-hero {
    position: relative; height: 100svh; overflow: hidden;
    display: flex; align-items: flex-end;
  }
  .mk-hero__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    transform: scale(1.05); animation: mkZoom 9s ease forwards;
  }
  @keyframes mkZoom { to { transform: scale(1); } }
  .mk-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.1) 100%);
  }
  .mk-hero__no-photo {
    position: absolute; inset: 0; background: var(--black2);
  }
  .mk-hero__content {
    position: relative; z-index: 2;
    padding-bottom: 80px; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 0; align-items: flex-end;
  }
  .mk-hero__left { padding-right: 48px; }
  .mk-hero__badge {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: var(--ff-head); font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 20px;
  }
  .mk-hero__badge::before { content: ''; width: 40px; height: 1px; background: var(--gold); }
  .mk-hero__title {
    font-family: var(--ff-head);
    font-size: clamp(4rem, 8vw, 9rem);
    font-weight: 700; line-height: 0.9;
    text-transform: uppercase; letter-spacing: -0.01em;
    color: var(--white); margin-bottom: 32px;
  }
  .mk-hero__title em { font-style: normal; color: var(--gold); display: block; }
  .mk-hero__actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .mk-hero__right {
    display: flex; flex-direction: column; justify-content: flex-end;
    padding-left: 48px; border-left: 1px solid var(--border); padding-bottom: 8px;
  }
  .mk-hero__tagline {
    font-size: 1rem; color: var(--muted); line-height: 1.8; max-width: 360px; margin-bottom: 32px;
    font-style: italic;
  }
  .mk-hero__stat {
    font-family: var(--ff-head); font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 8px;
  }
  .mk-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--ff-head); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
    padding: 14px 32px; transition: all 0.22s;
  }
  .mk-btn-gold { background: var(--gold); color: var(--black); }
  .mk-btn-gold:hover { background: var(--gold2); }
  .mk-btn-outline { border: 1px solid rgba(201,165,90,0.35); color: var(--white); }
  .mk-btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  /* SERVICES — Nummerierte Reihen */
  .mk-services { background: var(--black2); padding: 100px 0; }
  .mk-services__head {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 64px; gap: 24px; flex-wrap: wrap;
  }
  .mk-section-tag {
    font-family: var(--ff-head); font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
  }
  .mk-section-tag::after { content: ''; flex: 0 0 40px; height: 1px; background: var(--gold); }
  .mk-section-title {
    font-family: var(--ff-head);
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em;
    color: var(--white); line-height: 1;
  }
  .mk-svc-list { border-top: 1px solid var(--border); }
  .mk-svc-row {
    display: grid; grid-template-columns: 72px 1fr auto;
    align-items: center; gap: 28px; padding: 26px 0;
    border-bottom: 1px solid var(--border);
    transition: padding-left 0.2s;
  }
  .mk-svc-row:hover { padding-left: 12px; }
  .mk-svc-row__num {
    font-family: var(--ff-head); font-size: 2rem; font-weight: 700;
    color: var(--gold); opacity: 0.35; line-height: 1;
  }
  .mk-svc-row__name {
    font-family: var(--ff-head); font-size: 1.2rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--white);
  }
  .mk-svc-row__desc { font-size: 0.82rem; color: var(--muted); margin-top: 5px; }
  .mk-svc-row__price {
    font-family: var(--ff-head); font-size: 1.15rem; font-weight: 600;
    color: var(--gold); white-space: nowrap;
  }

  /* ABOUT — Gold-Panel rechts */
  .mk-about { background: var(--black); }
  .mk-about__inner { display: grid; grid-template-columns: 1fr 1fr; min-height: 580px; }
  .mk-about__img { overflow: hidden; position: relative; }
  .mk-about__img img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05); }
  .mk-about__img-placeholder { width: 100%; height: 100%; background: var(--black3); }
  .mk-about__text {
    background: var(--gold); color: var(--black);
    padding: 80px 56px; display: flex; flex-direction: column; justify-content: center;
  }
  .mk-about__text h2 {
    font-family: var(--ff-head); font-size: clamp(2rem, 3vw, 3rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--black); margin-bottom: 24px; line-height: 1.05;
  }
  .mk-about__text p { font-size: 0.92rem; line-height: 1.85; opacity: 0.75; margin-bottom: 16px; }
  .mk-about__text-btn {
    margin-top: 20px; display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--ff-head); font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
    background: var(--black); color: var(--gold); padding: 13px 28px; transition: opacity 0.2s;
  }
  .mk-about__text-btn:hover { opacity: 0.85; }

  /* GALLERY */
  .mk-gallery { background: var(--black2); padding: 80px 0; }
  .mk-gallery__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 48px;
  }
  .mk-gallery__item { overflow: hidden; aspect-ratio: 4/3; }
  .mk-gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease, filter 0.4s; filter: grayscale(0.3); }
  .mk-gallery__item:hover img { transform: scale(1.07); filter: grayscale(0); }

  /* FOOTER */
  .mk-footer { background: var(--black); border-top: 1px solid var(--border); padding: 64px 0 40px; }
  .mk-footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 32px; margin-bottom: 48px; }
  .mk-footer__logo {
    font-family: var(--ff-head); font-size: 1.8rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--white);
  }
  .mk-footer__logo span { color: var(--gold); }
  .mk-footer__contact { font-size: 0.82rem; color: var(--muted); line-height: 2; }
  .mk-footer__copy { font-size: 0.72rem; color: rgba(240,236,228,0.2); border-top: 1px solid var(--border); padding-top: 24px; }

  @media (max-width: 768px) {
    .mk-hero__content { grid-template-columns: 1fr; }
    .mk-hero__right { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 32px; margin-top: 32px; }
    .mk-about__inner { grid-template-columns: 1fr; }
    .mk-about__text { padding: 56px 28px; }
    .mk-svc-row { grid-template-columns: 48px 1fr auto; gap: 16px; }
    .mk-gallery__grid { grid-template-columns: 1fr 1fr; }
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
    const barberBookingVars = `<style>
  .bk-section { --c-bg:#0d0d0d; --c-surface:#1a1a1a; --c-text:#f5f0e8; --c-accent:#C9A55A; --c-border:rgba(255,255,255,0.12); --c-text-muted:rgba(255,255,255,0.45); --f-heading:'Oswald',sans-serif; --f-body:'Inter',sans-serif; }
</style>`;

    const barberBody = `
<nav class="mk-nav" id="mk-nav">
  <a href="#hero" class="mk-nav__logo">${words[0]}<span>${words.slice(1).join(' ') || '.'}</span></a>
  <ul class="mk-nav__links">
    <li><a href="#services">Services</a></li>
    <li><a href="#about">Über uns</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="mk-nav__cta">${niche.heroCta} →</a>` : (data.phone ? `<a href="tel:${data.phone}" class="mk-nav__cta">${data.phone}</a>` : '')}
</nav>
${buildServicesTicker(services, '#C9A55A')}

<section class="mk-hero" id="hero">
  ${heroPhoto
    ? `<div class="mk-hero__bg" style="background-image:url('${heroPhoto}')"></div><div class="mk-hero__overlay"></div>`
    : `<div class="mk-hero__no-photo"></div>`}
  <div class="container">
    <div class="mk-hero__content" data-animate="fade">
      <div class="mk-hero__left">
        <div class="mk-hero__badge">${niche.label}</div>
        <h1 class="mk-hero__title">
          ${words[0]}
          ${words.length > 1 ? `<em>${words.slice(1).join(' ')}</em>` : ''}
        </h1>
        <div class="mk-hero__actions">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="mk-btn mk-btn-gold">${niche.heroCta} →</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="mk-btn mk-btn-outline">☎ ${data.phone}</a>` : ''}
        </div>
      </div>
      <div class="mk-hero__right">
        <p class="mk-hero__tagline">${data.tagline || niche.heroTagline}</p>
        <p class="mk-hero__stat">Premium · Barber Shop</p>
      </div>
    </div>
  </div>
</section>

<section class="mk-services" id="services">
  <div class="container">
    <div class="mk-services__head" data-animate="fade">
      <div>
        <p class="mk-section-tag">${niche.label}</p>
        <h2 class="mk-section-title">${niche.servicesLabel}</h2>
      </div>
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="mk-btn mk-btn-gold">${niche.heroCta} →</a>` : ''}
    </div>
    <div class="mk-svc-list">
      ${services.map((s, i) => `
      <div class="mk-svc-row" data-animate="left" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="mk-svc-row__num">0${i + 1}</div>
        <div>
          <div class="mk-svc-row__name">${s.name}</div>
          ${s.desc ? `<div class="mk-svc-row__desc">${s.desc}</div>` : ''}
        </div>
        ${s.price ? `<div class="mk-svc-row__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="mk-about" id="about">
  <div class="mk-about__inner">
    <div class="mk-about__img" data-animate="left">
      ${aboutPhoto
        ? `<img src="${aboutPhoto}" alt="${data.businessName}">`
        : `<div class="mk-about__img-placeholder"></div>`}
    </div>
    <div class="mk-about__text" data-animate="right">
      <h2>${niche.aboutLabel}</h2>
      <p>${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p>${data.address}</p>` : ''}
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="mk-about__text-btn">${niche.heroCta} →</a>` : ''}
    </div>
  </div>
</section>

${galleryPhotos.length > 0 ? `
<section class="mk-gallery" id="gallery">
  <div class="container">
    <div data-animate="fade">
      <p class="mk-section-tag">Einblicke</p>
      <h2 class="mk-section-title">Galerie</h2>
    </div>
    <div class="mk-gallery__grid">
      ${galleryPhotos.slice(0, 6).map((src, i) => `
      <div class="mk-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
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

<footer class="mk-footer">
  <div class="container">
    <div class="mk-footer__inner">
      <div class="mk-footer__logo">${words[0]}<span>${words.slice(1).join(' ') || ''}</span></div>
      <div class="mk-footer__contact">
        ${data.address ? `<div>${data.address}</div>` : ''}
        ${data.phone ? `<div>${data.phone}</div>` : ''}
        ${data.email ? `<div>${data.email}</div>` : ''}
      </div>
    </div>
    <div class="mk-footer__copy">© ${new Date().getFullYear()} ${data.businessName || niche.label} — Alle Rechte vorbehalten</div>
  </div>
</footer>

${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('mk-nav').classList.toggle('scrolled', window.scrollY > 50);
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

  // ── STANDARD TEMPLATE B ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  .sg-hero-b { min-height: 100svh; display: grid; grid-template-columns: 1fr 1fr; padding-top: 70px; }
  .sg-hero-b__left { display: flex; flex-direction: column; justify-content: center; padding: 80px 60px 80px 40px; max-width: 640px; margin-left: auto; }
  .sg-hero-b__eyebrow { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-accent); display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .sg-hero-b__eyebrow::before { content: ''; display: block; width: 40px; height: 2px; background: var(--c-accent); }
  .sg-hero-b__title { font-size: clamp(3.5rem, 6vw, 6rem); font-weight: 900; line-height: 0.95; margin-bottom: 28px; letter-spacing: -0.03em; }
  .sg-hero-b__sub { font-size: 1.1rem; color: var(--c-text-muted); max-width: 400px; margin-bottom: 44px; line-height: 1.7; }
  .sg-hero-b__right { position: relative; overflow: hidden; }
  .sg-hero-b__right img { width: 100%; height: 100%; object-fit: cover; }
  .sg-hero-b__right-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--c-primary), var(--c-accent)); }
  .sg-hero-b__badge { position: absolute; bottom: 40px; left: -24px; background: var(--c-accent); color: #000; padding: 20px 28px; border-radius: 4px; font-weight: 700; font-size: 1.1rem; box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
  .sg-services-b { background: var(--c-surface); }
  .sg-services-b__list { display: flex; flex-direction: column; }
  .sg-service-row { display: grid; grid-template-columns: 80px 1fr auto; align-items: center; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--c-border); transition: padding-left 0.2s; }
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
  .sg-about-b__text { padding: 80px 60px; display: flex; flex-direction: column; justify-content: center; background: var(--c-primary); color: #fff; }
  .sg-about-b__text .section-title { color: #fff; margin-bottom: 24px; }
  .sg-about-b__text p { color: rgba(255,255,255,0.7); line-height: 1.8; }
  @media (max-width: 768px) {
    .sg-hero-b { grid-template-columns: 1fr; } .sg-hero-b__left { padding: 40px 24px; max-width: 100%; margin: 0; }
    .sg-hero-b__right { min-height: 300px; } .sg-about-b__inner { grid-template-columns: 1fr; } .sg-about-b__text { padding: 48px 24px; }
    .sg-service-row { grid-template-columns: 40px 1fr auto; gap: 12px; } .sg-service-row__num { font-size: 1.5rem; }
  }
</style>`;

  const body = `
${buildNav(data, niche)}
${niche.id === 'friser' ? buildServicesTicker(services, colors.accent) : ''}
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
    ${heroPhoto ? `<img src="${heroPhoto}" alt="${data.businessName}">` : `<div class="sg-hero-b__right-placeholder"></div>`}
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
        <div><div class="sg-service-row__name">${s.name}</div>${s.desc ? `<div class="sg-service-row__desc">${s.desc}</div>` : ''}</div>
        ${s.price ? `<div class="sg-service-row__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>
<section class="sg-about-b" id="about">
  <div class="sg-about-b__inner">
    <div class="sg-about-b__img" data-animate="left">
      ${aboutPhoto ? `<img src="${aboutPhoto}" alt="${data.businessName}">` : `<div style="width:100%;height:100%;background:var(--c-surface)"></div>`}
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
${niche.id === 'friser' ? buildBookingWidget(data, niche) : ''}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
