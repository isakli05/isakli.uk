import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "/tmp/shots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
for (const path of ["/", "/tr"]) {
  const tag = path === "/" ? "en" : "tr";
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  for (const id of ["hero", "work", "contact"]) {
    const sel = id === "hero" ? "main > section:first-of-type" : `#${id}`;
    const el = page.locator(sel);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: `${out}/m-${tag}-${id}.png` });
  }
  // header + menu open state
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.locator("details summary").click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${out}/m-${tag}-menu.png`, clip: { x: 0, y: 0, width: 390, height: 500 } });
}
await browser.close();
console.log("done");
