import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';
import VitePluginMetaEnv from 'vite-plugin-meta-env';

const metaEnv = {
  API_CLIENT: 'http://localhost:3002',
  COOKIE_ACCESS_TOKEN_KEY: 'access_token'
};

export default defineConfig({
  build: {
    rollupOptions: {
      external: [/^node:.*/]
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    VitePluginMetaEnv(metaEnv, 'import.meta.env'),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => name !== 'theme' && `antd/es/${name}/style`
        },
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          style: () => {
            return false;
          }
        }
      ]
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    })
  ]
});
