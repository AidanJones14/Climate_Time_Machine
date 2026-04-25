# Iteration 3: Core 3D Globe Visualization

## Goal
Render the interactive 3D Earth using Globe.gl and dynamically map the global temperature anomaly to the globe's visual state based on the slider's current year.

## Tasks

### 1. Initialize Globe (`js/globe_viz.js`)
- Instantiate the `Globe()` component inside `#viz-container`.
- Set an appropriate base map or image layer (e.g., a dark satellite map or a procedural topology).
- Enable auto-rotation or user interaction controls.

### 2. Map Temperature to Color
- Define a color scale function (using D3's `scaleLinear` or custom logic) that maps temperature anomalies to colors:
  - Negative (cooler): Blue (`#2166ac`)
  - Zero: White or neutral
  - Positive (warmer): Red (`#b2182b`)
- Connect `globe_viz.js` to the slider events emitted by `app.js`.
- As the year changes, update the globe's overall tint, a heatmap layer, or an atmospheric shader to reflect the temperature anomaly for that year.

### 3. Smooth Transitions
- Implement smoothing. When the slider jumps or auto-advances, the color transition on the globe should interpolate smoothly over time rather than snapping instantly.

## Verification
- Dragging the slider from 1880 to the present should visibly shift the Earth's color from cool hues to intense red.
- The user should be able to click and drag to rotate the 3D globe at any time.
