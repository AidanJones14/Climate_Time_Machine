/**
 * app.js — UI logic, slider events, sparklines, and DOM updates
 *
 * Responsibilities:
 * - Wire up the year slider and play/pause controls
 * - Update the info panel (temp, CO2) on year change
 * - Handle the birth year feature (fixed: #4)
 * - Render D3 sparkline charts for temp + CO2 (#1)
 * - Speed control for playback (1×, 2×, 4×)
 * - Loading overlay dismissal
 * - Dispatch a custom event that globe_viz.js can listen to
 */

(function () {
    "use strict";

    // =========================================================
    //  Constants
    // =========================================================
    // NASA GISTEMP uses 1951-1980 baseline. Average global temp
    // during that period was approximately 14.0°C (57.2°F).
    // Source: NASA GISS FAQ
    const BASELINE_TEMP_C = 14.0;

    // =========================================================
    //  DOM References
    // =========================================================
    const slider = document.getElementById("year-slider");
    const playBtn = document.getElementById("play-btn");
    const speedBtn = document.getElementById("speed-btn");
    const sliderYearLabel = document.getElementById("slider-year-label");
    const currentYearEl = document.getElementById("current-year");
    const tempValueEl = document.getElementById("temp-value");
    const tempActualEl = document.getElementById("temp-actual-value");
    const co2StatEl = document.getElementById("co2-stat");
    const co2ValueEl = document.getElementById("co2-value");
    const birthYearInput = document.getElementById("birth-year-input");
    const birthYearBtn = document.getElementById("birth-year-btn");
    const birthYearStats = document.getElementById("birth-year-stats");
    const birthTempDiff = document.getElementById("birth-temp-diff");
    const birthCo2Diff = document.getElementById("birth-co2-diff");
    const loadingOverlay = document.getElementById("loading-overlay");
    const keyboardHints = document.getElementById("keyboard-hints");

    // =========================================================
    //  State
    // =========================================================
    let currentYear = 1880;
    let isPlaying = false;
    let playInterval = null;
    let birthYear = null;

    // Speed control
    const SPEEDS = [
        { label: "1×", ms: 120 },
        { label: "2×", ms: 60 },
        { label: "4×", ms: 30 }
    ];
    let speedIndex = 0;

    // Set slider max to latest year in data
    const maxYear = TEMP_DATA[TEMP_DATA.length - 1].year;
    slider.max = maxYear;

    // =========================================================
    //  Data Lookup Helpers
    // =========================================================
    const tempByYear = {};
    TEMP_DATA.forEach((d) => (tempByYear[d.year] = d.mean));

    const co2ByYear = {};
    CO2_DATA.forEach((d) => (co2ByYear[d.year] = d.co2));

    // =========================================================
    //  Sparkline Charts (Issue #1)
    //  Two vertical charts on the left: temp anomaly + CO₂
    //  Shows a line from min year → max year with a baseline
    //  and a moving dot for the current year.
    // =========================================================
    const SPARK_W = 240;
    const SPARK_H = 120;
    const SPARK_PAD = { top: 12, right: 12, bottom: 16, left: 12 };
    const innerW = SPARK_W - SPARK_PAD.left - SPARK_PAD.right;
    const innerH = SPARK_H - SPARK_PAD.top - SPARK_PAD.bottom;

    function buildSparkline(svgId, data, yKey, baselineVal, color, labelSuffix) {
        const svg = d3.select(`#${svgId}`)
            .attr("viewBox", `0 0 ${SPARK_W} ${SPARK_H}`)
            .attr("preserveAspectRatio", "none");

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([SPARK_PAD.left, SPARK_PAD.left + innerW]);

        const yExtent = d3.extent(data, d => d[yKey]);
        // Ensure baseline is within extent
        const yMin = Math.min(yExtent[0], baselineVal);
        const yMax = Math.max(yExtent[1], baselineVal);
        const yScale = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([SPARK_PAD.top + innerH, SPARK_PAD.top]);

        // Baseline dashed line
        svg.append("line")
            .attr("class", "sparkline-baseline")
            .attr("x1", SPARK_PAD.left)
            .attr("x2", SPARK_PAD.left + innerW)
            .attr("y1", yScale(baselineVal))
            .attr("y2", yScale(baselineVal));

        // Baseline label
        svg.append("text")
            .attr("x", SPARK_PAD.left + innerW + 2)
            .attr("y", yScale(baselineVal))
            .attr("dy", "0.35em")
            .attr("fill", "#64748b")
            .attr("font-size", "7px")
            .attr("font-family", "Inter, sans-serif")
            .text(baselineVal + labelSuffix);

        // Line path
        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d[yKey]))
            .curve(d3.curveMonotoneX);

        svg.append("path")
            .datum(data)
            .attr("class", "sparkline-path")
            .attr("stroke", color)
            .attr("d", line);

        // Moving dot (current year indicator)
        const dot = svg.append("circle")
            .attr("class", "sparkline-dot")
            .attr("r", 3.5)
            .attr("fill", color)
            .attr("stroke", "#0f172a")
            .attr("stroke-width", 1.5);

        // Value label near the dot
        const valueLabel = svg.append("text")
            .attr("class", "sparkline-value-label")
            .attr("fill", color)
            .attr("text-anchor", "middle")
            .attr("dy", "-8");

        return { xScale, yScale, yKey, dot, valueLabel, labelSuffix };
    }

    // Build temperature sparkline (baseline = 0°C anomaly)
    const tempSparkline = buildSparkline(
        "svg-temp", TEMP_DATA, "mean", 0, "#ef4444", "°C"
    );

    // Build CO₂ sparkline (baseline = 315 ppm, 1958 start)
    const co2Sparkline = buildSparkline(
        "svg-co2", CO2_DATA, "co2", 315, "#22d3ee", ""
    );

    function updateSparkline(spark, year, value) {
        if (value === undefined) return;
        const cx = spark.xScale(year);
        const cy = spark.yScale(value);
        spark.dot.attr("cx", cx).attr("cy", cy);

        // Format the label
        let label;
        if (spark.labelSuffix === "°C") {
            const sign = value >= 0 ? "+" : "";
            label = sign + value.toFixed(2) + spark.labelSuffix;
        } else {
            label = value.toFixed(0) + " ppm";
        }
        spark.valueLabel
            .attr("x", cx)
            .attr("y", cy)
            .text(label);
    }

    // =========================================================
    //  Year Change Handler
    // =========================================================
    function setYear(year) {
        currentYear = year;
        slider.value = year;
        sliderYearLabel.textContent = year;
        currentYearEl.textContent = year;

        // --- Temperature Anomaly ---
        const tempAnomaly = tempByYear[year];
        if (tempAnomaly !== undefined) {
            const sign = tempAnomaly >= 0 ? "+" : "";
            tempValueEl.textContent = `${sign}${tempAnomaly.toFixed(2)}°C`;
            tempValueEl.className = "stat-value " + (tempAnomaly >= 0 ? "warm" : "cool");

            // Estimated actual global average (#7)
            const actualTemp = BASELINE_TEMP_C + tempAnomaly;
            tempActualEl.textContent = `~${actualTemp.toFixed(1)}°C / ${(actualTemp * 9/5 + 32).toFixed(1)}°F`;
        } else {
            tempValueEl.textContent = "—";
            tempValueEl.className = "stat-value";
            tempActualEl.textContent = "—";
        }

        // --- CO2 ---
        const co2 = co2ByYear[year];
        if (co2 !== undefined) {
            co2StatEl.style.display = "";
            co2ValueEl.textContent = `${co2.toFixed(1)} ppm`;
            co2ValueEl.className = "stat-value co2";
        } else {
            co2StatEl.style.display = "none";
        }

        // --- Birth Year Comparison (#4 — fixed) ---
        if (birthYear !== null) {
            const label = document.querySelector("#birth-year-section label");
            if (label) {
                label.textContent = `Comparing ${birthYear} to ${year}`;
            }

            if (year >= birthYear) {
                const birthTemp = tempByYear[birthYear];
                const currentTemp = tempByYear[year];
                if (birthTemp !== undefined && currentTemp !== undefined) {
                    const tempDiff = currentTemp - birthTemp;
                    const sign = tempDiff > 0 ? "+" : (tempDiff < 0 ? "" : "+");
                    birthTempDiff.textContent = `${sign}${tempDiff.toFixed(2)}°C`;
                } else {
                    birthTempDiff.textContent = "—";
                }

                const birthCo2 = co2ByYear[birthYear];
                const currentCo2 = co2ByYear[year];
                if (birthCo2 !== undefined && currentCo2 !== undefined) {
                    const diff = currentCo2 - birthCo2;
                    const sign = diff > 0 ? "+" : (diff < 0 ? "" : "+");
                    birthCo2Diff.textContent = `${sign}${diff.toFixed(1)} ppm`;
                } else if (birthCo2 === undefined && currentCo2 !== undefined) {
                    // If born before 1958 but scrubbing in modern times, CO2 baseline is missing
                    birthCo2Diff.textContent = "No data for " + birthYear;
                } else {
                    birthCo2Diff.textContent = "N/A";
                }
                birthYearStats.style.display = "flex";
            } else {
                // Current year is before birth year
                birthTempDiff.textContent = "—";
                birthCo2Diff.textContent = "—";
                birthYearStats.style.display = "flex";
            }
        } else {
            birthYearStats.style.display = "none";
        }

        // --- Update sparklines ---
        updateSparkline(tempSparkline, year, tempAnomaly);
        if (co2 !== undefined) {
            updateSparkline(co2Sparkline, year, co2);
        }

        // --- Dispatch custom event for globe_viz.js ---
        window.dispatchEvent(
            new CustomEvent("yearchange", { detail: { year, tempAnomaly, co2 } })
        );
    }

    // =========================================================
    //  Slider Events
    // =========================================================
    slider.addEventListener("input", (e) => {
        setYear(parseInt(e.target.value, 10));
    });

    // =========================================================
    //  Play / Pause
    // =========================================================
    function startPlay() {
        isPlaying = true;
        playBtn.textContent = "⏸";
        playBtn.classList.add("playing");
        playInterval = setInterval(() => {
            let next = currentYear + 1;
            if (next > maxYear) {
                next = parseInt(slider.min, 10);
            }
            setYear(next);
        }, SPEEDS[speedIndex].ms);
    }

    function stopPlay() {
        isPlaying = false;
        playBtn.textContent = "▶";
        playBtn.classList.remove("playing");
        if (playInterval) {
            clearInterval(playInterval);
            playInterval = null;
        }
    }

    playBtn.addEventListener("click", () => {
        if (isPlaying) {
            stopPlay();
        } else {
            startPlay();
        }
    });

    // =========================================================
    //  Speed Control
    // =========================================================
    speedBtn.addEventListener("click", () => {
        speedIndex = (speedIndex + 1) % SPEEDS.length;
        speedBtn.textContent = SPEEDS[speedIndex].label;

        if (isPlaying) {
            stopPlay();
            startPlay();
        }
    });

    // =========================================================
    //  Birth Year (Issue #4 — fixed input handling)
    // =========================================================
    function submitBirthYear() {
        const raw = birthYearInput.value.trim();
        const val = parseInt(raw, 10);

        if (raw === "" || isNaN(val) || val < 1880 || val > maxYear) {
            // Visual error feedback
            birthYearInput.style.borderColor = "var(--temp-warm)";
            birthYearInput.style.boxShadow = "0 0 0 2px rgba(178,24,43,0.3)";
            setTimeout(() => {
                birthYearInput.style.borderColor = "";
                birthYearInput.style.boxShadow = "";
            }, 1200);
            return;
        }

        birthYear = val;

        // Jump to their birth year so they can see what the globe looked like then.
        // As they press play or scrub forward, the setYear function will update the
        // "Comparing YYYY to ZZZZ" label and show the accumulating differences.
        setYear(birthYear);
        
        // Optional: briefly flash the play button to hint what to do next
        playBtn.style.transform = "scale(1.2)";
        playBtn.style.boxShadow = "0 0 15px var(--accent)";
        setTimeout(() => {
            playBtn.style.transform = "";
            playBtn.style.boxShadow = "";
        }, 1000);
    }

    birthYearBtn.addEventListener("click", submitBirthYear);
    birthYearInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitBirthYear();
        }
    });

    // =========================================================
    //  Keyboard Shortcuts
    // =========================================================
    document.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT") return;

        switch (e.key) {
            case " ":
                e.preventDefault();
                playBtn.click();
                break;
            case "ArrowRight":
                e.preventDefault();
                if (currentYear < maxYear) setYear(currentYear + 1);
                break;
            case "ArrowLeft":
                e.preventDefault();
                if (currentYear > parseInt(slider.min, 10)) setYear(currentYear - 1);
                break;
        }
    });

    // =========================================================
    //  Loading Overlay — dismiss after globe is ready
    // =========================================================
    function dismissLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.add("hidden");
            setTimeout(() => {
                loadingOverlay.remove();
            }, 900);
        }
    }

    window.addEventListener("globeready", dismissLoading);
    setTimeout(dismissLoading, 4000);

    // =========================================================
    //  Keyboard Hints — auto-fade after 8 seconds
    // =========================================================
    if (keyboardHints) {
        setTimeout(() => {
            keyboardHints.classList.add("faded");
        }, 8000);
    }

    // =========================================================
    //  Initialize
    // =========================================================
    setYear(1880);
    console.log("app.js initialized");
})();
