const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: process.argv[2] + "/top.png" });
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(600);
  await page.screenshot({ path: process.argv[2] + "/mid.png" });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(600);
  await page.screenshot({ path: process.argv[2] + "/bottom.png" });
  await browser.close();
})();
