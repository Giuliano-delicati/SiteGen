import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon, buildServicesTicker, buildBookingWidget } from './base-shell.js';

// Template D — Warm / Organic
// Barber variant: OLDSCHOOL — Espresso-Braun + Messing, inspiriert von beardy-boys.de
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  // ─────────────────────────────────────────────────────
  // BARBER OLDSCHOOL — Espresso + Messing
  // Braun #1a0f08 · Messing #c48b2a · Creme #f0e6d3
  // Vintage Typografie, Ornamente, Abzeichen
  // ─────────────────────────────────────────────────────
  if (isBarber) {
    const barberHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cardo:ital,wght@0,400;0,700;1,400&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════
     BARBER OLDSCHOOL — Espresso + Messing
     Braun #1a0f08 · Messing #c48b2a · Creme #f0e6d3
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --espresso: #1a0f08;
    --brown:    #261508;
    --brown2:   #321b0a;
    --brass:    #c48b2a;
    --brass2:   #daa94a;
    --cream:    #f0e6d3;
    --cream2:   #e6d9c4;
    --muted:    rgba(240,230,211,0.5);
    --border:   rgba(196,139,42,0.2);
    --ff-display: 'Playfair Display', Georgia, serif;
    --ff-serif:   'Cardo', Georgia, serif;
    --ff-body:    'EB Garamond', Georgia, serif;
  }

  body { background: var(--espresso); color: var(--cream); font-family: var(--ff-body); font-size: 1rem; }
  .container { max-width: 1160px; margin: 0 auto; padding: 0 48px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }

  /* NAV */
  .os-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px; transition: background 0.3s, padding 0.3s;
  }
  .os-nav.scrolled { background: rgba(26,15,8,0.97); backdrop-filter: blur(12px); padding: 16px 48px; border-bottom: 1px solid var(--border); }
  .os-nav__logo {
    display: flex; flex-direction: column; align-items: center; gap: 2px; text-decoration: none;
  }
  .os-nav__logo-main {
    font-family: var(--ff-display); font-size: 1.3rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream); line-height: 1;
  }
  .os-nav__logo-sub {
    font-size: 0.6rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--brass); font-family: var(--ff-body);
  }
  .os-nav__links { display: flex; gap: 40px; list-style: none; }
  .os-nav__links a { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; font-family: var(--ff-body); }
  .os-nav__links a:hover { color: var(--brass); }
  /* ── Termin-CTA in Nav ── */
  .os-nav__links a[href="#buchen"] {
    background: var(--brass); color: var(--dark);
    padding: 8px 20px; border-radius: 2px;
    font-family: var(--ff-body); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
    animation: navBookGlow 2.8s ease-in-out infinite;
  }
  .os-nav__links a[href="#buchen"]:hover { opacity: 0.88; }
  @keyframes navBookGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(196,139,42,0.55); }
    55%       { box-shadow: 0 0 0 8px rgba(196,139,42,0); }
  }
  @media (prefers-reduced-motion: reduce) { .os-nav__links a[href="#buchen"] { animation: none; } }
  .os-nav__cta {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    border: 1px solid var(--brass); color: var(--brass); padding: 10px 24px; text-decoration: none;
    font-family: var(--ff-body); transition: all 0.22s;
  }
  .os-nav__cta:hover { background: var(--brass); color: var(--espresso); }
  @media (max-width: 768px) { .os-nav { padding: 18px 20px; } .os-nav__links { display: none; } }

  /* HERO — Zentriert, Vintage Badge, Sepia-Foto */
  .os-hero {
    position: relative; min-height: 100svh; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 120px 24px 80px;
  }
  .os-hero__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center;
    filter: sepia(0.45) brightness(0.32) contrast(1.1);
    transform: scale(1.05); animation: osZoom 10s ease forwards;
  }
  @keyframes osZoom { to { transform: scale(1); filter: sepia(0.55) brightness(0.28) contrast(1.1); } }
  .os-hero__no-photo { position: absolute; inset: 0; background: var(--brown); }
  /* Grain texture */
  .os-hero__grain {
    position: absolute; inset: 0; opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 100px; pointer-events: none;
  }
  .os-hero__content { position: relative; z-index: 2; }
  /* Ornamental Badge */
  .os-badge {
    display: inline-flex; flex-direction: column; align-items: center; gap: 6px;
    border: 1px solid var(--brass); padding: 14px 36px; margin-bottom: 32px;
    position: relative;
  }
  .os-badge::before, .os-badge::after {
    content: '◆'; position: absolute; font-size: 0.6rem; color: var(--brass);
    top: 50%; transform: translateY(-50%);
  }
  .os-badge::before { left: -10px; } .os-badge::after { right: -10px; }
  .os-badge__top { font-size: 0.6rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--brass); }
  .os-badge__name { font-family: var(--ff-display); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--cream); }
  .os-badge__line { width: 100%; height: 1px; background: var(--border); }
  .os-badge__year { font-size: 0.6rem; letter-spacing: 0.3em; color: var(--muted); }
  .os-hero__title {
    font-family: var(--ff-display); font-weight: 900;
    font-size: clamp(3.5rem, 8vw, 8.5rem);
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--cream); line-height: 0.92; margin-bottom: 8px;
  }
  .os-hero__subtitle {
    font-family: var(--ff-display); font-style: italic; font-weight: 400;
    font-size: clamp(1rem, 2vw, 1.6rem); color: var(--brass);
    letter-spacing: 0.12em; margin-bottom: 28px;
  }
  .os-hero__rule {
    display: flex; align-items: center; gap: 16px; justify-content: center;
    margin-bottom: 32px; color: var(--brass); font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
  }
  .os-hero__rule::before, .os-hero__rule::after { content: ''; flex: 0 0 60px; height: 1px; background: var(--brass); opacity: 0.4; }
  .os-hero__tagline { font-size: 1rem; color: var(--muted); line-height: 1.8; max-width: 480px; margin: 0 auto 48px; font-style: italic; }
  .os-btn {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--ff-body); font-size: 0.72rem;
    letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none;
    padding: 14px 36px; transition: all 0.22s;
  }
  .os-btn-brass { background: var(--brass); color: var(--espresso); }
  .os-btn-brass:hover { background: var(--brass2); }
  .os-btn-ghost { border: 1px solid rgba(196,139,42,0.35); color: var(--cream); }
  .os-btn-ghost:hover { border-color: var(--brass); color: var(--brass); }
  .os-hero__scroll {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    color: rgba(240,230,211,0.25); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
  }
  .os-hero__scroll::after { content: ''; width: 1px; height: 36px; background: currentColor; display: block; }

  /* SERVICES — Vintage Preistafeln */
  .os-services { background: var(--brown); padding: 100px 0; }
  .os-ornament {
    display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
    font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--brass);
  }
  .os-ornament::before, .os-ornament::after { content: ''; flex: 1; height: 1px; background: var(--brass); opacity: 0.3; }
  .os-section-title {
    font-family: var(--ff-display); font-size: clamp(2.2rem, 4vw, 4rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--cream); text-align: center; line-height: 1.05; margin-bottom: 60px;
  }
  .os-price-board {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }
  .os-price-item {
    background: var(--brown); padding: 28px 32px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
    transition: background 0.2s;
  }
  .os-price-item:hover { background: var(--brown2); }
  .os-price-item__name {
    font-family: var(--ff-display); font-size: 1.05rem; font-weight: 700;
    color: var(--cream); letter-spacing: 0.02em; margin-bottom: 5px;
  }
  .os-price-item__desc { font-size: 0.82rem; color: var(--muted); font-style: italic; }
  .os-price-item__price {
    font-family: var(--ff-display); font-size: 1.1rem; font-weight: 700;
    color: var(--brass); white-space: nowrap; flex-shrink: 0;
  }

  /* ABOUT — Sepia-Foto + Textur-Panel */
  .os-about { background: var(--espresso); }
  .os-about__inner { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
  .os-about__img { overflow: hidden; }
  .os-about__img img { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.3) contrast(1.05); }
  .os-about__img-ph { width: 100%; height: 100%; background: var(--brown2); }
  .os-about__text {
    background: var(--brown); padding: 80px 56px;
    display: flex; flex-direction: column; justify-content: center;
    border-left: 2px solid var(--border);
  }
  .os-about__label {
    font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--brass);
    display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
  }
  .os-about__label::after { content: ''; flex: 0 0 40px; height: 1px; background: var(--brass); opacity: 0.5; }
  .os-about__title {
    font-family: var(--ff-display); font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--cream); margin-bottom: 24px; line-height: 1.1;
  }
  .os-about__copy { font-size: 0.95rem; color: var(--muted); line-height: 1.9; font-style: italic; margin-bottom: 14px; }
  .os-about__addr { font-size: 0.8rem; color: rgba(240,230,211,0.3); margin-bottom: 36px; }

  /* GALLERY */
  .os-gallery { background: var(--brown); padding: 80px 0; }
  .os-gallery__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-top: 48px; }
  .os-gallery__item { overflow: hidden; aspect-ratio: 4/3; }
  .os-gallery__item img { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.2); transition: transform 0.6s ease, filter 0.4s; }
  .os-gallery__item:hover img { transform: scale(1.06); filter: sepia(0); }

  /* FOOTER */
  .os-footer { background: #100906; border-top: 1px solid var(--border); padding: 72px 0 40px; text-align: center; }
  .os-footer__rule { display: flex; align-items: center; gap: 20px; justify-content: center; margin-bottom: 24px; }
  .os-footer__rule::before, .os-footer__rule::after { content: ''; flex: 0 0 80px; height: 1px; background: var(--brass); opacity: 0.3; }
  .os-footer__rule-diamond { color: var(--brass); font-size: 0.7rem; opacity: 0.6; }
  .os-footer__logo { font-family: var(--ff-display); font-size: 2.2rem; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cream); margin-bottom: 8px; }
  .os-footer__sub { font-family: var(--ff-display); font-style: italic; font-size: 1rem; color: var(--brass); letter-spacing: 0.12em; margin-bottom: 28px; }
  .os-footer__contact { font-size: 0.82rem; color: var(--muted); line-height: 2; }
  .os-footer__copy { margin-top: 48px; font-size: 0.7rem; color: rgba(240,230,211,0.18); }

  @media (max-width: 768px) {
    .os-price-board { grid-template-columns: 1fr; }
    .os-about__inner { grid-template-columns: 1fr; }
    .os-about__text { padding: 56px 28px; border-left: none; border-top: 1px solid var(--border); }
    .os-gallery__grid { grid-template-columns: 1fr 1fr; }
  }

  [data-animate] { opacity: 0; transform: translateY(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
  [data-animate="left"]  { transform: translateX(-40px); }
  [data-animate="right"] { transform: translateX(40px); }
  [data-animate="scale"] { transform: scale(0.93); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.12s; } [data-animate-delay="2"] { transition-delay: 0.24s; }
  [data-animate-delay="3"] { transition-delay: 0.36s; } [data-animate-delay="4"] { transition-delay: 0.48s; }
  [data-animate-delay="5"] { transition-delay: 0.6s; }
  @media (prefers-reduced-motion: reduce) { [data-animate] { opacity: 1; transform: none; transition: none; } }
</style>`;

    const barberBookingVars = `<style>
  .bk-section { --c-bg:#1a0f08; --c-surface:#221409; --c-text:#f0e6d3; --c-accent:#c48b2a; --c-border:rgba(255,255,255,0.1); --c-text-muted:rgba(240,230,211,0.45); --f-heading:'Playfair Display',serif; --f-body:'Cardo',serif; }
</style>`;

    const barberBody = `
<nav class="os-nav" id="os-nav">
  <a href="#hero" class="os-nav__logo">
    <span class="os-nav__logo-main">${data.businessName || niche.label}</span>
    <span class="os-nav__logo-sub">Barber Shop</span>
  </a>
  <ul class="os-nav__links">
    <li><a href="#services">Preise</a></li>
    <li><a href="#about">Über uns</a></li>
    ${photos.length > 2 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="os-nav__cta">${niche.heroCta}</a>` : (data.phone ? `<a href="tel:${data.phone}" class="os-nav__cta">${data.phone}</a>` : '')}
</nav>
${buildServicesTicker(services, '#c48b2a')}

<section class="os-hero" id="hero">
  ${photos[0] ? `<div class="os-hero__bg" style="background-image:url('${photos[0]}')"></div>` : `<div class="os-hero__no-photo"></div>`}
  <div class="os-hero__grain"></div>
  <div class="container" data-animate="fade">
    <div class="os-hero__content">
      <div class="os-badge">
        <span class="os-badge__top">Est. ${new Date().getFullYear()}</span>
        <span class="os-badge__name">${niche.label}</span>
        <div class="os-badge__line"></div>
        <span class="os-badge__year">Premium · Craftsmanship</span>
      </div>
      <h1 class="os-hero__title">${(data.businessName || niche.label).toUpperCase()}</h1>
      <p class="os-hero__subtitle">Barber Shop</p>
      <div class="os-hero__rule">Tradition seit ${new Date().getFullYear()}</div>
      <p class="os-hero__tagline">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="os-btn os-btn-brass">${niche.heroCta} →</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="os-btn os-btn-ghost">☎ ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
  <div class="os-hero__scroll">Scroll</div>
</section>

<section class="os-services" id="services">
  <div class="container">
    <div data-animate="fade">
      <div class="os-ornament">${niche.label}</div>
      <h2 class="os-section-title">${niche.servicesLabel}</h2>
    </div>
    <div class="os-price-board">
      ${services.map((s, i) => `
      <div class="os-price-item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div>
          <div class="os-price-item__name">${s.name}</div>
          ${s.desc ? `<div class="os-price-item__desc">${s.desc}</div>` : ''}
        </div>
        ${s.price ? `<div class="os-price-item__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
    ${data.bookingUrl ? `<div style="margin-top:48px;text-align:center" data-animate="fade"><a href="${data.bookingUrl}" target="_blank" class="os-btn os-btn-brass">${niche.heroCta} →</a></div>` : ''}
  </div>
</section>

<section class="os-about" id="about">
  <div class="os-about__inner">
    <div class="os-about__img" data-animate="left">
      ${photos[1] ? `<img src="${photos[1]}" alt="${data.businessName}">` : `<div class="os-about__img-ph"></div>`}
    </div>
    <div class="os-about__text" data-animate="right">
      <p class="os-about__label">${niche.aboutLabel}</p>
      <h2 class="os-about__title">${data.businessName || niche.label}</h2>
      <p class="os-about__copy">${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p class="os-about__addr">📍 ${data.address}</p>` : ''}
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="os-btn os-btn-brass">${niche.heroCta} →</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="os-btn os-btn-ghost">☎ Anrufen</a>` : ''}
      </div>
    </div>
  </div>
</section>

${photos.length > 2 ? `
<section class="os-gallery" id="gallery">
  <div class="container">
    <div data-animate="fade">
      <div class="os-ornament">Einblicke</div>
      <h2 class="os-section-title">Galerie</h2>
    </div>
    <div class="os-gallery__grid">
      ${photos.slice(2, 8).map((src, i) => `
      <div class="os-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
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

<footer class="os-footer">
  <div class="container">
    <div class="os-footer__rule"><span class="os-footer__rule-diamond">◆</span></div>
    <div class="os-footer__logo">${data.businessName || niche.label}</div>
    <div class="os-footer__sub">Barber Shop · Est. ${new Date().getFullYear()}</div>
    <div class="os-footer__contact">
      ${data.address ? `<div>${data.address}</div>` : ''}
      ${data.phone ? `<div>${data.phone}</div>` : ''}
      ${data.email ? `<div>${data.email}</div>` : ''}
    </div>
    <div class="os-footer__copy">© ${new Date().getFullYear()} ${data.businessName || niche.label} · Alle Rechte vorbehalten</div>
  </div>
</footer>

${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('os-nav').classList.toggle('scrolled', window.scrollY > 50);
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

  // ── FRISÖR EXTRAVAGANT — Luxury Editorial ──
  // Near-White #f9f7f4 · Champagner Gold #c9a07a · Cormorant Garamond + Raleway
  // Inspiriert von: louiseandfred.com — extreme Whitespace, haute coiffure
  if (niche.id === 'friser') {
    const ac = '#c9a07a';
    const heroPhoto  = photos[0] || '';
    const aboutPhoto = photos[1] || '';
    const galleryPhotos = photos.slice(2, 8);

    const friserHead = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════
     FRISÖR EXTRAVAGANT — Luxury Editorial
     Near-White #f9f7f4 · Champagner #c9a07a
  ═══════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:     #f9f7f4;
    --bg2:    #f0ece6;
    --sur:    #ffffff;
    --tx:     #1c1710;
    --muted:  rgba(28,23,16,0.45);
    --ac:     #c9a07a;
    --ac2:    #dbb990;
    --border: rgba(28,23,16,0.1);
    --ff-dis: 'Cormorant Garamond', Georgia, serif;
    --ff-san: 'Raleway', system-ui, sans-serif;
  }

  body { background: var(--bg); color: var(--tx); font-family: var(--ff-san); font-weight: 300; -webkit-font-smoothing: antialiased; }
  .ex-container { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 1024px) { .ex-container { padding: 0 32px; } }
  @media (max-width: 768px) { .ex-container { padding: 0 20px; } }

  /* NAV — Ultra-minimal */
  .ex-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 32px 64px; transition: background 0.5s, padding 0.5s;
  }
  .ex-nav.scrolled {
    background: rgba(249,247,244,0.95); backdrop-filter: blur(20px);
    padding: 18px 64px; border-bottom: 1px solid var(--border);
  }
  .ex-nav__logo {
    font-family: var(--ff-dis); font-size: 1.5rem; font-weight: 400;
    letter-spacing: 0.08em; color: var(--tx); text-decoration: none;
    line-height: 1;
  }
  .ex-nav__logo span { font-style: italic; }
  .ex-nav__links { display: flex; gap: 40px; list-style: none; }
  .ex-nav__links a {
    font-family: var(--ff-san); font-size: 0.64rem; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted);
    text-decoration: none; transition: color 0.25s;
  }
  .ex-nav__links a:hover { color: var(--tx); }
  .ex-nav__links a[href="#buchen"] {
    color: var(--ac); border-bottom: 1px solid currentColor;
    padding-bottom: 2px; letter-spacing: 0.18em;
    animation: exBookPulse 3s ease-in-out infinite;
  }
  .ex-nav__links a[href="#buchen"]:hover { color: var(--ac2); border-color: var(--ac2); }
  @keyframes exBookPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.6; }
  }
  @media (prefers-reduced-motion: reduce) { .ex-nav__links a[href="#buchen"] { animation: none; } }
  @media (max-width: 768px) { .ex-nav { padding: 20px 20px; } .ex-nav__links { display: none; } }

  /* HERO — Extreme whitespace, huge italic type */
  .ex-hero {
    min-height: 100svh; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: flex-end;
    padding: 0 0 80px; position: relative; overflow: hidden;
  }
  .ex-hero__bg {
    position: absolute; inset: 0; background-size: cover; background-position: center 30%;
    filter: grayscale(20%) brightness(0.92);
    transform: scale(1.04); animation: exKB 12s ease forwards;
  }
  @keyframes exKB { to { transform: scale(1); } }
  .ex-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(249,247,244,0.78) 0%, rgba(249,247,244,0.28) 55%, transparent 100%);
  }
  .ex-hero__no-photo {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--bg2) 0%, var(--bg) 100%);
  }
  .ex-hero__content { position: relative; z-index: 2; max-width: 800px; padding: 0 64px; }
  .ex-hero__kicker {
    font-family: var(--ff-san); font-size: 0.6rem; font-weight: 500;
    letter-spacing: 0.42em; text-transform: uppercase; color: var(--ac);
    margin-bottom: 28px; display: block;
  }
  .ex-hero__title {
    font-family: var(--ff-dis); font-size: clamp(4rem, 9vw, 10rem);
    font-weight: 300; font-style: italic; color: var(--tx);
    line-height: 0.9; letter-spacing: -0.01em; margin-bottom: 32px;
  }
  .ex-hero__title strong { font-weight: 500; font-style: normal; display: block; font-size: 0.52em; letter-spacing: 0.14em; text-transform: uppercase; }
  .ex-hero__sub {
    font-family: var(--ff-san); font-size: 0.88rem; font-weight: 300;
    color: rgba(28,23,16,0.6); max-width: 380px; line-height: 1.8; margin-bottom: 48px;
  }
  .ex-btn {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: var(--ff-san); font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.28em; text-transform: uppercase; text-decoration: none;
    transition: all 0.3s;
  }
  .ex-btn-line {
    padding: 14px 36px; border: 1px solid var(--tx); color: var(--tx);
  }
  .ex-btn-line:hover { background: var(--tx); color: var(--bg); }
  .ex-btn-gold {
    padding: 14px 36px; background: var(--ac); color: #fff; border: 1px solid var(--ac);
  }
  .ex-btn-gold:hover { background: var(--ac2); border-color: var(--ac2); }
  .ex-btn-ghost { color: var(--muted); border-bottom: 1px solid currentColor; padding-bottom: 2px; }
  .ex-btn-ghost:hover { color: var(--tx); }
  @media (max-width: 768px) { .ex-hero__content { padding: 0 20px; } }

  /* SERVICES — Luxury editorial list */
  .ex-services { background: var(--bg); padding: 140px 0; }
  .ex-eyebrow {
    font-family: var(--ff-san); font-size: 0.6rem; font-weight: 500;
    letter-spacing: 0.35em; text-transform: uppercase; color: var(--ac); margin-bottom: 20px;
  }
  .ex-section-title {
    font-family: var(--ff-dis); font-size: clamp(2.8rem, 5vw, 5.5rem);
    font-weight: 300; font-style: italic; color: var(--tx);
    line-height: 1; margin-bottom: 80px;
  }
  .ex-services__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .ex-svc-item {
    padding: 32px 0; border-top: 1px solid var(--border);
    display: flex; align-items: baseline; justify-content: space-between; gap: 24px;
    position: relative; transition: padding-left 0.25s;
    cursor: default;
  }
  .ex-svc-item:hover { padding-left: 10px; }
  .ex-svc-item::after {
    content: ''; position: absolute; bottom: -1px; left: 0; width: 0; height: 1px;
    background: var(--ac); transition: width 0.4s ease;
  }
  .ex-svc-item:hover::after { width: 100%; }
  .ex-svc-col { display: flex; gap: 40px; align-items: baseline; flex: 1; }
  .ex-svc-num {
    font-family: var(--ff-dis); font-size: 0.8rem; color: var(--ac);
    font-style: italic; min-width: 24px;
  }
  .ex-svc-info { flex: 1; }
  .ex-svc-name {
    font-family: var(--ff-dis); font-size: 1.35rem; font-weight: 400;
    color: var(--tx); margin-bottom: 4px;
  }
  .ex-svc-desc { font-size: 0.78rem; color: var(--muted); font-style: italic; }
  .ex-svc-price {
    font-family: var(--ff-san); font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.08em; color: var(--ac); white-space: nowrap;
  }
  .ex-services__cta { margin-top: 72px; display: flex; justify-content: center; }
  @media (max-width: 768px) { .ex-services__inner { grid-template-columns: 1fr; } }

  /* ABOUT — Asymmetric split */
  .ex-about { background: var(--bg2); padding: 140px 0; }
  .ex-about__inner { display: grid; grid-template-columns: 5fr 4fr; gap: 100px; align-items: center; }
  .ex-about__img { position: relative; }
  .ex-about__photo {
    width: 100%; aspect-ratio: 3/4; object-fit: cover;
    filter: grayscale(30%); transition: filter 0.8s ease;
  }
  .ex-about__img:hover .ex-about__photo { filter: grayscale(0%); }
  .ex-about__img-label {
    position: absolute; bottom: -12px; left: 32px;
    font-family: var(--ff-dis); font-size: 0.75rem; font-style: italic;
    color: var(--ac); letter-spacing: 0.12em;
    writing-mode: horizontal-tb;
  }
  .ex-about__text { }
  .ex-about__num {
    font-family: var(--ff-dis); font-size: 8rem; font-weight: 300; font-style: italic;
    color: var(--border); line-height: 1; margin-bottom: -20px;
    user-select: none; pointer-events: none;
  }
  .ex-about__body-title {
    font-family: var(--ff-dis); font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 400; font-style: italic; color: var(--tx); line-height: 1.2; margin-bottom: 28px;
  }
  .ex-about__copy { font-size: 0.88rem; font-weight: 300; color: rgba(28,23,16,0.65); line-height: 1.95; margin-bottom: 14px; }
  .ex-about__addr { font-size: 0.78rem; color: var(--muted); margin-bottom: 36px; }
  @media (max-width: 768px) {
    .ex-about__inner { grid-template-columns: 1fr; gap: 48px; }
    .ex-about__num { font-size: 5rem; }
  }

  /* GALLERY — Staggered masonry-like */
  .ex-gallery { background: var(--bg); padding: 120px 0; }
  .ex-gallery__grid {
    display: grid; margin-top: 64px;
    grid-template-columns: repeat(4, 1fr); gap: 12px;
  }
  .ex-gallery__grid .ex-gal-item:nth-child(1) { grid-row: span 2; }
  .ex-gallery__grid .ex-gal-item:nth-child(4) { grid-column: span 2; }
  .ex-gal-item { overflow: hidden; }
  .ex-gal-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(40%) brightness(0.95);
    transition: transform 0.7s ease, filter 0.6s ease;
    min-height: 200px;
  }
  .ex-gal-item:hover img { transform: scale(1.05); filter: grayscale(0%) brightness(1); }
  @media (max-width: 768px) {
    .ex-gallery__grid { grid-template-columns: 1fr 1fr; }
    .ex-gallery__grid .ex-gal-item:nth-child(1) { grid-row: span 1; }
    .ex-gallery__grid .ex-gal-item:nth-child(4) { grid-column: span 1; }
  }

  /* FOOTER */
  .ex-footer { background: var(--tx); color: rgba(249,247,244,0.55); padding: 96px 0 48px; }
  .ex-footer__inner { display: grid; grid-template-columns: 2fr 1fr; gap: 64px; align-items: start; margin-bottom: 72px; }
  .ex-footer__title {
    font-family: var(--ff-dis); font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 300; font-style: italic; color: rgba(249,247,244,0.9); line-height: 0.95; margin-bottom: 24px;
  }
  .ex-footer__tag { font-size: 0.82rem; font-weight: 300; line-height: 1.8; }
  .ex-footer__contact { font-size: 0.8rem; font-weight: 300; line-height: 2.4; }
  .ex-footer__copy { font-size: 0.64rem; color: rgba(249,247,244,0.2); letter-spacing: 0.1em; border-top: 1px solid rgba(249,247,244,0.08); padding-top: 28px; }
  @media (max-width: 768px) { .ex-footer__inner { grid-template-columns: 1fr; } }

  /* CONTACT UTILITIES */
  .section { padding: 80px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }
  .section-title { font-family: var(--ff-dis); font-size: clamp(1.8rem,3.5vw,3rem); font-weight: 400; font-style: italic; color: var(--tx); margin-bottom: 12px; }
  .section-subtitle { font-size: 0.88rem; color: var(--muted); margin-bottom: 48px; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; font-family:var(--ff-san); font-size:0.65rem; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; text-decoration:none; transition:all 0.25s; }
  .btn-primary { background: var(--ac); color: #fff; border: 1px solid var(--ac); }
  .btn-primary:hover { background: var(--ac2); border-color: var(--ac2); }
  .btn-outline { border: 1px solid var(--border); color: var(--tx); }
  .btn-outline:hover { border-color: var(--tx); }
  .sg-form { display: flex; flex-direction: column; gap: 16px; }
  .sg-form input, .sg-form textarea { width: 100%; padding: 14px 0; background: transparent; border: none; border-bottom: 1px solid var(--border); color: var(--tx); font-family: var(--ff-san); font-size: 0.88rem; font-weight: 300; outline: none; transition: border-color 0.25s; }
  .sg-form input:focus, .sg-form textarea:focus { border-color: var(--ac); }
  .sg-form textarea { min-height: 120px; resize: vertical; }
  .sg-contact { background: var(--bg2); }
  .sg-contact__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .sg-contact__item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
  .sg-contact__icon { width: 40px; height: 40px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .sg-contact__label { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ac); margin-bottom: 4px; }
  .sg-contact__value { font-size: 0.88rem; color: var(--muted); }
  @media (max-width: 768px) { .sg-contact__inner { grid-template-columns: 1fr; } }

  [data-animate] { opacity: 0; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  [data-animate="left"]  { transform: translateX(-32px); }
  [data-animate="right"] { transform: translateX(32px); }
  [data-animate="scale"] { transform: scale(0.96); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.1s; } [data-animate-delay="2"] { transition-delay: 0.2s; }
  [data-animate-delay="3"] { transition-delay: 0.3s; } [data-animate-delay="4"] { transition-delay: 0.4s; }
  [data-animate-delay="5"] { transition-delay: 0.5s; }
  @media (prefers-reduced-motion: reduce) { [data-animate] { opacity: 1; transform: none; transition: none; } }
</style>`;

    const friserBookingVars = `<style>
  .bk-section { --c-bg:#f9f7f4; --c-surface:#ffffff; --c-text:#1c1710; --c-accent:#c9a07a; --c-border:rgba(28,23,16,0.1); --c-text-muted:rgba(28,23,16,0.45); --f-heading:'Cormorant Garamond',Georgia,serif; --f-body:'Raleway',system-ui,sans-serif; }
</style>`;

    const nameWords = (data.businessName || niche.label).split(' ');
    const heroTitleEx = nameWords.length > 1
      ? `<em>${nameWords[0]}</em><br><strong>${nameWords.slice(1).join(' ')}</strong>`
      : `<em>${nameWords[0]}</em>`;

    const friserBody = `
<nav class="ex-nav" id="ex-nav">
  <a href="#hero" class="ex-nav__logo">${nameWords[0]}<span>${nameWords.length > 1 ? ' ' + nameWords.slice(1).join(' ') : ''}</span></a>
  <ul class="ex-nav__links">
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#about">Atelier</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>
${buildServicesTicker(services, ac)}

<section class="ex-hero" id="hero">
  ${heroPhoto
    ? `<div class="ex-hero__bg" style="background-image:url('${heroPhoto}')"></div><div class="ex-hero__overlay"></div>`
    : `<div class="ex-hero__no-photo"></div>`}
  <div class="ex-hero__content" data-animate="fade">
    <span class="ex-hero__kicker">${niche.label} · ${data.address ? data.address.split(',')[0] : 'Haute Coiffure'}</span>
    <h1 class="ex-hero__title">${heroTitleEx}</h1>
    <p class="ex-hero__sub">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="ex-btn ex-btn-gold">${niche.heroCta}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="ex-btn ex-btn-ghost">${data.phone}</a>` : ''}
    </div>
  </div>
</section>

<section class="ex-services" id="services">
  <div class="ex-container">
    <p class="ex-eyebrow" data-animate="fade">${niche.label}</p>
    <h2 class="ex-section-title" data-animate="fade">${niche.servicesLabel}</h2>
    <div class="ex-services__inner">
      ${services.map((s, i) => `
      <div class="ex-svc-item" data-animate="fade" data-animate-delay="${Math.min((i % 3) + 1, 5)}">
        <div class="ex-svc-col">
          <span class="ex-svc-num">0${i + 1}</span>
          <div class="ex-svc-info">
            <div class="ex-svc-name">${s.name}</div>
            ${s.desc ? `<div class="ex-svc-desc">${s.desc}</div>` : ''}
          </div>
        </div>
        ${s.price ? `<span class="ex-svc-price">${s.price}</span>` : ''}
      </div>`).join('')}
    </div>
    ${data.bookingUrl ? `<div class="ex-services__cta" data-animate="fade"><a href="${data.bookingUrl}" target="_blank" class="ex-btn ex-btn-line">${niche.heroCta} →</a></div>` : ''}
  </div>
</section>

<section class="ex-about" id="about">
  <div class="ex-container">
    <div class="ex-about__inner">
      <div class="ex-about__img" data-animate="left">
        ${aboutPhoto
          ? `<img src="${aboutPhoto}" alt="${data.businessName}" class="ex-about__photo">`
          : `<div class="ex-about__photo" style="background:var(--bg2);min-height:400px"></div>`}
        <div class="ex-about__img-label">— ${data.businessName || niche.label}</div>
      </div>
      <div class="ex-about__text" data-animate="right">
        <div class="ex-about__num">01</div>
        <p class="ex-eyebrow">${niche.aboutLabel}</p>
        <h2 class="ex-about__body-title">${data.businessName || niche.label}</h2>
        <p class="ex-about__copy">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p class="ex-about__addr">📍 ${data.address}</p>` : ''}
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;margin-top:8px">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="ex-btn ex-btn-gold">${niche.heroCta}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="ex-btn ex-btn-ghost">Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${galleryPhotos.length > 0 ? `
<section class="ex-gallery" id="gallery">
  <div class="ex-container">
    <p class="ex-eyebrow" data-animate="fade">Einblicke</p>
    <h2 class="ex-section-title" data-animate="fade">Galerie</h2>
    <div class="ex-gallery__grid">
      ${galleryPhotos.map((src, i) => `
      <div class="ex-gal-item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <img src="${src}" alt="Galerie ${i + 1}" loading="lazy">
      </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${friserBookingVars}
${buildBookingWidget(data, niche)}
${buildContactSection(data, niche)}

<footer class="ex-footer">
  <div class="ex-container">
    <div class="ex-footer__inner">
      <div>
        <div class="ex-footer__title">${data.businessName || niche.label}</div>
        <p class="ex-footer__tag">${data.tagline || niche.heroTagline}</p>
      </div>
      <div class="ex-footer__contact">
        ${data.address ? `<div>${data.address}</div>` : ''}
        ${data.phone ? `<div>${data.phone}</div>` : ''}
        ${data.email ? `<div>${data.email}</div>` : ''}
      </div>
    </div>
    <div class="ex-footer__copy">© ${new Date().getFullYear()} ${data.businessName || niche.label} · Alle Rechte vorbehalten</div>
  </div>
</footer>

${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('ex-nav').classList.toggle('scrolled', window.scrollY > 60);
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
${friserHead}
</head>
<body>
${friserBody}
</body>
</html>`;
  }

  // ── STANDARD TEMPLATE D ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  :root { --radius: 16px; --radius-lg: 24px; }
  .sg-hero-d { min-height: 100svh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding: 120px 24px 80px; }
  .sg-hero-d__bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.45); }
  .sg-hero-d__blob { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; background: radial-gradient(circle, ${colors.accent}33 0%, transparent 70%); top: -20vw; right: -10vw; pointer-events: none; }
  .sg-hero-d__content { position: relative; z-index: 2; max-width: 720px; }
  .sg-hero-d__pill { display: inline-block; background: ${colors.accent}22; border: 1px solid ${colors.accent}55; color: var(--c-accent); padding: 8px 20px; border-radius: 100px; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 24px; }
  .sg-hero-d__title { font-size: clamp(2.8rem, 6vw, 5.5rem); font-weight: 900; color: ${dark ? '#fff' : 'var(--c-text)'}; margin-bottom: 20px; line-height: 1.05; letter-spacing: -0.03em; }
  .sg-hero-d__sub { font-size: 1.15rem; color: ${dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)'}; margin-bottom: 40px; line-height: 1.7; }
  .sg-hero-d__scroll { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.5; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .sg-hero-d__scroll::after { content: ''; width: 1px; height: 40px; background: currentColor; display: block; }
  .sg-services-d { background: var(--c-bg); }
  .sg-cards-scroll { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  .sg-card-d { background: var(--c-surface); border-radius: var(--radius-lg); padding: 32px 24px; border: 1px solid var(--c-border); position: relative; overflow: hidden; transition: var(--transition); }
  .sg-card-d::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-accent), var(--c-primary)); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
  .sg-card-d:hover::after { transform: scaleX(1); }
  .sg-card-d:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
  .sg-card-d__name { font-family: var(--f-heading); font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
  .sg-card-d__desc { font-size: 0.88rem; color: var(--c-text-muted); margin-bottom: 20px; line-height: 1.6; }
  .sg-card-d__price { font-size: 1.35rem; font-weight: 700; color: var(--c-accent); }
  .sg-about-d { background: var(--c-surface); }
  .sg-about-d__inner { display: grid; grid-template-columns: 5fr 4fr; gap: 0; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); }
  .sg-about-d__img { min-height: 460px; }
  .sg-about-d__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about-d__text { padding: 64px 48px; background: var(--c-accent); color: #000; display: flex; flex-direction: column; justify-content: center; }
  .sg-about-d__text h2 { color: #000; margin-bottom: 20px; font-size: clamp(1.5rem, 3vw, 2.2rem); }
  .sg-about-d__text p { opacity: 0.75; line-height: 1.8; margin-bottom: 28px; }
  .sg-about-d__text .btn { background: #000; color: #fff; }
  @media (max-width: 768px) { .sg-about-d__inner { grid-template-columns: 1fr; } .sg-about-d__text { padding: 40px 28px; } }
</style>`;

  const heroStyle = photos[0] ? `background-image: url('${photos[0]}')` : '';

  const body = `
${buildNav(data, niche)}
${niche.id === 'friser' ? buildServicesTicker(services, colors.accent) : ''}
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
        ${photos[1] ? `<img src="${photos[1]}" alt="${data.businessName}">` : `<div style="width:100%;height:100%;background:var(--c-border)"></div>`}
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
${niche.id === 'friser' ? buildBookingWidget(data, niche) : ''}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
