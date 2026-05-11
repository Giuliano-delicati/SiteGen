import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildGallery, buildTeam, svgIcon } from './base-shell.js';

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
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="os-nav__cta">${niche.heroCta}</a>` : (data.phone ? `<a href="tel:${data.phone}" class="os-nav__cta">${data.phone}</a>` : '')}
</nav>

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
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
