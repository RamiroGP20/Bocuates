import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 reemplaza "mi-empresa" por el nombre EXACTO de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Bocuates/'
})
