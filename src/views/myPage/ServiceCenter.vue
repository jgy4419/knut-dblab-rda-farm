<template>
<Header :headerProps="headerProps"/>
<div>
  <div class="inner">
    <div class="black-bg" v-if="modalchang == true">
      <div class="white-bg">
        <h4>고객센터 번호</h4>
        <p>010-2037-4553</p>
      </div>
    </div>
    <div class="main_top40"></div>

      <div class="call-contain" :href="'https://open.kakao.com/o/sCXa6CEe'">
        <p class="call-button" type="button" @click="modalchang=true">
          카카오톡 1:1 문의
        </p>
        <a :href="'https://open.kakao.com/o/sCXa6CEe'" class="catok-text">오픈 채팅방으로 이동하기</a>

      </div>

      <div class="catok-contain">
        <p class="call-button" type="button" @click="modalchang=true">
          전화문의
        </p>
        <p class="call-text">010-2037-4553</p>
      </div>

  
  </div>
  <bottom-nav/>
</div>
</template>


<script>
import Header from '../../components/Header/bellAndBackHeader.vue';
import bottomNav from '@/components/bottomNav.vue';

export default {
  components: {
    bottomNav,Header
  },
  data(){
    return{
      modalchang:false,
      headerProps: '고객센터',
    }
  },
  methods: {
    copy(){
      let call = document.querySelector('.call-text');
      // call.select();
      document.value.execCommand('copy');
    }
  },
  mounted(){
    let call = document.querySelector('.call-text');
    call.select();
    document.execCommand('copy');
  }
}
</script>

<style lang="css" scoped>
.black-bg{
  width:100%; height: 100%;
  background: rgba(0,0, 0, 0, 5);
  position: flexed; padding:20px;
}
.black-bg{
  width:100%;
  background: blueviolet;
  border-radius: 8px; padding:20px;
}
.call-contain{
  margin: auto;
  width: 85%;
  height: 100px;
  background-color: #FFC1AA;
  margin-top: 150px;
  border-radius: 20px;
  text-align: center;
  padding-top: 25px;
}
.catok-contain{
  margin: auto;
  width: 85%;
  height: 100px;
  background-color: #FFC1AA;
  margin-top: 50px;
  border-radius: 20px;
  text-align: center;
  padding-top: 25px;
}
.call-button, .call-text{
  font-weight: 600;
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}
.catok-text{
  font-weight: 600;
  font-size: 20px;
  color: rgb(234, 61, 61);
  margin-bottom: 10px;
}
.inner{
  position: relative;
  min-height: 70vh;

}
</style>