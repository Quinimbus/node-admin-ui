import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "quinimbus-admin-ui",
      fileName: "quinimbus-admin-ui"
    },
    rollupOptions: {
      external: [/^primevue(\/.+)?$/, "pinia", "vue", "vue-router", "vue3-oidc"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
})
