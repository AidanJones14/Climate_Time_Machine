# Iteration 4: CO2 Visualization & Milestones

## Goal
Layer in the secondary data (CO2 concentration) as a 3D atmospheric effect and implement the contextual UI features (historical milestones and personal birth year logic).

## Tasks

### 1. CO2 Atmospheric Halo (`js/globe_viz.js`)
- Write logic to check if the current year is >= 1958.
- If true, retrieve the CO2 ppm value from `CO2_DATA`.
- Create a visual representation of the CO2 data surrounding the globe. Options:
  - Add an atmospheric glow/halo using Globe.gl's custom layer or Three.js shaders that increases in opacity or thickness.
  - Generate a particle system around the Earth where particle density maps to CO2 ppm.

### 2. Historical Milestones (`js/data.js` & `js/app.js`)
- Ensure the `MILESTONES` array (from the design doc) is defined in `data.js`.
- In `app.js`, when the slider updates, check if the current year matches any milestone.
- If a milestone exists, display the event text prominently in the `#info-panel`. Add a subtle UI animation (e.g., fade in) to draw attention to it.

### 3. Birth Year Feature (`js/app.js` & `index.html`)
- Add an input field `<input type="number">` and a submit button to the `#info-panel` allowing the user to enter their birth year.
- Upon submission, calculate the relative change:
  - Temperature rise since birth year.
  - CO2 increase since birth year (if born >= 1958).
- Display these personalized stats persistently in the info panel as long as the current slider year is > the birth year.

## Verification
- Sliding past 1958 should visibly trigger the CO2 visual effect.
- Milestones should pop up correctly at specific years (e.g., 1970, 2015).
- Entering a birth year should accurately calculate and display relative climate changes.
