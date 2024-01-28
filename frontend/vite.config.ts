import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: { port: 3001 },
  server: { port: 3001 }
  // resolve: {
  //   alias: {
  //     "@/*": path.resolve(__dirname, "src/*"),
  //     "@public/*": path.resolve(__dirname, "public/*")
  //   }
  // }
});
