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
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2 // Multiple passes for better compression
      },
      mangle: {
        safari10: true // Safari 10 compatibility
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('axios')) {
              return 'utils';
            }
            return 'vendor'; // Other node_modules
          }
        },
        // Optimize asset names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps only for production debugging
    sourcemap: false,
    // Improve tree-shaking
    reportCompressedSize: false, // Faster builds
    // Target modern browsers for smaller bundles
    target: 'es2015',
  }
})
