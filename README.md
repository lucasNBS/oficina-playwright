# Oficina - Playwright

Projeto React + Vite + TypeScript com React Router, React Hook Form, Zod e Tailwind CSS feito como parte da oficina de testes com Playwright.

O formulário valida os dados e simula um envio assíncrono no navegador. Use `cadastrado@example.com` para ver o erro “Email já cadastrado.”; os demais emails válidos levam à página de sucesso. Não há backend nem persistência de dados. Durante o envio, o botão fica desabilitado.

## Executar com Node.js

```bash
git clone https://github.com/lucasNBS/oficina-playwright.git
cd oficina-playwright
npm install
npm run dev
```

O projeto estará rodando em http://localhost:5173/cadastro

## Executar os testes com Playwright

Com Node.js e Google Chrome instalados, rode:

```bash
npm run test:e2e
```

O Playwright inicia o servidor Vite automaticamente na porta 5173. Os testes usam o fluxo simulado da própria aplicação, sem interceptar requisições. Para abrir a interface de execução dos testes, use `npm run test:e2e:ui`.
