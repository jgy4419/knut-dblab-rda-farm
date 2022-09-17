const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  devServer: {
    proxy: {
      '/product_images': {
        target: 'http://118.67.134.38:8080',
        changeOrigin: true,
      },
      '/member_profile': { 
        target: 'http://118.67.134.38:8080',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://118.67.134.38:8080',
        changeOrigin: true,
      },
      '/socket': { 
        target: 'http://118.67.134.38:8080',
        changeOrigin: true,
      },
    },
    port: 8082
  }
})
