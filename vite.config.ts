import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',  // Add this to support modern JavaScript features including top-level await
  },
  esbuild: {
    supported: {
      'top-level-await': true  // Enable top-level await support
    },
  }
});