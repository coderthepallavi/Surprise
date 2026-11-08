import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages ke liye: 'repo-name' ko apne repo ke naam se badlo
  base: './',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
