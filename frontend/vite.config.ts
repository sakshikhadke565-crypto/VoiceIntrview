import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/interviews': 'http://127.0.0.1:8000',
      '/questions': 'http://127.0.0.1:8000',
      '/answers': 'http://127.0.0.1:8000',
      '/evaluations': 'http://127.0.0.1:8000',
      '/speech': 'http://127.0.0.1:8000',
      '/audio': 'http://127.0.0.1:8000',
      '/results': 'http://127.0.0.1:8000',
    },
  },
})
