// Section-by-section viewport screenshots for design review.
// Usage: node scripts/shots.mjs http://localhost:3100 / en|tr|both [dark]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "/tmp/shots";
const which = process.argv[4] ?? "both";
const dark = process.argv[5] === "dark";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
});

const paths = which === "both" ? ["/", "/tr"] : [which === "tr" ? "/tr" : "/"];
const sections = ["hero", "work", "experience", "capabilities", "about", "contact", "footer"];

for (const path of paths) {
  const tag = path === "/" ? "en" : "tr";
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  if (dark) {
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForTimeout(200);
  }
  for (const id of sections) {
    const sel = id === "hero" ? "main > section:first-of-type" : id === "footer" ? "footer" : `#${id}`;
    const el = page.locator(sel);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: `${out}/${tag}-${id}${dark ? "-dark" : ""}.png` });
  }
}
await browser.close();
console.log("done");
