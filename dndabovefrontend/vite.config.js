import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build:{
    outDir: '../Above_backend/Above_backend/wwwroot',
    emptyOutDir: true,
  }, 
  plugins: [react()],
})