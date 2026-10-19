import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { cadastroHandler } from './server/cadastro.js'

const cadastroApi = () => ({
  name: 'cadastro-api',
  configureServer(server: { middlewares: { use: (path: string, handler: typeof cadastroHandler) => void } }) {
    server.middlewares.use('/api/cadastro', cadastroHandler)
  },
  configurePreviewServer(server: { middlewares: { use: (path: string, handler: typeof cadastroHandler) => void } }) {
    server.middlewares.use('/api/cadastro', cadastroHandler)
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), cadastroApi()],
})
