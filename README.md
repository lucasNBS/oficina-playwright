# Oficina - Playwright

Projeto React + Vite + TypeScript com React Router, React Hook Form, Zod e Tailwind CSS feito como parte da oficina de testes com Playwright.

O usuário simula um cadastro no navegador: um envio válido abre a página inicial com a mensagem “Conta criada com sucesso”, um erro na validação resulta em erros que são retornados ao usuário. Não há API nem persistência de dados.

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

O Playwright inicia o servidor Vite automaticamente na porta 5173. Para abrir a interface de execução dos testes, use `npm run test:e2e:ui`.
