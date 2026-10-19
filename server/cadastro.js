import { z } from "zod";

const cadastroSchema = z
  .object({
    nome: z.string().trim().min(1),
    email: z.email(),
    senha: z.string().min(8),
    confirmarSenha: z.string(),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha);

const emailsCadastrados = new Set(["cadastrado@example.com"]);

function responder(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

export async function cadastroHandler(req, res) {
  if (req.url !== "/" && req.url !== "" && req.url !== "/api/cadastro") {
    responder(res, 404, { message: "Rota não encontrada." });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    responder(res, 405, { message: "Método não permitido." });
    return;
  }

  try {
    let json = "";
    for await (const chunk of req) {
      json += chunk;
      if (json.length > 10_000) {
        responder(res, 413, { message: "Dados muito grandes." });
        return;
      }
    }

    const dados = cadastroSchema.safeParse(JSON.parse(json));
    if (!dados.success) {
      responder(res, 400, { message: "Dados de cadastro inválidos." });
      return;
    }

    const email = dados.data.email.toLowerCase();
    if (emailsCadastrados.has(email)) {
      responder(res, 409, { message: "Email já cadastrado." });
      return;
    }

    emailsCadastrados.add(email);
    responder(res, 201, { message: "Conta criada com sucesso." });
  } catch (error) {
    if (error instanceof SyntaxError) {
      responder(res, 400, { message: "JSON inválido." });
      return;
    }
    console.error("Erro ao cadastrar usuário:", error);
    if (!res.headersSent)
      responder(res, 500, { message: "Erro ao cadastrar. Tente novamente." });
  }
}
