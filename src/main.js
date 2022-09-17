import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Storage from "vue3-storage"
import VueSSE from 'vue-sse'
// import VueHead from 'vue-head'

// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.js"
// import TableLite from "vue3-table-lite";
// import TableLite from "vue3-table-lite/ts"; // TypeScript

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(Vue3Storage)
  .use(VueSSE)
  // .use(VueHead)
  .mount('#app')
