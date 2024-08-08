import {vitePlugin as remix} from "@remix-run/dev";
import * as path from 'path';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [
      tsconfigPaths(),
      remix({
          ignoredRouteFiles: ["**/*.css"],
      }),
  ],
  build: {
    outDir: './dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@app': path.resolve(__dirname, './app'),
      '@assets': path.resolve(__dirname, './src/path/assets'),
    },
  },
  server: {
    port: 3003
  }
});
