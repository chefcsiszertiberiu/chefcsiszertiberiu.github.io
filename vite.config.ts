import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Live: https://georgelush.github.io/cheftiberiucsiszer/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cheftiberiucsiszer/' : '/',
  plugins: [react(), tailwindcss()],
}))