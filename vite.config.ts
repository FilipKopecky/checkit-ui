import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/modelujeme/v-nástroji/checkit",
  plugins: [react()],
});
