import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    allowedHosts: ['mitzi-purehearted-delila.ngrok-free.dev'], // 👈 Add this
  },
  build: {
    sourcemap: false, // ❌ Prevents DevTools from showing original source code
    minify: 'terser', // ✅ Uses Terser for stronger JS minification
    terserOptions: {
      compress: {
        drop_console: true,  // 🚫 Removes all console.log/debug lines
        drop_debugger: true, // 🚫 Removes debugger statements
      },
      format: {
        comments: false, // 🧹 Removes comments from output
      },
    },
  },
})
