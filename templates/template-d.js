import { buildContactSection, buildCallButton, buildTeam, buildServicesTicker, buildBookingWidget, buildExtrasSection } from './base-shell.js';

// Template D — Extravagant · Luxury Ivory Editorial
// Immer Ivory #f9f7f4 · Accent aus Nische (colors.accent) · Cormorant Garamond + Raleway
// Extreme Whitespace, große kursive Typografie, Grayscale-Galerie
// Funktioniert für alle Nischen — isHair steuert Ticker + Termin-Link

export function generate(data, niche, colors, fonts) {
  const ac = colors.accent;
  const isHair = ['friser', 'barber'].includes(niche.id);

  const photos = data.photos || [];
  const heroPhoto    = photos[0] || '';
  const aboutPhoto   = photos[1] || '';
  const galleryPhotos = photos.slice(2, 8);
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const nameWords = (data.businessName || niche.label).split(' ');
  const heroTitleHtml = nameWords.length > 1
    ? `<em>${nameWords[0]}</em><br><strong>${nameWords.slice(1).join(' ')}</strong>`
    : `<em>${nameWords[0]}</em>`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline || niche.heroTagline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════════
     TEMPLATE D — EXTRAVAGANT · LUXURY IVORY
     Ivory #f9f7f4 · Accent = niche color
     Cormorant Garamond + Raleway
  ═══════════════════════════════════════════ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:     #f9f7f4;
    --bg2:    #f0ece6;
    --sur:    #ffffff;
    --tx:     #1c1710;
    --muted:  rgba(28,23,16,0.45);
    --ac:     ${ac};
    --border: rgba(28,23,16,0.1);
    --ff-dis: 'Cormorant Garamond', Georgia, serif;
    --ff-san: 'Raleway', system-ui, sans-serif;
  }

  body { background: var(--bg); color: var(--tx); font-family: var(--ff-san); font-weight: 300; -webkit-font-smoothing: antialiased; }

  .ex-container { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 1024px) { .ex-container { padding: 0 32px; } }
  @media (max-width: 768px)  { .ex-container { padding: 0 20px; } }

  /* ── NAV ── */
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
    letter-spacing: 0.08em; color: var(--tx); text-decoration: none; line-height: 1;
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
    color: var(--ac); border-bottom: 1px solid currentColor; padding-bottom: 2px;
    animation: exBookPulse 3s ease-in-out infinite;
  }
  .ex-nav__links a[href="#buchen"]:hover { opacity: 0.75; }
  @keyframes exBookPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
  @media (prefers-reduced-motion: reduce) { .ex-nav__links a[href="#buchen"] { animation: none; } }
  @media (max-width: 768px) { .ex-nav { padding: 20px 20px; } .ex-nav__links { display: none; } }

  /* ── HERO ── */
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
  @media (prefers-reduced-motion: reduce) { .ex-hero__bg { animation: none; transform: none; } }
  .ex-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(249,247,244,0.8) 0%, rgba(249,247,244,0.3) 55%, transparent 100%);
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
  .ex-hero__title strong {
    font-weight: 500; font-style: normal; display: block;
    font-size: 0.52em; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .ex-hero__sub {
    font-family: var(--ff-san); font-size: 0.88rem; font-weight: 300;
    color: rgba(28,23,16,0.6); max-width: 380px; line-height: 1.8; margin-bottom: 48px;
  }
  .ex-btn {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: var(--ff-san); font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.28em; text-transform: uppercase; text-decoration: none; transition: all 0.3s;
  }
  .ex-btn-line { padding: 14px 36px; border: 1px solid var(--tx); color: var(--tx); }
  .ex-btn-line:hover { background: var(--tx); color: var(--bg); }
  .ex-btn-accent { padding: 14px 36px; background: var(--ac); color: #fff; border: 1px solid var(--ac); }
  .ex-btn-accent:hover { opacity: 0.85; }
  .ex-btn-ghost { color: var(--muted); border-bottom: 1px solid currentColor; padding-bottom: 2px; }
  .ex-btn-ghost:hover { color: var(--tx); }
  @media (max-width: 768px) { .ex-hero__content { padding: 0 20px; } }

  /* ── SERVICES ── */
  .ex-services { background: var(--bg); padding: 140px 0; }
  .ex-eyebrow {
    font-family: var(--ff-san); font-size: 0.6rem; font-weight: 500;
    letter-spacing: 0.35em; text-transform: uppercase; color: var(--ac); margin-bottom: 20px;
  }
  .ex-section-title {
    font-family: var(--ff-dis); font-size: clamp(2.8rem, 5vw, 5.5rem);
    font-weight: 300; font-style: italic; color: var(--tx); line-height: 1; margin-bottom: 80px;
  }
  .ex-services__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .ex-svc-item {
    padding: 32px 0; border-top: 1px solid var(--border);
    display: flex; align-items: baseline; justify-content: space-between; gap: 24px;
    position: relative; transition: padding-left 0.25s; cursor: default;
  }
  .ex-svc-item:hover { padding-left: 10px; }
  .ex-svc-item::after {
    content: ''; position: absolute; bottom: -1px; left: 0; width: 0; height: 1px;
    background: var(--ac); transition: width 0.4s ease;
  }
  .ex-svc-item:hover::after { width: 100%; }
  .ex-svc-col { display: flex; gap: 40px; align-items: baseline; flex: 1; }
  .ex-svc-num { font-family: var(--ff-dis); font-size: 0.8rem; color: var(--ac); font-style: italic; min-width: 24px; }
  .ex-svc-info { flex: 1; }
  .ex-svc-name { font-family: var(--ff-dis); font-size: 1.35rem; font-weight: 400; color: var(--tx); margin-bottom: 4px; }
  .ex-svc-desc { font-size: 0.78rem; color: var(--muted); font-style: italic; }
  .ex-svc-price { font-family: var(--ff-san); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em; color: var(--ac); white-space: nowrap; }
  .ex-services__cta { margin-top: 72px; display: flex; justify-content: center; }
  @media (max-width: 768px) { .ex-services__inner { grid-template-columns: 1fr; } }

  /* ── ABOUT ── */
  .ex-about { background: var(--bg2); padding: 140px 0; }
  .ex-about__inner { display: grid; grid-template-columns: 5fr 4fr; gap: 100px; align-items: center; }
  .ex-about__img { position: relative; }
  .ex-about__photo {
    width: 100%; aspect-ratio: 3/4; object-fit: cover;
    filter: grayscale(30%); transition: filter 0.8s ease;
  }
  .ex-about__img:hover .ex-about__photo { filter: grayscale(0%); }
  .ex-about__img-ph { width: 100%; aspect-ratio: 3/4; background: var(--bg); }
  .ex-about__img-label {
    position: absolute; bottom: -12px; left: 32px;
    font-family: var(--ff-dis); font-size: 0.75rem; font-style: italic;
    color: var(--ac); letter-spacing: 0.12em;
  }
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

  /* ── GALLERY ── */
  .ex-gallery { background: var(--bg); padding: 120px 0; }
  .ex-gallery__grid { display: grid; margin-top: 64px; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .ex-gallery__grid .ex-gal-item:nth-child(1) { grid-row: span 2; }
  .ex-gallery__grid .ex-gal-item:nth-child(4) { grid-column: span 2; }
  .ex-gal-item { overflow: hidden; }
  .ex-gal-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(40%) brightness(0.95); min-height: 200px;
    transition: transform 0.7s ease, filter 0.6s ease;
  }
  .ex-gal-item:hover img { transform: scale(1.05); filter: grayscale(0%) brightness(1); }
  @media (max-width: 768px) {
    .ex-gallery__grid { grid-template-columns: 1fr 1fr; }
    .ex-gallery__grid .ex-gal-item:nth-child(1) { grid-row: span 1; }
    .ex-gallery__grid .ex-gal-item:nth-child(4) { grid-column: span 1; }
  }

  /* ── FOOTER ── */
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

  /* ── SHARED UTILITIES (for base-shell sections) ── */
  .section { padding: 80px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
  @media (max-width: 768px) { .container { padding: 0 20px; } }
  .section-title { font-family: var(--ff-dis); font-size: clamp(1.8rem,3.5vw,3rem); font-weight: 400; font-style: italic; color: var(--tx); margin-bottom: 12px; }
  .section-subtitle { font-size: 0.88rem; color: var(--muted); margin-bottom: 48px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; font-family: var(--ff-san); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; transition: all 0.25s; }
  .btn-primary { background: var(--ac); color: #fff; border: 1px solid var(--ac); }
  .btn-primary:hover { opacity: 0.85; }
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

  /* ── BOOKING WIDGET VARS ── */
  .bk-section {
    --c-bg: #f9f7f4; --c-surface: #ffffff; --c-text: #1c1710; --c-accent: ${ac};
    --c-border: rgba(28,23,16,0.1); --c-text-muted: rgba(28,23,16,0.45);
    --f-heading: 'Cormorant Garamond', Georgia, serif;
    --f-body: 'Raleway', system-ui, sans-serif;
  }

  /* ── SCROLL ANIMATIONS ── */
  [data-animate] { opacity: 0; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  [data-animate="left"]  { transform: translateX(-32px); }
  [data-animate="right"] { transform: translateX(32px); }
  [data-animate="scale"] { transform: scale(0.96); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.1s; } [data-animate-delay="2"] { transition-delay: 0.2s; }
  [data-animate-delay="3"] { transition-delay: 0.3s; } [data-animate-delay="4"] { transition-delay: 0.4s; }
  [data-animate-delay="5"] { transition-delay: 0.5s; }
  @media (prefers-reduced-motion: reduce) { [data-animate] { opacity: 1; transform: none; transition: none; } }
</style>
</head>
<body>

<nav class="ex-nav" id="ex-nav">
  <a href="#hero" class="ex-nav__logo">${nameWords[0]}<span>${nameWords.length > 1 ? ' ' + nameWords.slice(1).join(' ') : ''}</span></a>
  <ul class="ex-nav__links">
    <li><a href="#services">${niche.servicesLabel || 'Leistungen'}</a></li>
    <li><a href="#about">${niche.aboutLabel || 'Über uns'}</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>

<section class="ex-hero" id="hero">
  ${heroPhoto
    ? `<div class="ex-hero__bg" style="background-image:url('${heroPhoto}')"></div><div class="ex-hero__overlay"></div>`
    : `<div class="ex-hero__no-photo"></div>`}
  <div class="ex-hero__content" data-animate="fade">
    <span class="ex-hero__kicker">${niche.label}${data.address ? ' · ' + data.address.split(',')[0] : ''}</span>
    <h1 class="ex-hero__title">${heroTitleHtml}</h1>
    <p class="ex-hero__sub">${data.tagline || niche.heroTagline}</p>
    <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center">
      <a href="${data.bookingUrl || '#buchen'}" ${data.bookingUrl ? 'target="_blank"' : ''} class="ex-btn ex-btn-accent">${niche.heroCta || 'Termin buchen'}</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="ex-btn ex-btn-ghost">${data.phone}</a>` : ''}
    </div>
  </div>
</section>
${isHair ? buildServicesTicker(services, ac) : ''}

<section class="ex-services" id="services">
  <div class="ex-container">
    <p class="ex-eyebrow" data-animate="fade">${niche.label}</p>
    <h2 class="ex-section-title" data-animate="fade">${niche.servicesLabel || 'Leistungen'}</h2>
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
    ${data.bookingUrl ? `<div class="ex-services__cta" data-animate="fade"><a href="${data.bookingUrl}" target="_blank" class="ex-btn ex-btn-line">${niche.heroCta || 'Termin buchen'} →</a></div>` : ''}
  </div>
</section>

<section class="ex-about" id="about">
  <div class="ex-container">
    <div class="ex-about__inner">
      <div class="ex-about__img" data-animate="left">
        ${aboutPhoto
          ? `<img src="${aboutPhoto}" alt="${data.businessName}" class="ex-about__photo">`
          : `<div class="ex-about__img-ph"></div>`}
        <div class="ex-about__img-label">— ${data.businessName || niche.label}</div>
      </div>
      <div class="ex-about__text" data-animate="right">
        <div class="ex-about__num">01</div>
        <p class="ex-eyebrow">${niche.aboutLabel || 'Über uns'}</p>
        <h2 class="ex-about__body-title">${data.businessName || niche.label}</h2>
        <p class="ex-about__copy">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p class="ex-about__addr">📍 ${data.address}</p>` : ''}
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;margin-top:8px">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="ex-btn ex-btn-accent">${niche.heroCta || 'Termin buchen'}</a>` : ''}
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
</script>

</body>
</html>`;
}
