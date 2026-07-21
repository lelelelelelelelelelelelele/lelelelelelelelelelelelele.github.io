# Chengyu Liu · Personal Homepage

A zero-build personal homepage published with GitHub Pages. It presents research and shipped software as two views of the same practice; the CV remains a secondary public document.

## Published site

- Homepage: <https://lelelelelelelelelelelelele.github.io/>
- Plain index: <https://lelelelelelelelelelelelele.github.io/plain.html>
- Source: <https://github.com/lelelelelelelelelelelelele/lelelelelelelelelelelelele.github.io>

## Public pages

- `index.html` — the formal researcher-and-builder homepage. Its **Academic / Build** switcher changes the work view without duplicating the page.
- `plain.html` — a deliberately minimal, Obsidian-inspired index of the same public work.

The formal page links to the plain version in its footer, and the plain version links back to the formal homepage.

## Design direction

The formal homepage uses a restrained editorial system: warm paper, serif typography, vermilion detail, compact evidence links, and generous negative space. Academic and software work use the same list language so neither reads as an appendix to the other.

The plain page keeps only names, literal status, one-line descriptions, and important links. It has no cards, columns, decorative metadata, or animation.

## Preview locally

```powershell
python -m http.server 8000
```

Then open:

- Formal homepage: `http://localhost:8000/`
- Plain index: `http://localhost:8000/plain.html`
- Public CV: `http://localhost:8000/public/cv.pdf`

## Content maintenance

1. Keep research states literal: `Published`, `Working paper`, or `Ongoing`.
2. Present the graph-unlearning work publicly as `Adversarial deletion attacks on graph unlearning · Ongoing`; do not expose submission status, unpublished results, or the full internal paper title.
3. Treat OpenGU as an upstream platform used and modified for the research, not as the research title or a personal platform contribution.
4. Keep the adaptive-impedance-control paper labeled `Manuscript · Fourth author`.
5. Add robot-learning links only when a public artifact is ready.
6. Keep published-paper authorship, venue, year, and evidence links together.
7. Keep Jarvis off the public pages. Treat RAG Robot as internal product work and DLlink as a local prototype unless their public roles change.
8. Keep Paper Reading Workflow labeled `Released · Open source` and retain both its repository and latest-release links.
9. Replace `public/cv.pdf` independently when the public CV changes.

## Public file map

```text
personal-homepage/
├── index.html          # Formal homepage
├── hybrid.css          # Formal layout, theme, and work-view styles
├── hybrid.js           # Theme, accessible tabs, and active-section state
├── plain.html          # Minimal project index
├── plain.css           # Minimal document typography and responsive theme
├── plain.js            # Text-only light/dark theme control
├── .nojekyll           # Bypass Jekyll processing
└── public/
    ├── cv.pdf          # Public downloadable CV
    └── favicon.svg     # CL monogram
```

No framework, analytics, backend, contact form, build command, or GitHub Action is required.
