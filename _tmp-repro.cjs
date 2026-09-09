const { chromium } = require("playwright");
const path = require("path");
const OUT = "C:/Users/golli/AppData/Local/Temp/claude/c--Users-golli-Desktop-Sao-Jose-Igreja-Sao-Jose/6b454964-6a8e-4cc4-bb0e-1917bc29ef7e/scratchpad";

function galleryHeight() {
  return Array.from(document.querySelectorAll("section")).find((s) => s.getAttribute("aria-hidden") === "true").getBoundingClientRect().height;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });

  // scroll straight to just above the gallery boundary (fresh load, no prior interaction)
  const markerTop = await page.evaluate(() => {
    const g = Array.from(document.querySelectorAll("section")).find((s) => s.getAttribute("aria-hidden") === "true");
    return g.getBoundingClientRect().top + window.scrollY;
  });
  console.log("gallery box doc top (fresh):", markerTop);

  await page.evaluate((y) => window.scrollTo(0, y - 250), markerTop);
  await page.waitForTimeout(300);
  const h1 = await page.evaluate(galleryHeight);
  console.log("height just before boundary, FRESH load, no prior interaction:", h1);
  await page.screenshot({ path: path.join(OUT, "repro-fresh.png") });

  // Now scroll down into it partway then back up, and re-check the same spot
  for (let i = 0; i < 15; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(30); }
  for (let i = 0; i < 15; i++) { await page.mouse.wheel(0, -120); await page.waitForTimeout(30); }
  await page.evaluate((y) => window.scrollTo(0, y - 250), markerTop);
  await page.waitForTimeout(300);
  const h2 = await page.evaluate(galleryHeight);
  console.log("height at SAME spot after partial scroll-and-back:", h2);
  await page.screenshot({ path: path.join(OUT, "repro-after-interaction.png") });

  await browser.close();
})();
