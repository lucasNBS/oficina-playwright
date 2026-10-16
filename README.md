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

## Executar com Docker

É necessário ter o Docker instalado e em execução. O Node.js não precisa estar instalado na máquina: a imagem compila o projeto e serve os arquivos estáticos.

```bash
git clone https://github.com/lucasNBS/oficina-playwright.git
cd oficina-playwright
docker build -t oficina-playwright .
docker run -p 5173:80 oficina-playwright
```

O projeto estará rodando em http://localhost:5173/cadastro
