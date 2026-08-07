// Visual + functional audit for local/prod site. Usage:
//   node scripts/visual-audit.mjs http://localhost:3100 out-dir
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const outDir = process.argv[3] ?? "/tmp/audit";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-sm", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch();
const failures = [];
const consoleErrors = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  for (const path of ["/", "/tr"]) {
    const page = await ctx.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(`[${vp.name}${path}] ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push(`[${vp.name}${path}] PAGEERROR: ${err.message}`);
    });
    const failed = [];
    page.on("requestfailed", (req) => {
      failed.push(`${req.url()} :: ${req.failure()?.errorText}`);
    });
    page.on("response", (res) => {
      if (res.status() >= 400) failed.push(`${res.url()} :: HTTP ${res.status()}`);
    });

    const resp = await page.goto(`${base}${path}`, {
      waitUntil: "networkidle",
    });
    if (!resp || resp.status() !== 200) {
      failures.push(`${vp.name}${path}: status ${resp?.status()}`);
    }

    // horizontal overflow check
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) {
      failures.push(`${vp.name}${path}: horizontal overflow ${overflow}px`);
    }

    await page.screenshot({
      path: `${outDir}/${vp.name}${path === "/" ? "-en" : "-tr"}.png`,
      fullPage: true,
    });
    if (failed.length) failures.push(`${vp.name}${path}: ${failed.join(" | ")}`);
    await page.close();
  }
  await ctx.close();
}

// Functional checks at desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(`${base}/`, { waitUntil: "networkidle" });

const checks = [
  ["EN: h1 = İsa Kaya", await page.locator("h1").first().textContent()],
  ["EN: html lang=en", await page.getAttribute("html", "lang")],
  ["EN: hero CTA", await page.getByRole("link", { name: "View selected work" }).count()],
  ["EN: GitHub link", await page.getByRole("link", { name: /GitHub/ }).count()],
  ["EN: LinkedIn link", await page.getByRole("link", { name: /LinkedIn/ }).count()],
  ["EN: email link", await page.locator('a[href^="mailto:"]').count()],
  ["EN: CV download", await page.locator('a[href*="isa-kaya-cv-en.pdf"]').count()],
  ["EN: TR switch", await page.locator('a[href="/tr"][hreflang="tr"]').count()],
  ["EN: portrait img", await page.locator('img[alt*="İsa Kaya"]').count()],
  ["EN: canonical", await page.locator('link[rel="canonical"]').getAttribute("href")],
  ["EN: hreflang tr", await page.locator('link[rel="alternate"][hreflang="tr"]').count()],
  ["EN: og:image", await page.locator('meta[property="og:image"]').count()],
];
for (const [name, val] of checks) {
  const ok = typeof val === "number" ? val > 0 : Boolean(val);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${val}`);
  if (!ok) failures.push(name);
}

// theme toggle
await page.getByRole("button", { name: /theme/i }).click();
const darkOn = await page.evaluate(() => document.documentElement.classList.contains("dark"));
console.log(`${darkOn ? "PASS" : "FAIL"} theme toggle adds .dark`);
if (!darkOn) failures.push("theme toggle");
await page.screenshot({ path: `${outDir}/desktop-en-dark.png`, fullPage: true });

// TR page
await page.goto(`${base}/tr`, { waitUntil: "networkidle" });
const trChecks = [
  ["TR: html lang=tr", await page.getAttribute("html", "lang")],
  ["TR: h1", await page.locator("h1").first().textContent()],
  ["TR: canonical", await page.locator('link[rel="canonical"]').getAttribute("href")],
  ["TR: EN switch", await page.locator('a[href="/"][hreflang="en"]').count()],
  ["TR: CV TR download", await page.locator('a[href*="isa-kaya-cv-tr.pdf"]').count()],
];
for (const [name, val] of trChecks) {
  const ok = typeof val === "number" ? val > 0 : Boolean(val);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${val}`);
  if (!ok) failures.push(name);
}

// keyboard: tab to first nav link, check focus visible
await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
await page.keyboard.press("Tab"); // skip link
const focused1 = await page.evaluate(() => document.activeElement?.textContent);
await page.keyboard.press("Tab");
const focused2 = await page.evaluate(() => document.activeElement?.textContent);
console.log(`INFO focus order: [${focused1}] -> [${focused2}]`);

// OG template screenshot
const og = await ctx.newPage();
await og.setViewportSize({ width: 1200, height: 630 });
await og.goto(`${base}/og-template.html`, { waitUntil: "networkidle" });
await og.screenshot({ path: `${outDir}/og.png` });

await browser.close();

console.log("\n=== console errors ===");
console.log(consoleErrors.length ? consoleErrors.join("\n") : "none");
console.log("\n=== failures ===");
console.log(failures.length ? failures.join("\n") : "none");
process.exit(failures.length ? 1 : 0);
