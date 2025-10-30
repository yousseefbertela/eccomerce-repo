import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Enable history API fallback for client-side routing
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      }
    }
  },
  // Ensure proper handling of routes in production build
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
