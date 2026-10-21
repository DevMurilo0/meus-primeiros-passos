import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    (existsSync(
      "/home/murilo/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
    )
      ? "/home/murilo/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome"
      : undefined),
  headless: true,
});
await mkdir("docs/apresentacao", { recursive: true });
const issues = [];
for (const width of [1440, 390, 768, 360, 1366]) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 844 : 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const [route, name] of [
    ["/", "institucional"],
    ["/portal", "entrada"],
    ["/portal/painel", "painel"],
    ["/portal/turmas", "turmas"],
    ["/portal/notas", "notas"],
    ["/portal/notas?aba=frequencia", "frequencia"],
    ["/portal/alunos", "alunos"],
    ["/portal/conteudos", "atividades"],
  ]) {
    await page.goto(
      (process.env.REVIEW_URL || "http://localhost:5173") + route,
    );
    await page.locator("h1:visible,h2:visible").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    if (geometry.scroll > width)
      issues.push({ width, route, overflow: geometry.scroll });
    if ([1440, 390].includes(width)) {
      await page.screenshot({
        path: `docs/apresentacao/${name}-${width}.png`,
        fullPage: true,
      });
      if (route === "/")
        await page.screenshot({
          path: `docs/apresentacao/hero-${width}.png`,
          clip: {
            x: 0,
            y: 0,
            width,
            height: Math.ceil(
              await page
                .locator(".hero")
                .evaluate((el) => el.getBoundingClientRect().bottom),
            ),
          },
        });
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (a11y.violations.length)
        issues.push({
          width,
          route,
          a11y: a11y.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes
              .map((n) => ({ target: n.target, summary: n.failureSummary }))
              .slice(0, 12),
          })),
        });
    }
    await writeFile(
      "docs/apresentacao/revisao.json",
      JSON.stringify(issues, null, 2),
    );
  }
  if (errors.length) issues.push({ width, errors });
  await context.close();
}
await writeFile(
  "docs/apresentacao/revisao.json",
  JSON.stringify(issues, null, 2),
);
console.log(JSON.stringify(issues, null, 2));
await browser.close();
