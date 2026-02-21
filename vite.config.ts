import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    ViteImageOptimizer({
      jpeg: { quality: 75 }, // Balance between size and "Chef quality"
      avif: { quality: 65 }, // AVIF is super efficient at lower quality scores
    })
  ],
  base: '/',
<<<<<<< HEAD
})
=======
})
>>>>>>> c3ae4107964c6100b0796c88bd3aafba3080ebe6
