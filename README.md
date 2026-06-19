# Personal Academic Website (Strata + clickable nav)

Built on the **Strata** template by [HTML5 UP](https://html5up.net/strata)
(free under the CCA 3.0 license), customised into an academic site with a
clickable navigation menu in the sidebar.

## What I changed vs. stock Strata
- Replaced the demo content with **About · Research · Publications · CV · Contact**.
- Added a **clickable nav menu** in the left sidebar (`#site-nav`) that jumps to
  each section and **highlights the section you're currently viewing**.
- Added `assets/css/custom.css` (nav + publication styling) and
  `assets/js/custom.js` (the active-section highlight). The original Strata
  files are untouched, so nothing is lost.

## Customising it
Edit `index.html` and replace the placeholders:
- `Your Name`, the role/affiliation lines in the sidebar `<header>`
- `you@example.com`, `yourusername`, the ORCID id, ADS link
- Publication titles/authors/venues in `<ol class="pub-list">`
- CV rows in the `#cv` table

### Your photo
Replace `images/avatar.jpg` with your own square headshot (same filename, or
update the `<img>` in the sidebar).

### Your CV PDF
Drop `cv.pdf` into the folder and point the "Download CV (PDF)" buttons at it.

### Colors
Strata's accent is teal `#49bf9d`. To recolor, edit `assets/css/custom.css`
(nav) and search/replace `#49bf9d` in `assets/css/main.css`.

## Preview locally
```bash
cd website
python3 -m http.server 8000      # then open http://localhost:8000
```

## Publish free with GitHub Pages
1. Create a repo named `<username>.github.io` for a clean URL.
2. Push these files to the repo root:
   ```bash
   cd website
   git init && git add . && git commit -m "Personal website (Strata)"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```
3. GitHub → **Settings → Pages → Source: Deploy from a branch**, `main` / `root`.
4. Visit your site after ~1 minute.

---
The alternative custom design I built first is saved in `../website_custom_v1/`
in case you'd like to compare or switch back.
