import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O base é definido pelo workflow (VITE_BASE) no deploy do GitHub Pages.
// Em desenvolvimento, usa "/".
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
});
