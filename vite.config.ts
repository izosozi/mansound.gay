import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    minify: true,
    outDir: "/Volumes/C$/www/mansound.gay/webroot",
    // Make sure to update the path to where your build files should go!
    emptyOutDir: true,
  },
})
