import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { cadastroHandler } from "./cadastro.js";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url ?? "/", "http://localhost").pathname;
  if (pathname.startsWith("/api/")) {
    await cadastroHandler(req, res);
    return;
  }
});

const host = process.env.HOST ?? "127.0.0.1";
server.listen(Number(process.env.PORT ?? 3000), host, () => {
  console.log(
    `Aplicação disponível em http://${host}:${server.address().port}`,
  );
});
