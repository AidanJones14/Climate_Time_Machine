# Climate Time Machine

An interactive 3D data visualization that lets you scrub through 140+ years of global climate data on a spinning Earth. Watch temperature anomalies shift the globe from cool blue to intense red, and see the atmosphere thicken as CO₂ concentrations rise.

**[▶ Live Demo](https://aidanjones.github.io/climate-time-machine/)**

## Features

-**3D Interactive Globe** — Globe.gl renders a spinning Earth with blue marble textures and dynamic bump mapping
-**Temperature Visualization** — Globe emissive color shifts from blue (-0.5°C) → white (0°C) → red (+1.5°C) based on NASA GISTEMP data
- **CO₂ Atmospheric Effect** — Atmosphere thickens and shifts color post-1958 as CO₂ concentrations rise
-**Timeline Scrubbing** — Drag the slider or press play to animate through 1880–2023
-**Historical Milestones** — Key climate events pop up at relevant years (Earth Day, Paris Agreement, etc.)
-**Birth Year Feature** — Enter your birth year to see how much warmer the world has gotten in your lifetime
-**Keyboard Shortcuts** — Space to play/pause, arrow keys to scrub year by year
-**Speed Control** — 1×, 2×, 4× playback speeds

## Data Sources

| Dataset | Source | Range |
|---|---|---|
| Global Temperature Anomalies | [NASA GISTEMP v4](https://data.giss.nasa.gov/gistemp/) | 1880–2023 |
| Atmospheric CO₂ | [NOAA Mauna Loa](https://gml.noaa.gov/ccgg/trends/) | 1959–2025 |
| AI & Climate Data Point | [World Economic Forum, 2025](https://www.weforum.org/stories/2025/01/artificial-intelligence-climate-transition-drive-growth/) | — |

## Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, glassmorphism, responsive design
- **JavaScript (ES6+)** — Vanilla JS, no frameworks
- **Globe.gl** — 3D Earth rendering (bundles Three.js)
- **D3.js** — Color scales and data interpolation

## Quick Start

```bash
# Clone the repo
git clone https://github.com/aidanjones/climate-time-machine.git
cd climate-time-machine

# Open directly in your browser
open index.html

# Or build the single-file version
python3 scripts/build.py
open dist/index.html
```

No `npm install`, no build step, no server required. Just open `index.html`.

## Project Structure

```
climate-time-machine/
├── index.html            # Main page (references external CSS/JS)
├── css/styles.css        # All styles (glassmorphism, animations)
├── js/
│   ├── data.js           # NASA GISTEMP, NOAA CO₂, milestones
│   ├── globe_viz.js      # Globe.gl 3D visualization + color logic
│   └── app.js            # UI controls, slider, birth year, events
├── scripts/
│   ├── convert_data.py   # CSV → JS data constants
│   └── build.py          # Bundle into single dist/index.html
├── dist/
│   └── index.html        # ← Deploy this (single self-contained file)
└── design_docs/          # Design documentation
```

## Deployment

The `dist/index.html` file is a single self-contained HTML file (46 KB) ready for GitHub Pages:

1. Push to GitHub
2. Settings → Pages → Branch: `main`, Folder: `/dist`
3. Site is live in ~1 minute

## License

Data is public domain (NASA/NOAA). Code is MIT.
