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

  var css = getComputedStyle(document.documentElement);
  var accent = css.getPropertyValue("--accent").trim() || "#7fe3d9";
  var line = css.getPropertyValue("--line").trim() || "#7fb2f5";
  var cream = css.getPropertyValue("--cream").trim() || "#efe9c6";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // the glow is the most expensive part of each frame: skip it on phones
  var isSmallScreen = window.matchMedia("(max-width: 767.98px)").matches;

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
          // base count; density scales it down to the hero size (fewer nodes on mobile)
          number: { value: 200, density: { enable: true } },
          // mostly aquamarine and bluish white, with a few cream nodes
          color: { value: [accent, accent, "#cfe6ff", cream] },
          links: { enable: true, color: line, opacity: 0.3, distance: 140 },
          move: { enable: !reduceMotion, speed: 0.6 },
          opacity: { value: { min: 0.35, max: 0.8 } },
          size: { value: { min: 1, max: 3.5 } },
          // soft glow, like the bokeh in hero-image.jpg
          shadow: { enable: !isSmallScreen, color: accent, blur: 8 }
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
