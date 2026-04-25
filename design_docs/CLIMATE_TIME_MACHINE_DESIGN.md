# Climate Time Machine — Master Design & Context Document

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Parts 1–3 Summary (Verbatim)](#2-parts-13-summary-verbatim)
3. [Rubric (Verbatim)](#3-rubric-verbatim)
4. [Planning Guide Decisions](#4-planning-guide-decisions)
5. [Creator's Note (to be generated alongside the project)](#5-creators-note)
6. [Technical Design](#6-technical-design)
7. [Data Sources & Schemas](#7-data-sources--schemas)
8. [Functional Requirements](#8-functional-requirements)
9. [Visual Design Direction](#9-visual-design-direction)
10. [Hosting & Deployment](#10-hosting--deployment)

---

## 1. Project Overview

**What:** An interactive web-based "Climate Time Machine" that lets users explore real climate data (global temperature anomalies and atmospheric CO2 levels) across time. The user drags a year slider from 1880 to present and watches visualizations update — temperature trends, CO2 concentration, and contextual milestones. The tool should feel personal, not like a government dashboard. It is aimed at college-aged peers and should be shareable via a link.

**Why:** This is Part 4 of a college environmental science Climate Action Project. The student is a CS senior. Their climate "why" is that climate change feels too big for one person to fix. Their climate superpower is using software to turn overwhelming climate data into tools people can actually use. This project IS that superpower in action.

**Audience:** College-aged peers (friends, classmates, social media followers) who know climate change is real but feel disconnected from the data.

**Deliverables:**
- A working interactive web tool (single `index.html` file deployable to GitHub Pages)
- A filled-out Creator's Note (separate PDF)

---

## 2. Parts 1–3 Summary (Verbatim)

### Part 1 — Climate Why (Slide 1 statement)
> "Climate change matters to me because I'm 22 years old, and the world I'm going to spend the rest of my life in is getting worse in ways that feel too big for any one person to fix."

### Part 1 — Supporting Source (Slide 2)
- **Title:** "What is AI's Role in the Climate Transition and How Can It Drive Growth?"
- **Source:** World Economic Forum, January 2025
- **Authors:** Lord Nicholas Stern & Mattia Romani
- **Link:** https://www.weforum.org/stories/2025/01/artificial-intelligence-climate-transition-drive-growth/
- **Key data point:** AI and software tools applied to power, food, and mobility sectors could reduce global emissions by 3 to 6 gigatonnes of CO2 per year by 2035.
- **Summary from slide 2:** "This article breaks down how AI is already being used to cut emissions, from optimizing power grids to improving climate predictions. It estimates AI could reduce emissions by 3 to 6 gigatonnes of CO2 per year by 2035. It matters to me because I'm about to graduate with a CS degree feeling like climate change is an impossible problem, and this was one of the first things that made me think maybe the work I end up doing could actually move the needle."

### Part 2 — Climate Venn Diagram

**What are you good at?**
- Breaking down complex problems step by step
- Writing code and building software from scratch
- Debugging and troubleshooting systems
- Researching and teaching yourself new tools quickly

**What brings you joy?**
- Learning how things actually work under the hood
- Building something from nothing and watching it run
- Working on a team toward something that matters
- That moment when a tough problem finally clicks

**What needs doing?**
- Better tools for tracking and visualizing emissions data
- Software that helps cities and companies optimize energy use
- Making climate data accessible to regular people, not just scientists
- Open source tools that let smaller organizations act on climate

**Climate Superpower:**
> Using software to turn overwhelming climate data into tools people can actually use.

### Part 3 — Planning Guide Answers

**Step 1 — Reconnect:**
- Climate Why: The world I'm going to spend the rest of my life in is getting worse in ways that feel too big for any one person to fix.
- Climate Superpower: Using software to turn overwhelming climate data into tools people can actually use.

**Step 2 — Audience:**
- Who: Friends/Peers, Social media followers
- What they know: Most peers know climate change is real but it feels abstract. They can't cite specific data or actions.
- What they care about: Their careers, getting through school, staying informed without being overwhelmed. They care about the future but feel disconnected.
- How they get info: Social media (TikTok, Instagram), Visual media (art, video, graphics)

**Step 3 — Product:**
- Format: Game or interactive experience
- How it expresses the why/superpower: "My whole climate why is that the problem feels too big and overwhelming. An interactive web tool lets me take a piece of that huge problem and make it small and tangible. Instead of just telling people climate change matters, I can let them click around and actually see data in a way that makes sense. It's also literally my superpower in action: I'm using my CS skills to turn climate data into something usable."
- How it reaches the audience: "My peers live online and they engage way more with something they can interact with than a wall of text. An interactive tool is shareable, it's something you can send in a group chat or post on social media. It meets people where they already are instead of asking them to go out of their way to care about climate."

**Step 4 — Data Point:**
- Data: AI and software tools applied to power, food, and mobility sectors could reduce global emissions by 3 to 6 gigatonnes of CO2 per year by 2035.
- Source: "What is AI's Role in the Climate Transition and How Can It Drive Growth?" — World Economic Forum, January 2025. By Lord Nicholas Stern and Mattia Romani. https://www.weforum.org/stories/2025/01/artificial-intelligence-climate-transition-drive-growth/
- Usage: Show it as a graph or image, use it as inspiration for narrative, include it in visuals or captions.

---

## 3. Rubric (Verbatim)

Total: 50 points

| Category | Low | Mid | High |
|---|---|---|---|
| **Alignment with Climate 'Why' and Superpower** | Connection to 'why' and/or superpower is missing. (4 pts) | Product somewhat reflects the student's 'why' or superpower, but one connection may be weak or underdeveloped. (7 pts) | Product clearly and meaningfully reflects the student's personal climate 'why' and uses their superpower effectively. (10 pts) |
| **Audience Awareness** | Product shows little awareness of or connection to a specific audience. (4 pts) | Some audience awareness is present, but parts of the product may not fully fit the intended group. (6 pts) | Product is clearly tailored to the chosen audience in tone, format, and content. It's engaging and accessible to them. (8 pts) |
| **Message Clarity and Impact** | Message is unclear, confusing, or lacks a strong point. (4 pts) | Message is mostly clear, but could be more focused or impactful. Some parts may be confusing or unfocused. (7 pts) | Message is clear, focused, and compelling. It communicates a strong climate-related idea, action, or perspective. (10 pts) |
| **Creativity & Originality** | Product shows little creativity or seems rushed, copied, or underdeveloped. (4 pts) | Product is somewhat creative or original but could use more unique or imaginative elements. (7 pts) | Product is creative, original, and thoughtfully designed. Shows risk-taking or innovation in format, tone, or content. (10 pts) |
| **Effort & Execution** | Product appears rushed or incomplete; low-effort presentation. (3 pts) | Adequate effort shown, but product could be more polished or complete. (5 pts) | High-quality, polished work. Clearly took time and care in creation — appropriate to the medium. (7 pts) |
| **Incorporation of Data** | No data is used, or it is inaccurate or irrelevant. (0 pts) | A data point is included, but may feel disconnected or unclear. (2 pts) | A relevant and well-integrated data point is used meaningfully in the product. (3 pts) |
| **Creator's Note** | Missing. (0 pts) | Explains the connection to 'why' and/or superpower, but may lack detail or specificity. (1 pt) | Clearly and thoughtfully explains how the product connects to both the personal climate why and climate superpower. Specific examples or reasoning are included. (2 pts) |

---

## 4. Planning Guide Decisions

The planning guide established that the product should:
- Be an interactive web tool / game-like experience
- Reflect the student's climate "why" (the problem feels too big, make it tangible)
- Use their superpower (turn climate data into something usable)
- Be tailored to college-aged peers who consume content on social media
- Incorporate at least one real data point meaningfully (the WEF AI/climate stat)
- Be shareable via link

---

## 5. Creator's Note

The Creator's Note is a separate one-page PDF with a simple table. It must be generated alongside the project. Fields:

| Field | Value |
|---|---|
| **Climate "why"** | The world I'm going to spend the rest of my life in is getting worse in ways that feel too big for any one person to fix. |
| **Climate superpower** | Using software to turn overwhelming climate data into tools people can actually use. |
| **Audience** | College-aged peers and friends who know climate change is real but feel disconnected from the data. |
| **Creator's note** | This interactive Climate Time Machine is my superpower in action. I took two real datasets — NASA's global temperature record going back to 1880 and NOAA's atmospheric CO2 measurements from Mauna Loa — and turned them into something you can actually explore instead of just reading about. The year slider lets you watch the data change in real time, and the milestone markers connect the numbers to events people actually recognize. I built this because my climate "why" is that the scale of climate change feels paralyzing, and I wanted to prove — to myself and my peers — that making data accessible and tangible is one small thing a CS student can do to fight that helplessness. The WEF data point about AI cutting 3–6 gigatonnes of CO2 per year by 2035 is included because it shows that technology and software aren't just part of the problem — they can be part of the solution. |

---

## 6. Technical Design

### 6.1 Architecture

The project is a **single self-contained `index.html` file**. No build step. No framework compilation. No server. Everything — HTML, CSS, JavaScript, and data — lives in one file that can be opened in a browser or deployed to GitHub Pages.

### 6.2 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Structure | HTML5 | Single file, no build tooling |
| Styling | CSS3 (custom, no framework) | Full control over look/feel, no CDN dependency |
| Visualization | **D3.js v7** (loaded from CDN: `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js`) | Industry standard for custom, animated, interactive data visualization. Supports radial charts, animated paths, custom SVG — goes far beyond basic line charts. Used in the famous Ed Hawkins climate spiral shown at the 2016 Olympics. |
| Interactivity | Vanilla JavaScript (ES6+) | No React/Vue needed for a single-page tool. Keeps it simple and dependency-light. |
| Data | Hardcoded JSON arrays embedded in a `<script>` tag | Both datasets are small (~150 rows for annual data). Eliminates fetch/CORS issues. Guarantees the tool works offline and loads instantly. |

### 6.3 Why D3.js and not Recharts/Chart.js

- Recharts and Chart.js produce standard rectangular charts (line, bar, pie). They're fine for dashboards but look generic.
- D3 allows custom SVG visualizations: animated spirals, radial timelines, gradient-colored paths, custom tooltips, and smooth transitions. This is what scores high on the "Creativity & Originality" rubric category (10 pts).
- D3 is available via CDN with no build step — perfect for a single HTML file.
- The climate spiral visualization (Ed Hawkins) was recreated in D3 and went viral — proof this approach resonates.

### 6.4 Project File Structure

```
climate-time-machine/
├── index.html          # THE ENTIRE APP — HTML + CSS + JS + data
└── README.md           # Brief description for the GitHub repo
```

That's it. One file.

### 6.5 Internal Structure of `index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Climate Time Machine</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
    <style>
        /* --- ALL CSS HERE --- */
    </style>
</head>
<body>
    <!-- --- LAYOUT STRUCTURE --- -->
    <div id="app">
        <header>...</header>
        <main>
            <section id="viz-container">
                <!-- D3 renders SVG here -->
            </section>
            <section id="controls">
                <!-- Year slider, play/pause button -->
            </section>
            <section id="info-panel">
                <!-- Current year stats, milestone text, data callouts -->
            </section>
            <section id="data-point">
                <!-- WEF stat about AI + climate -->
            </section>
        </main>
        <footer>
            <!-- Data sources, credits -->
        </footer>
    </div>

    <script>
        // --- EMBEDDED DATA ---
        const TEMP_DATA = [ /* NASA GISTEMP annual data */ ];
        const CO2_DATA = [ /* NOAA Mauna Loa annual data */ ];
        const MILESTONES = [ /* Key climate events */ ];

        // --- D3 VISUALIZATION CODE ---
        // --- SLIDER / ANIMATION LOGIC ---
        // --- EVENT HANDLERS ---
    </script>
</body>
</html>
```

---

## 7. Data Sources & Schemas

### 7.1 NASA GISTEMP — Global Temperature Anomalies

- **What:** Annual global mean temperature anomalies (deviation from 1951-1980 baseline) in degrees Celsius
- **Range:** 1880 to present
- **Source:** NASA Goddard Institute for Space Studies (GISS) Surface Temperature Analysis v4
- **CSV URL:** `https://datahub.io/core/global-temp/_r/-/data/annual.csv`
- **License:** Public Domain (PDDL v1.0)
- **Schema:**

| Column | Type | Description |
|---|---|---|
| Source | string | "GISTEMP" or "GCAG" — use GISTEMP rows |
| Year | integer | e.g. 1880, 1881, ... |
| Mean | float | Temperature anomaly in °C (e.g. -0.18, 0.07, 1.02) |

- **Usage in app:** Filter to Source="GISTEMP". Embed as JSON array of `{year, mean}` objects.

### 7.2 NOAA Mauna Loa — Atmospheric CO2

- **What:** Annual mean atmospheric CO2 concentration in parts per million (ppm), measured at Mauna Loa Observatory, Hawaii
- **Range:** 1959 to present (measurements began March 1958; annual means from 1959)
- **Source:** NOAA Global Monitoring Laboratory / Scripps Institution of Oceanography
- **CSV URL:** `https://datahub.io/core/co2-ppm/_r/-/data/co2-annmean-mlo.csv`
- **License:** Public Domain (US Government work)
- **Schema:**

| Column | Type | Description |
|---|---|---|
| Year | integer | e.g. 1959, 1960, ... |
| Mean | float | Annual mean CO2 in ppm (e.g. 315.98, 316.91, ...) |
| Unc | float | Uncertainty (can be ignored for this project) |

- **Usage in app:** Embed as JSON array of `{year, co2}` objects.

### 7.3 Climate Milestones (Hardcoded)

These provide context as users scrub the timeline. Embed as a static array.

```javascript
const MILESTONES = [
  { year: 1880, text: "Earliest temperature records begin" },
  { year: 1896, text: "Svante Arrhenius first predicts greenhouse warming" },
  { year: 1958, text: "CO2 measurements begin at Mauna Loa (315 ppm)" },
  { year: 1970, text: "First Earth Day celebrated" },
  { year: 1988, text: "IPCC established by the United Nations" },
  { year: 1992, text: "UN Framework Convention on Climate Change signed at Rio Earth Summit" },
  { year: 1997, text: "Kyoto Protocol adopted" },
  { year: 2003, text: "European heat wave kills over 30,000 people" },
  { year: 2005, text: "Kyoto Protocol enters into force" },
  { year: 2012, text: "Arctic sea ice hits record low" },
  { year: 2015, text: "Paris Agreement adopted — goal to limit warming to 1.5°C" },
  { year: 2016, text: "Hottest year on record at the time" },
  { year: 2023, text: "Confirmed as hottest year in recorded history" },
  { year: 2025, text: "WEF reports AI could cut 3–6 Gt CO2/year by 2035" },
];
```

### 7.4 Data Preparation

Before building, download both CSVs and convert to hardcoded JS arrays:

```bash
# Download temperature data (use -L to follow redirects)
curl -L -o annual_temp.csv "https://datahub.io/core/global-temp/_r/-/data/annual.csv"

# Download CO2 data (use -L to follow redirects)
curl -L -o co2_annual.csv "https://datahub.io/core/co2-ppm/_r/-/data/co2-annmean-mlo.csv"
```

To easily convert the downloaded CSV files into the required JSON arrays for your `index.html` file, you can run a simple Python script:

```python
import csv
import json

# Process Temperature Data (filter by GISTEMP)
temp_data = []
with open('annual_temp.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['Source'] == 'GISTEMP':
            temp_data.append({"year": int(row['Year']), "mean": float(row['Mean'])})

# Process CO2 Data
co2_data = []
with open('co2_annual.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        co2_data.append({"year": int(row['Year']), "co2": float(row['Mean'])})

# Save to a text file for easy copy-pasting
with open('data_constants.js', 'w') as f:
    f.write("const TEMP_DATA = " + json.dumps(temp_data) + ";\n\n")
    f.write("const CO2_DATA = " + json.dumps(co2_data) + ";\n")

print("Data converted and saved to data_constants.js")
```

Run this script and copy the resulting arrays into your `<script>` tag. Only include GISTEMP source rows for temperature.

---

## 8. Functional Requirements

### 8.1 Core Interaction — Year Slider
- A range slider spanning from 1880 to the latest year in the data (Use a standard HTML `<input type="range">` for native support and simplicity)
- Dragging the slider updates ALL visualizations simultaneously
- Current year displayed prominently
- Play/pause button that auto-advances the slider (animation)
- Animation speed should feel smooth — roughly 100-150ms per year

### 8.2 Primary Visualization — Animated Temperature Chart
- Use a robust visualization library (like D3.js or Globe.gl) to show temperature anomaly data
- Should go beyond a basic line chart. Options (pick the best one or combine):
  - **3D Interactive Globe (Globe.gl / Three.js)**: The absolute coolest option. Render a 3D spinning Earth using `globe.gl` (available via CDN). As the timeline advances, tint the globe or apply a global heatmap that shifts from cool blue to burning red. This makes the "Time Machine" concept feel literal and immersive.
  - **Warming stripes** (Ed Hawkins style): each year is a vertical stripe colored from blue (cool) to red (warm). Simple, iconic, immediately recognizable.
  - **Radial/spiral chart** showing temperature spiraling outward over time (D3.js).
- The visualization should animate as the slider moves — not just redraw, but smoothly transition (Leverage D3's `.transition()` or Three.js/Globe.gl animation loops to interpolate colors)
- Color encoding: blue (#2166ac) for negative anomalies (cooler), red (#b2182b) for positive (warmer), with a gradient through white at zero

### 8.3 Secondary Visualization — CO2 Concentration
- Smaller companion chart showing atmospheric CO2 in ppm
- Only visible when the slider passes 1958 (when measurements began)
- Options for visualization:
  - **2D Keeling Curve**: A simple D3 area or line chart that clearly shows the acceleration.
  - **3D Atmospheric Halo**: If using Globe.gl/Three.js, render a custom atmospheric layer or particle system around the Earth that thickens, becomes hazier, or changes color as the CO2 ppm increases, creating a visceral sense of greenhouse gas accumulation.

### 8.4 Info Panel
- Shows for the current year:
  - Temperature anomaly (e.g. "+1.02°C above 1951-1980 average")
  - CO2 level if available (e.g. "421 ppm")
  - Any milestone event for that year
- Contextual comparison: "X°C warmer than when you were born" (if user enters birth year)

### 8.5 Birth Year Feature (personal connection)
- Optional input where user enters their birth year
- Once entered, the info panel shows relative comparisons:
  - "Since [birth year], temperature has risen X°C"
  - "Since [birth year], CO2 has increased by X ppm"
- This is what makes it personal and hits the "Audience Awareness" rubric category

### 8.6 Data Point Callout
- Somewhere on the page (footer or dedicated section), display:
  - "AI and software tools could reduce global emissions by 3–6 gigatonnes of CO2 per year by 2035." — World Economic Forum, 2025
- This satisfies the "Incorporation of Data" rubric requirement (3 pts)
- Could appear as a callout card when the slider reaches 2025, or as a persistent footer element

### 8.7 Source Attribution
- Footer must credit:
  - NASA GISS Surface Temperature Analysis (GISTEMP v4)
  - NOAA Global Monitoring Laboratory (Mauna Loa CO2)
  - World Economic Forum (AI/climate data point)
- Include links to original sources

---

## 9. Visual Design Direction

### 9.1 Overall Aesthetic
- Dark background (deep navy/charcoal: #0f172a or similar) — makes data visualizations pop
- Clean, modern typography — no serif fonts. Use system fonts or Google Fonts (Inter, Space Grotesk)
- Minimal UI chrome — let the visualization be the hero
- Not a "dashboard" — more like a storytelling experience with data
- Should feel approachable to non-technical users, not like a NASA control panel

### 9.2 Color Palette
- Background: #0f172a (dark slate)
- Text: #e2e8f0 (light gray)
- Accent: #38bdf8 (sky blue)
- Temperature cold: #2166ac (blue)
- Temperature warm: #b2182b (red)
- CO2 line: #22d3ee (cyan)
- Milestone markers: #fbbf24 (amber)

### 9.3 Layout
- Full viewport height, no scrolling needed (or minimal scrolling)
- Main visualization takes center stage (60-70% of viewport)
- Slider below the visualization
- Info panel to the side or below the slider
- Data callout and sources at the bottom

### 9.4 Responsive
- Should work on desktop and mobile (peers will likely open it on their phones from a shared link)
- On mobile, stack vertically: viz on top, slider, info panel below

---

## 10. Hosting & Deployment

### 10.1 GitHub Pages Setup

1. Create a new public repository on GitHub (e.g. `climate-time-machine`)
2. Add `index.html` to the root of the repository
3. Optionally add a `README.md`
4. Go to repository Settings → Pages
5. Under "Build and deployment" → "Branch", select `main` and `/ (root)`
6. Click Save
7. Wait 1-2 minutes. Site is live at `https://<username>.github.io/climate-time-machine/`

### 10.2 No Build Step Required

Since the entire app is a single HTML file with an external D3 CDN link, there is:
- No `npm install`
- No webpack/vite/rollup
- No compilation step
- No environment variables
- No server

Just push the file and it works.

---

## Appendix: Key Course Content for Context

### From Lecture 10.1 — The Atmosphere and Greenhouse Effect
- Greenhouse gases trap infrared radiation and raise air temperature
- CO2 is the primary GHG; has increased 45% since pre-industrial times
- Earth's temperature depends on balance between incoming/outgoing energy

### From Lecture 10.2 — Climate Change
- CO2 levels rose from 315 ppm in 1958 to 397 ppm in 2011
- Global temperature data shows warming trend since mid-1970s
- Warmest years on record: 2016, 2019, 2015, 2017, 2018, 2014, 2010, 2013, 2005, 1998
- End of 21st century: temperatures projected 1.8–4.0°C higher
- Impacts vary by location: extreme heat (SE US), hurricanes, sea level rise, water stress

### From Lecture 10.4 — Potential Solutions
- Paris Agreement: limit warming to well under 2°C, pursue 1.5°C
- Stabilization Wedges: need to cut ~7 GT over 50 years
- 15 specific wedge strategies (vehicle efficiency, renewables, CCS, deforestation, etc.)
- Conservation and renewable energy as primary paths forward

### From Luber & Prudent Paper — Climate Change and Human Health
- Climate change must be framed as a public health concern
- Heat waves, vector-borne diseases, waterborne diseases, air quality, mental health
- Urban Heat Island effect amplifies warming in cities
- Regional strategies needed since vulnerability varies by location
- Co-benefits: improving health while addressing climate change

### From WEF Article — AI's Role in Climate Transition (Jan 2025)
- AI could cut annual emissions by 3–6 GtCO2e by 2035 across power, food, mobility
- Power sector: AI enhanced renewable energy efficiency, ~1.8 GtCO2e reduction
- Food sector: alternative proteins via AI could save ~3 GtCO2e/year
- Mobility: AI-enabled shared transport and optimized EV adoption, ~0.6 GtCO2e
- DeepMind's wind energy optimization boosted renewables' value by 20%
- Google Maps eco-routing prevented 1M+ tonnes CO2 annually
- AI itself adds 0.4–1.6 GtCO2e from data centers, but net impact is positive
- Requires intentional collaboration between governments, tech, and energy sectors
