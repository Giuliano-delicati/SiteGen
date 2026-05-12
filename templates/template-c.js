import { buildContactSection, buildCallButton, buildTeam, buildServicesTicker, buildBookingWidget, buildExtrasSection } from './base-shell.js';

// Template C — Ordinär · Monochrome Editorial
// Immer weiß/schwarz · Accent im Booking-Widget = niche color · DM Serif Display + DM Sans
// Funktioniert für: Frisör, Barber, Beauty & Wellness
export function generate(data, niche, colors, fonts) {
  const ac = colors.accent;
  const isHair = ['friser', 'barber'].includes(niche.id);

  const photos = data.photos || [];
  const heroPhoto     = photos[0] || '';
  const aboutPhoto    = photos[1] || '';
  const galleryPhotos = photos.slice(2, 8);
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  /* ══ TEMPLATE C — ORDINÄR · Monochrome Editorial ══ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg:#f8f8f6; --bg2:#f0f0ee; --sur:#ffffff; --tx:#0e0e0e; --muted:rgba(14,14,14,0.45); --border:rgba(14,14,14,0.12); --ff-ser:'DM Serif Display',Georgia,serif; --ff-san:'DM Sans',system-ui,sans-serif; }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--tx); font-family:var(--ff-san); font-weight:400; -webkit-font-smoothing:antialiased; overflow-x:hidden; }
  img { max-width:100%; height:auto; display:block; } a { color:inherit; text-decoration:none; }
  .or-container { max-width:1140px; margin:0 auto; padding:0 56px; }
  @media (max-width:768px) { .or-container { padding:0 20px; } }

  /* Utilities for buildContactSection & buildExtrasSection */
  .container { max-width:1140px; margin:0 auto; padding:0 56px; }
  @media (max-width:768px) { .container { padding:0 20px; } }
  .section { padding:80px 0; }
  .section-title { font-family:var(--ff-ser); font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:400; font-style:italic; color:var(--tx); margin-bottom:12px; }
  .section-subtitle { font-size:0.9rem; color:var(--muted); margin-bottom:48px; font-weight:300; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; font-family:var(--ff-san); font-size:0.68rem; font-weight:500; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; transition:all 0.22s; }
  .btn-primary { background:var(--tx); color:var(--bg); border:1px solid var(--tx); }
  .btn-primary:hover { opacity:0.82; }
  .btn-outline { border:1px solid var(--border); color:var(--tx); }
  .btn-outline:hover { border-color:var(--tx); }
  .sg-form { display:flex; flex-direction:column; gap:0; }
  .sg-form input,.sg-form textarea { width:100%; padding:16px 0; background:transparent; border:none; border-bottom:1px solid var(--border); color:var(--tx); font-family:var(--ff-san); font-size:0.88rem; font-weight:300; outline:none; transition:border-color 0.25s; margin-bottom:8px; }
  .sg-form input:focus,.sg-form textarea:focus { border-color:var(--tx); }
  .sg-form textarea { min-height:120px; resize:vertical; }
  .sg-contact { background:var(--bg2); }
  .sg-contact__inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
  .sg-contact__item { display:flex; align-items:flex-start; gap:14px; margin-bottom:24px; }
  .sg-contact__icon { width:40px; height:40px; border:1px solid var(--border); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .sg-contact__label { font-size:0.62rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); margin-bottom:4px; }
  .sg-contact__value { font-size:0.88rem; color:var(--muted); }
  .sg-call-btn { position:fixed; bottom:24px; right:24px; z-index:200; width:54px; height:54px; border-radius:50%; background:var(--tx); color:var(--bg); display:flex; align-items:center; justify-content:center; font-size:1.3rem; box-shadow:0 4px 20px rgba(0,0,0,0.2); transition:transform 0.2s; }
  .sg-call-btn:hover { transform:scale(1.1); }
  @media (max-width:768px) { .sg-contact__inner { grid-template-columns:1fr; } }

  /* NAV */
  .or-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:28px 56px; transition:background 0.35s,padding 0.35s,border-color 0.35s; border-bottom:1px solid transparent; }
  .or-nav.scrolled { background:rgba(248,248,246,0.97); backdrop-filter:blur(16px); padding:16px 56px; border-color:var(--border); }
  .or-nav__logo { font-family:var(--ff-ser); font-size:1.4rem; font-weight:400; font-style:italic; color:var(--tx); }
  .or-nav__links { display:flex; gap:36px; list-style:none; align-items:center; }
  .or-nav__links a { font-family:var(--ff-san); font-size:0.68rem; font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); transition:color 0.2s; }
  .or-nav__links a:hover { color:var(--tx); }
  .or-nav__links a[href="#buchen"] { background:var(--tx); color:var(--bg); padding:9px 22px; letter-spacing:0.14em; animation:orBookGlow 3s ease-in-out infinite; }
  .or-nav__links a[href="#buchen"]:hover { opacity:0.8; }
  @keyframes orBookGlow { 0%,100% { box-shadow:0 0 0 0 rgba(14,14,14,0.3); } 55% { box-shadow:0 0 0 8px rgba(14,14,14,0); } }
  @media (prefers-reduced-motion:reduce) { .or-nav__links a[href="#buchen"] { animation:none; } }
  @media (max-width:768px) { .or-nav { padding:18px 20px; } .or-nav__links { display:none; } }

  /* HERO — Fullbleed, linksausgerichtet */
  .or-hero { position:relative; height:100svh; overflow:hidden; display:flex; align-items:flex-end; padding-bottom:80px; }
  .or-hero__bg { position:absolute; inset:0; background-size:cover; background-position:center; transform:scale(1.05); animation:orZoom 11s ease forwards; }
  @keyframes orZoom { to { transform:scale(1); } }
  .or-hero__overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(14,14,14,0.82) 0%,rgba(14,14,14,0.4) 60%,transparent 100%); }
  .or-hero__no-photo { position:absolute; inset:0; background:#1a1a1a; }
  .or-hero__content { position:relative; z-index:2; max-width:640px; }
  .or-hero__tag { display:inline-block; border:1px solid rgba(255,255,255,0.35); padding:5px 18px; margin-bottom:24px; font-family:var(--ff-san); font-size:0.65rem; font-weight:500; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.7); }
  .or-hero__title { font-family:var(--ff-ser); font-size:clamp(3rem,7vw,7rem); font-weight:400; font-style:italic; color:#fff; line-height:0.95; margin-bottom:24px; }
  .or-hero__sub { font-family:var(--ff-san); font-size:0.95rem; color:rgba(255,255,255,0.65); max-width:420px; line-height:1.75; margin-bottom:44px; font-weight:300; }
  .or-btn { display:inline-flex; align-items:center; gap:10px; font-family:var(--ff-san); font-size:0.68rem; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; padding:14px 32px; transition:all 0.22s; }
  .or-btn-dark { background:#fff; color:#0e0e0e; }
  .or-btn-dark:hover { background:#f0f0f0; }
  .or-btn-ghost-w { border:1px solid rgba(255,255,255,0.35); color:#fff; }
  .or-btn-ghost-w:hover { border-color:#fff; }
  .or-btn-solid { background:var(--tx); color:var(--bg); }
  .or-btn-solid:hover { opacity:0.82; }
  .or-btn-ghost { border:1px solid var(--border); color:var(--tx); }
  .or-btn-ghost:hover { border-color:var(--tx); }

  /* SERVICES — Horizontale Liste, 2-Spalten-Layout */
  .or-services { background:var(--bg); padding:120px 0; }
  .or-services__head { display:grid; grid-template-columns:1fr 2fr; gap:64px; align-items:start; margin-bottom:72px; }
  .or-section-eyebrow { font-family:var(--ff-san); font-size:0.62rem; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
  .or-section-title { font-family:var(--ff-ser); font-size:clamp(2.2rem,4vw,4rem); font-weight:400; font-style:italic; color:var(--tx); line-height:1.05; }
  .or-price-list { }
  .or-price-item { display:flex; align-items:baseline; justify-content:space-between; padding:20px 0; border-bottom:1px solid var(--border); gap:20px; transition:padding-left 0.2s; }
  .or-price-item:first-child { border-top:1px solid var(--border); }
  .or-price-item:hover { padding-left:8px; }
  .or-price-item__name { font-family:var(--ff-ser); font-size:1.1rem; font-weight:400; font-style:italic; color:var(--tx); flex:1; }
  .or-price-item__desc { font-size:0.8rem; color:var(--muted); font-style:normal; margin-left:20px; }
  .or-price-item__price { font-family:var(--ff-san); font-size:0.82rem; font-weight:500; color:var(--muted); white-space:nowrap; letter-spacing:0.06em; }
  .or-services__cta { margin-top:52px; display:flex; justify-content:flex-end; }
  @media (max-width:768px) { .or-services__head { grid-template-columns:1fr; gap:24px; } }

  /* ABOUT — Foto links, schwarzes Panel rechts */
  .or-about { background:var(--bg2); }
  .or-about__inner { display:grid; grid-template-columns:1fr 1fr; min-height:600px; }
  .or-about__img { overflow:hidden; position:relative; }
  .or-about__photo { width:100%; height:100%; object-fit:cover; transition:transform 0.8s ease; }
  .or-about__img:hover .or-about__photo { transform:scale(1.04); }
  .or-about__img-ph { width:100%; height:100%; background:#d0d0ce; min-height:500px; }
  .or-about__text { background:var(--tx); color:rgba(248,248,246,0.8); padding:80px 56px; display:flex; flex-direction:column; justify-content:center; }
  .or-about__label { font-family:var(--ff-san); font-size:0.62rem; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:rgba(248,248,246,0.4); margin-bottom:24px; }
  .or-about__title { font-family:var(--ff-ser); font-size:clamp(1.8rem,2.8vw,2.8rem); font-weight:400; font-style:italic; color:#f8f8f6; line-height:1.15; margin-bottom:24px; }
  .or-about__copy { font-size:0.9rem; font-weight:300; line-height:1.9; margin-bottom:14px; }
  .or-about__addr { font-size:0.78rem; color:rgba(248,248,246,0.3); margin-bottom:40px; }
  .or-about .or-btn-ghost { border-color:rgba(248,248,246,0.2); color:#f8f8f6; }
  .or-about .or-btn-ghost:hover { border-color:#f8f8f6; }
  @media (max-width:768px) { .or-about__inner { grid-template-columns:1fr; } .or-about__text { padding:56px 24px; } }

  /* GALLERY */
  .or-gallery { background:var(--bg); padding:100px 0; }
  .or-gallery__grid { display:grid; margin-top:56px; grid-template-columns:repeat(3,1fr); gap:4px; }
  .or-gallery__grid .or-gal-item:first-child { grid-column:span 2; grid-row:span 2; }
  .or-gal-item { overflow:hidden; aspect-ratio:1; }
  .or-gal-item:first-child { aspect-ratio:auto; }
  .or-gal-item img { width:100%; height:100%; object-fit:cover; transition:transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94),filter 0.5s; will-change:transform; }
  .or-gal-item:hover img { transform:scale(1.08); filter:brightness(1.06); }

  /* FOOTER */
  .or-footer { background:#0e0e0e; padding:72px 0 40px; }
  .or-footer__inner { display:grid; grid-template-columns:1fr 1fr; gap:48px; margin-bottom:48px; }
  .or-footer__logo { font-family:var(--ff-ser); font-size:1.8rem; font-weight:400; font-style:italic; color:#f8f8f6; margin-bottom:16px; }
  .or-footer__tag { font-size:0.85rem; font-weight:300; color:rgba(248,248,246,0.45); line-height:1.7; }
  .or-footer__contact { font-size:0.82rem; color:rgba(248,248,246,0.45); line-height:2.2; }
  .or-footer__copy { font-size:0.7rem; color:rgba(248,248,246,0.18); border-top:1px solid rgba(248,248,246,0.08); padding-top:24px; }
  @media (max-width:768px) { .or-footer__inner { grid-template-columns:1fr; } }

  /* PHOTO BREAK */
  .or-photo-break { position:relative; height:65vh; min-height:320px; background-size:cover; background-position:center; background-attachment:fixed; display:flex; align-items:flex-end; padding:0 56px 56px; overflow:hidden; }
  .or-photo-break::before { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(14,14,14,0.75) 0%,transparent 60%); z-index:1; }
  .or-photo-break__caption { position:relative; z-index:2; color:#f8f8f6; }
  .or-photo-break__eyebrow { display:block; font-family:var(--ff-san); font-size:0.62rem; font-weight:500; letter-spacing:0.3em; text-transform:uppercase; color:rgba(248,248,246,0.5); margin-bottom:10px; }
  .or-photo-break__text { font-family:var(--ff-ser); font-size:clamp(1.6rem,3vw,2.8rem); font-weight:400; font-style:italic; max-width:640px; line-height:1.2; }
  @media (max-width:768px) { .or-photo-break { background-attachment:scroll; height:55vw; padding:0 20px 32px; } }

  /* SCROLL INDICATOR */
  .or-hero__scroll { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); z-index:3; width:1px; height:52px; overflow:hidden; opacity:0.4; }
  .or-hero__scroll::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.9); animation:orScroll 2s ease-in-out infinite; }
  @keyframes orScroll { 0%,100% { transform:translateY(-100%); } 50% { transform:translateY(100%); } }
  @media (prefers-reduced-motion:reduce) { .or-hero__scroll { display:none; } }

  /* BOOKING WIDGET VARS — uses niche accent color */
  .bk-section { --c-bg:#f8f8f6; --c-surface:#ffffff; --c-text:#0e0e0e; --c-accent:${ac}; --c-border:rgba(14,14,14,0.12); --c-text-muted:rgba(14,14,14,0.45); --f-heading:'DM Serif Display',Georgia,serif; --f-body:'DM Sans',system-ui,sans-serif; }

  /* ANIMATIONS */
  [data-animate] { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease,transform 0.8s ease; }
  [data-animate="left"] { transform:translateX(-36px); }
  [data-animate="right"] { transform:translateX(36px); }
  [data-animate="scale"] { transform:scale(0.95); }
  [data-animate].visible { opacity:1; transform:none; }
  [data-animate-delay="1"] { transition-delay:0.1s; } [data-animate-delay="2"] { transition-delay:0.2s; }
  [data-animate-delay="3"] { transition-delay:0.3s; } [data-animate-delay="4"] { transition-delay:0.4s; }
  [data-animate-delay="5"] { transition-delay:0.5s; }
  @media (prefers-reduced-motion:reduce) { [data-animate] { opacity:1; transform:none; transition:none; } }
</style>`;

  const bookingHref   = data.bookingUrl || '#buchen';
  const bookingTarget = data.bookingUrl ? ' target="_blank" rel="noopener noreferrer"' : '';

  const body = `
<nav class="or-nav" id="or-nav">
  <a href="#hero" class="or-nav__logo">${data.businessName || niche.label}</a>
  <ul class="or-nav__links">
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#about">Über uns</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>

<section class="or-hero" id="hero">
  ${heroPhoto
    ? `<div class="or-hero__bg" style="background-image:url('${heroPhoto}')"></div><div class="or-hero__overlay"></div>`
    : `<div class="or-hero__no-photo"></div>`}
  <div class="or-container">
    <div class="or-hero__content" data-animate="fade">
      <div class="or-hero__tag">${niche.label}</div>
      <h1 class="or-hero__title">${data.businessName || niche.label}</h1>
      <p class="or-hero__sub">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <a href="${bookingHref}"${bookingTarget} class="or-btn or-btn-dark">${niche.heroCta} →</a>
        ${data.phone ? `<a href="tel:${data.phone}" class="or-btn or-btn-ghost-w">☎ ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
  <div class="or-hero__scroll" aria-hidden="true"></div>
</section>
${isHair ? buildServicesTicker(services, '#0e0e0e') : ''}

<section class="or-services" id="services">
  <div class="or-container">
    <div class="or-services__head" data-animate="fade">
      <div>
        <p class="or-section-eyebrow">${niche.label}</p>
        <h2 class="or-section-title">${niche.servicesLabel}</h2>
      </div>
      <div class="or-price-list">
        ${services.map((s, i) => `
        <div class="or-price-item" data-animate="fade" data-animate-delay="${Math.min(i + 1, 5)}">
          <span class="or-price-item__name">${s.name}${s.desc ? `<span class="or-price-item__desc"> — ${s.desc}</span>` : ''}</span>
          ${s.price ? `<span class="or-price-item__price">${s.price}</span>` : ''}
        </div>`).join('')}
        <div class="or-services__cta" data-animate="fade"><a href="${bookingHref}"${bookingTarget} class="or-btn or-btn-solid">${niche.heroCta} →</a></div>
      </div>
    </div>
  </div>
</section>

<section class="or-about" id="about">
  <div class="or-about__inner">
    <div class="or-about__img" data-animate="left">
      ${aboutPhoto
        ? `<img src="${aboutPhoto}" alt="${data.businessName}" class="or-about__photo">`
        : `<div class="or-about__img-ph"></div>`}
    </div>
    <div class="or-about__text" data-animate="right">
      <p class="or-about__label">${niche.aboutLabel}</p>
      <h2 class="or-about__title">${data.businessName || niche.label}</h2>
      <p class="or-about__copy">${data.about || niche.aboutDefault}</p>
      ${data.address ? `<p class="or-about__addr">📍 ${data.address}</p>` : ''}
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <a href="${bookingHref}"${bookingTarget} class="or-btn or-btn-dark">${niche.heroCta} →</a>
        ${data.phone ? `<a href="tel:${data.phone}" class="or-btn or-btn-ghost">☎ Anrufen</a>` : ''}
      </div>
    </div>
  </div>
</section>

${galleryPhotos.length > 0 ? `
<div class="or-photo-break" style="background-image:url('${galleryPhotos[0]}')">
  <div class="or-photo-break__caption" data-animate="fade">
    <span class="or-photo-break__eyebrow">${niche.label}</span>
    <p class="or-photo-break__text">${data.tagline || niche.heroTagline}</p>
  </div>
</div>
<section class="or-gallery" id="gallery">
  <div class="or-container">
    <div data-animate="fade">
      <p class="or-section-eyebrow">Einblicke</p>
      <h2 class="or-section-title">Galerie</h2>
    </div>
    <div class="or-gallery__grid">
      ${galleryPhotos.map((src, i) => `
      <div class="or-gal-item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <img src="${src}" alt="Galerie ${i + 1}" loading="lazy">
      </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildBookingWidget(data, niche)}
${buildContactSection(data, niche)}

<footer class="or-footer">
  <div class="or-container">
    <div class="or-footer__inner">
      <div>
        <div class="or-footer__logo">${data.businessName || niche.label}</div>
        <p class="or-footer__tag">${data.tagline || niche.heroTagline}</p>
      </div>
      <div class="or-footer__contact">
        ${data.address ? `<div>${data.address}</div>` : ''}
        ${data.phone ? `<div>${data.phone}</div>` : ''}
        ${data.email ? `<div>${data.email}</div>` : ''}
      </div>
    </div>
    <div class="or-footer__copy">© ${new Date().getFullYear()} ${data.businessName || niche.label}</div>
  </div>
</footer>

${buildCallButton(data)}

<script>
  window.addEventListener('scroll', () => {
    document.getElementById('or-nav').classList.toggle('scrolled', window.scrollY > 50);
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
${head}
</head>
<body>
${body}
</body>
</html>`;
}
