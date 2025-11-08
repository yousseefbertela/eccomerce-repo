import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Listen on all network interfaces
    // Enable history API fallback for client-side routing
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 5173,
    host: true, // Listen on all network interfaces for Railway
    strictPort: true,
    allowedHosts: ['.railway.app', '.up.railway.app'],
  },
  // Ensure proper handling of routes in production build
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'clsx'],
          'utils': ['axios']
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps only for production debugging
    sourcemap: false,
  }
})
