# SiteGen — CLAUDE.md

## Was ist dieses Projekt?

SiteGen ist ein **Browser-basierter Website-Generator** für lokale Kleinunternehmen (Frisör, Barber, Café, Fastfood, Handwerk, Beauty usw.). Ein Webdesigner / Freelancer füllt ein mehrstufiges Formular aus und exportiert eine fertige, standalone HTML-Datei — keine Backend, kein Build-Schritt, läuft komplett im Browser via ES-Modules.

## Architektur

```
index.html          — App-Shell + mehrstufiges Formular (Stepper)
tool.css            — Styles für das Tool selbst (Dark-UI)
generator.js        — Haupt-Entry: generateWebsite(), downloadWebsite(), previewWebsite()
brand-extractor.js  — URL-Scan: extrahiert Farben/Logos von Kunden-Websites (3 CORS-Proxies)
pixabay-loader.js   — Pixabay-API-Integration für Fotosearch

templates/
  niche-configs.js  — NICHES-Objekt (alle Branchen) + FONT_COMBOS
  base-shell.js     — Shared Builder-Funktionen: buildShell, buildNav, buildFooter,
                      buildContactSection, buildExtrasSection, buildCallButton,
                      buildGallery, buildTeam, svgIcon
  template-a.js     — Minimal / Clean (Barber: Elegant-Variante mit Gold-Theme)
  template-b.js     — Bold / High-Contrast (Split-Hero, accent-heavy)
  template-c.js     — Editorial / Photo-Heavy (fullscreen image stack, magazine)
  template-d.js     — Warm / Organic (soft corners, horizontal scroll cards)
```

## Datenfluss

1. Nutzer füllt Formular → `formData`-Objekt wird live aktualisiert
2. `generator.js::generateWebsite(formData)` → wählt Nische + Template → gibt vollständiges HTML zurück
3. Vorschau: HTML in `<iframe>` injiziert
4. Export: HTML als `.html`-Datei heruntergeladen

## Nischen (NICHES in niche-configs.js)

| Key | Label | Dark? | Besonderheit |
|---|---|---|---|
| `friser` | Frisör | nein | Cormorant Garamond, Rosa-Akzent |
| `barber` | Barber | ja | Playfair Display, Gold-Akzent — separater Stil von Frisör seit Commit 09c57ca |
| `fastfood` | Fastfood | ja | Bebas Neue, Rot/Gelb |
| `cafe` | Café | nein | Lora, Brauntöne |
| `handwerk` | Handwerk / Gewerbe | nein | Oswald, Blau/Orange |
| `beauty` | Beauty & Wellness | nein | Cormorant Garamond, Rose |

## Fotos

- **Default-Fotos**: Unsplash CDN URLs (kein API-Key nötig), 5 pro Nische
- **Pixabay-Suche**: optionaler API-Key im Sidebar, parallele Requests, Lazy-Loading
- **Brand-Extractor**: scannt Kunden-URL via 3 CORS-Proxy-Fallbacks

## Wichtige Konventionen

- Alle Templates exportieren eine `generate(data, niche, colors, fonts)` Funktion
- Templates erzeugen **standalone HTML** — alle Styles inline oder im `<head>`
- Nischen-spezifische CSS-Varianten (z.B. Barber Elegant) werden direkt im Template definiert
- `base-shell.js` enthält geteilte Builder — Änderungen dort wirken auf alle Templates
- Fotos kommen immer aus `data.photos`, Fallback auf `niche.defaultPhotos`
- `data.services` Fallback auf `niche.servicesDefault`

## Aktuelle offene Punkte / Nächste Schritte

- `templates/base-shell.js` und `templates/template-a.js` haben unstaged Changes (git status beim Start der Session)
- Weitere Nischen können jederzeit in `niche-configs.js` ergänzt werden (Muster der vorhandenen folgen)
- Template E (falls geplant) würde in `templates/template-e.js` + Import in `generator.js`

## Dev-Setup

```bash
# Lokaler Dev-Server (CORS für ES-Modules nötig)
./start-server.command   # oder: python3 -m http.server 8080
```

Browser öffnen unter `http://localhost:8080`
