import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const port = parseInt(process.env.VITE_APP_PORT);

  return {
    plugins: [react(), tsconfigPaths()],
    preview: { port },
    server: { port }
  };
});
