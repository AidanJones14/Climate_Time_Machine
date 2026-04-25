# Iteration 5: Assembly & Final Polish

## Goal
Finalize the application, ensure performance is smooth, add required contextual data, and optionally bundle into a single file for deployment.

## Tasks

### 1. Performance & Smoothing
- Test the slider dragging and auto-play functionality. Ensure the visual transitions (temperature color shift, CO2 halo growth) are fluid and don't stutter.
- Optimize the Three.js/Globe.gl render loop if necessary.

### 2. Data Point Callout & Attribution
- Add the WEF AI data point ("AI and software tools could reduce global emissions by 3–6 gigatonnes...") to the footer or as a special milestone card when the slider hits 2025.
- Ensure the footer contains clear attribution links for:
  - NASA GISS (Temperature)
  - NOAA (CO2)
  - WEF (AI Data point)

### 3. Review against Rubric
- Check the project against the grading rubric in the master design doc.
  - Alignment with climate "why" (met via Birth Year feature and visual tangibility).
  - Creativity & Originality (met via custom 3D Globe visualization).
  - Incorporation of Data (met via accurate NASA/NOAA data mapping and WEF callout).

### 4. (Optional) Single File Bundling
- If the project strictly requires a single `index.html` file, run a build script or manually inline the contents of `css/styles.css`, `js/data.js`, `js/globe_viz.js`, and `js/app.js` into `<style>` and `<script>` tags within `index.html`.

## Verification
- The entire experience should feel cohesive, immersive, and responsive on both desktop and mobile layouts.
- Deploy to GitHub Pages and verify functionality on the live URL.
