# Golden Hour Photo Booth — Website

Static one-page site (HTML/CSS/JS, no build step). Files: `index.html`, `styles.css`, `script.js`, `assets/`.
Preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Placeholders to replace before launch
- [x] Phone (914) 817-8018 is already in place (nav, Book section, footer, mobile Call bar, JSON-LD).
- [x] Email info@goldenhourboothny.com is in place (contact list, email fallback, footer, JSON-LD, FALLBACK_EMAIL in script.js).
- [ ] Formspree form ID **YOUR_FORM_ID** (`index.html` form `action`)
- [x] Prices set: Classic $449, Premium $649, Deluxe $849 (edit in the Packages section)
- [x] Add-on prices set (Add-Ons section)
- [x] Trust bar now shows only "25 mi free travel" and "locally owned". Add events booked and rating once you have real numbers.
- [ ] Hero badge "strips in ~10 sec*" — confirm your printer's real speed or edit
- [ ] **Sample testimonials** (replace with real reviews, with permission)
- [ ] **Gallery stock photos** — `assets/photo-01.jpg` … `photo-06.jpg` (plus spares `photo-07`…`photo-12` and `og-image.jpg`) are free Pexels stock stand-ins (see `assets/CREDITS.md`). Replace them with your real event photos once you have them. Until then the gallery is labelled "Sample photos" — don't present stock images as your own past events, and don't imply the people pictured endorse Golden Hour.
- [ ] Domain **https://goldenhourboothny.com/** (canonical, Open Graph, JSON-LD). `assets/og-image.jpg` is a stock stand-in share image — swap for a real event photo (1200×630).
- [ ] Confirm the travel policy (free 25 mi, $50 to 50 mi, $1/mi after), $150 deposit, and FAQ answers (space, arrival time)

## Editing
- **Text:** open `index.html` in any text editor and change the words between tags. Sections are labeled by `id` (`how`, `packages`, `addons`, `events`, `gallery`, `testimonials`, `area`, `faq`, `book`). Gallery photos open in a built-in lightbox; scroll animations turn off automatically for visitors who prefer reduced motion.
- **Prices:** in the Packages section, edit `<span>$449</span> / 2 hrs` etc., and the `<li>` feature lines.
- **Photos:** put photos in `assets/` (e.g. `photo-01.jpg`, ~1200px wide, compressed under ~300 KB) and overwrite `assets/photo-01.jpg` … `photo-06.jpg` (or edit both the `href` and `src` of each gallery link). Update the `alt` text to describe the photo.
- **Colors:** change `--navy` / `--accent` at the top of `styles.css`.
- **Form:** sign up free at https://formspree.io, create a form, and replace `YOUR_FORM_ID` in the form `action`. Until then, submitting opens the visitor's email app (mailto fallback).

## Free hosting (pick one)
### Netlify (drag-and-drop, easiest)
1. Go to https://app.netlify.com/drop and create a free account.
2. Drag the `hudson-snap` folder (or unzipped `hudson-snap.zip`) onto the page.
3. You get a URL like `random-name.netlify.app`; rename it under Site settings → Change site name.
4. To update, drag the folder again on the site's Deploys tab.

### Cloudflare Pages
1. Sign up at https://dash.cloudflare.com → Workers & Pages → Create → Pages → **Upload assets**.
2. Name the project (e.g. `hudson-snap`) and upload the folder/zip contents.
3. Deploy — site is live at `hudson-snap.pages.dev`. Upload a new version to update.

### GitHub Pages
1. Create a free GitHub account and a new public repository (e.g. `hudson-snap`).
2. Click **Add file → Upload files** and upload the contents of this folder (`index.html` must be at the root).
3. Go to Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)` → Save.
4. After a minute the site is at `https://<username>.github.io/hudson-snap/`.

### Custom domain (optional)
Buy a domain (e.g. from Cloudflare or Namecheap) and add it in your host's "Custom domains" settings; follow their DNS instructions. HTTPS is free on all three hosts.
