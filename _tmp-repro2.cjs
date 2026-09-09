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

  // Scroll down CONTINUOUSLY and gradually from the very top, like a real user, logging height at each step
  const log = [];
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(50);
    const s = await page.evaluate(() => ({ y: window.scrollY, h: Math.round(Array.from(document.querySelectorAll("section")).find((el) => el.getAttribute("aria-hidden") === "true").getBoundingClientRect().height) }));
    log.push(`${i}: y=${s.y} h=${s.h}`);
  }
  console.log("FIRST continuous scroll pass:\n" + log.join("\n"));
  await page.screenshot({ path: path.join(OUT, "repro2-first-pass-y2400.png") });

  await browser.close();
})();
