const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
			// httpss://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    proxy: {
      '/product_images': {
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/auciton_slide_images': { 
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/member_profile': { 
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/farm_images': { 
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/bank_images': { 
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
      '/socket': { 
        target: 'https://118.67.134.38:80',
        changeOrigin: true,
      },
    },
    // https: true,
    port: 8082,
  },
  outputDir: '../auction_backend/src/main/resources/static',
})
