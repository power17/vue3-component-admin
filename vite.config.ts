import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteMockServe } from 'vite-plugin-mock'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
// Load environment variables

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd()) // 加载 `.env.[mode]`

  const enablePWADEBUG = env.VITE_PWA_DEBUG === 'true'
  const enableMock = env.VITE_MOCK_ENABLE === 'true'

  // 也可以手动加载特定文件

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],

        // global imports to register
        imports: ['vue', '@vueuse/core']
      }),
      Components({
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [ElementPlusResolver()]
      }),
      VitePWA({
        injectRegister: 'auto',
        manifest: {
          name: 'Vite App',
          short_name: 'Vite App',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        registerType: 'autoUpdate',
        workbox: {
          navigateFallback: '/',
          // 如果大家有很大的资源文件，wasm bundle.js
          globPatterns: ['**/*.*']
        },
        devOptions: {
          enabled: enablePWADEBUG,
          suppressWarnings: true,
          navigateFallbackAllowlist: [/^\/$/],
          type: 'module'
        }
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: enableMock
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
