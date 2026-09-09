const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });

  const before = await page.evaluate(() => {
    const g = Array.from(document.querySelectorAll("section")).find((s) => s.getAttribute("aria-hidden") === "true");
    return { fontsReady: document.fonts.status, markerDocTop: g.getBoundingClientRect().top + window.scrollY, bodyHeight: document.body.scrollHeight };
  });
  console.log("immediately after domcontentloaded:", before);

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(50);

  const after = await page.evaluate(() => {
    const g = Array.from(document.querySelectorAll("section")).find((s) => s.getAttribute("aria-hidden") === "true");
    return { fontsReady: document.fonts.status, markerDocTop: g.getBoundingClientRect().top + window.scrollY, bodyHeight: document.body.scrollHeight };
  });
  console.log("after document.fonts.ready:", after);

  await browser.close();
})();
