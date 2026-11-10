import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), 
  ],
  server: {
    // dev mein bhi /api ko backend pe forward karo (same as Vercel rewrite)
    proxy: {
      '/api': {
        target: 'https://fluentia-zo3k.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
