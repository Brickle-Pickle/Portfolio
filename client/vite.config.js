import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Simple configuration for Unity WebGL
  server: {
    host: true, // This exposes the server to your network
    headers: {
      // Allow PDF files to be embedded
      'Cross-Origin-Resource-Policy': 'cross-origin',
      // Keep Unity-specific headers but make them less restrictive for development
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  // Treat Unity files and PDFs as static assets
  assetsInclude: ['**/*.br', '**/*.wasm', '**/*.data', '**/*.pdf']
})