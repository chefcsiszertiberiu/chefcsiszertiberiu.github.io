import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Live: https://chefcsiszertiberiu.github.io/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})