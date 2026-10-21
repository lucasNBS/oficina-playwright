import { Page, expect, test } from "@playwright/test";

const NOMES = ["Ana", "Carlos", "Mariana", "Pedro", "Julia", "Lucas", "Beatriz", "Rafael"];
const SOBRENOMES = ["Silva", "Santos", "Oliveira", "Costa", "Pereira", "Lima", "Almeida", "Rocha"];

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function gerarUsuario() {
  const nome = `${pick(NOMES)} ${pick(SOBRENOMES)}`;
  const slug = nome.toLowerCase().replace(" ", "-");
  const email = `${slug}-${crypto.randomUUID().slice(0, 8)}@example.com`;
  return { nome, email };
}

async function preencherCadastro(page: Page, nome: string, email: string) {
  await page.getByLabel("Nome").fill(nome);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("senha1234");
  await page.getByLabel("Confirmar senha").fill("senha1234");
}

test.describe("tela de cadastro", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cadastro");
  });

  test("cria a conta com dados válidos", async ({ page }) => {
    const { nome, email } = gerarUsuario();
    await preencherCadastro(page, nome, email);

    const response = page.waitForResponse((response) =>
      response.url().endsWith("/api/cadastro"),
    );
    await page.getByRole("button", { name: "Criar conta" }).click();
    expect((await response).status()).toBe(201);

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { name: "Conta criada com sucesso" }),
    ).toBeVisible();
  });

  test("mostra os erros ao enviar todos os campos vazios", async ({ page }) => {
    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(page.getByLabel("Nome")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByLabel("Confirmar senha")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(
      page.getByRole("alert").filter({ hasText: "Informe seu nome." }),
    ).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: "Informe um email válido." }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "A senha deve ter pelo menos 8 caracteres." }),
    ).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: "Confirme sua senha." }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/cadastro$/);
  });

  test("mostra os erros para email e senhas inválidas", async ({ page }) => {
    const { nome } = gerarUsuario();
    await page.getByLabel("Nome").fill(nome);
    await page.getByLabel("Email").fill("email-invalido");
    await page.getByLabel("Senha", { exact: true }).fill("123");

    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: "Informe um email válido." }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "A senha deve ter pelo menos 8 caracteres." }),
    ).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: "Confirme sua senha." }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/cadastro$/);
  });

  test("mostra o erro quando as senhas não batem", async ({ page }) => {
    const { nome, email } = gerarUsuario();
    await page.getByLabel("Nome").fill(nome);
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Senha", { exact: true }).fill("senha1234");
    await page.getByLabel("Confirmar senha").fill("outra1234");

    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(page.getByLabel("Confirmar senha")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "As senhas devem ser iguais." }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/cadastro$/);
  });

  test("mostra erro de email cadastrado pelo backend", async ({ page }) => {
    const { nome } = gerarUsuario();
    await preencherCadastro(page, nome, "cadastrado@example.com");
    const response = page.waitForResponse((response) =>
      response.url().endsWith("/api/cadastro"),
    );
    await page.getByRole("button", { name: "Criar conta" }).click();
    expect((await response).status()).toBe(409);

    await expect(page).toHaveURL(/\/cadastro$/);
    await expect(
      page.getByRole("alert").filter({ hasText: "Email já cadastrado." }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Criar conta" }),
    ).toBeEnabled();
  });

  test("mostra erro 500 quando backend estiver fora", async ({ page }) => {
    const { nome, email } = gerarUsuario();
    await preencherCadastro(page, nome, email);
    await page.route("**/api/cadastro", async (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Erro ao cadastrar. Tente novamente.",
        }),
      });
    });
    await page.getByRole("button", { name: "Criar conta" }).click();

    await expect(page).toHaveURL(/\/cadastro$/);
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "Erro ao cadastrar. Tente novamente." }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Criar conta" }),
    ).toBeEnabled();
  });
});
