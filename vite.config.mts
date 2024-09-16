import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dns from 'dns'
import svgr from 'vite-plugin-svgr'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { viteStaticCopy } from 'vite-plugin-static-copy'

dns.setDefaultResultOrder('verbatim')

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    define: {
      'process.env': env,
      globalThis: 'window',
      'process.platform': JSON.stringify(process.platform),
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        stream: 'stream-browserify',
        process: 'process/browser',
        buffer: 'buffer',
        crypto: 'crypto-browserify',
        assert: 'assert',
        http: 'stream-http',
        https: 'https-browserify',
        os: 'os-browserify',
        url: 'url',
        util: 'util',
        '~react-draft-wysiwyg': path.resolve(
          __dirname,
          'node_modules/react-draft-wysiwyg'
        ),
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: './firebase-messaging-sw.js',
            dest: './',
          },
        ],
      }),
      ViteMinifyPlugin({}),
      svgr({
        include: '**/*.svg',
      }),
      react({
        babel: {
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                version: 'legacy',
              },
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true,
              },
            ],
          ],
        },
      }),
    ],
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    build: {
      chunkSizeWarningLimit: 1800,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {},
        },
      },
      assetsDir: 'assets',
      manifest: true,
    },
    server: {
      watch: {
        usePolling: true,
      },
      force: true,
    },
  })
}
