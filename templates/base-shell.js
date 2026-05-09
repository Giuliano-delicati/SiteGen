export function buildShell({ head, body, colors, fonts, dark }) {
  const bg = dark ? colors.bg : '#ffffff';
  const text = dark ? colors.text : '#1a1a1a';
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
    --c-accent: ${colors.accent};
    --c-bg: ${bg};
    --c-surface: ${surface};
    --c-text: ${text};
    --c-text-muted: ${dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'};
    --c-border: ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    --f-heading: ${fonts.heading};
    --f-body: ${fonts.body};
    --radius: 4px;
    --radius-lg: 12px;
    --shadow: 0 4px 24px rgba(0,0,0,${dark ? '0.4' : '0.08'});
    --shadow-lg: 0 12px 48px rgba(0,0,0,${dark ? '0.6' : '0.15'});
    --transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--f-body);
    background: var(--c-bg);
    color: var(--c-text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: var(--f-heading);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  img { max-width: 100%; height: auto; display: block; }
  a { color: var(--c-accent); text-decoration: none; }
  a:hover { opacity: 0.8; }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section {
    padding: 80px 0;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 12px;
    color: var(--c-text);
  }

  .section-subtitle {
    color: var(--c-text-muted);
    font-size: 1.1rem;
    margin-bottom: 48px;
  }

  .accent { color: var(--c-accent); }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: var(--radius);
    font-family: var(--f-body);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    text-decoration: none;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--c-accent);
    color: #000;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }
  .btn-outline {
    background: transparent;
    color: var(--c-text);
    border: 2px solid var(--c-border);
  }
  .btn-outline:hover { border-color: var(--c-accent); color: var(--c-accent); }

  /* Nav */
  .sg-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    background: ${dark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)'};
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--c-border);
  }
  .sg-nav__logo {
    font-family: var(--f-heading);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--c-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sg-nav__logo img { height: 36px; width: auto; }
  .sg-nav__links {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
  }
  .sg-nav__links a {
    color: var(--c-text-muted);
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s;
  }
  .sg-nav__links a:hover { color: var(--c-text); }
  .sg-nav__cta { margin-left: 16px; padding: 10px 24px; font-size: 0.95rem; }

  /* Hero */
  .sg-hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .sg-hero__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .sg-hero__overlay {
    position: absolute;
    inset: 0;
    background: ${dark
      ? 'linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.4) 100%)'};
  }
  .sg-hero__content {
    position: relative;
    z-index: 2;
    max-width: 680px;
  }
  .sg-hero__eyebrow {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--c-accent);
    margin-bottom: 20px;
  }
  .sg-hero__title {
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 900;
    color: ${dark ? '#fff' : 'var(--c-text)'};
    margin-bottom: 20px;
    line-height: 1.05;
  }
  .sg-hero__sub {
    font-size: 1.2rem;
    color: ${dark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)'};
    margin-bottom: 40px;
    max-width: 480px;
  }
  .sg-hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }

  /* Services */
  .sg-services { background: var(--c-surface); }
  .sg-services__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
  .sg-service-card {
    background: var(--c-bg);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-lg);
    padding: 28px 24px;
    transition: var(--transition);
  }
  .sg-service-card:hover {
    border-color: var(--c-accent);
    transform: translateY(-4px);
    box-shadow: var(--shadow);
  }
  .sg-service-card__name {
    font-family: var(--f-heading);
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--c-text);
  }
  .sg-service-card__desc { font-size: 0.9rem; color: var(--c-text-muted); margin-bottom: 16px; }
  .sg-service-card__price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--c-accent);
  }

  /* About */
  .sg-about__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .sg-about__img {
    border-radius: var(--radius-lg);
    overflow: hidden;
    aspect-ratio: 4/5;
    background: var(--c-surface);
  }
  .sg-about__img img { width: 100%; height: 100%; object-fit: cover; }
  .sg-about__text p { color: var(--c-text-muted); line-height: 1.8; margin-bottom: 24px; }

  /* Gallery */
  .sg-gallery { background: var(--c-bg); }
  .sg-gallery__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .sg-gallery__item {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--c-surface);
    cursor: zoom-in;
  }
  .sg-gallery__item img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .sg-gallery__item:hover img { transform: scale(1.06); }
  .sg-gallery__item:first-child {
    grid-column: 1 / 3;
    aspect-ratio: 2;
  }

  /* Team */
  .sg-team { background: var(--c-surface); }
  .sg-team__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 32px;
  }
  .sg-team__card { text-align: center; }
  .sg-team__avatar {
    width: 120px; height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 16px;
    background: var(--c-border);
    border: 3px solid var(--c-accent);
  }
  .sg-team__avatar img { width: 100%; height: 100%; object-fit: cover; }
  .sg-team__name { font-family: var(--f-heading); font-size: 1.1rem; font-weight: 700; }
  .sg-team__role { font-size: 0.85rem; color: var(--c-text-muted); margin-top: 4px; }

  /* Extras / CTA Block */
  .sg-extras {
    background: var(--c-primary);
    color: #fff;
    text-align: center;
    padding: 80px 0;
  }
  .sg-extras h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    margin-bottom: 16px;
    color: #fff;
  }
  .sg-extras p { font-size: 1.1rem; opacity: 0.75; margin-bottom: 40px; }
  .sg-extras .btn-primary { background: var(--c-accent); }
  .sg-hours {
    display: inline-grid;
    grid-template-columns: auto auto;
    gap: 8px 32px;
    text-align: left;
    margin-top: 32px;
    font-size: 0.95rem;
  }
  .sg-hours__label { opacity: 0.6; }
  .sg-hours__time { font-weight: 600; }

  /* Contact */
  .sg-contact { background: var(--c-bg); }
  .sg-contact__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
  .sg-form { display: flex; flex-direction: column; gap: 16px; }
  .sg-form input, .sg-form textarea {
    width: 100%;
    padding: 14px 16px;
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    color: var(--c-text);
    font-family: var(--f-body);
    font-size: 1rem;
    transition: border-color 0.2s;
    outline: none;
  }
  .sg-form input:focus, .sg-form textarea:focus { border-color: var(--c-accent); }
  .sg-form textarea { resize: vertical; min-height: 140px; }
  .sg-contact__info h3 { font-family: var(--f-heading); font-size: 1.5rem; margin-bottom: 24px; }
  .sg-contact__item {
    display: flex; align-items: flex-start; gap: 12px;
    margin-bottom: 20px; color: var(--c-text-muted);
  }
  .sg-contact__item svg { flex-shrink: 0; margin-top: 2px; }

  /* Footer */
  .sg-footer {
    background: ${dark ? '#000' : '#1a1a1a'};
    color: rgba(255,255,255,0.5);
    padding: 32px 0;
    text-align: center;
    font-size: 0.85rem;
  }
  .sg-footer strong { color: #fff; }

  /* Call Button (floating) */
  .sg-call-btn {
    position: fixed;
    bottom: 28px; right: 28px;
    z-index: 200;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: var(--c-accent);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    transition: transform 0.2s;
    text-decoration: none;
  }
  .sg-call-btn:hover { transform: scale(1.1); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }

  @media (max-width: 768px) {
    .sg-nav__links { display: none; }
    .sg-about__inner { grid-template-columns: 1fr; }
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
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    map: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    arrow: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    phoneCall: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  };
  return icons[name] || '';
}

