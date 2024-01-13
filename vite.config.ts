import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


const base_path = process.env.GITHUB_ACTIONS ? '/metrostreams-frontend/' : '/';


// https://vitejs.dev/config/
export default defineConfig({
  base: base_path,
  plugins: [react()],
  server: {
    port: 3000,
  },
})
