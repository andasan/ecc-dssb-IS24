import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Check the value of the DOCKER_ENV environment variable
const isDockerEnvironment = process.env.DOCKER_ENV === 'true';

const proxyTarget = isDockerEnvironment
  ? 'http://server:8080' // Use Docker target
  : 'http://localhost:8080'; // Use local target

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
