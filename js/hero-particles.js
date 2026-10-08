// Animated node network behind the home hero (tsParticles).
// The container is created here because RStudio's visual editor strips
// empty divs from the markdown.
(function () {
  var hero = document.querySelector(".hero");
  if (!hero || typeof tsParticles === "undefined" || typeof loadFull === "undefined") return;

  var container = document.createElement("div");
  container.id = "hero-particles";
  container.setAttribute("aria-hidden", "true");
  hero.prepend(container);

  var accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent").trim() || "#38bdf8";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // v3 bundles only ship the engine: loadFull registers the shapes,
  // updaters (opacity, size...) and interactions; without it nothing is drawn
  loadFull(tsParticles).then(function () {
    return tsParticles.load({
      id: "hero-particles",
      options: {
        // transparent canvas: the gradient comes from .hero in styles.css
        background: { color: "transparent" },
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          // density scales the count to the hero size (~65 nodes at 1400px wide)
          number: { value: 180, density: { enable: true } },
          color: { value: accent },
          links: { enable: true, color: accent, opacity: 0.25, distance: 140 },
          move: { enable: !reduceMotion, speed: 0.6 },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 3 } }
        },
        interactivity: {
          // listen on the window so hovering the hero text still "grabs" nodes
          detectsOn: "window",
          events: { onHover: { enable: !reduceMotion, mode: "grab" } }
        },
        detectRetina: true
      }
    });
  });
})();
