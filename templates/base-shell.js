export function buildShell({ head, body, colors, fonts, dark }) {
  const bg      = dark ? colors.bg : '#ffffff';
  const text    = dark ? colors.text : '#1a1a1a';
  const surface = dark ? '#1e1e1e' : '#f8f8f8';

  return `<!DOCTYPE html>
<html lang="de" data-theme="${dark ? 'dark' : 'light'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${head}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${fonts.gfonts}&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --c-primary: ${colors.primary};
    --c-accent:  ${colors.accent};
    --c-bg:      ${bg};
    --c-surface: ${surface};
    --c-text:    ${text};
    --c-text-muted: ${dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'};
    --c-border:  ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    --f-heading: ${fonts.heading};
    --f-body:    ${fonts.body};
    --radius:    4px;
    --radius-lg: 12px;
    --shadow:    0 4px 24px rgba(0,0,0,${dark ? '0.4' : '0.08'});
    --shadow-lg: 0 12px 48px rgba(0,0,0,${dark ? '0.6' : '0.15'});
    --transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
  body {
    font-family: var(--f-body);
    background: var(--c-bg);
    color: var(--c-text);
    line-height: 1.6;
    overflow-x: hidden;
  }
  h1, h2, h3, h4 { font-family: var(--f-heading); line-height: 1.15; letter-spacing: -0.02em; }
  img { max-width: 100%; height: auto; display: block; }
  a { color: var(--c-accent); text-decoration: none; }
  /* Prevent fixed nav from covering anchor targets */
  section[id] { scroll-margin-top: 72px; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .section { padding: 80px 0; }
  .section-title { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 12px; }
  .section-subtitle { color: var(--c-text-muted); font-size: 1.1rem; margin-bottom: 48px; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: var(--radius);
    font-family: var(--f-body); font-size: 1rem; font-weight: 600;
    cursor: pointer; transition: var(--transition); border: none;
    text-decoration: none; white-space: nowrap;
  }
  .btn-primary { background: var(--c-accent); color: #000; }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .btn-outline { background: transparent; color: var(--c-text); border: 2px solid var(--c-border); }
  .btn-outline:hover { border-color: var(--c-accent); color: var(--c-accent); }

  /* ── Shared Nav ── */
  .sg-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 70px;
    background: ${dark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)'};
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--c-border);
    transition: background 0.3s;
  }
  .sg-nav__logo {
    font-family: var(--f-heading); font-size: 1.4rem; font-weight: 700;
    color: var(--c-text); text-decoration: none;
    display: flex; align-items: center; gap: 10px;
  }
  .sg-nav__logo img { height: 36px; width: auto; }
  .sg-nav__links { display: flex; align-items: center; gap: 32px; list-style: none; }
  .sg-nav__links a { color: var(--c-text-muted); font-size: 0.9rem; font-weight: 500; transition: color 0.2s; letter-spacing: 0.05em; }
  .sg-nav__links a:hover { color: var(--c-text); }
  .sg-nav__cta { margin-left: 16px; padding: 10px 24px; font-size: 0.9rem; }

  /* ── Termin-Buchen CTA (Frisör / Barber) ── */
  @keyframes sg-book-glow {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c-accent) 50%, transparent); }
    55%       { box-shadow: 0 0 0 9px transparent; }
  }
  .sg-nav__book-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 22px; border-radius: var(--radius);
    background: var(--c-accent); color: #000;
    font-family: var(--f-body); font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    text-decoration: none; white-space: nowrap; flex-shrink: 0;
    animation: sg-book-glow 2.8s ease-in-out infinite;
  }
  .sg-nav__book-btn:hover { opacity: 0.88; color: #000; }
  @media (prefers-reduced-motion: reduce) { .sg-nav__book-btn { animation: none; } }

  /* ── Shared Services Grid ── */
  .sg-services { background: var(--c-surface); }
  .sg-services__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
  .sg-service-card {
    background: var(--c-bg); border: 1px solid var(--c-border);
    border-radius: var(--radius-lg); padding: 28px 24px;
    transition: var(--transition);
  }
  .sg-service-card:hover { border-color: var(--c-accent); transform: translateY(-4px); box-shadow: var(--shadow); }
  .sg-service-card__name { font-family: var(--f-heading); font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
  .sg-service-card__desc { font-size: 0.9rem; color: var(--c-text-muted); margin-bottom: 16px; }
  .sg-service-card__price { font-size: 1.25rem; font-weight: 700; color: var(--c-accent); }

  /* ── Shared Gallery ── */
  .sg-gallery__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;
    border-radius: var(--radius-lg); overflow: hidden;
  }
  .sg-gallery__item {
    aspect-ratio: 1; overflow: hidden; background: var(--c-surface);
    cursor: zoom-in; position: relative;
  }
  .sg-gallery__item img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.9);
    transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s;
    will-change: transform;
  }
  .sg-gallery__item:hover img { transform: scale(1.08); filter: brightness(1.04); }
  .sg-gallery__item:first-child { grid-column: 1 / 3; aspect-ratio: 2; }

  /* ── Shared Team ── */
  .sg-team { background: var(--c-surface); }
  .sg-team__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 32px; }
  .sg-team__card { text-align: center; }
  .sg-team__avatar {
    width: 120px; height: 120px; border-radius: 50%;
    overflow: hidden; margin: 0 auto 16px;
    background: var(--c-border); border: 3px solid var(--c-accent);
  }
  .sg-team__avatar img { width: 100%; height: 100%; object-fit: cover; }
  .sg-team__name { font-family: var(--f-heading); font-size: 1.1rem; font-weight: 700; }
  .sg-team__role { font-size: 0.85rem; color: var(--c-text-muted); margin-top: 4px; }

  /* ── Shared Extras ── */
  .sg-extras { background: var(--c-primary); color: #fff; text-align: center; padding: 80px 0; }
  .sg-extras h2 { font-size: clamp(2rem, 4vw, 3.5rem); margin-bottom: 16px; color: #fff; }
  .sg-extras p { opacity: 0.75; margin-bottom: 40px; }
  .sg-hours { display: inline-grid; grid-template-columns: auto auto; gap: 8px 32px; text-align: left; margin-top: 32px; font-size: 0.95rem; }
  .sg-hours__label { opacity: 0.6; }
  .sg-hours__time { font-weight: 600; }

  /* ── Shared Contact ── */
  .sg-contact { background: var(--c-bg); }
  .sg-contact__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
  .sg-form { display: flex; flex-direction: column; gap: 16px; }
  .sg-form input, .sg-form textarea {
    width: 100%; padding: 14px 16px;
    background: var(--c-surface); border: 1px solid var(--c-border);
    border-radius: var(--radius); color: var(--c-text);
    font-family: var(--f-body); font-size: 1rem; outline: none;
    transition: border-color 0.2s;
  }
  .sg-form input:focus, .sg-form textarea:focus { border-color: var(--c-accent); }
  .sg-form textarea { resize: vertical; min-height: 140px; }
  .sg-contact__info h3 { font-family: var(--f-heading); font-size: 1.5rem; margin-bottom: 24px; }
  .sg-contact__item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; color: var(--c-text-muted); }

  /* ── Footer ── */
  .sg-footer {
    background: ${dark ? '#000' : '#111'};
    color: rgba(255,255,255,0.45); padding: 32px 0; text-align: center; font-size: 0.85rem;
  }
  .sg-footer strong { color: rgba(255,255,255,0.8); }

  /* ── Call Button ── */
  .sg-call-btn {
    position: fixed; bottom: 28px; right: 28px; z-index: 200;
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--c-accent); display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.35); transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
  }
  .sg-call-btn:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }

  /* ── Scroll Animations ── */
  [data-animate] {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  [data-animate="fade"]  { transform: none; }
  [data-animate="left"]  { transform: translateX(-40px); }
  [data-animate="right"] { transform: translateX(40px); }
  [data-animate="scale"] { transform: scale(1.04); }
  [data-animate].visible { opacity: 1; transform: none; }
  [data-animate-delay="1"] { transition-delay: 0.1s; }
  [data-animate-delay="2"] { transition-delay: 0.2s; }
  [data-animate-delay="3"] { transition-delay: 0.3s; }
  [data-animate-delay="4"] { transition-delay: 0.4s; }
  [data-animate-delay="5"] { transition-delay: 0.5s; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
    [data-animate] { opacity: 1; transform: none; }
  }
  @media (max-width: 768px) {
    .sg-nav__links { display: none; }
    .sg-contact__inner { grid-template-columns: 1fr; }
    .sg-gallery__grid { grid-template-columns: repeat(2, 1fr); }
    .sg-gallery__item:first-child { grid-column: 1 / 3; }
    .section { padding: 60px 0; }
    .sg-nav { padding: 0 20px; }
  }
</style>
</head>
<body>
${body}
<script>
(function() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
})();
</script>
</body>
</html>`;
}

