import { chromium } from "playwright";

const URL = "http://localhost:5186";
const OUT = "C:/Users/golli/AppData/Local/Temp/claude/c--Users-golli-Desktop-Sao-Jose-Igreja-Sao-Jose/6b9b89ef-0eda-43b0-9105-baba49382e61/scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(URL, { waitUntil: "networkidle" });

const missasHeading = page.getByRole("heading", { name: "Próximas celebrações" });
await missasHeading.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/home-missas.png` });

const noticiasHeading = page.getByRole("heading", { name: "Do Instagram da paróquia" });
await noticiasHeading.scrollIntoViewIfNeeded();
await page.mouse.wheel(0, 300);
await page.waitForTimeout(8000);
await page.screenshot({ path: `${OUT}/home-noticias.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/home-noticias-full.png`, fullPage: true });

const footer = page.locator("footer");
await footer.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/home-footer.png` });

const debugText = await page.evaluate(() => {
  const h2 = [...document.querySelectorAll("h2")].find((el) => el.textContent.includes("Do Instagram"));
  const section = h2 ? h2.closest("section") : null;
  return section ? section.outerHTML : "SECTION NOT FOUND";
});
console.log("SECTION_HTML", debugText);

console.log("CONSOLE_ERRORS", JSON.stringify(consoleErrors, null, 2));

await browser.close();
