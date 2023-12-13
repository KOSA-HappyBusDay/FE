import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue(),
    {
      // Replace axios import with a virtual module
      name: 'replace-axios',
      transform: (code, id) => {
        if (id.includes('node_modules/axios')) {
          return code.replace(/import\s*[^'"]*['"]axios['"];/g, 'import axios from "virtual-axios";');
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
  _global: {},
  },
};
