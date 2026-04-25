# Iteration 2: UI & Styling

## Goal
Implement the dark, minimalist aesthetic and build the interactive UI controls (slider, info panels) that will drive the visualization.

## Tasks

### 1. Global Styling (`css/styles.css`)
- Implement a dark theme background (e.g., `#0f172a` navy/charcoal).
- Set default typography using a clean sans-serif font (e.g., system fonts or Inter via Google Fonts).
- Ensure body has `margin: 0`, `overflow: hidden` (to prevent scrolling and let the 3D scene fill the viewport).

### 2. UI Layout
- Position `#viz-container` absolutely to cover the full screen behind the UI.
- Style `#controls` as a floating panel at the bottom center of the screen.
- Style `#info-panel` as a clean, translucent card (glassmorphism effect) in the top-left or top-right corner.
- Ensure the layout is responsive (e.g., stack panels on mobile).

### 3. Interactive Controls (`index.html` & `js/app.js`)
- Add an `<input type="range">` slider inside `#controls`.
  - Set `min="1880"` and `max` to the latest year in `TEMP_DATA`.
  - Style the slider to fit the dark theme (custom thumb and track colors).
- Add a play/pause `<button>` next to the slider.
- In `js/app.js`, add event listeners to the slider to update a global state object or dispatch custom events when the year changes.
- Implement the play/pause logic to auto-advance the slider using `setInterval` or `requestAnimationFrame` (targeting ~100-150ms per year).

## Verification
- Slider should be draggable.
- Play button should automatically advance the slider and pause when clicked again.
- The UI should look polished and not resemble standard browser defaults.
