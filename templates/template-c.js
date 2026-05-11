import { buildShell, buildNav, buildFooter, buildContactSection, buildExtrasSection, buildCallButton, buildTeam, svgIcon } from './base-shell.js';

// Template C — Editorial / Photo-Heavy (Barber: Verspielt — gentlemanbarbers.de style)
export function generate(data, niche, colors, fonts) {
  const dark = data.darkMode ?? niche.defaultDark;
  const isBarber = niche.id === 'barber';

  const photos = data.photos || [];
  const services = (data.services?.length ? data.services : niche.servicesDefault).slice(0, 6);

  // ── BARBER VERSPIELT ──
  if (isBarber) {
    const orange = colors.accent || '#FF4B26';
    const navy = colors.primary || '#1b1e34';

    const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  /* ── BARBER VERSPIELT — inspired by gentlemanbarbers.de ── */
  :root { --orange: ${orange}; --navy: ${navy}; }

  .sg-hero-fun {
    position: relative; min-height: 100svh;
    display: flex; align-items: center;
    overflow: hidden; padding-top: 70px;
  }
  .sg-hero-fun__bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transform: scale(1.05);
    animation: funZoom 8s ease forwards;
  }
  @keyframes funZoom { to { transform: scale(1); } }
  .sg-hero-fun__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(120deg, rgba(27,30,52,0.92) 0%, rgba(27,30,52,0.55) 60%, transparent 100%);
  }
  .sg-hero-fun__content { position: relative; z-index: 2; max-width: 700px; }
  .sg-hero-fun__kicker {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--orange); color: #fff;
    padding: 6px 18px; border-radius: 2px;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; margin-bottom: 28px;
  }
  .sg-hero-fun__title {
    font-size: clamp(3rem, 7.5vw, 7rem);
    font-weight: 900; color: #fff; line-height: 0.92;
    letter-spacing: -0.04em; margin-bottom: 24px;
  }
  .sg-hero-fun__title em { font-style: normal; color: var(--orange); }
  .sg-hero-fun__sub { font-size: 1.05rem; color: rgba(255,255,255,0.65); margin-bottom: 40px; max-width: 440px; line-height: 1.75; }

  .sg-services-fun { background: var(--c-bg); }
  .sg-fun-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 56px; gap: 24px; flex-wrap: wrap;
  }
  .sg-fun-header__tag {
    display: inline-block; background: var(--orange); color: #fff;
    padding: 4px 14px; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 14px; border-radius: 2px;
  }
  .sg-fun-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--c-border);
  }
  .sg-fun-card {
    background: var(--c-bg); padding: 36px 28px; position: relative; overflow: hidden; transition: background 0.25s;
  }
  .sg-fun-card:hover { background: var(--c-surface); }
  .sg-fun-card__num {
    font-size: 3.5rem; font-weight: 900; line-height: 1;
    color: var(--orange); opacity: 0.15;
    position: absolute; top: 16px; right: 20px; font-family: var(--f-heading);
  }
  .sg-fun-card__name { font-family: var(--f-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 10px; position: relative; }
  .sg-fun-card__desc { font-size: 0.85rem; color: var(--c-text-muted); line-height: 1.6; margin-bottom: 20px; }
  .sg-fun-card__price { font-size: 1.3rem; font-weight: 700; color: var(--orange); }
  .sg-fun-card:first-child { background: var(--navy); color: #fff; }
  .sg-fun-card:first-child .sg-fun-card__name { color: #fff; }
  .sg-fun-card:first-child .sg-fun-card__desc { color: rgba(255,255,255,0.5); }
  .sg-fun-card:first-child .sg-fun-card__num { color: var(--orange); opacity: 0.25; }
  .sg-fun-card:first-child .sg-fun-card__price { color: var(--orange); }

  .sg-about-fun { background: var(--navy); }
  .sg-about-fun__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .sg-about-fun__img { position: relative; }
  .sg-about-fun__img::before {
    content: ''; position: absolute;
    top: -12px; left: -12px; right: 12px; bottom: 12px;
    border: 2px solid var(--orange); z-index: 0;
  }
  .sg-about-fun__img img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; position: relative; z-index: 1; }
  .sg-about-fun__text { color: #fff; }
  .sg-about-fun__text .section-title { color: #fff; margin-bottom: 20px; }
  .sg-about-fun__text p { color: rgba(255,255,255,0.6); line-height: 1.85; margin-bottom: 24px; }
  .sg-about-fun__text .btn-primary { background: var(--orange); border-color: var(--orange); }

  @media (max-width: 768px) {
    .sg-fun-grid { grid-template-columns: 1fr; }
    .sg-about-fun__inner { grid-template-columns: 1fr; }
    .sg-about-fun__img::before { display: none; }
  }
</style>`;

    const heroStyle = photos[0]
      ? `background-image: url('${photos[0]}')`
      : `background: ${navy}`;

    const words = (data.businessName || niche.label).split(' ');
    const heroTitle = words.length > 1
      ? `${words[0]} <em>${words.slice(1).join(' ')}</em>`
      : `<em>${words[0]}</em>`;

    const body = `
${buildNav(data, niche)}

<section class="sg-hero-fun" id="hero">
  <div class="sg-hero-fun__bg" style="${heroStyle}"></div>
  <div class="sg-hero-fun__overlay"></div>
  <div class="container">
    <div class="sg-hero-fun__content" data-animate="left">
      <div class="sg-hero-fun__kicker">${niche.label}</div>
      <h1 class="sg-hero-fun__title">${heroTitle}</h1>
      <p class="sg-hero-fun__sub">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="border-color:rgba(255,255,255,0.25);color:#fff">${svgIcon('phone')} ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<section class="sg-services-fun section" id="services">
  <div class="container">
    <div class="sg-fun-header" data-animate="fade">
      <div>
        <div class="sg-fun-header__tag">${niche.label}</div>
        <h2 class="section-title" style="margin-bottom:0">${niche.servicesLabel}</h2>
      </div>
      ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
    </div>
    <div class="sg-fun-grid">
      ${services.map((s, i) => `
      <div class="sg-fun-card" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-fun-card__num">${String(i + 1).padStart(2, '0')}</div>
        <div class="sg-fun-card__name">${s.name}</div>
        <div class="sg-fun-card__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-fun-card__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-fun section" id="about">
  <div class="container">
    <div class="sg-about-fun__inner">
      <div class="sg-about-fun__img" data-animate="left">
        ${photos[1] ? `<img src="${photos[1]}" alt="${data.businessName}">` : `<div style="width:100%;aspect-ratio:4/5;background:#2a2d45"></div>`}
      </div>
      <div class="sg-about-fun__text" data-animate="right">
        <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:var(--orange);margin-bottom:16px">${niche.aboutLabel}</p>
        <h2 class="section-title">${data.businessName || niche.label}</h2>
        <p>${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.85rem;opacity:0.5">${svgIcon('map')} ${data.address}</p>` : ''}
        <div style="margin-top:32px;display:flex;gap:16px;flex-wrap:wrap">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="border-color:rgba(255,255,255,0.2);color:#fff">${svgIcon('phone')} Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${photos.length > 2 ? `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title" data-animate="fade">Galerie</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">Einblicke in unsere Arbeit</p>
    <div class="sg-gallery__grid">
      ${photos.slice(2, 8).map((src, i) => `<div class="sg-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}"><img src="${src}" alt="Galerie ${i + 3}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

    return buildShell({ head, body, colors, fonts, dark });
  }

  // ── STANDARD TEMPLATE C ──
  const head = `<title>${data.businessName || niche.label}</title>
<meta name="description" content="${data.tagline || niche.heroSubline}">
<style>
  .sg-hero-c {
    position: relative; height: 100svh;
    display: flex; align-items: flex-end; padding-bottom: 80px; overflow: hidden;
  }
  .sg-hero-c__bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .sg-hero-c__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%);
  }
  .sg-hero-c__content { position: relative; z-index: 2; width: 100%; }
  .sg-hero-c__tag {
    display: inline-block; padding: 6px 16px;
    border: 1px solid rgba(255,255,255,0.4);
    font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(255,255,255,0.8); margin-bottom: 20px; border-radius: 2px;
  }
  .sg-hero-c__title {
    font-size: clamp(3rem, 8vw, 7rem); font-weight: 900;
    color: #fff; line-height: 0.9; margin-bottom: 24px; letter-spacing: -0.04em;
  }
  .sg-hero-c__sub { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 500px; margin-bottom: 36px; }
  .sg-services-c { background: var(--c-bg); }
  .sg-services-c__header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; gap: 24px; flex-wrap: wrap; }
  .sg-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .sg-bento__card {
    background: var(--c-surface); border-radius: var(--radius-lg);
    padding: 36px 28px; border: 1px solid var(--c-border);
    display: flex; flex-direction: column; gap: 12px;
    transition: var(--transition); position: relative; overflow: hidden;
  }
  .sg-bento__card::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 3px; height: 0; background: var(--c-accent); transition: height 0.4s ease;
  }
  .sg-bento__card:hover::before { height: 100%; }
  .sg-bento__card:hover { border-color: transparent; box-shadow: var(--shadow); }
  .sg-bento__card:first-child { grid-column: 1 / 3; background: var(--c-primary); border-color: transparent; color: #fff; }
  .sg-bento__card:first-child .sg-bento__price { color: var(--c-accent); }
  .sg-bento__name { font-family: var(--f-heading); font-size: 1.3rem; font-weight: 700; color: inherit; }
  .sg-bento__desc { font-size: 0.9rem; color: var(--c-text-muted); flex: 1; }
  .sg-bento__card:first-child .sg-bento__desc { color: rgba(255,255,255,0.65); }
  .sg-bento__price { font-size: 1.5rem; font-weight: 700; color: var(--c-accent); }
  .sg-about-c { background: var(--c-surface); }
  .sg-about-c__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .sg-about-c__mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 8px; height: 480px; }
  .sg-about-c__mosaic-item { overflow: hidden; border-radius: var(--radius); background: var(--c-border); }
  .sg-about-c__mosaic-item:first-child { grid-row: 1 / 3; }
  .sg-about-c__mosaic-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .sg-about-c__mosaic-item:hover img { transform: scale(1.05); }
  @media (max-width: 768px) {
    .sg-bento { grid-template-columns: 1fr; }
    .sg-bento__card:first-child { grid-column: 1; }
    .sg-about-c__inner { grid-template-columns: 1fr; }
    .sg-about-c__mosaic { height: 320px; }
  }
</style>`;

  const heroStyle = photos[0]
    ? `background-image: url('${photos[0]}')`
    : `background: linear-gradient(135deg, ${colors.primary} 0%, #000 100%)`;

  const body = `
${buildNav(data, niche)}

<section class="sg-hero-c" id="hero">
  <div class="sg-hero-c__bg" style="${heroStyle}"></div>
  <div class="sg-hero-c__overlay"></div>
  <div class="container">
    <div class="sg-hero-c__content" data-animate="fade">
      <div class="sg-hero-c__tag">${niche.label}</div>
      <h1 class="sg-hero-c__title">${(data.businessName || niche.label).replace(' ', '<br>')}</h1>
      <p class="sg-hero-c__sub">${data.tagline || niche.heroTagline}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
        ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.3)">${svgIcon('phone')} ${data.phone}</a>` : ''}
      </div>
    </div>
  </div>
</section>

<section class="sg-services-c section" id="services">
  <div class="container">
    <div class="sg-services-c__header" data-animate="fade">
      <div>
        <h2 class="section-title">${niche.servicesLabel}</h2>
        <p class="section-subtitle" style="margin-bottom:0">${data.tagline || niche.heroTagline}</p>
      </div>
    </div>
    <div class="sg-bento">
      ${services.map((s, i) => `
      <div class="sg-bento__card" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}">
        <div class="sg-bento__name">${s.name}</div>
        <div class="sg-bento__desc">${s.desc || ''}</div>
        ${s.price ? `<div class="sg-bento__price">${s.price}</div>` : ''}
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sg-about-c section" id="about">
  <div class="container">
    <div class="sg-about-c__inner">
      <div class="sg-about-c__mosaic" data-animate="left">
        ${[0, 1, 2].map(i => `
        <div class="sg-about-c__mosaic-item">
          ${photos[i] ? `<img src="${photos[i]}" alt="Galerie ${i + 1}">` : ''}
        </div>`).join('')}
      </div>
      <div data-animate="right">
        <span style="display:block;font-size:0.8rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--c-accent);margin-bottom:16px">${niche.aboutLabel}</span>
        <h2 class="section-title" style="margin-bottom:24px">${data.businessName || niche.label}</h2>
        <p style="color:var(--c-text-muted);line-height:1.8;margin-bottom:24px">${data.about || niche.aboutDefault}</p>
        ${data.address ? `<p style="font-size:0.9rem;color:var(--c-text-muted)">${svgIcon('map')} ${data.address}</p>` : ''}
        <div style="margin-top:32px;display:flex;gap:16px;flex-wrap:wrap">
          ${data.bookingUrl ? `<a href="${data.bookingUrl}" target="_blank" class="btn btn-primary">${niche.heroCta} ${svgIcon('arrow')}</a>` : ''}
          ${data.phone ? `<a href="tel:${data.phone}" class="btn btn-outline">${svgIcon('phone')} Anrufen</a>` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${photos.length > 3 ? `
<section class="sg-gallery section" id="gallery">
  <div class="container">
    <h2 class="section-title" data-animate="fade">Galerie</h2>
    <p class="section-subtitle" data-animate="fade" data-animate-delay="1">Einblicke in unsere Arbeit</p>
    <div class="sg-gallery__grid">
      ${photos.slice(3, 9).map((src, i) => `<div class="sg-gallery__item" data-animate="scale" data-animate-delay="${Math.min(i + 1, 5)}"><img src="${src}" alt="Galerie ${i + 4}" loading="lazy"></div>`).join('')}
    </div>
  </div>
</section>` : ''}

${buildTeam(data, niche)}
${buildExtrasSection(data, niche)}
${buildContactSection(data, niche)}
${buildFooter(data, niche)}
${buildCallButton(data)}`;

  return buildShell({ head, body, colors, fonts, dark });
}
