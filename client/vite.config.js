import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configure assets to include Unity WebGL files
  assetsInclude: [
    '**/*.br',        // Brotli compressed files
    '**/*.wasm',      // WebAssembly files
    '**/*.data',      // Unity data files
    '**/*.unityweb'   // Legacy Unity web files
  ],
  // Configure server for Unity WebGL support
  server: {
    // Configure middleware to handle .br files
    middlewareMode: false,
    headers: {
      // CORS headers for Unity WebGL
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    },
    // Custom middleware for .br files
    configureServer(server) {
      server.middlewares.use('/src/assets/SnakeLocaust', (req, res, next) => {
        // Set correct Content-Encoding for .br files
        if (req.url && req.url.endsWith('.br')) {
          res.setHeader('Content-Encoding', 'br')
          
          // Set correct MIME type based on file extension
          if (req.url.includes('.js.br')) {
            res.setHeader('Content-Type', 'application/javascript')
          } else if (req.url.includes('.wasm.br')) {
            res.setHeader('Content-Type', 'application/wasm')
          } else if (req.url.includes('.data.br')) {
            res.setHeader('Content-Type', 'application/octet-stream')
          }
        }
        next()
      })
    }
  },
  // Optimize build for Unity WebGL
  build: {
    // Increase chunk size limit for Unity builds
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        // Ensure Unity files are treated as assets
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('SnakeLocaust')) {
            return 'assets/SnakeLocaust/[name].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
})
