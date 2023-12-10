import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // other configurations...
  build: {
    assetsInlineLimit: 0,
  },
  base: "/",
  plugins: [react()],
});
