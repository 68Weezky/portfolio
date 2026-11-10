import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Long-lived vendor chunk: it rarely changes, so returning visitors keep it cached.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
