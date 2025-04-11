import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build:{
<<<<<<< Updated upstream
    outDir: '../Above_backend/Above_backend/wwwroot',
    emptyOutDir: true,
  }, 
=======
    outdDir: "../Above_backend/Above_backend/wwwroot",
    emptyOutDir: true,
  },

>>>>>>> Stashed changes
  plugins: [react()],
})