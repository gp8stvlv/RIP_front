import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

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
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/path/to/main.js',
    },
  },
  plugins: [react()],
  base: '/RIP_front/',
})