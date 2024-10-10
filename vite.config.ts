import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env': {
      VITE_REPLICATE_API_TOKEN: JSON.stringify(process.env.VITE_REPLICATE_API_TOKEN),
      VITE_OPENAI_API_KEY: JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    }
  }
})