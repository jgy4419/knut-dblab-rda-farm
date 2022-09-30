<template>
  <div class="auction-contain">
    <div class="inner">
      <Header :headerProps="headerProps"/>
      <!-- 사진 데이터 props로 넣어주기 :imgData = "imgData"명으로 넣어주기-->
      <Slide :imgData="imgData"/>
      <AuctionList/>
    </div>
    <bottom-nav/>
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
        imgData: [],
      }
  },
}
</script>

<style lang="scss" scoped>
.inner{
  position: relative;
  // min-height: 95vh;
}
</style>




