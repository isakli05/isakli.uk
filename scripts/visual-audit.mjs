// Visual + functional audit for local/prod site. Usage:
//   node scripts/visual-audit.mjs http://localhost:3100 out-dir
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const outDir = process.argv[3] ?? "/tmp/audit";
const productionBase = "https://isakli.uk";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-sm", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "tablet-lg", width: 1024, height: 768 },
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

    const portraitSpacing = await page.locator("figure").first().evaluate((figure) => {
      const frame = figure.querySelector("div > div[aria-hidden='true']");
      const caption = figure.querySelector("figcaption");
      if (!frame || !caption) return null;
      const frameRect = frame.getBoundingClientRect();
      const captionRect = caption.getBoundingClientRect();
      return Math.round((captionRect.top - frameRect.bottom) * 10) / 10;
    });
    if (portraitSpacing === null || portraitSpacing < 12) {
      failures.push(
        `${vp.name}${path}: portrait frame/caption gap ${portraitSpacing ?? "missing"}`,
      );
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
  ["EN: h1 = İsa Kaya", await page.locator("h1").first().textContent(), "İsa Kaya"],
  ["EN: html lang=en", await page.getAttribute("html", "lang"), "en"],
  ["EN: hero CTA", await page.getByRole("link", { name: "View selected work" }).count()],
  ["EN: GitHub link", await page.getByRole("link", { name: /GitHub/ }).count()],
  ["EN: LinkedIn link", await page.getByRole("link", { name: /LinkedIn/ }).count()],
  ["EN: email link", await page.locator('a[href^="mailto:"]').count()],
  ["EN: CV download", await page.locator('a[href*="isa-kaya-cv-en.pdf"]').count()],
  ["EN: TR switch", await page.locator('a[href="/tr"][hreflang="tr"]').count()],
  ["EN: portrait img", await page.locator('img[alt*="İsa Kaya"]').count()],
  [
    "EN: canonical",
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    productionBase,
  ],
  ["EN: hreflang tr", await page.locator('link[rel="alternate"][hreflang="tr"]').count()],
  ["EN: og:image", await page.locator('meta[property="og:image"]').count()],
];
for (const [name, val, expected] of checks) {
  const ok = expected === undefined
    ? typeof val === "number" ? val > 0 : Boolean(val)
    : val === expected;
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
  ["TR: html lang=tr", await page.getAttribute("html", "lang"), "tr"],
  ["TR: h1", await page.locator("h1").first().textContent(), "İsa Kaya"],
  [
    "TR: canonical",
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    `${productionBase}/tr`,
  ],
  ["TR: EN switch", await page.locator('a[href="/"][hreflang="en"]').count()],
  ["TR: CV TR download", await page.locator('a[href*="isa-kaya-cv-tr.pdf"]').count()],
];
for (const [name, val, expected] of trChecks) {
  const ok = expected === undefined
    ? typeof val === "number" ? val > 0 : Boolean(val)
    : val === expected;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${val}`);
  if (!ok) failures.push(name);
}

for (const [name, path] of [
  ["EN CV response", "/cv/isa-kaya-cv-en.pdf"],
  ["TR CV response", "/cv/isa-kaya-cv-tr.pdf"],
]) {
  const response = await ctx.request.get(`${base}${path}`);
  const ok = response.ok() && response.headers()["content-type"] === "application/pdf";
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${response.status()}`);
  if (!ok) failures.push(name);
}

// Mobile menu: keyboard open/close, focus restoration, link close, and outside close.
const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto(`${base}/`, { waitUntil: "networkidle" });
const details = mobilePage.locator("details");
const summary = details.locator("summary");

await summary.focus();
await summary.press("Enter");
let menuOk = await details.evaluate((element) => element.open);
console.log(`${menuOk ? "PASS" : "FAIL"} mobile menu opens from keyboard`);
if (!menuOk) failures.push("mobile menu keyboard open");

await mobilePage.keyboard.press("Escape");
menuOk = !(await details.evaluate((element) => element.open));
const focusRestored = await summary.evaluate((element) => document.activeElement === element);
console.log(`${menuOk && focusRestored ? "PASS" : "FAIL"} Escape closes menu and restores focus`);
if (!menuOk || !focusRestored) failures.push("mobile menu Escape/focus");

await summary.press("Enter");
await details.locator("nav a").first().click();
menuOk = !(await details.evaluate((element) => element.open));
console.log(`${menuOk ? "PASS" : "FAIL"} mobile menu link closes menu`);
if (!menuOk) failures.push("mobile menu link close");

await summary.press("Enter");
await mobilePage.locator("main").click({ position: { x: 10, y: 700 }, force: true });
menuOk = !(await details.evaluate((element) => element.open));
console.log(`${menuOk ? "PASS" : "FAIL"} outside pointer closes mobile menu`);
if (!menuOk) failures.push("mobile menu outside close");
await mobileCtx.close();

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
