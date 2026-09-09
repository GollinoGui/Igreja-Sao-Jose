const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.addInitScript(() => {
    window.__stCounts = [];
  });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });

  const info = await page.evaluate(() => {
    // ScrollTrigger is registered as a gsap plugin; access via window.gsap? it's not global unless exposed.
    // Try to find via module - not directly accessible. Instead check for duplicate DOM side-effects:
    const g = Array.from(document.querySelectorAll("section")).find((s) => s.getAttribute("aria-hidden") === "true");
    return {
      inlineHeight: g.style.height,
      computedHeight: getComputedStyle(g).height,
    };
  });
  console.log("initial:", info);

  await browser.close();
})();
