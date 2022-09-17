<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import bottomNav from '@/components/bottomNav.vue';

export default {
  name: 'App',
  components: {bottomNav},

  data: () => ({
    //
  }),
}
</script>

<style lang="scss">
@import url(./assets/css/main.css);
</style>
