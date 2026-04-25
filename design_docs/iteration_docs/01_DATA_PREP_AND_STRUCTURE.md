# Iteration 1: Data Preparation & Core Structure

## Goal
Set up the foundational file structure, retrieve the climate data, convert it into usable JavaScript constants, and build the basic HTML skeleton.

## Tasks

### 1. File Structure Setup
- Create the following directories and files in the project root:
  - `index.html`
  - `css/styles.css`
  - `js/data.js`
  - `js/globe_viz.js`
  - `js/app.js`
  - `scripts/convert_data.py`

### 2. Data Retrieval & Conversion
- Download the NASA GISTEMP global temperature data (CSV).
- Download the NOAA Mauna Loa CO2 data (CSV).
- Use `scripts/convert_data.py` to parse both CSVs.
  - Filter temperature data to only include the `GISTEMP` source.
  - Format the output as JSON arrays assigned to `const TEMP_DATA` and `const CO2_DATA`.
- Save the output into `js/data.js`.

### 3. HTML Skeleton (`index.html`)
- Set up standard HTML5 boilerplate.
- Include necessary CDN links in the `<head>`:
  - D3.js v7 (`https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js`)
  - Globe.gl (`https://unpkg.com/globe.gl`) — **Note:** Globe.gl's CDN bundle already includes Three.js. Do NOT add a separate Three.js `<script>` tag.
  - Link to `css/styles.css`.
- Define semantic layout sections:
  - `<div id="viz-container"></div>` for the 3D globe.
  - `<div id="controls"></div>` for the slider and play/pause button.
  - `<div id="info-panel"></div>` for data readouts and milestones.
  - `<footer>` for the WEF data callout and source attributions.
- Import local scripts at the end of `<body>` in this order:
  - `js/data.js`
  - `js/globe_viz.js`
  - `js/app.js`

## Verification
- Open `index.html` in a browser.
- Open the developer console and type `TEMP_DATA` and `CO2_DATA`. Verify the arrays are fully populated and accessible.
