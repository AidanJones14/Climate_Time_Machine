// globe visualization script

(function () {
    "use strict";

    // color scales

    // emissive glow (heat)
    const emissiveColorScale = d3.scaleLinear()
        .domain([-0.5, -0.1, 0.0, 0.3, 0.7, 1.2])
        .range(["#2166ac", "#4393c3", "#444444", "#b03020", "#8b0000", "#550000"])
        .clamp(true);

    // base texture tint
    const baseColorScale = d3.scaleLinear()
        .domain([-0.5, 0.0, 0.4, 0.8, 1.2])
        .range(["#8899bb", "#aaaaaa", "#bb9988", "#cc7766", "#aa4444"])
        .clamp(true);

    // atmosphere halo color
    const atmColorScale = d3.scaleLinear()
        .domain([-0.5, 0, 0.3, 0.8, 1.2])
        .range(["#1a4a7a", "#4a6a8a", "#9a8a7a", "#c0a090", "#dcb4a4"])
        .clamp(true);

    // atmosphere thickness (co2)
    const co2AltitudeScale = d3.scaleLinear()
        .domain([315, 370, 425])
        .range([0.15, 0.25, 0.60])
        .clamp(true);

    // initialize globe
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

    // globe material config
    const globeMaterial = globe.globeMaterial();

    // initial neutral state
    globeMaterial.color.set(0x8899bb);
    globeMaterial.emissive.set(0x2166ac);
    globeMaterial.emissiveIntensity = 0.12;
    globeMaterial.shininess = 8;

    // camera controls
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 500;

    // animation state
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

    // render loop
    const LERP_SPEED = 0.06;

    function animate() {
        // smooth color updates
        currentEmissive.r = lerp(currentEmissive.r, targetEmissive.r, LERP_SPEED);
        currentEmissive.g = lerp(currentEmissive.g, targetEmissive.g, LERP_SPEED);
        currentEmissive.b = lerp(currentEmissive.b, targetEmissive.b, LERP_SPEED);
        globeMaterial.emissive.setRGB(currentEmissive.r, currentEmissive.g, currentEmissive.b);


        currentBase.r = lerp(currentBase.r, targetBase.r, LERP_SPEED);
        currentBase.g = lerp(currentBase.g, targetBase.g, LERP_SPEED);
        currentBase.b = lerp(currentBase.b, targetBase.b, LERP_SPEED);
        globeMaterial.color.setRGB(currentBase.r, currentBase.g, currentBase.b);


        currentIntensity = lerp(currentIntensity, targetIntensity, LERP_SPEED);
        globeMaterial.emissiveIntensity = currentIntensity;

        requestAnimationFrame(animate);
    }

    animate();

    // listen for year updates
    window.addEventListener("yearchange", (e) => {
        const { year, tempAnomaly, co2 } = e.detail;
        if (tempAnomaly === undefined) return;

        // target colors based on temp
        targetEmissive = hexToRgb(emissiveColorScale(tempAnomaly));


        targetBase = hexToRgb(baseColorScale(tempAnomaly));

        // adjust glow intensity
        if (tempAnomaly >= 0) {
            targetIntensity = 0.12 + tempAnomaly * 0.45;
        } else {
            targetIntensity = 0.1 + Math.abs(tempAnomaly) * 0.1;
        }
        targetIntensity = Math.min(targetIntensity, 0.75);

        // update atmosphere
        globe.atmosphereColor(atmColorScale(tempAnomaly));

        if (co2 !== undefined) {
            const co2Alt = co2AltitudeScale(co2);
            const tempAlt = Math.max(0, tempAnomaly) * 0.05; // further boost haziness based on temp
            globe.atmosphereAltitude(Math.min(co2Alt + tempAlt, 0.75));
        } else {
            const atmAlt = 0.08 + Math.max(0, tempAnomaly) * 0.04;
            globe.atmosphereAltitude(Math.min(atmAlt, 0.16));
        }
    });

    // handle resize
    window.addEventListener("resize", () => {
        globe.width(container.clientWidth);
        globe.height(container.clientHeight);
    });

    // notify app when ready
    globe.onGlobeReady(() => {
        console.log("Globe texture loaded — dispatching globeready");
        window.dispatchEvent(new Event("globeready"));
    });

    console.log("globe_viz.js initialized");
})();
