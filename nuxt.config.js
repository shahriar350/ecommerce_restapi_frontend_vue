import colors from 'vuetify/es5/util/colors'
// import { resolve } from 'path'

export default {
  // dev: process.env.NODE_ENV !== 'production',
  // dev: true,
  // mode: 'universal',
  // target: 'server',
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bongobitan',
    title: 'bongobitan',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  // serverMiddleware: ['~/server-middleware/logger'],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/server_related',
    '~plugins/mixins',
    "~/plugins/errors.js",
    {src: '~plugins/vue2editor', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-compress',
    'nuxt-windicss',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/sentry',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    withCredentials: true,
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://saifshahriar.pythonanywhere.com/',
      pathRewrite: {
        '^/api/': 'api/'
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en'
  //   }
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    icons: {
      iconfont: 'mdiSvg', // default - only for display purposes
    },
    treeShake: true,
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // render: {
  //   bundleRenderer: {
  //     shouldPrefetch: (file, type) => ['script', 'style', 'font'].includes(type) && !file.includes('index')
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // // publicPath: 'http://127.0.0.1:8000/',
    optimizeCSS: true,
    extractCSS: true,
    optimization: {
      minimize: true,
      splitChunks: {
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    vendor: [
      'vue2-editor',
    ],
    transpile: [
      // 'vuetify',
      'vee-validate/dist/rules',
    ],
    // extend (config, {isClient}) {
    //   if (isClient){
    //     config.optimization.splitChunks.maxSize = 200000;
    //   }
    // }
  },
  toast: {
    position: 'bottom-right',
    duration: 4000,
  },
  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },
}
