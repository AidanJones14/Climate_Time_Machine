/**
 * globe_viz.js — Globe.gl 3D Earth visualization
 *
 * Renders an interactive 3D globe that responds to the year slider.
 *
 * Temperature effect:
 *   - Globe material BASE COLOR shifts from cool to warm tones
 *   - Globe material EMISSIVE color provides the glow tint
 *   - Combined effect: the globe clearly shifts blue → natural → RED
 *
 * CO₂ effect (post-1958):
 *   - Atmosphere color shifts warm
 *   - Atmosphere altitude grows slightly with CO₂ ppm
 *
 * Listens to the "yearchange" custom event dispatched by app.js.
 */

(function () {
    "use strict";

    // =========================================================
    //  Color Scales
    // =========================================================

    // Emissive glow color — saturated red for warm, saturated blue for cool
    const emissiveColorScale = d3.scaleLinear()
        .domain([-0.5, -0.1, 0.0, 0.3, 0.7, 1.2])
        .range(["#2166ac", "#4393c3", "#444444", "#b03020", "#8b0000", "#550000"])
        .clamp(true);

    // Base material color — shifts the ENTIRE texture tone
    // Cool = blueish grey, neutral = grey, warm = reddish/warm grey
    const baseColorScale = d3.scaleLinear()
        .domain([-0.5, 0.0, 0.4, 0.8, 1.2])
        .range(["#8899bb", "#aaaaaa", "#bb9988", "#cc7766", "#aa4444"])
        .clamp(true);

    // Atmosphere color — visible glow ring around the globe
    const atmColorScale = d3.scaleLinear()
        .domain([-0.5, 0, 0.3, 0.8, 1.2])
        .range(["#1a4a7a", "#3a5a6a", "#a04030", "#cc2010", "#990000"])
        .clamp(true);

    // CO₂ → atmosphere thickness
    const co2AltitudeScale = d3.scaleLinear()
        .domain([315, 370, 425])
        .range([0.12, 0.16, 0.22])
        .clamp(true);

    // =========================================================
    //  Globe Initialization
    // =========================================================
    const container = document.getElementById("viz-container");

    const globe = new Globe(container, {
        animateIn: true,
        waitForGlobeReady: true
    })
        .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("#0f172a00")
        .showAtmosphere(true)
        .atmosphereColor("#1a4a7a")
        .atmosphereAltitude(0.10)
        .pointOfView({ lat: 20, lng: -40, altitude: 2.2 });

    // =========================================================
    //  Globe Material — THREE.js MeshPhongMaterial
    // =========================================================
    const globeMaterial = globe.globeMaterial();

    // Start with neutral-cool base
    globeMaterial.color.set(0x8899bb);
    globeMaterial.emissive.set(0x2166ac);
    globeMaterial.emissiveIntensity = 0.12;
    globeMaterial.shininess = 8;

    // =========================================================
    //  Auto-rotation
    // =========================================================
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 500;

    // =========================================================
    //  Smooth Transition State
    // =========================================================
    let targetEmissive = { r: 0.13, g: 0.40, b: 0.67 };
    let currentEmissive = { ...targetEmissive };
    let targetBase = { r: 0.53, g: 0.60, b: 0.73 };
    let currentBase = { ...targetBase };
    let targetIntensity = 0.12;
    let currentIntensity = 0.12;

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 0.5, g: 0.5, b: 0.5 };
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    // =========================================================
    //  Animation Loop — smooth interpolation each frame
    // =========================================================
    const LERP_SPEED = 0.06;

    function animate() {
        // Smoothly interpolate emissive color
        currentEmissive.r = lerp(currentEmissive.r, targetEmissive.r, LERP_SPEED);
        currentEmissive.g = lerp(currentEmissive.g, targetEmissive.g, LERP_SPEED);
        currentEmissive.b = lerp(currentEmissive.b, targetEmissive.b, LERP_SPEED);
        globeMaterial.emissive.setRGB(currentEmissive.r, currentEmissive.g, currentEmissive.b);

        // Smoothly interpolate base color
        currentBase.r = lerp(currentBase.r, targetBase.r, LERP_SPEED);
        currentBase.g = lerp(currentBase.g, targetBase.g, LERP_SPEED);
        currentBase.b = lerp(currentBase.b, targetBase.b, LERP_SPEED);
        globeMaterial.color.setRGB(currentBase.r, currentBase.g, currentBase.b);

        // Smoothly interpolate emissive intensity
        currentIntensity = lerp(currentIntensity, targetIntensity, LERP_SPEED);
        globeMaterial.emissiveIntensity = currentIntensity;

        requestAnimationFrame(animate);
    }

    animate();

    // =========================================================
    //  Year Change Handler
    // =========================================================
    window.addEventListener("yearchange", (e) => {
        const { year, tempAnomaly, co2 } = e.detail;
        if (tempAnomaly === undefined) return;

        // --- Temperature → Emissive glow ---
        targetEmissive = hexToRgb(emissiveColorScale(tempAnomaly));

        // --- Temperature → Base material color (tints the texture) ---
        targetBase = hexToRgb(baseColorScale(tempAnomaly));

        // Emissive intensity: moderate for cool, stronger for warm
        if (tempAnomaly >= 0) {
            targetIntensity = 0.12 + tempAnomaly * 0.3;
        } else {
            targetIntensity = 0.1 + Math.abs(tempAnomaly) * 0.1;
        }
        targetIntensity = Math.min(targetIntensity, 0.5);

        // --- Atmosphere ---
        globe.atmosphereColor(atmColorScale(tempAnomaly));

        if (co2 !== undefined) {
            const co2Alt = co2AltitudeScale(co2);
            const tempAlt = Math.max(0, tempAnomaly) * 0.03;
            globe.atmosphereAltitude(Math.min(co2Alt + tempAlt, 0.25));
        } else {
            const atmAlt = 0.08 + Math.max(0, tempAnomaly) * 0.04;
            globe.atmosphereAltitude(Math.min(atmAlt, 0.16));
        }
    });

    // =========================================================
    //  Handle Window Resize
    // =========================================================
    window.addEventListener("resize", () => {
        globe.width(container.clientWidth);
        globe.height(container.clientHeight);
    });

    // =========================================================
    //  Notify app.js when globe is ready
    // =========================================================
    globe.onGlobeReady(() => {
        console.log("Globe texture loaded — dispatching globeready");
        window.dispatchEvent(new Event("globeready"));
    });

    console.log("globe_viz.js initialized");
})();
