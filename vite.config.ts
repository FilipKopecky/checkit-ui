import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: "/modelujeme/v-nástroji/checkit",
  plugins: [react(), eslint()],
});
