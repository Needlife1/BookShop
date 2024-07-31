import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks: id => id.includes('node_modules') && 'vendor',
        entryFileNames: 'commonHelpers.js',
      },
    },
    outDir: '../dist',
  },
  plugins: [
    vue(),
    compression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    injectHTML(),
    FullReload(['./src/**/**.html']),
  ],
}));
