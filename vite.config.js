import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'singlefile' ? [viteSingleFile()] : [])],
  ...(mode === 'singlefile'
    ? {
        build: {
          assetsInlineLimit: 100000000,
          cssCodeSplit: false,
        },
      }
    : {}),
}))
