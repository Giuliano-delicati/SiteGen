import { buildContactSection, buildCallButton, buildTeam, buildServicesTicker, buildBookingWidget, buildExtrasSection } from './base-shell.js';

// Template B — Verspielt · Warm Playful
// Immer hell-warm · Accent = niche color · Libre Baskerville + DM Sans
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
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  /* ══ TEMPLATE B — VERSPIELT · Warm Playful ══ */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg:#fdf9f5; --sur:#f5ede8; --tx:#2a1f1a; --muted:rgba(42,31,26,0.52); --ac:${ac}; --bd:rgba(42,31,26,0.12); --fh:'Libre Baskerville',Georgia,serif; --fb:'DM Sans',sans-serif; }
  html { scroll-behavior:smooth; }
  body { font-family:var(--fb); background:var(--bg); color:var(--tx); overflow-x:hidden; line-height:1.6; }
  img { max-width:100%; height:auto; display:block; } a { color:inherit; text-decoration:none; }
  .con,.container { max-width:1200px; margin:0 auto; padding:0 32px; }
  .sec,.section { padding:96px 0; }

  /* Utilities for buildContactSection & buildExtrasSection */
  .section-title { font-family:var(--fh); font-size:clamp(2rem,4vw,3rem); margin-bottom:12px; color:var(--tx); }
  .section-subtitle { color:var(--muted); font-size:1.05rem; margin-bottom:48px; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:13px 30px; font-family:var(--fb); font-size:0.9rem; font-weight:600; cursor:pointer; border:none; white-space:nowrap; border-radius:100px; transition:all 0.3s ease; text-decoration:none; }
  .btn-primary { background:var(--ac); color:#fff; }
  .btn-primary:hover { filter:brightness(0.9); transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.18); }
  .btn-outline { border:2px solid var(--ac); color:var(--ac); background:transparent; }
  .btn-outline:hover { background:var(--ac); color:#fff; }
  .sg-contact { background:var(--bg); }
  .sg-contact__inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; }
  .sg-form { display:flex; flex-direction:column; gap:14px; }
  .sg-form input,.sg-form textarea { width:100%; padding:13px 18px; background:#fff; border:2px solid var(--bd); color:var(--tx); font-family:var(--fb); font-size:0.95rem; border-radius:12px; transition:border-color 0.2s; }
  .sg-form input:focus,.sg-form textarea:focus { outline:none; border-color:var(--ac); }
  .sg-form textarea { resize:vertical; min-height:110px; }
  .sg-contact__info h3 { font-family:var(--fh); font-size:1.5rem; font-weight:700; margin-bottom:24px; }
  .sg-contact__item { display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; color:var(--muted); font-size:0.9rem; }
  .sg-call-btn { position:fixed; bottom:24px; right:24px; z-index:200; width:56px; height:56px; border-radius:50%; background:var(--ac); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.3rem; box-shadow:0 4px 24px rgba(0,0,0,0.2); transition:transform 0.2s; }
  .sg-call-btn:hover { transform:scale(1.12); }

  /* NAV */
  .vp2-nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:72px; background:rgba(253,249,245,0.92); backdrop-filter:blur(10px); border-bottom:1px solid var(--bd); }
  .vp2-nav__logo { font-family:var(--fh); font-size:1.15rem; font-style:italic; color:var(--tx); }
  .vp2-nav__links { display:flex; gap:32px; list-style:none; }
  .vp2-nav__links a { font-size:0.85rem; font-weight:500; color:var(--muted); transition:color 0.2s; }
  .vp2-nav__links a:hover { color:var(--tx); }
  .vp2-nav__links a[href="#buchen"] { background:var(--ac); color:#fff; padding:8px 20px; border-radius:100px; animation:vp2Gl 2.8s ease-in-out infinite; }
  .vp2-nav__links a[href="#buchen"]:hover { filter:brightness(0.9); }
  @keyframes vp2Gl { 0%,100% { box-shadow:0 0 0 0 rgba(100,100,100,0.4); } 55% { box-shadow:0 0 0 9px rgba(100,100,100,0); } }
  @media (prefers-reduced-motion:reduce) { .vp2-nav__links a[href="#buchen"] { animation:none; } }

  /* HERO — Split layout */
  .vp2-hero { min-height:100svh; display:grid; grid-template-columns:1fr 1fr; padding-top:72px; }
  .vp2-hero__left { display:flex; flex-direction:column; justify-content:center; padding:80px 64px 80px 40px; }
  .vp2-hero__tag { display:inline-flex; align-items:center; gap:10px; font-size:0.75rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--ac); margin-bottom:28px; }
  .vp2-hero__tag::before { content:''; display:block; width:28px; height:2px; background:var(--ac); border-radius:2px; }
  .vp2-hero__title { font-family:var(--fh); font-size:clamp(2.8rem,5.5vw,6rem); font-weight:700; line-height:1.05; letter-spacing:-0.02em; margin-bottom:24px; color:var(--tx); }
  .vp2-hero__title em { font-style:italic; color:var(--ac); }
  .vp2-hero__sub { font-size:1.1rem; color:var(--muted); max-width:420px; margin-bottom:40px; line-height:1.7; }
  .vp2-hero__btns { display:flex; gap:14px; flex-wrap:wrap; }
  .vp2-hero__right { position:relative; overflow:hidden; }
  .vp2-hero__right img { width:100%; height:100%; object-fit:cover; transition:transform 10s ease; }
  .vp2-hero__right:hover img { transform:scale(1.04); }
  .vp2-hero__badge { position:absolute; bottom:40px; left:-20px; background:var(--sur); border-radius:16px; padding:18px 24px; box-shadow:0 8px 32px rgba(0,0,0,0.1); }
  .vp2-hero__badge-text { font-family:var(--fh); font-size:1rem; font-weight:700; color:var(--tx); }
  .vp2-hero__badge-sub { font-size:0.75rem; color:var(--muted); margin-top:2px; }

  /* SERVICES — Karten mit Hover-Rotate */
  .vp2-svc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px; }
  .vp2-svc-card { background:#fff; border-radius:20px; padding:28px 24px; border:2px solid var(--bd); transition:all 0.3s ease; position:relative; overflow:hidden; }
  .vp2-svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--ac); transform:scaleX(0); transform-origin:left; transition:transform 0.3s ease; }
  .vp2-svc-card:hover { border-color:var(--ac); transform:translateY(-6px) rotate(-0.5deg); box-shadow:0 16px 40px rgba(0,0,0,0.1); }
  .vp2-svc-card:hover::before { transform:scaleX(1); }
  .vp2-svc-num { font-size:0.65rem; font-weight:700; letter-spacing:0.18em; color:var(--ac); text-transform:uppercase; margin-bottom:12px; }
  .vp2-svc-name { font-family:var(--fh); font-size:1.15rem; font-weight:700; margin-bottom:8px; }
  .vp2-svc-desc { font-size:0.85rem; color:var(--muted); line-height:1.6; margin-bottom:16px; }
  .vp2-svc-price { font-size:1.25rem; font-weight:700; color:var(--ac); }

  /* ABOUT — Organisches Bild + Badge */
  .vp2-about { display:grid; grid-template-columns:5fr 4fr; gap:64px; align-items:center; }
  .vp2-about__img-wrap { position:relative; }
  .vp2-about__img { border-radius:24px 80px 24px 24px; overflow:hidden; aspect-ratio:3/4; }
  .vp2-about__img img { width:100%; height:100%; object-fit:cover; transition:transform 0.8s ease; }
  .vp2-about__img-wrap:hover img { transform:scale(1.04); }
  .vp2-about__badge { position:absolute; bottom:-20px; right:-20px; background:var(--ac); color:#fff; border-radius:50%; width:110px; height:110px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:var(--fh); }
  .vp2-about__badge-num { font-size:2rem; font-weight:700; line-height:1; }
  .vp2-about__badge-txt { font-size:0.65rem; text-align:center; opacity:0.85; }
  .vp2-about__tag { font-size:0.72rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--ac); margin-bottom:18px; }
  .vp2-about__h { font-family:var(--fh); font-size:clamp(2rem,3vw,3rem); margin-bottom:20px; line-height:1.2; }
  .vp2-about__p { color:var(--muted); line-height:1.8; margin-bottom:32px; }

  /* GALLERY */
  .vp2-gal { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .vp2-gal__item { border-radius:16px; overflow:hidden; aspect-ratio:1; }
  .vp2-gal__item:first-child { grid-column:1/3; aspect-ratio:2; }
  .vp2-gal__item img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease,filter 0.4s; }
  .vp2-gal__item:hover img { transform:scale(1.06); filter:saturate(1.15); }

  /* FOOTER */
  .vp2-ft { background:var(--sur); padding:60px 0; text-align:center; }
  .vp2-ft__logo { font-family:var(--fh); font-size:1.8rem; font-style:italic; color:var(--tx); margin-bottom:12px; }
  .vp2-ft__info { font-size:0.85rem; color:var(--muted); line-height:2; }

  /* BOOKING WIDGET VARS */
  .bk-section { --c-bg:#fdf9f5; --c-surface:#fff; --c-text:#2a1f1a; --c-accent:${ac}; --c-border:rgba(42,31,26,0.12); --c-text-muted:rgba(42,31,26,0.5); --f-heading:'Libre Baskerville',serif; --f-body:'DM Sans',sans-serif; }

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
    .vp2-nav__links { display:none; } .vp2-hero { grid-template-columns:1fr; }
    .vp2-hero__right { min-height:320px; } .vp2-hero__left { padding:60px 24px 40px; }
    .vp2-about { grid-template-columns:1fr; } .vp2-about__badge { display:none; }
    .sg-contact__inner { grid-template-columns:1fr; gap:40px; }
  }
