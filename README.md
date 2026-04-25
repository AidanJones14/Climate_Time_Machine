# Climate Time Machine

An interactive 3D data visualization that allows you to scrub through over 140 years of global climate data on a spinning Earth. Watch temperature anomalies shift the globe from cool to warm, and see the atmosphere thicken as CO2 concentrations rise.

**[Live Demo](https://aidanjones14.github.io/Climate_Time_Machine/)**

## Features

- **3D Interactive Globe**: Globe.gl renders a spinning Earth with dynamic coloring and atmospheric effects.
- **Temperature Visualization**: The globe's surface color shifts to red based on NASA GISTEMP data to visualize temperature anomalies.
- **CO2 Atmospheric Effect**: The atmosphere thickens and shifts to a white smog post-1958 as CO2 concentrations rise.
- **Timeline Scrubbing**: Drag the slider or press play to animate through the years 1880-2023.
- **Sparkline Charts**: D3.js powered charts provide a 2D overview of temperature and CO2 trends.
- **Birth Year Tool**: Enter your birth year to automatically calculate and visualize the climate changes that have occurred during your lifetime.
- **Keyboard Shortcuts**: Use the spacebar to play/pause, and the left/right arrow keys to scrub through the timeline.
- **Speed Control**: Adjust playback speed between 1x, 2x, and 4x.

## Data Sources

- **Global Temperature Anomalies**: NASA GISTEMP v4 (1880-2023)
- **Atmospheric CO2**: NOAA Mauna Loa (1959-2025)

## Tech Stack

- **HTML5 / CSS3**: Structure and styling with modern glassmorphism UI.
- **JavaScript**: Vanilla ES6+, no heavy frameworks used.
- **Globe.gl**: 3D Earth rendering (built on Three.js).
- **D3.js**: Data scaling, interpolation, and 2D charting.

## Quick Start

You can run this project locally without any dependencies or servers.

```bash
# Clone the repository
git clone https://github.com/AidanJones14/Climate_Time_Machine.git
cd Climate_Time_Machine

# Open directly in your browser
open index.html
```

## Project Structure

```
climate_time_machine/
├── index.html            # Main page
├── css/styles.css        # Stylesheet
├── js/
│   ├── data.js           # Static climate data arrays
│   ├── globe_viz.js      # 3D visualization and color logic
│   └── app.js            # UI controls and state management
├── scripts/
│   ├── convert_data.py   # Utility to convert CSV data to JS arrays
│   └── build.py          # Bundle script
└── dist/
    └── index.html        # Compiled single-file deployment
```

## License

Climate data is public domain (provided by NASA and NOAA). The application code is MIT licensed.
