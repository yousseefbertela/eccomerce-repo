import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Railway deployment configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: [
      'angal-aziz-sotware-21-documentation-system-production-ef9f.up.railway.app',
      '.railway.app'
    ]
  }
})