export function buildNav(data, niche) {
  const logoHtml = data.logoDataUrl
    ? `<img src="${data.logoDataUrl}" alt="${data.businessName}">`
    : `<span>${data.businessName || niche.label}</span>`;

  const hasBooking = data.bookingUrl;
  const hasPhone = data.phone;

  return `
<nav class="sg-nav">
  <a class="sg-nav__logo" href="#">${logoHtml}</a>
  <ul class="sg-nav__links">
    <li><a href="#about">${niche.aboutLabel}</a></li>
    <li><a href="#services">${niche.servicesLabel}</a></li>
    ${data.showTeam ? `<li><a href="#team">${niche.teamLabel}</a></li>` : ''}
    <li><a href="#contact">Kontakt</a></li>
  </ul>
  ${hasPhone ? `<a class="btn btn-primary sg-nav__cta" href="tel:${data.phone}">${svgIcon('phone')} Anrufen</a>`
    : hasBooking ? `<a class="btn btn-primary sg-nav__cta" href="${data.bookingUrl}" target="_blank">Termin buchen</a>`
    : ''}
</nav>`;
}

export function buildFooter(data, niche) {
  const year = new Date().getFullYear();
  return `
<footer class="sg-footer">
  <div class="container">
    <p><strong>${data.businessName || niche.label}</strong> &bull; ${data.address || ''} &bull; <a href="tel:${data.phone || ''}" style="color:rgba(255,255,255,0.5)">${data.phone || ''}</a></p>
    <p style="margin-top:8px">&copy; ${year} ${data.businessName || niche.label}. Alle Rechte vorbehalten.</p>
  </div>
</footer>`;
}

