import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Set the output directory to "build"
  },
  node:{

    test:"nodemon server.js ",
    node:"node index .js ",
    watch:["src/server.js","src/client.js"]
  }
})


