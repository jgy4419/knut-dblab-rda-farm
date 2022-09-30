<template>
  <v-app class="app">
    <v-main class="main">
      <AlertBox class="alert-box"/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AlertBox from './components/alertBox.vue';
import bottomNav from '@/components/bottomNav.vue';
// import Alert from './views/main/alert.vue';
export default {
  name: 'App',
  components: {bottomNav, AlertBox},
  mounted(){
    // 현재 시간이 로그아웃 될 시간(로그인 한 기준 + 1일)보다 크면 로그아웃 시켜줌
    if(Date.now() > JSON.parse(localStorage.getItem('expire'))){
      alert('로그아웃 되었습니다!');
      console.log('현재시간', Date.now());
      console.log('로그아웃 예정 시간', JSON.parse(localStorage.getItem('expire')));
      this.$store.commit('LOGOUT');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
@import url(./assets/css/main.css);
.app{
  margin: auto;
  width: 400px;
  height: 100vh;
  overflow-x: hidden;
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
