# Personal Website — Project Handoff

Working notes so this project can be picked up easily in a future session.
Last updated: 2026-06-19.

## What this is
A personal academic website for **Hanyuan Zhang** (PhD student, Institute of
Astronomy, University of Cambridge). Built on the **Strata** template by
[HTML5 UP](https://html5up.net/strata) (CCA 3.0 license), customised into a
**multi-page** site. Plain HTML/CSS/JS — no build step. Intended to be hosted on
GitHub Pages.

## Where things live
- **Active site:** `/Users/hanyuan/Library/CloudStorage/Dropbox/python_script/website/`
- **Backup of an earlier from-scratch design** (rejected in favour of Strata):
  `../website_custom_v1/` — keep around in case we want to compare/switch back.
- **Reference data copied from the old site:** `website/_reference_old_site/`
  (real publications in `papers.md`, intro in `about_me.md`, real talks +
  slide PDFs in `_talks/`). Source repo: `git@github.com:Hanyuan0908/Hanyuan0908.github.io.git`
  (AcademicPages/Jekyll). NOTE: the other repo `Hanyuan-Zhang.git` is an empty
  unmodified template — ignore it.

## Architecture / conventions
- **Pages (each a standalone HTML file, sharing an identical sidebar + footer):**
  - `index.html` → About (home, has the real intro)
  - `research.html` → Research (interactive project tiles)
  - `publications.html` → Publications (PLACEHOLDER — see TODO)
  - `talks.html` → Talks (PLACEHOLDER — see TODO)
  - `cv.html` → CV (PLACEHOLDER timeline table)
  - `contact.html` → Contact (email + office, no form)
- **All custom changes live in two files only**, so Strata's originals stay clean:
  - `assets/css/custom.css`
  - `assets/js/custom.js`  (only loaded on `research.html`)
- **Nav order:** About · Research · Publications · Talks · CV · Contact. The
  active page's link has `class="active"` (set per-file).
- **No templating** → the sidebar/footer are duplicated in all 6 files. When
  editing shared content (name, photo, links), change every page. Cross-page
  edits are easiest via a small Python loop over `glob.glob("*.html")` (that's
  how name/photo/links were applied).

## Cache-busting (IMPORTANT)
The local `python3 -m http.server` + browser cache repeatedly made changes look
"not applied" (this caused real confusion — e.g. the research tiles looked
non-interactive because an old `custom.js` was cached). To force reloads, the
CSS/JS links carry a version query string. **Bump it after editing custom.css/js:**
- Currently: `custom.css?v=5`, `custom.js?v=2`.
- Bump with a Python loop replacing e.g. `custom.css?v=5` → `?v=6` across all pages.
- Always tell the user to hard-reload (Cmd+Shift+R) or use a private window.

## Customisations already done
- **Sidebar:** everything centered (photo, name, affiliation, nav tabs).
- **Headshot:** enlarged to `12em` (`#header .image.avatar`); uses real photo
  `images/profile.png`.
- **Galaxy background** on the sidebar `#header`: `images/galaxy_rot.jpg`
  (NGC 1300, rotated 90° to portrait to fit the tall sidebar; original landscape
  kept at `images/galaxy.jpg`). Layered: dark gradient
  `rgba(13,10,20,0.32→0.55)` + Strata overlay + photo, `background-size: cover`.
- **Sidebar text:** `text-shadow` for legibility; name `1.9em` bright white;
  position/institute `1.05em` at 80% white; nav tabs `1.1em`, near-white
  (`rgba(255,255,255,0.85)`), teal hover, white-on-teal active.
- **Research page:** grid of clickable project tiles (**3 per row**, →2 →1
  responsive). Clicking a tile opens its detail panel (figure + text) below and
  highlights the tile; clicking the active one closes it. Logic in `custom.js`
  (`.project-tile` / `.project-detail`, matched by `data-target` ↔ `id`).
  Figure placeholders point at `images/research/<name>.jpg` (folder created,
  empty). Verified working via headless Playwright.
- **Talks page:** styled list (`.talk-list`) with pill links for Slides/Video.
- **Contact page:** email + office address only (contact form removed).
- **Accent colour:** teal `#49bf9d` (Strata default).

## Real info already merged (for reference)
- Name: **Hanyuan Zhang**
- Role: **PhD Student in Astronomy**, Institute of Astronomy, University of Cambridge
- Advisors: Prof. Vasily Belokurov, Prof. Wyn Evans
- Background: Part III at IoA (2022–2023); undergrad Imperial College London (2019–2022)
- Email: **hz420@cam.ac.uk** · GitHub: **Hanyuan0908** · ORCID: **0009-0005-6898-0927**
- Google Scholar: `user=C0io3x4AAAAJ` · ADS: orcid search for the ORCID above
- Office: Institute of Astronomy, Madingley Road, Cambridge CB3 0HA, UK
- Full intro paragraphs are in `index.html` (and `_reference_old_site/about_me.md`).

## Outstanding TODO (next session)
1. **Merge real publications** into `publications.html` from
   `_reference_old_site/papers.md` — 7 first-author + ~8 co-authored papers with
   ADS links. User wanted them split into "First-author" / "Co-authored" like the
   old site. (User was asked and we paused before doing this.)
2. **Merge real talks** into `talks.html` from `_reference_old_site/_talks/`
   (5 talks: KICC 2023, Bologna 2024, NAM 2024, Shanghai 2024, CMU 2025) and copy
   the **slide PDFs** (also in that folder) into e.g. `assets/talks/`, linking them.
3. **Research content:** replace the 4 placeholder topics/figures with Hanyuan's
   real research themes (Galactic disc secular evolution, the MW bar, radial
   migration, stellar halo/tidal streams, variable stars — LPVs & RR Lyrae) and
   add real figures to `images/research/`.
4. **CV page:** fill the timeline; add a CV PDF and wire the "Download CV" buttons.
5. **Deploy:** push to GitHub Pages (repo `Hanyuan0908.github.io` already exists
   on AcademicPages — decide whether to replace it with this Strata site or use a
   new repo). See README for steps.

## Running / testing locally
- Server (from `website/`): `python3 -m http.server 8000` → http://localhost:8000/
- Headless verification available: **Playwright + Chromium are installed**
  (`python3 -m playwright`). Test scripts used live in `/tmp` (ephemeral):
  loaded pages, clicked `.project-tile`s, asserted detail visibility, took
  full-page screenshots. Recreate as needed — useful because the user can't
  always see local changes due to caching, and screen capture is blocked by
  macOS permissions.