</style>`;

  const bookingHref   = data.bookingUrl || '#buchen';
  const bookingTarget = data.bookingUrl ? ' target="_blank" rel="noopener noreferrer"' : '';
  const words = (data.businessName || niche.label).split(' ');

  const body = `
<nav class="vp2-nav" id="vp2-nav">
  <a href="#hero" class="vp2-nav__logo">${words[0]}${words.length > 1 ? ` <em style="color:var(--ac)">${words.slice(1).join(' ')}</em>` : ''}</a>
  <ul class="vp2-nav__links">
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#about">Über uns</a></li>
    ${galleryPhotos.length > 0 ? '<li><a href="#gallery">Galerie</a></li>' : ''}
    <li><a href="#buchen">Termin</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>

<section class="vp2-hero" id="hero">
  <div class="vp2-hero__left" data-animate>
    <p class="vp2-hero__tag">${niche.label}</p>
    <h1 class="vp2-hero__title">${words[0]}${words.length > 1 ? `<br><em>${words.slice(1).join(' ')}</em>` : ''}</h1>
    <p class="vp2-hero__sub">${data.tagline || niche.heroTagline}</p>
    <div class="vp2-hero__btns">
      <a href="${bookingHref}"${bookingTarget} class="btn btn-primary">${niche.heroCta} ✦</a>
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ ${data.phone}</a>` : ''}
    </div>
  </div>
  <div class="vp2-hero__right">
    ${heroPhoto ? `<img src="${heroPhoto}" alt="${data.businessName || niche.label}">` : `<div style="width:100%;height:100%;min-height:400px;background:var(--sur)"></div>`}
    ${data.tagline ? `<div class="vp2-hero__badge"><div class="vp2-hero__badge-text">★★★★★</div><div class="vp2-hero__badge-sub">Top<br>Salon</div></div>` : ''}
  </div>
</section>
${isHair ? buildServicesTicker(services, ac) : ''}

<section class="vp2-services sec" id="services">
  <div class="con">
    <h2 class="section-title" data-animate>${niche.servicesLabel}</h2>
    <p class="section-subtitle" data-animate data-animate-delay="1">Unsere Leistungen für dich</p>
    <div class="vp2-svc-grid">
      ${services.map((s, i) => `
      <div class="vp2-svc-card" data-animate data-animate-delay="${Math.min(i+1,5)}">
        <div class="vp2-svc-num">0${i+1}</div>
        <div class="vp2-svc-name">${s.name}</div>
        <div class="vp2-svc-desc">${s.desc || ''}</div>
        ${s.price ? `<div class="vp2-svc-price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="vp2-about-wrap sec" id="about" style="background:var(--sur)">
  <div class="con">
    <div class="vp2-about">
      <div class="vp2-about__img-wrap" data-animate="left">
        <div class="vp2-about__img">
          ${aboutPhoto ? `<img src="${aboutPhoto}" alt="${data.businessName || niche.label}">` : `<div style="width:100%;height:100%;background:#e8dbd5;min-height:400px"></div>`}
        </div>
        <div class="vp2-about__badge">
          <div class="vp2-about__badge-num">15+</div>
          <div class="vp2-about__badge-txt">Jahre<br>Erfahrung</div>
        </div>
      </div>
      <div data-animate="right">
        <p class="vp2-about__tag">${niche.aboutLabel}</p>
        <h2 class="vp2-about__h">${data.businessName || niche.label}</h2>
        <p class="vp2-about__p">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.85rem;color:var(--muted);margin-bottom:28px">📍 ${data.address}</p>` : ''}
        <div style="display:flex;gap:14px;flex-wrap:wrap">
          <a href="${bookingHref}"${bookingTarget} class="btn btn-primary">${niche.heroCta} ✦</a>
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">☎ Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${galleryPhotos.length > 0 ? `
<section class="sec" id="gallery">
  <div class="con">
    <h2 class="section-title" data-animate>Unsere Arbeit</h2>
    <p class="section-subtitle" data-animate data-animate-delay="1">Einblicke in den Salon</p>
    <div class="vp2-gal">
      ${[heroPhoto, ...galleryPhotos].filter(Boolean).slice(0,4).map((src, i) => `
      <div class="vp2-gal__item" data-animate data-animate-delay="${Math.min(i+1,4)}">
        <img src="${src}" alt="Galerie ${i+1}" loading="lazy">
      </div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildBookingWidget(data, niche)}
${buildContactSection(data, niche)}

<footer class="vp2-ft">
  <div class="con">
    <div class="vp2-ft__logo">${data.businessName || niche.label}</div>
    <p class="vp2-ft__info">
      ${data.address || ''}${data.phone ? `<br><a href="tel:${data.phone}" style="color:inherit">${data.phone}</a>` : ''}${data.email ? ` · <a href="mailto:${data.email}" style="color:inherit">${data.email}</a>` : ''}
    </p>
    <p style="margin-top:20px;font-size:0.72rem;color:var(--muted)">© ${new Date().getFullYear()} ${data.businessName || niche.label}</p>
  </div>
</footer>
${buildCallButton(data)}

<script>
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
