import { defineConfig } from 'vite';
import { resolve } from 'path';
import plugin from '@vitejs/plugin-react';
import * as packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    plugin({
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'react-hooks-use-table',
      formats: ['es', 'cjs'],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies), ...Object.keys(packageJson.dependencies)],
    },
    target: 'ESNext',
    sourcemap: true,
  },
});
