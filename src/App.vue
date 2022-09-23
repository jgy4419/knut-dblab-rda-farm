<template>
  <v-app class="app">
    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import bottomNav from '@/components/bottomNav.vue';

export default {
  name: 'App',
  components: {bottomNav},
}
</script>

<style lang="scss">
@import url(./assets/css/main.css);
.app{
  margin: auto;
  width: 28vw;
  height: 100vh;
}
.header-icon-size{
  font-size: 30px;
  font-weight: 700;
}
// .header
@media screen and (max-width: 500px){
  .app{
    margin: auto;
    width: 100vw;
    height: 100vh;
  }  
}
</style>
