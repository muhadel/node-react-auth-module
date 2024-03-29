import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.APP_PORT);
  return {
    envPrefix: "APP_",
    plugins: [react(), tsconfigPaths()],
    preview: { port },
    server: { port }
  };
});
