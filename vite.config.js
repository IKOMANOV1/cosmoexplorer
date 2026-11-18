import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — działa na GitHub Pages pod dowolną nazwą repozytorium
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 1600 },
})
