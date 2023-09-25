// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { Nitro } from 'nitropack'
import path from 'path'
export default defineNuxtConfig({
  ssr: true,

	app: {
		head: {
			title: 'todo',
			htmlAttrs: {
				lang: 'ru'
			},
			meta: [
				{ charset: 'utf-8' },
				{
					name: 'viewport',
					content: 'width=device-width, user-scalable=no, shrink-to-fit=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
				},
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
			]
		},
    pageTransition: { name: 'page', mode: 'out-in' }
	},

  // Crucial to enable decorators(@) support!
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    }
  },

  devtools: { enabled: true },

  css: [
    'normalize.css',
    '~/assets/scss/main.scss',
    'vue-final-modal/style.css'
  ],

  vite: {
    // Crucial to enable decorators(@) support!
    esbuild: {
      tsconfigRaw: {},
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/core.scss" as *;'
        }
      }
    },
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(process.cwd(), 'assets/icon')
        ],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',

        /**
         * custom dom snippets
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__'
      })
    ]
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Inter: [300, 400, 700]
    },
    download: false
  },

  pinia: {
    autoImports: [
      ['defineStore', 'definePiniaStore']
    ]
  },

  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata')
    }
  },
})
