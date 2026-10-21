import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("site, descobertas, dúvidas e entrada do portal", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pequenos passos.",
  );
  await page.getByRole("button", { name: "Explorar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Toda pergunta é um começo." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Como conhecer melhor a escola?" })
    .click();
  await expect(page.locator("#faq-1")).toBeVisible();
  await page
    .getByRole("link", { name: "Portal do Professor", exact: true })
    .first()
    .click();
  await page.getByRole("link", { name: "Entrar na demonstração" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Olá, professora Marina",
  );
});
test("pesquisa alunos e modal acessível", async ({ page }) => {
  await page.goto("/portal/alunos");
  await page
    .getByRole("textbox", { name: "Pesquisar aluno pelo nome" })
    .fill("alice");
  await expect(page.locator("tbody tr")).toHaveCount(3);
  await page
    .getByRole("button", { name: "Alice Almeida", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText("Alice Almeida"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Alice Almeida", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("textbox", { name: "Pesquisar aluno pelo nome" })
    .fill("inexistente");
  await expect(
    page.getByRole("heading", { name: "Nenhum aluno encontrado" }),
  ).toBeVisible();
});
test("notas validadas e mantidas durante a sessão", async ({ page }) => {
  await page.goto("/portal/notas");
  const activity = page.getByRole("textbox", {
    name: "Atividade de Alice Almeida",
    exact: true,
  });
  await activity.fill("11");
  await page.getByRole("button", { name: "Salvar nesta sessão" }).click();
  await expect(page.getByRole("alert")).toHaveText("Use notas de 0 a 10.");
  await activity.fill("9,5");
  await page.getByRole("button", { name: "Salvar nesta sessão" }).click();
  await expect(page.getByRole("status")).toContainText("Notas salvas");
  await page.getByRole("link", { name: "Visão geral" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Olá, professora Marina",
  );
  await page.getByRole("link", { name: "Notas e frequência" }).click();
  await expect(activity).toHaveValue("9.5");
  await page
    .getByRole("combobox", { name: "Período", exact: true })
    .selectOption("3");
  await expect(activity).not.toHaveValue("9.5");
  await page
    .getByRole("combobox", { name: "Período", exact: true })
    .selectOption("4");
  await page
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await expect(activity).toHaveValue("9");
  await expect(
    page.getByRole("button", { name: "Salvar nesta sessão" }),
  ).toBeDisabled();
});
test("chamada, troca de data e salvamento local", async ({ page }) => {
  await page.goto("/portal/notas?aba=frequencia");
  await page.getByRole("button", { name: "Todos presentes" }).click();
  await page.getByRole("button", { name: "Salvar nesta sessão" }).click();
  await expect(page.getByRole("status")).toContainText("Frequência salva");
  await expect(
    page.getByText("18 presentes · 0 outros ou sem registro"),
  ).toBeVisible();
  await page.getByLabel("Data da chamada").fill("2026-10-20");
  await expect(page.locator("input[type=radio]:checked")).toHaveCount(0);
  await page.getByRole("button", { name: "Todos presentes" }).click();
  await page.getByRole("button", { name: "Salvar nesta sessão" }).click();
  await page.getByLabel("Data da chamada").fill("2026-10-21");
  await expect(page.locator("input[type=radio]:checked")).toHaveCount(18);
  await page.getByRole("radio", { name: "Falta", exact: true }).first().check();
  await page
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Salvar nesta sessão" }),
  ).toBeDisabled();
});
test("atividade criada, concluída e demonstração reiniciada", async ({
  page,
}) => {
  await page.goto("/portal/conteudos");
  await page.getByRole("button", { name: "Nova atividade" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Título da atividade").fill("Descobertas no jardim");
  await dialog
    .getByLabel("Descrição")
    .fill("Observar plantas e registrar as descobertas com desenhos.");
  await dialog.getByRole("button", { name: "Criar atividade" }).click();
  await expect(
    page.getByRole("heading", { name: "Descobertas no jardim" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Descobertas no jardim", exact: true })
    .click();
  await page.getByRole("button", { name: "Marcar como concluída" }).click();
  await expect(
    dialog.getByRole("button", { name: "Voltar para planejada" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reiniciar demonstração", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Descobertas no jardim" }),
  ).toHaveCount(0);
});
for (const width of [360, 390, 768, 1366, 1440])
  test(`navegação e geometria em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/portal",
      "/portal/painel",
      "/portal/turmas",
      "/portal/alunos",
      "/portal/notas",
      "/portal/notas?aba=frequencia",
      "/portal/conteudos",
    ]) {
      await page.goto(route);
      await page.locator("h1:visible,h2:visible").first().waitFor();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    if (width < 760) {
      await page.getByRole("button", { name: "Abrir navegação" }).click();
      await page.getByRole("link", { name: "Minhas turmas" }).click();
      await expect(
        page.getByRole("heading", { name: "Minhas turmas" }),
      ).toBeVisible();
    }
  });
test("acessibilidade da página e do painel", async ({ page }) => {
  for (const route of ["/", "/portal/painel", "/portal/notas"]) {
    await page.goto(route);
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
test("portal não envia dados a serviços externos", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (
      !r.url().startsWith("http://localhost:5173") &&
      !r.url().startsWith("data:")
    )
      external.push(r.url());
  });
  await page.goto("/portal/notas");
  await page
    .getByRole("textbox", { name: "Atividade de Alice Almeida", exact: true })
    .fill("9.3");
  await page.getByRole("button", { name: "Salvar nesta sessão" }).click();
  expect(external).toEqual([]);
});