export function lighten(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * amount)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + Math.round(255 * amount)));
  const b = Math.min(255, Math.max(0, (num & 0xff) + Math.round(255 * amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function svgIcon(name) {
  const icons = {
    phone:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    mail:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    map:       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    arrow:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    phoneCall: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  };
  return icons[name] || '';
}

export function buildNav(data, niche) {
  const isHairNiche = ['friser', 'barber'].includes(niche.id);
  const logoHtml = data.logoDataUrl
    ? `<img src="${data.logoDataUrl}" alt="${data.businessName}">`
    : `<span>${data.businessName || niche.label}</span>`;
  return `
<nav class="sg-nav">
  <a class="sg-nav__logo" href="#">${logoHtml}</a>
  <ul class="sg-nav__links">
    <li><a href="#about">${niche.aboutLabel}</a></li>
    <li><a href="#services">${niche.servicesLabel}</a></li>
    ${data.showTeam ? `<li><a href="#team">${niche.teamLabel}</a></li>` : ''}
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;margin-left:16px">
    ${data.phone ? `<a class="btn btn-outline sg-nav__cta" href="tel:${data.phone}" style="padding:8px 16px;font-size:0.8rem">${svgIcon('phone')} ${data.phone}</a>` : ''}
    ${isHairNiche
      ? `<a class="sg-nav__book-btn" href="#buchen">Termin buchen</a>`
      : data.bookingUrl
        ? `<a class="btn btn-primary sg-nav__cta" href="${data.bookingUrl}" target="_blank" rel="noopener noreferrer">Termin buchen</a>`
        : ''}
  </div>
</nav>`;
}

export function buildFooter(data, niche) {
  return `
<footer class="sg-footer">
  <div class="container">
    <p><strong>${data.businessName || niche.label}</strong>${data.address ? ` &bull; ${data.address}` : ''}${data.phone ? ` &bull; <a href="tel:${data.phone}" style="color:rgba(255,255,255,0.45)">${data.phone}</a>` : ''}</p>
    <p style="margin-top:8px">&copy; ${new Date().getFullYear()} ${data.businessName || niche.label}. Alle Rechte vorbehalten.</p>
  </div>
</footer>`;
}

export function buildContactSection(data, niche) {
  const formAction = data.formspreeId ? `https://formspree.io/f/${data.formspreeId}` : `mailto:${data.email || ''}`;
  return `
<section class="sg-contact section" id="contact">
  <div class="container">
    <h2 class="section-title" data-animate>Kontakt</h2>
    <p class="section-subtitle" data-animate>Wir freuen uns auf Ihre Nachricht</p>
    <div class="sg-contact__inner">
      <form class="sg-form" action="${formAction}" ${data.formspreeId ? 'method="POST"' : ''} data-animate="left">
        <input type="text" name="name" placeholder="Ihr Name" required>
        <input type="email" name="email" placeholder="Ihre E-Mail" required>
        <input type="tel" name="phone" placeholder="Ihre Telefonnummer">
        <textarea name="message" placeholder="Ihre Nachricht…" required></textarea>
        <button type="submit" class="btn btn-primary">Nachricht senden ${svgIcon('arrow')}</button>
      </form>
      <div class="sg-contact__info" data-animate="right">
        <h3>${data.businessName || niche.label}</h3>
        ${data.address ? `<div class="sg-contact__item">${svgIcon('map')}<span>${data.address}</span></div>` : ''}
        ${data.phone   ? `<div class="sg-contact__item">${svgIcon('phone')}<span><a href="tel:${data.phone}" style="color:inherit">${data.phone}</a></span></div>` : ''}
        ${data.email   ? `<div class="sg-contact__item">${svgIcon('mail')}<span><a href="mailto:${data.email}" style="color:inherit">${data.email}</a></span></div>` : ''}
        ${data.hours   ? `<div class="sg-contact__item" style="margin-top:24px">${svgIcon('clock')}<span style="white-space:pre-line">${data.hours}</span></div>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

export function buildExtrasSection(data, niche) {
  if (!data.bookingUrl && !data.phone) return '';
  return `
<section class="sg-extras" id="extras">
  <div class="container">
    <h2 data-animate>${niche.extrasCta}</h2>
    <p data-animate>${data.tagline || niche.heroSubline}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap" data-animate>
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Termin buchen ${svgIcon('arrow')}</a>` : `<a href="#buchen" class="btn btn-primary">Termin buchen ${svgIcon('arrow')}</a>`}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.3)">Direkt anrufen ${svgIcon('phone')}</a>` : ''}
    </div>
    ${data.hours ? `<div class="sg-hours" data-animate>
      ${data.hours.split('\n').map(line => {
        const [label, ...rest] = line.split(':');
        return rest.length
          ? `<span class="sg-hours__label">${label}</span><span class="sg-hours__time">${rest.join(':').trim()}</span>`
          : `<span class="sg-hours__label" style="grid-column:1/-1">${line}</span>`;
      }).join('')}
    </div>` : ''}
  </div>
</section>`;
}

export function buildCallButton(data) {
  if (!data.phone) return '';
  return `<a class="sg-call-btn" href="tel:${data.phone}" title="Jetzt anrufen">${svgIcon('phoneCall')}</a>`;
}

export function buildGallery(photos, niche) {
  if (!photos?.length) return '';
  return `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title" data-animate>Galerie</h2>
    <p class="section-subtitle" data-animate>Einblicke in unsere Arbeit</p>
    <div class="sg-gallery__grid">
      ${photos.slice(0, 9).map((src, i) => `<div class="sg-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}"><img src="${src}" alt="Galerie ${i+1}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>`;
}

export function buildTeam(data, niche) {
  const isHairNiche = ['friser', 'barber'].includes(niche.id);
  // Hair niches always show team (with defaults if none entered); others only when toggled
  const team = data.team?.length ? data.team : (isHairNiche ? (niche.teamDefault || []) : []);
  if (!team.length) return '';
  if (!isHairNiche && !data.showTeam) return '';

  return `
<!-- TEAM SECTION -->
<style>
  .sg-team { padding: 100px 0; background: var(--c-surface, inherit); }
  .sg-team .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; text-align: center; }
  .sg-team__headline {
    font-family: var(--f-heading, var(--ff-serif, var(--ff-display, serif)));
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 700; margin-bottom: 56px;
    color: var(--c-text, inherit);
    letter-spacing: -0.02em;
  }
  .sg-team__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
  }
  .sg-team__card {
    text-align: center;
    flex: 0 0 160px;
    cursor: default;
  }
  .sg-team__avatar {
    width: 140px; height: 140px; border-radius: 50%;
    overflow: hidden; margin: 0 auto 18px;
    background: var(--c-border, #ddd);
    border: 3px solid var(--c-accent, #c9a84c);
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
    transition: box-shadow 0.45s ease;
    position: relative;
  }
  .sg-team__avatar img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .sg-team__card:hover .sg-team__avatar img { transform: scale(1.13); }
  .sg-team__card:hover .sg-team__avatar { box-shadow: 0 12px 40px rgba(0,0,0,0.22); }
  @media (prefers-reduced-motion: reduce) {
    .sg-team__avatar img { transition: none; }
  }
  .sg-team__name {
    font-family: var(--f-heading, var(--ff-serif, serif));
    font-size: 1rem; font-weight: 700;
    color: var(--c-text, inherit); margin-bottom: 5px;
  }
  .sg-team__role {
    font-size: 0.78rem;
    color: var(--c-accent, #c9a84c);
    letter-spacing: 0.07em; text-transform: uppercase;
  }
  @media (max-width: 600px) {
    .sg-team__card { flex: 0 0 130px; }
    .sg-team__avatar { width: 110px; height: 110px; }
  }
</style>
<section class="sg-team" id="team">
  <div class="container">
    <h2 class="sg-team__headline" data-animate>${niche.teamLabel}</h2>
    <div class="sg-team__grid">
      ${team.map((m, i) => `
      <div class="sg-team__card" data-animate data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-team__avatar">
          ${m.photoUrl
            ? `<img src="${m.photoUrl}" alt="${m.name}" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:700;color:var(--c-accent,#c9a84c)">${m.name.charAt(0)}</div>`}
        </div>
        <div class="sg-team__name">${m.name}</div>
        <div class="sg-team__role">${m.role}</div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
}

// ─────────────────────────────────────────────────────────
// SERVICES TICKER — horizontaler Scrollbalken oben
// ─────────────────────────────────────────────────────────
export function buildServicesTicker(services, accentColor = '#c9a84c') {
  if (!services?.length) return '';
  // Dupliziere für nahtlosen Loop
  const items = [...services, ...services, ...services];
  return `
<div class="sg-ticker" aria-hidden="true">
  <div class="sg-ticker__track">
    ${items.map(s => `
    <span class="sg-ticker__item">
      <span class="sg-ticker__name">${s.name}</span>
      ${s.price ? `<span class="sg-ticker__price">${s.price}</span>` : ''}
      <span class="sg-ticker__sep">◆</span>
    </span>`).join('')}
  </div>
</div>
<style>
  .sg-ticker {
    width: 100%; overflow: hidden;
    background: ${accentColor};
    color: #000;
    padding: 10px 0;
    position: relative; z-index: 99;
  }
  .sg-ticker__track {
    display: flex; align-items: center; gap: 0;
    width: max-content;
    animation: tickerScroll 40s linear infinite;
  }
  .sg-ticker:hover .sg-ticker__track { animation-play-state: paused; }
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.333%); }
  }
  .sg-ticker__item {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 0 28px; white-space: nowrap;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
  }
  .sg-ticker__name { }
  .sg-ticker__price { opacity: 0.65; font-weight: 400; }
  .sg-ticker__sep { opacity: 0.4; font-size: 0.55rem; }
  @media (prefers-reduced-motion: reduce) {
    .sg-ticker__track { animation: none; }
    .sg-ticker { overflow-x: auto; }
  }
</style>`;
}

// ─────────────────────────────────────────────────────────
// BOOKING WIDGET — Terminbuchung (Frisör & Barber)
// Service → Mitarbeiter → Datum → Uhrzeit → Kontaktdaten
// ─────────────────────────────────────────────────────────
export function buildBookingWidget(data, niche) {
  const services = (data.services?.length ? data.services : niche.servicesDefault);
  const team = (data.showTeam && data.team?.length) ? data.team : [];
  const formAction = data.formspreeId
    ? `https://formspree.io/f/${data.formspreeId}`
    : `mailto:${data.email || ''}`;

  const teamItems = team.length
    ? team.map((m, i) => `
      <div class="bk-member" data-member="${i}" data-name="${m.name}">
        <div class="bk-member__avatar">${m.name.charAt(0).toUpperCase()}</div>
        <div class="bk-member__name">${m.name}</div>
        ${m.role ? `<div class="bk-member__role">${m.role}</div>` : ''}
      </div>`).join('')
    : `<p style="opacity:0.5;font-size:0.85rem">Nächster freier Mitarbeiter</p>`;

  return `
<!-- ── BOOKING WIDGET ── -->
<section class="bk-section" id="buchen">
<div class="bk-wrap">

<div class="bk-header">
  <h2 class="bk-title">Termin buchen</h2>
  <p class="bk-sub">Wähle deinen Service, Mitarbeiter, Datum und Uhrzeit</p>
</div>

<div class="bk-grid">

  <!-- A: SERVICE -->
  <div class="bk-col" id="bk-col-service">
    <div class="bk-col__label"><span class="bk-col__letter">A</span> Service</div>
    <div class="bk-services">
      ${services.map((s, i) => `
      <div class="bk-svc" data-idx="${i}" data-name="${s.name}" data-price="${s.price || ''}" data-duration="${s.duration || 30}">
        <div class="bk-svc__info">
          <span class="bk-svc__name">${s.name}</span>
          ${s.duration ? `<span class="bk-svc__dur">${s.duration} min</span>` : ''}
        </div>
        ${s.price ? `<span class="bk-svc__price">${s.price}</span>` : ''}
      </div>`).join('')}
    </div>
  </div>

  <!-- B: MITARBEITER -->
  <div class="bk-col" id="bk-col-team">
    <div class="bk-col__label"><span class="bk-col__letter">B</span> Bei</div>
    <div class="bk-team">
      ${teamItems}
    </div>
  </div>

  <!-- C: DATUM -->
  <div class="bk-col bk-col--wide" id="bk-col-date">
    <div class="bk-col__label"><span class="bk-col__letter">C</span> Datum</div>
    <div class="bk-cal">
      <div class="bk-cal__nav">
        <button class="bk-cal__nav-btn" id="bk-prev">&#8249;</button>
        <span class="bk-cal__month" id="bk-cal-title"></span>
        <button class="bk-cal__nav-btn" id="bk-next">&#8250;</button>
      </div>
      <div class="bk-cal__grid" id="bk-cal-grid"></div>
    </div>
    <!-- D: UHRZEIT inline unter Datum -->
    <div class="bk-col__label" style="margin-top:24px"><span class="bk-col__letter">D</span> Uhrzeit</div>
    <div class="bk-times" id="bk-times">
      <p class="bk-times__hint">Erst Datum wählen</p>
    </div>
  </div>

  <!-- E: DEINE DATEN + Zusammenfassung -->
  <div class="bk-col" id="bk-col-form">
    <div class="bk-col__label"><span class="bk-col__letter">E</span> Deine Daten</div>
    <form class="bk-form" id="bk-form" action="${formAction}" method="POST">
      <input type="hidden" name="_subject" value="Terminanfrage — ${data.businessName || niche.label}">
      <input type="hidden" id="bk-h-service" name="service" value="">
      <input type="hidden" id="bk-h-member" name="mitarbeiter" value="">
      <input type="hidden" id="bk-h-date" name="datum" value="">
      <input type="hidden" id="bk-h-time" name="uhrzeit" value="">
      <input class="bk-input" type="text"  name="name"   placeholder="Name *"           required>
      <input class="bk-input" type="tel"   name="phone"  placeholder="Telefon *"         required>
      <input class="bk-input" type="email" name="email"  placeholder="E-Mail (optional)">
      <textarea class="bk-input bk-textarea" name="note" placeholder="Anmerkung (optional)" rows="3"></textarea>
      <div class="bk-summary">
        <div class="bk-summary__row"><span>Service</span><span id="bs-service">—</span></div>
        <div class="bk-summary__row"><span>Datum</span><span id="bs-date">—</span></div>
        <div class="bk-summary__row"><span>Uhrzeit</span><span id="bs-time">—</span></div>
        <div class="bk-summary__row" id="bs-member-row" style="display:none"><span>Bei</span><span id="bs-member">—</span></div>
      </div>
      <button class="bk-submit" type="submit" id="bk-submit">Termin anfragen</button>
    </form>
  </div>

</div><!-- /bk-grid -->
</div><!-- /bk-wrap -->
</section>

<style>
  /* ── BOOKING WIDGET STYLES ── */
  .bk-section { background: var(--c-surface, #f8f8f8); padding: 80px 0; }
  .bk-wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
  .bk-header { margin-bottom: 40px; }
  .bk-title { font-family: var(--f-heading, serif); font-size: clamp(1.8rem, 3vw, 2.6rem); margin-bottom: 8px; }
  .bk-sub { color: var(--c-text-muted, #888); font-size: 0.95rem; }

  .bk-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1.6fr 1fr;
    gap: 2px;
    background: var(--c-border, #e0e0e0);
    border: 1px solid var(--c-border, #e0e0e0);
  }
  .bk-col {
    background: var(--c-bg, #fff);
    padding: 20px 16px;
    display: flex; flex-direction: column; gap: 0;
  }
  .bk-col__label {
    display: flex; align-items: center; gap: 10px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--c-text-muted, #888);
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid var(--c-border, #e0e0e0);
  }
  .bk-col__letter {
    display: inline-flex; align-items: center; justify-content: center;
    width: 20px; height: 20px;
    background: var(--c-text, #111); color: var(--c-bg, #fff);
    font-size: 0.65rem; font-weight: 700; border-radius: 2px;
  }

  /* Services */
  .bk-services { display: flex; flex-direction: column; gap: 0; }
  .bk-svc {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 12px; border-bottom: 1px solid var(--c-border, #eee);
    cursor: pointer; transition: background 0.15s;
    border-left: 3px solid transparent;
  }
  .bk-svc:hover { background: var(--c-surface, #f8f8f8); }
  .bk-svc.active {
    background: var(--c-text, #111); color: var(--c-bg, #fff);
    border-left-color: var(--c-accent, #c9a84c);
  }
  .bk-svc__info { display: flex; flex-direction: column; gap: 2px; }
  .bk-svc__name { font-size: 0.9rem; font-weight: 500; }
  .bk-svc__dur { font-size: 0.72rem; opacity: 0.55; }
  .bk-svc__price { font-size: 0.9rem; font-weight: 700; white-space: nowrap; }
  .bk-svc.active .bk-svc__price { color: var(--c-accent, #c9a84c); }

  /* Team */
  .bk-team { display: flex; flex-direction: column; gap: 0; }
  .bk-member {
    display: flex; align-items: center; gap: 12px;
    padding: 12px; border-bottom: 1px solid var(--c-border, #eee);
    cursor: pointer; transition: background 0.15s;
    border-left: 3px solid transparent;
  }
  .bk-member:hover { background: var(--c-surface, #f8f8f8); }
  .bk-member.active { background: var(--c-text, #111); color: var(--c-bg, #fff); border-left-color: var(--c-accent, #c9a84c); }
  .bk-member__avatar {
    width: 32px; height: 32px; border-radius: 2px;
    background: var(--c-surface, #f0f0f0); border: 1px solid var(--c-border, #ddd);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; font-weight: 700; flex-shrink: 0;
  }
  .bk-member.active .bk-member__avatar { background: var(--c-accent, #c9a84c); color: #000; border-color: transparent; }
  .bk-member__name { font-size: 0.9rem; font-weight: 500; }
  .bk-member__role { font-size: 0.72rem; opacity: 0.55; }

  /* Calendar */
  .bk-cal__nav {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .bk-cal__nav-btn {
    background: none; border: 1px solid var(--c-border, #ddd); color: var(--c-text, #111);
    width: 28px; height: 28px; cursor: pointer; font-size: 1.1rem; border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .bk-cal__nav-btn:hover { background: var(--c-surface, #f0f0f0); }
  .bk-cal__month { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  .bk-cal__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
  .bk-cal__day-name {
    font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    text-align: center; color: var(--c-text-muted, #888); padding: 4px 0;
  }
  .bk-cal__day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    font-size: 0.82rem; cursor: pointer; border-radius: 2px;
    transition: background 0.15s; position: relative;
  }
  .bk-cal__day:hover:not(.disabled):not(.empty) { background: var(--c-surface, #f0f0f0); }
  .bk-cal__day.today::after { content: '•'; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); font-size: 0.45rem; color: var(--c-accent, #c9a84c); }
  .bk-cal__day.selected { background: var(--c-text, #111); color: var(--c-bg, #fff); }
  .bk-cal__day.disabled, .bk-cal__day.empty { color: var(--c-border, #ccc); cursor: default; }
  .bk-cal__day.past { color: var(--c-border, #ccc); cursor: default; }

  /* Times */
  .bk-times { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
  .bk-times__hint { font-size: 0.8rem; opacity: 0.45; }
  .bk-time {
    padding: 7px 14px; border: 1px solid var(--c-border, #ddd);
    font-size: 0.8rem; font-weight: 500; cursor: pointer; border-radius: 2px;
    transition: all 0.15s;
  }
  .bk-time:hover { border-color: var(--c-accent, #c9a84c); color: var(--c-accent, #c9a84c); }
  .bk-time.selected { background: var(--c-text, #111); color: var(--c-bg, #fff); border-color: var(--c-text, #111); }

  /* Form */
  .bk-form { display: flex; flex-direction: column; gap: 10px; }
  .bk-input {
    width: 100%; padding: 11px 12px;
    background: var(--c-surface, #f8f8f8);
    border: 1px solid var(--c-border, #ddd);
    color: var(--c-text, #111); font-size: 0.88rem;
    border-radius: 2px; outline: none; transition: border-color 0.2s;
    font-family: var(--f-body, sans-serif);
  }
  .bk-input:focus { border-color: var(--c-accent, #c9a84c); }
  .bk-textarea { resize: vertical; min-height: 72px; }
  .bk-summary {
    background: var(--c-surface, #f0f0f0);
    padding: 12px; margin: 4px 0;
    display: flex; flex-direction: column; gap: 0;
    border: 1px solid var(--c-border, #e0e0e0);
  }
  .bk-summary__row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; border-bottom: 1px solid var(--c-border, #e8e8e8);
    font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--c-text-muted, #888);
  }
  .bk-summary__row:last-child { border-bottom: none; }
  .bk-summary__row span:last-child { font-weight: 600; color: var(--c-text, #111); font-size: 0.8rem; }
  .bk-submit {
    background: var(--c-text, #111); color: var(--c-bg, #fff);
    border: none; padding: 14px; font-size: 0.75rem;
    font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; transition: opacity 0.2s;
    font-family: var(--f-body, sans-serif); opacity: 0.45;
  }
  .bk-submit.ready { opacity: 1; background: var(--c-accent, #c9a84c); color: #000; }
  .bk-submit.ready:hover { opacity: 0.88; }

  @media (max-width: 900px) {
    .bk-grid { grid-template-columns: 1fr 1fr; }
    .bk-col--wide { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .bk-grid { grid-template-columns: 1fr; }
  }
</style>

<script>
(function() {
  // ── State ──
  const state = { service: null, member: null, date: null, time: null };
  let calYear, calMonth;
  const today = new Date();
  calYear = today.getFullYear();
  calMonth = today.getMonth();

  // ── Helpers ──
  const $ = id => document.getElementById(id);
  const DAYS = ['MO','DI','MI','DO','FR','SA','SO'];
  const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

  function updateSummary() {
    $('bs-service').textContent = state.service?.name || '—';
    $('bs-date').textContent = state.date
      ? state.date.toLocaleDateString('de-DE', { weekday:'short', day:'2-digit', month:'short' })
      : '—';
    $('bs-time').textContent = state.time || '—';
    if (state.member) {
      $('bs-member-row').style.display = 'flex';
      $('bs-member').textContent = state.member;
    }
    $('bk-h-service').value = state.service ? state.service.name + (state.service.price ? ' — ' + state.service.price : '') : '';
    $('bk-h-member').value = state.member || '';
    $('bk-h-date').value = state.date ? state.date.toLocaleDateString('de-DE') : '';
    $('bk-h-time').value = state.time || '';
    const ready = state.service && state.date && state.time;
    $('bk-submit').classList.toggle('ready', !!ready);
  }

  // ── Service Selection ──
  document.querySelectorAll('.bk-svc').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.bk-svc').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      state.service = {
        name: el.dataset.name,
        price: el.dataset.price,
        duration: parseInt(el.dataset.duration) || 30,
      };
      renderTimes();
      updateSummary();
    });
  });

  // ── Team Selection ──
  document.querySelectorAll('.bk-member').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.bk-member').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      state.member = el.dataset.name;
      updateSummary();
    });
  });

  // ── Calendar ──
  function renderCal() {
    const grid = $('bk-cal-grid');
    $('bk-cal-title').textContent = MONTHS[calMonth] + ' ' + calYear;
    const firstDay = new Date(calYear, calMonth, 1);
    let startDow = firstDay.getDay(); // 0=Sun
    if (startDow === 0) startDow = 7; // Mon-first
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    let html = DAYS.map(d => '<div class="bk-cal__day-name">' + d + '</div>').join('');
    for (let i = 1; i < startDow; i++) html += '<div class="bk-cal__day empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(calYear, calMonth, d);
      const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSun  = thisDate.getDay() === 0;
      const isToday = thisDate.toDateString() === today.toDateString();
      const isSel   = state.date && thisDate.toDateString() === state.date.toDateString();
      const cls = [
        'bk-cal__day',
        isPast || isSun ? 'past' : '',
        isToday ? 'today' : '',
        isSel ? 'selected' : '',
      ].filter(Boolean).join(' ');
      html += '<div class="' + cls + '" data-d="' + d + '">' + d + '</div>';
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.bk-cal__day:not(.past):not(.empty):not(.disabled)').forEach(el => {
      el.addEventListener('click', () => {
        const d = parseInt(el.dataset.d);
        if (!d) return;
        const day = new Date(calYear, calMonth, d);
        if (day.getDay() === 0) return; // Sunday closed
        state.date = day;
        state.time = null;
        renderCal();
        renderTimes();
        updateSummary();
      });
    });
  }

  $('bk-prev').addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCal();
  });
  $('bk-next').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCal();
  });

  // ── Time Slots ──
  function renderTimes() {
    const container = $('bk-times');
    if (!state.date) { container.innerHTML = '<p class="bk-times__hint">Erst Datum wählen</p>'; return; }
    const duration = state.service?.duration || 30;
    const open  = 9 * 60;   // 09:00
    const close = 18 * 60;  // 18:00
    let html = '';
    for (let m = open; m + duration <= close; m += duration) {
      const hh = String(Math.floor(m / 60)).padStart(2, '0');
      const mm = String(m % 60).padStart(2, '0');
      const t = hh + ':' + mm;
      const isSel = state.time === t;
      html += '<div class="bk-time' + (isSel ? ' selected' : '') + '" data-t="' + t + '">' + t + '</div>';
    }
    container.innerHTML = html;
    container.querySelectorAll('.bk-time').forEach(el => {
      el.addEventListener('click', () => {
        state.time = el.dataset.t;
        renderTimes();
        updateSummary();
      });
    });
  }

  // ── Init ──
  renderCal();
  updateSummary();

  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
})();
</script>`;
}
