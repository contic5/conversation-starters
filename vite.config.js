import { defineConfig } from 'vite'

export default defineConfig({
  base: '/conversation-starters/', // Match GitHub repo name exactly
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
})
