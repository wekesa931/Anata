import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dns from 'dns'
import svgr from 'vite-plugin-svgr'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { VitePWA } from 'vite-plugin-pwa'
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
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Scribe Web Application',
          short_name: 'scribe-app',
          icons: [
            {
              src: '/manifest-icons/maskable_icon.png',
              type: 'image/png',
              sizes: '96x96',
            },
            {
              src: '/manifest-icons/android-chrome-192x192.png',
              type: 'image/png',
              sizes: '192x192',
              purpose: 'favicon',
            },
            {
              src: '/manifest-icons/android-chrome-512x512.png',
              type: 'image/png',
              sizes: '512x512',
              purpose: 'favicon',
            },
            {
              src: '/manifest-icons/favicon-32x32.png',
              type: 'image/png',
              sizes: '32x32',
            },
            {
              src: '/manifest-icons/favicon-16x16.png',
              type: 'image/png',
              sizes: '16x16',
            },
            {
              src: '/manifest-icons/mstile-144x144.png',
              type: 'image/png',
              sizes: '144x144',
            },
          ],
          theme_color: '#171717',
          background_color: '#f0e7db',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
        },
        injectManifest: {
          injectionPoint: undefined,
        },
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          maximumFileSizeToCacheInBytes: 20000000,
          skipWaiting: true,
          clientsClaim: true,
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
          manualChunks: {},
        },
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  })
}
