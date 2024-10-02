import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // If you're using React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
