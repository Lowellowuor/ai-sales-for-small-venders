import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // THIS 'define' PROPERTY IS CRUCIAL. ENSURE IT IS HERE EXACTLY AS SHOWN.
  define: {
    'process.env': {} 
  },
  build: {
    outDir: 'dist', // Ensure this matches your Firebase Hosting public directory config
  }
});
