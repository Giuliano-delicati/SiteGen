import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon, buildServicesTicker, buildBookingWidget } from './base-shell.js';

// Template A — Minimal / Clean
// Barber variant: ELEGANT — Hell/Creme, inspiriert von exquisitbarberlounge.com
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const heroPhoto = data.photos?.[0] || '';
  const aboutPhoto = data.photos?.[1] || data.photos?.[0] || '';
  const galleryPhotos = data.photos?.slice(2) || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  // ─────────────────────────────────────────────────────
  // BARBER ELEGANT — Helles Luxury-Design
  // Creme #f8f4ef · Schwarz #111 · Gold #b89650
  // Viel Weißraum, Serif-Typografie, Preislisten-Layout
  // ─────────────────────────────────────────────────────
  if (isBarber) {
    const barberHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════
     BARBER ELEGANT — Light Luxury
     Creme + Schwarz + Gold
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:  #f8f4ef;
    --cream2: #efe9e0;
    --ink:    #111111;
    --ink2:   #444444;
    --gold:   #b89650;
    --gold2:  #d4b06a;
    --white:  #ffffff;
    --ff-serif: 'Cormorant Garamond', Georgia, serif;
    --ff-sans:  'Jost', system-ui, sans-serif;
  }

  body { background: var(--cream); color: var(--ink); font-family: var(--ff-sans); font-weight: 300; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }

  /* NAV */
  .eg-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px;
    background: rgba(248,244,239,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s, padding 0.3s;
  }
  .eg-nav.scrolled { border-color: #e0d9d0; padding: 16px 48px; }
  .eg-nav__logo {
    font-family: var(--ff-serif); font-size: 1.4rem; font-weight: 600;
    letter-spacing: 0.08em; color: var(--ink); text-decoration: none;
  }
  .eg-nav__links { display: flex; gap: 40px; list-style: none; }
  .eg-nav__links a {
    font-size: 0.75rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--ink2); text-decoration: none;
    transition: color 0.2s;
  }
  .eg-nav__links a:hover { color: var(--gold); }
  /* ── Termin-CTA in Nav ── */
  .eg-nav__links a[href="#buchen"] {
    background: var(--gold); color: var(--ink);
    padding: 8px 20px; border-radius: 3px;
    font-family: var(--ff-sans); font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.14em; color: #000;
    animation: navBookGlow 2.8s ease-in-out infinite;
  }
  .eg-nav__links a[href="#buchen"]:hover { background: var(--gold2); }
  @keyframes navBookGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(184,150,80,0.5); }
    55%       { box-shadow: 0 0 0 8px rgba(184,150,80,0); }
  }
  @media (prefers-reduced-motion: reduce) { .eg-nav__links a[href="#buchen"] { animation: none; } }
  .eg-nav__cta {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    border: 1px solid var(--gold); padding: 10px 24px;
    transition: background 0.2s, color 0.2s;
  }
  .eg-nav__cta:hover { background: var(--gold); color: var(--white); }
  @media (max-width: 768px) {
    .eg-nav { padding: 18px 20px; }
    .eg-nav__links { display: none; }
  }

  /* HERO — full-bleed foto, text unten links */
  .eg-hero {
    position: relative; height: 100svh; overflow: hidden;
    display: flex; align-items: flex-end; padding-bottom: 80px;
  }
  .eg-hero__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    transform: scale(1.06); animation: egZoom 9s ease forwards;
  }
  @keyframes egZoom { to { transform: scale(1); } }
  .eg-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top,
      rgba(10,8,5,0.88) 0%,
      rgba(10,8,5,0.3)  45%,
      transparent       100%);
  }
  .eg-hero__no-photo {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, var(--cream2) 0%, var(--cream) 100%);
  }
  .eg-hero__content { position: relative; z-index: 2; }
  .eg-hero__rule {
    display: flex; align-items: center; gap: 20px; margin-bottom: 24px;
  }
  .eg-hero__rule::before, .eg-hero__rule::after {
    content: ''; height: 1px; background: var(--gold);
  }
  .eg-hero__rule::before { width: 56px; }
  .eg-hero__rule::after  { width: 24px; }
  .eg-hero__eyebrow {
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.35em;
    text-transform: uppercase; color: var(--gold);
  }
  .eg-hero__title {
    font-family: var(--ff-serif);
    font-size: clamp(3.5rem, 8vw, 8rem);
    font-weight: 300; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--white);
    line-height: 0.95; margin-bottom: 20px;
  }
  .eg-hero__sub {
    font-family: var(--ff-serif); font-style: italic; font-weight: 300;
    font-size: 1.2rem; color: rgba(255,255,255,0.6);
    margin-bottom: 48px; max-width: 480px;
  }
  .eg-hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .eg-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--ff-sans); font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none;
    padding: 14px 32px; transition: all 0.25s;
  }
  .eg-btn-gold  { background: var(--gold); color: var(--white); }
  .eg-btn-gold:hover { background: var(--gold2); }
  .eg-btn-ghost { border: 1px solid rgba(255,255,255,0.3); color: var(--white); }
  .eg-btn-ghost:hover { background: rgba(255,255,255,0.08); }
  .eg-btn-dark  { border: 1px solid var(--gold); color: var(--ink); }
  .eg-btn-dark:hover { background: var(--gold); color: var(--white); }

  /* SERVICES — Preisliste auf Creme */
  .eg-services { background: var(--cream); padding: 100px 0; }
  .eg-section-tag {
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.32em;
    text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
  }
  .eg-section-tag::after { content: ''; flex: 0 0 48px; height: 1px; background: var(--gold); }
  .eg-section-title {
    font-family: var(--ff-serif); font-size: clamp(2.2rem, 4vw, 3.8rem);
    font-weight: 300; letter-spacing: 0.05em;
    color: var(--ink); margin-bottom: 60px; line-height: 1.1;
  }
  .eg-pricelist { border-top: 1px solid #d9d0c5; }
  .eg-price-row {
    display: flex; align-items: baseline; gap: 12px;
    padding: 22px 0; border-bottom: 1px solid #d9d0c5;
    transition: background 0.15s;
  }
  .eg-price-row:hover { padding-left: 8px; }
  .eg-price-row__name {
    font-family: var(--ff-serif); font-size: 1.1rem; font-weight: 400;
    color: var(--ink); letter-spacing: 0.02em;
  }
  .eg-price-row__desc { font-size: 0.8rem; color: var(--ink2); margin-top: 3px; }
  .eg-price-row__dots { flex: 1; border-bottom: 1px dotted #c8bfb4; margin-bottom: 5px; }
  .eg-price-row__price {
    font-family: var(--ff-serif); font-size: 1.05rem; font-weight: 600;
    color: var(--gold); white-space: nowrap;
  }

  /* ABOUT — Hell, Foto mit Goldrahmen */
  .eg-about { background: var(--cream2); padding: 100px 0; }
  .eg-about__inner {
    display: grid; grid-template-columns: 5fr 6fr; gap: 80px; align-items: center;
  }
  .eg-about__frame {
    position: relative; aspect-ratio: 3/4;
  }
  .eg-about__frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .eg-about__frame::before {
    content: '';
    position: absolute; bottom: -24px; right: -24px;
    width: 75%; height: 75%;
    border: 1px solid var(--gold); z-index: -1;
  }
  .eg-about__label {
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.32em;
    text-transform: uppercase; color: var(--gold);
    display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
  }
  .eg-about__label::after { content: ''; flex: 0 0 48px; height: 1px; background: var(--gold); }
  .eg-about__title {
    font-family: var(--ff-serif); font-size: clamp(1.8rem, 3vw, 3rem);
    font-weight: 300; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 28px; line-height: 1.15;
  }
  .eg-about__text { font-size: 0.95rem; color: var(--ink2); line-height: 1.9; margin-bottom: 16px; }
  .eg-about__addr { font-size: 0.82rem; color: var(--ink2); margin-bottom: 36px; display: flex; align-items: center; gap: 8px; }

  /* GALLERY */
  .eg-gallery { background: var(--cream); padding: 80px 0; }
  .eg-gallery__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 48px;
  }
  .eg-gallery__item { overflow: hidden; aspect-ratio: 4/3; }
  .eg-gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .eg-gallery__item:hover img { transform: scale(1.06); }

  /* FOOTER */
  .eg-footer {
    background: var(--ink); color: var(--cream);
    padding: 64px 0 40px;
    text-align: center;
  }
  .eg-footer__logo {
    font-family: var(--ff-serif); font-size: 2rem; font-weight: 300;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px;
    color: var(--cream);
  }
  .eg-footer__line { width: 40px; height: 1px; background: var(--gold); margin: 0 auto 24px; }
  .eg-footer__text { font-size: 0.82rem; color: rgba(248,244,239,0.45); line-height: 1.8; }

  @media (max-width: 768px) {
    .eg-about__inner { grid-template-columns: 1fr; gap: 48px; }
    .eg-about__frame::before { display: none; }
    .eg-gallery__grid { grid-template-columns: 1fr 1fr; }
  }

  /* Scroll animations */
  [data-animate] { opacity: 0; transform: translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
  [data-animate="left"]  { transform: translateX(-36px); }
  [data-animate="right"] { transform: translateX(36px); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.1s; }
  [data-animate-delay="2"] { transition-delay: 0.2s; }
  [data-animate-delay="3"] { transition-delay: 0.3s; }
  [data-animate-delay="4"] { transition-delay: 0.4s; }
  [data-animate-delay="5"] { transition-delay: 0.5s; }
  @media (prefers-reduced-motion: reduce) { [data-animate] { opacity: 1; transform: none; transition: none; } }
</style>`;

    const barberBookingVars = `<style>
  .bk-section { --c-bg:#f8f4ef; --c-surface:#f0ebe3; --c-text:#111111; --c-accent:#b89650; --c-border:rgba(0,0,0,0.12); --c-text-muted:rgba(0,0,0,0.5); --f-heading:'Cormorant Garamond',serif; --f-body:'Jost',sans-serif; }
</style>`;

    const barberBody = `
<!-- NAV -->
<nav class="eg-nav" id="eg-nav">
  <a href="#hero" class="eg-nav__logo">${data.businessName || niche.label}</a>
  <ul class="eg-nav__links">
    <li><a href="#services">Preise</a></li>
    <li><a href="#about">Über uns</a></li>
    ${data.photos?.length > 2 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="eg-nav__cta">${niche.heroCta}</a>` : (data.phone ? `<a href="tel:${data.phone}" class="eg-nav__cta">${data.phone}</a>` : '')}
</nav>
${buildServicesTicker(services, '#b89650')}

<!-- HERO -->
<section class="eg-hero" id="hero">
  ${heroPhoto
    ? `<div class="eg-hero__bg" style="background-image:url('${heroPhoto}')"></div><div class="eg-hero__overlay"></div>`
    : `<div class="eg-hero__no-photo"></div>`}
  <div class="container">
    <div class="eg-hero__content" data-animate="fade">
      <div class="eg-hero__rule"><span class="eg-hero__eyebrow">${niche.label}</span></div>
      <h1 class="eg-hero__title">${data.businessName || niche.label}</h1>
      <p class="eg-hero__sub">${data.tagline || niche.heroTagline}</p>
      <div class="eg-hero__actions">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="eg-btn eg-btn-gold">${niche.heroCta} →</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="eg-btn eg-btn-ghost">☎ ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="eg-services" id="services">
  <div class="container" style="max-width:800px">
    <div data-animate="fade">
      <p class="eg-section-tag">${niche.label}</p>
      <h2 class="eg-section-title">${niche.servicesLabel}</h2>
    </div>
    <div class="eg-pricelist">
      ${services.map((s, i) => `
      <div class="eg-price-row" data-animate="fade" data-animate-delay="${Math.min(i + 1, 5)}">
        <div style="flex:1">
          <div class="eg-price-row__name">${s.name}</div>
          ${s.desc ? `<div class="eg-price-row__desc">${s.desc}</div>` : ''}
        </div>
        <div class="eg-price-row__dots"></div>
        ${s.price ? `<div class="eg-price-row__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
    ${data.bookingUrl ? `<div style="margin-top:48px" data-animate="fade"><a href="${data.bookingUrl}" target="_blank" class="eg-btn eg-btn-dark">${niche.heroCta} →</a></div>` : ''}
  </div>
</section>

<!-- ABOUT -->
<section class="eg-about" id="about">
  <div class="container">
    <div class="eg-about__inner">
      <div class="eg-about__frame" data-animate="left">
        ${aboutPhoto
          ? `<img src="${aboutPhoto}" alt="${data.businessName}">`
          : `<div style="width:100%;height:100%;background:#d9d0c5"></div>`}
      </div>
      <div data-animate="right">
        <p class="eg-about__label">${niche.aboutLabel}</p>
        <h2 class="eg-about__title">${data.businessName || niche.label}</h2>
        <p class="eg-about__text">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p class="eg-about__addr">📍 ${data.address}</p>` : ''}
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="eg-btn eg-btn-dark">${niche.heroCta} →</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="eg-btn" style="border:1px solid #c8bfb4;color:var(--ink2)">☎ Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
${galleryPhotos.length > 0 ? `
<section class="eg-gallery" id="gallery">
  <div class="container">
    <div data-animate="fade">
      <p class="eg-section-tag">Einblicke</p>
      <h2 class="eg-section-title">Galerie</h2>
    </div>
    <div class="eg-gallery__grid">
      ${galleryPhotos.slice(0, 6).map((src, i) => `
      <div class="eg-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
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

<!-- FOOTER -->
<footer class="eg-footer">
  <div class="container">
    <div class="eg-footer__logo">${data.businessName || niche.label}</div>
    <div class="eg-footer__line"></div>
    <p class="eg-footer__text">
      ${data.address || ''} ${data.phone ? `· ${data.phone}` : ''} ${data.email ? `· ${data.email}` : ''}
    </p>
    <p class="eg-footer__text" style="margin-top:32px;font-size:0.72rem;opacity:0.3">© ${new Date().getFullYear()} ${data.businessName || niche.label}</p>
  </div>
</footer>

${buildCallButton(data)}

<script>
  // Nav scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('eg-nav').classList.toggle('scrolled', window.scrollY > 40);
  });
  // Scroll animations
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
</script>`;

    // Für barber elegant: eigenes Shell ohne dark-mode (immer hell)
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

  // ── FRISER: NEW STYLE — Dark Editorial (slidercuts.com) ──
  if (niche.id === 'friser') {
    const ac = '#c8a882';
    const fsHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  /* ══ FRISÖR A — NEW STYLE · Dark Editorial ══ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg:#0a0a0a; --sur:#131313; --tx:#f0ebe3; --muted:rgba(240,235,227,0.48); --ac:${ac}; --bd:rgba(255,255,255,0.09); --fh:'Space Grotesk',sans-serif; --fb:'Inter',sans-serif; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--fb); background: var(--bg); color: var(--tx); overflow-x: hidden; line-height: 1.6; }
  img { max-width:100%; height:auto; display:block; }
  a { color:inherit; text-decoration:none; }
  .con { max-width:1200px; margin:0 auto; padding:0 32px; }
  .sec { padding:96px 0; }
  .sec-h { font-family:var(--fh); font-size:clamp(2rem,4vw,3rem); letter-spacing:-0.02em; margin-bottom:12px; }
  .sec-s { color:var(--muted); font-size:1.05rem; margin-bottom:48px; }
  /* Shared utilities for buildContactSection */
  .container { max-width:1200px; margin:0 auto; padding:0 32px; }
  .section { padding:96px 0; }
  .section-title { font-family:var(--fh); font-size:clamp(2rem,4vw,3rem); letter-spacing:-0.02em; margin-bottom:12px; color:var(--tx); }
  .section-subtitle { color:var(--muted); font-size:1.05rem; margin-bottom:48px; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:12px 28px; font-family:var(--fh); font-size:0.8rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; border:none; white-space:nowrap; transition:all 0.25s; }
  .btn-primary { background:var(--ac); color:#0a0a0a; }
  .btn-primary:hover { background:var(--tx); }
  .btn-outline { border:1px solid rgba(255,255,255,0.22); color:var(--tx); background:none; }
  .btn-outline:hover { border-color:var(--ac); color:var(--ac); }
  .sg-contact { background:var(--bg); }
  .sg-contact__inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; }
  .sg-form { display:flex; flex-direction:column; gap:14px; }
  .sg-form input,.sg-form textarea { width:100%; padding:13px 16px; background:var(--sur); border:1px solid var(--bd); color:var(--tx); font-family:var(--fb); font-size:0.95rem; }
  .sg-form input:focus,.sg-form textarea:focus { outline:none; border-color:var(--ac); }
  .sg-form textarea { resize:vertical; min-height:110px; }
  .sg-contact__info h3 { font-family:var(--fh); font-size:1.5rem; font-weight:700; margin-bottom:24px; }
  .sg-contact__item { display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; color:var(--muted); font-size:0.9rem; }
  .sg-call-btn { position:fixed; bottom:24px; right:24px; z-index:200; width:54px; height:54px; border-radius:50%; background:var(--ac); color:#000; display:flex; align-items:center; justify-content:center; font-size:1.3rem; box-shadow:0 4px 20px rgba(0,0,0,0.35); transition:transform 0.2s; }
  .sg-call-btn:hover { transform:scale(1.1); }
  /* NAV */
  .ns-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:70px; transition:background 0.4s,border-color 0.4s; border-bottom:1px solid transparent; }
  .ns-nav.scrolled { background:rgba(10,10,10,0.93); border-color:var(--bd); backdrop-filter:blur(12px); }
  .ns-nav__logo { font-family:var(--fh); font-size:1.05rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .ns-nav__links { display:flex; gap:32px; list-style:none; }
  .ns-nav__links a { font-size:0.75rem; font-weight:500; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); transition:color 0.2s; }
  .ns-nav__links a:hover { color:var(--tx); }
  .ns-nav__links a[href="#buchen"] { color:#0a0a0a; background:var(--ac); padding:7px 18px; animation:nsGl 2.8s ease-in-out infinite; }
  .ns-nav__links a[href="#buchen"]:hover { opacity:0.88; }
  @keyframes nsGl { 0%,100% { box-shadow:0 0 0 0 rgba(200,168,130,0.5); } 55% { box-shadow:0 0 0 8px rgba(200,168,130,0); } }
  @media (prefers-reduced-motion:reduce) { .ns-nav__links a[href="#buchen"] { animation:none; } }
  /* HERO */
  .ns-hero { position:relative; height:100svh; overflow:hidden; }
  .ns-hero__bg { position:absolute; inset:0; }
  .ns-hero__bg img { width:100%; height:100%; object-fit:cover; animation:nsKB 14s ease-in-out infinite alternate; }
  @keyframes nsKB { from { transform:scale(1); } to { transform:scale(1.07); } }
  @media (prefers-reduced-motion:reduce) { .ns-hero__bg img { animation:none; } }
  .ns-hero__ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,10,10,0.9) 0%,rgba(10,10,10,0.12) 55%); }
  .ns-hero__cnt { position:absolute; bottom:64px; left:40px; right:40px; }
  .ns-hero__eye { font-size:0.7rem; font-weight:600; letter-spacing:0.3em; text-transform:uppercase; color:var(--ac); margin-bottom:16px; display:flex; align-items:center; gap:14px; }
  .ns-hero__eye::before { content:''; width:36px; height:1px; background:var(--ac); }
  .ns-hero__title { font-family:var(--fh); font-size:clamp(3rem,7.5vw,8rem); font-weight:700; line-height:0.92; letter-spacing:-0.04em; max-width:820px; margin-bottom:28px; }
  .ns-hero__sub { font-size:1.1rem; color:var(--muted); max-width:440px; margin-bottom:40px; }
  .ns-hero__btns { display:flex; gap:14px; flex-wrap:wrap; }
  /* SERVICES */
  .ns-svc-list { border-top:1px solid var(--bd); }
  .ns-svc-row { display:grid; grid-template-columns:52px 1fr auto; align-items:center; gap:20px; padding:22px 0; border-bottom:1px solid var(--bd); transition:padding-left 0.25s,background 0.2s; }
  .ns-svc-row:hover { padding-left:12px; }
  .ns-svc-row:hover .ns-num { color:var(--ac); }
  .ns-num { font-family:var(--fh); font-size:0.7rem; font-weight:700; color:var(--muted); letter-spacing:0.1em; transition:color 0.25s; }
  .ns-svc-name { font-family:var(--fh); font-size:1.2rem; font-weight:600; }
  .ns-svc-desc { font-size:0.82rem; color:var(--muted); margin-top:3px; }
  .ns-svc-price { font-family:var(--fh); font-size:1.1rem; font-weight:700; color:var(--ac); white-space:nowrap; }
  /* ABOUT */
  .ns-about { display:grid; grid-template-columns:1fr 1fr; min-height:600px; }
  .ns-about__img { overflow:hidden; }
  .ns-about__img img { width:100%; height:100%; object-fit:cover; transition:transform 0.8s ease; }
  .ns-about:hover .ns-about__img img { transform:scale(1.04); }
  .ns-about__txt { background:var(--sur); padding:80px 64px; display:flex; flex-direction:column; justify-content:center; }
  .ns-about__tag { font-size:0.68rem; font-weight:700; letter-spacing:0.26em; text-transform:uppercase; color:var(--ac); margin-bottom:18px; }
  .ns-about__h { font-family:var(--fh); font-size:clamp(2rem,3vw,3rem); font-weight:700; letter-spacing:-0.02em; margin-bottom:20px; }
  .ns-about__p { color:var(--muted); line-height:1.8; margin-bottom:32px; }
  /* GALLERY */
  .ns-gal { display:grid; grid-template-columns:repeat(4,1fr); height:440px; }
  .ns-gal__item { overflow:hidden; }
  .ns-gal__item:first-child { grid-column:1/3; }
  .ns-gal__item img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s ease,filter 0.5s; filter:brightness(0.78); }
  .ns-gal__item:hover img { transform:scale(1.06); filter:brightness(1); }
  /* FOOTER */
  .ns-ft { padding:60px 0; border-top:1px solid var(--bd); text-align:center; }
  .ns-ft__nm { font-family:var(--fh); font-size:1.6rem; font-weight:700; letter-spacing:0.06em; margin-bottom:12px; }
  .ns-ft__info { font-size:0.82rem; color:var(--muted); line-height:2.2; }
  /* BOOKING SCOPING */
  .bk-section { --c-bg:#0a0a0a; --c-surface:#181818; --c-text:#f0ebe3; --c-accent:${ac}; --c-border:rgba(255,255,255,0.1); --c-text-muted:rgba(240,235,227,0.45); --f-heading:'Space Grotesk',sans-serif; --f-body:'Inter',sans-serif; }
  /* ANIMATIONS */
  [data-animate] { opacity:0; transform:translateY(28px); transition:opacity 0.7s ease,transform 0.7s ease; }
  [data-animate="left"] { transform:translateX(-36px); }
  [data-animate="right"] { transform:translateX(36px); }
  [data-animate].visible { opacity:1; transform:none; }
  [data-animate-delay="1"] { transition-delay:0.1s; } [data-animate-delay="2"] { transition-delay:0.2s; }
  [data-animate-delay="3"] { transition-delay:0.3s; } [data-animate-delay="4"] { transition-delay:0.4s; }
  [data-animate-delay="5"] { transition-delay:0.5s; }
  @media (prefers-reduced-motion:reduce) { [data-animate] { opacity:1; transform:none; transition:none; } }
  @media (max-width:768px) {
    .ns-nav__links { display:none; } .ns-hero__cnt { left:20px; right:20px; bottom:40px; }
    .ns-about { grid-template-columns:1fr; } .ns-about__img { min-height:300px; } .ns-about__txt { padding:48px 24px; }
    .ns-gal { grid-template-columns:1fr 1fr; height:auto; } .ns-gal__item:first-child { grid-column:1/3; }
    .sg-contact__inner { grid-template-columns:1fr; gap:40px; }
  }
</style>`;

    const fsBody = `
<nav class="ns-nav" id="ns-nav">
  <a href="#" class="ns-nav__logo">${data.businessName || niche.label}</a>
  <ul class="ns-nav__links">
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#about">Über uns</a></li>
    ${(data.photos?.length || 0) > 2 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>
${buildServicesTicker(services, ac)}

<section class="ns-hero" id="hero">
  <div class="ns-hero__bg">${heroPhoto ? `<img src="${heroPhoto}" alt="${data.businessName || niche.label}">` : `<div style="width:100%;height:100%;background:#111"></div>`}</div>
  <div class="ns-hero__ov"></div>
  <div class="ns-hero__cnt" data-animate>
    <p class="ns-hero__eye">${niche.label}</p>
    <h1 class="ns-hero__title">${data.businessName || niche.label}</h1>
    <p class="ns-hero__sub">${data.tagline || niche.heroTagline}</p>
    <div class="ns-hero__btns">
      <a href="#buchen" class="btn btn-primary">${niche.heroCta} →</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ ${data.phone}</a>` : ''}
    </div>
  </div>
</section>

<section class="ns-services sec" id="services">
  <div class="con">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:56px;gap:24px;flex-wrap:wrap">
      <h2 class="sec-h" data-animate style="margin-bottom:0">${niche.servicesLabel}</h2>
      <a href="#buchen" class="btn btn-outline" data-animate data-animate-delay="1" style="flex-shrink:0">${niche.heroCta} →</a>
    </div>
    <div class="ns-svc-list">
      ${services.map((s, i) => `
      <div class="ns-svc-row" data-animate data-animate-delay="${Math.min(i+1,5)}">
        <div class="ns-num">0${i+1}</div>
        <div><div class="ns-svc-name">${s.name}</div>${s.desc ? `<div class="ns-svc-desc">${s.desc}</div>` : ''}</div>
        ${s.price ? `<div class="ns-svc-price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<div class="ns-about" id="about">
  <div class="ns-about__img">
    ${aboutPhoto ? `<img src="${aboutPhoto}" alt="${data.businessName || niche.label}">` : `<div style="width:100%;height:100%;background:var(--sur)"></div>`}
  </div>
  <div class="ns-about__txt" data-animate="right">
    <p class="ns-about__tag">${niche.aboutLabel}</p>
    <h2 class="ns-about__h">${data.businessName || niche.label}</h2>
    <p class="ns-about__p">${data.about || niche.aboutDefault}</p>
    ${data.address ? `<p style="font-size:0.85rem;color:var(--muted);margin-bottom:28px">📍 ${data.address}</p>` : ''}
    <div style="display:flex;gap:14px;flex-wrap:wrap">
      <a href="#buchen" class="btn btn-primary">${niche.heroCta} →</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ Anrufen</a>` : ''}
    </div>
  </div>
</div>

${galleryPhotos.length > 0 ? `
<section id="gallery">
  <div class="ns-gal">
    ${[heroPhoto,...galleryPhotos].filter(Boolean).slice(0,4).map((src,i) => `
    <div class="ns-gal__item"><img src="${src}" alt="Galerie ${i+1}" loading="lazy"></div>`).join('')}
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildBookingWidget(data, niche)}
${buildContactSection(data, niche)}

<footer class="ns-ft">
  <div class="con">
    <div class="ns-ft__nm">${data.businessName || niche.label}</div>
    <p class="ns-ft__info">
      ${data.address || ''}${data.phone ? `<br><a href="tel:${data.phone}" style="color:inherit">${data.phone}</a>` : ''}${data.email ? ` · <a href="mailto:${data.email}" style="color:inherit">${data.email}</a>` : ''}
    </p>
    <p style="margin-top:20px;font-size:0.7rem;color:rgba(240,235,227,0.15)">© ${new Date().getFullYear()} ${data.businessName || niche.label}</p>
  </div>
</footer>
${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('ns-nav').classList.toggle('scrolled', window.scrollY > 50);
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
</script>`;

    return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${fsHead}
</head>
<body>
${fsBody}
</body>
</html>`;
  }

  // ── STANDARD TEMPLATE A (Beauty & weitere Nischen) ──
  const heroStyle = heroPhoto
    ? `background-image: url('${heroPhoto}')`
    : `background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent}44 100%)`;

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">`;

  const body = `
${buildNav(data, niche)}
${niche.id === 'friser' ? buildServicesTicker(services, colors.accent) : ''}

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

<section class="sg-services section" id="services">
  <div class="container">
    <h2 class="section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">${niche.hasPricelist ? 'Unsere Preisliste' : 'Was wir für Sie tun'}</p>
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
${niche.id === 'friser' ? buildBookingWidget(data, niche) : ''}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
