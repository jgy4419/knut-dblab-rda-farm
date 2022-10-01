<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="item, i in items.length" :key="i" class="slideList">
      <img :src="items[i]" alt="슬라이드 이미지">
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    imgData: Array
  },
  mounted(){
    console.log(this.$route.fullPath.split('/'));
    console.log('이미지 데이터', this.imgData);
    if(this.imgData !== undefined){
      if(this.$route.fullPath.split('/')[3]){
        this.items = [];
        for(let img of this.imgData){
          this.items.push(`/farm_images/${img}.png`);
          console.log('이미지 url', this.items);
        }
      }else{
          console.log('product 페이지');
        this.items = [];
        for(let img of this.imgData){
          this.items.push(`/product_images/${img}.png`);
          console.log('이미지 url', this.items);
        }
      }
    }else{
      let basicImg = [
        '/auciton_slide_images/slide_1.jpg',
        '/auciton_slide_images/slide_2.jpg',
        '/auciton_slide_images/slide_3.jpg',
        '/auciton_slide_images/slide_4.jpg',
      ]
      for(let i = 0; i < basicImg.length; i++){
        this.items.push(basicImg[i]);
      }
      console.log(this.items);
    }   
  },
  beforeMount(){
    
  },
  created(){
    // setTimeout(() => {
    //   if(this.imgData !== undefined){
    //     if(this.imgData.length > 0){
    //       this.items = [];
    //       for(let img of this.imgData){
    //         this.items.push(`/product_images/${img}.png`);
    //         console.log('이미지 url', this.items);
    //       }
    //     }
    //   }else{
    //     let basicImg = [
    //       '/auciton_slide_images/slide_1.jpg',
    //       '/auciton_slide_images/slide_2.jpg',
    //       '/auciton_slide_images/slide_3.jpg',
    //       '/auciton_slide_images/slide_4.jpg',
    //     ]
    //     for(let i = 0; i < basicImg.length; i++){
    //       this.items.push(basicImg[i]);
    //     }
    //   }   
    // }, 10);
    
  },
  data(){
    return {
      modules: [Autoplay, Pagination, Navigation],
      items: [],
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 250px;
}
.slideList{
    width: 100%;
    height: 250px;
    background-size: contain;
    
}

.swiper-slide  {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide  text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide  img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>