export function buildContactSection(data, niche) {
  const formAction = data.formspreeId
    ? `https://formspree.io/f/${data.formspreeId}`
    : `mailto:${data.email || ''}`;
  const formMethod = data.formspreeId ? 'POST' : '';

  return `
<section class="sg-contact section" id="contact">
  <div class="container">
    <h2 class="section-title">Kontakt</h2>
    <p class="section-subtitle">Wir freuen uns auf Ihre Nachricht</p>
    <div class="sg-contact__inner">
      <form class="sg-form" action="${formAction}" ${formMethod ? `method="${formMethod}"` : ''}>
        <input type="text" name="name" placeholder="Ihr Name" required>
        <input type="email" name="email" placeholder="Ihre E-Mail" required>
        <input type="tel" name="phone" placeholder="Ihre Telefonnummer">
        <textarea name="message" placeholder="Ihre Nachricht..." required></textarea>
        <button type="submit" class="btn btn-primary">Nachricht senden ${svgIcon('arrow')}</button>
      </form>
      <div class="sg-contact__info">
        <h3>${data.businessName || niche.label}</h3>
        ${data.address ? `<div class="sg-contact__item">${svgIcon('map')}<span>${data.address}</span></div>` : ''}
        ${data.phone ? `<div class="sg-contact__item">${svgIcon('phone')}<span><a href="tel:${data.phone}" style="color:inherit">${data.phone}</a></span></div>` : ''}
        ${data.email ? `<div class="sg-contact__item">${svgIcon('mail')}<span><a href="mailto:${data.email}" style="color:inherit">${data.email}</a></span></div>` : ''}
        ${data.hours ? `<div class="sg-contact__item" style="margin-top:24px">${svgIcon('clock')}<span style="white-space:pre-line">${data.hours}</span></div>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

export function buildExtrasSection(data, niche) {
  if (!data.bookingUrl && !data.phone) return '';
  return `
<section class="sg-extras">
  <div class="container">
    <h2>${niche.extrasCta}</h2>
    <p>${data.tagline || niche.heroSubline}</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">Termin buchen ${svgIcon('arrow')}</a>` : ''}
      ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.3)">Direkt anrufen ${svgIcon('phone')}</a>` : ''}
    </div>
    ${data.hours ? `<div class="sg-hours">
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
  if (!photos || photos.length === 0) return '';
  const items = photos.slice(0, 9).map((src, i) =>
    `<div class="sg-gallery__item"><img src="${src}" alt="Galerie ${i + 1}" loading="lazy"></div>`
  ).join('');
  return `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title">Galerie</h2>
    <p class="section-subtitle">Einblicke in unsere Arbeit</p>
    <div class="sg-gallery__grid">${items}</div>
  </div>
</section>`;
}

export function buildTeam(data, niche) {
  if (!data.showTeam || !data.team || data.team.length === 0) return '';
  const cards = data.team.map(member => `
    <div class="sg-team__card">
      <div class="sg-team__avatar">
        ${member.photoUrl ? `<img src="${member.photoUrl}" alt="${member.name}">` : ''}
      </div>
      <div class="sg-team__name">${member.name}</div>
      <div class="sg-team__role">${member.role}</div>
    </div>`).join('');
  return `
<section class="sg-team section" id="team">
  <div class="container">
    <h2 class="section-title">${niche.teamLabel}</h2>
    <div class="sg-team__grid">${cards}</div>
  </div>
</section>`;
}
