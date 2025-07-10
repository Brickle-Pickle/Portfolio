import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Simple configuration for Unity WebGL
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  // Treat Unity files as static assets
  assetsInclude: ['**/*.br', '**/*.wasm', '**/*.data']
})