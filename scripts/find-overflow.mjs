import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
await page.goto("http://localhost:3100/", { waitUntil: "networkidle" });
const offenders = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const bad = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > docW + 1 || r.right > docW + 1) {
      bad.push(`${el.tagName}.${String(el.className).slice(0, 60)} w=${Math.round(r.width)} right=${Math.round(r.right)}`);
    }
  });
  return { docW, bad: bad.slice(0, 15) };
});
console.log(JSON.stringify(offenders, null, 1));
await browser.close();
