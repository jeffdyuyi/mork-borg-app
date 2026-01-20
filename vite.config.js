import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/mork-borg-app/',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          vendor: ['jspdf', 'html2canvas'],
          purify: ['dompurify']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});