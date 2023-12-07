import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // proxy: {
    //   '/bouquets/': {
    //     target: 'http://127.0.0.1:8000',
    //     changeOrigin: true,
    //   },
    //},
  },
  build: {
    // other build options...
    assetsInlineLimit: 0, // Add this line to ensure module scripts are not inlined
  },
  plugins: [react()],
  base: '/RIP_front/',
})