<template>
  <div class="auction-contain">
    <div class="inner">
      <Header :headerProps="headerProps"/>
      <!-- 사진 데이터 props로 넣어주기 :imgData = "imgData"명으로 넣어주기-->
      <Slide :imgData="imgData"/>
      <div class="buttonContain">
        <button @click="reload()" class="reload-button">새로고침</button>
      </div>
      <AuctionList/>
    </div>
    <bottom-nav class="bottom"/>
  </div>
</template>


<script>
import Header from '../../components/Header/bellAndBackHeader.vue';
import Slide from '../../components/slide';
import AuctionList from '../../components/Auction/auctionList.vue';
import bottomNav from '@/components/bottomNav.vue';


export default{

  components: { bottomNav, Header, AuctionList, Slide },
  data() {
      return {        
        headerProps: '경매 알림',
        imgData: undefined,
      }
  },
  methods: {
    reload(){
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.inner{
  position: relative;
  .buttonContain{
    position: fixed;
    z-index: 100;
    width: 400px;
    margin: auto;
    .reload-button{
      position: absolute;
      right: 10px;
      margin-top: -20px;
      width: 100px;
      height: 40px;
      font-size: 14px;
      font-weight: 700;
      background-color: rgb(241, 241, 241);
      border-radius: 10px;
    }
  }
}
.bottom{
  position: fixed;
  bottom: 0;
}
</style>




