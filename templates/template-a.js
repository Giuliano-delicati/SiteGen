import { buildContactSection, buildCallButton, buildTeam, buildServicesTicker, buildBookingWidget, buildExtrasSection } from './base-shell.js';

// Template A — New Style · Dark Editorial
// Immer dunkel · Accent = niche color · Space Grotesk + Inter
// Funktioniert für: Frisör, Barber, Beauty & Wellness
export function generate(data, niche, colors, fonts) {
  const ac = colors.accent;
  const isHair = ['friser', 'barber'].includes(niche.id);

  const photos = data.photos || [];
  const heroPhoto    = photos[0] || '';
  const aboutPhoto   = photos[1] || '';
  const galleryPhotos = photos.slice(2, 6);
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 8);

  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  /* ══ TEMPLATE A — NEW STYLE · Dark Editorial ══ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg:#0a0a0a; --sur:#131313; --tx:#f0ebe3; --muted:rgba(240,235,227,0.48); --ac:${ac}; --bd:rgba(255,255,255,0.09); --fh:'Space Grotesk',sans-serif; --fb:'Inter',sans-serif; }
  html { scroll-behavior:smooth; }
  body { font-family:var(--fb); background:var(--bg); color:var(--tx); overflow-x:hidden; line-height:1.6; }
  img { max-width:100%; height:auto; display:block; } a { color:inherit; text-decoration:none; }
  .con { max-width:1200px; margin:0 auto; padding:0 32px; }
  .sec { padding:96px 0; }

  /* Utilities for buildContactSection & buildExtrasSection */
  .container { max-width:1200px; margin:0 auto; padding:0 32px; }
  .section { padding:96px 0; }
  .section-title { font-family:var(--fh); font-size:clamp(2rem,4vw,3rem); letter-spacing:-0.02em; margin-bottom:12px; color:var(--tx); }
  .section-subtitle { color:var(--muted); font-size:1.05rem; margin-bottom:48px; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:12px 28px; font-family:var(--fh); font-size:0.8rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; border:none; white-space:nowrap; transition:all 0.25s; text-decoration:none; }
  .btn-primary { background:var(--ac); color:#0a0a0a; }
  .btn-primary:hover { filter:brightness(1.15); }
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
  .ns-hero__scroll { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); width:1px; height:52px; overflow:hidden; opacity:0.45; }
  .ns-hero__scroll::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.9); animation:nsScroll 2s ease-in-out infinite; }
  @keyframes nsScroll { 0%,100% { transform:translateY(-100%); } 50% { transform:translateY(100%); } }
  @media (prefers-reduced-motion:reduce) { .ns-hero__scroll { display:none; } }

  /* SERVICES */
  .ns-svc-list { border-top:1px solid var(--bd); }
  .ns-svc-row { display:grid; grid-template-columns:52px 1fr auto; align-items:center; gap:20px; padding:22px 0; border-bottom:1px solid var(--bd); transition:padding-left 0.25s; }
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
  .ns-gal { display:grid; grid-template-columns:repeat(4,1fr); height:520px; }
  .ns-gal__item { overflow:hidden; }
  .ns-gal__item:first-child { grid-column:1/3; }
  .ns-gal__item img { width:100%; height:100%; object-fit:cover; transition:transform 0.6s ease,filter 0.5s; filter:brightness(0.78); }
  .ns-gal__item:hover img { transform:scale(1.06); filter:brightness(1); }

  /* FOOTER */
  .ns-ft { padding:60px 0; border-top:1px solid var(--bd); text-align:center; }
  .ns-ft__nm { font-family:var(--fh); font-size:1.6rem; font-weight:700; letter-spacing:0.06em; margin-bottom:12px; }
  .ns-ft__info { font-size:0.82rem; color:var(--muted); line-height:2.2; }

  /* BOOKING WIDGET VARS */
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

  const bookingHref   = data.bookingUrl || '#buchen';
  const bookingTarget = data.bookingUrl ? ' target="_blank" rel="noopener noreferrer"' : '';

  const body = `
<nav class="ns-nav" id="ns-nav">
  <a href="#" class="ns-nav__logo">${data.businessName || niche.label}</a>
  <ul class="ns-nav__links">
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#about">Über uns</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>

<section class="ns-hero" id="hero">
  <div class="ns-hero__bg">${heroPhoto ? `<img src="${heroPhoto}" alt="${data.businessName || niche.label}">` : `<div style="width:100%;height:100%;background:#111"></div>`}</div>
  <div class="ns-hero__ov"></div>
  <div class="ns-hero__cnt" data-animate>
    <p class="ns-hero__eye">${niche.label}</p>
    <h1 class="ns-hero__title">${data.businessName || niche.label}</h1>
    <p class="ns-hero__sub">${data.tagline || niche.heroTagline}</p>
    <div class="ns-hero__btns">
      <a href="${bookingHref}"${bookingTarget} class="btn btn-primary">${niche.heroCta} →</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="ns-hero__scroll" aria-hidden="true"></div>
</section>
${isHair ? buildServicesTicker(services, ac) : ''}

<section class="ns-services sec" id="services">
  <div class="con">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:56px;gap:24px;flex-wrap:wrap">
      <h2 style="font-family:var(--fh);font-size:clamp(2rem,4vw,3rem);letter-spacing:-0.02em" data-animate>${niche.servicesLabel}</h2>
      <a href="${bookingHref}"${bookingTarget} class="btn btn-outline" data-animate data-animate-delay="1" style="flex-shrink:0">${niche.heroCta} →</a>
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
      <a href="${bookingHref}"${bookingTarget} class="btn btn-primary">${niche.heroCta} →</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ Anrufen</a>` : ''}
    </div>
  </div>
</div>

${galleryPhotos.length > 0 ? `
<section id="gallery">
  <div class="ns-gal">
    ${[heroPhoto, ...galleryPhotos].filter(Boolean).slice(0,4).map((src, i) => `
    <div class="ns-gal__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 4)}"><img src="${src}" alt="Galerie ${i+1}" loading="lazy"></div>`).join('')}
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
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
${head}
</head>
<body>
${body}
</body>
</html>`;
}
