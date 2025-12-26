import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
      tailwindcss(),
      tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
          routesDirectory: path.join(__dirname, './src/presentation/routes'),
      }),
      react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})