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
    <swiper-slide v-for="item, i in items.length" :key="i" class="slideList"
    :style="{backgroundImage: `url(${items[i]})`}"/>
    <!-- <swiper-slide class="slideList">Slide 3</swiper-slide >
    <swiper-slide class="slideList">Slide 5</swiper-slide >
    <swiper-slide class="slideList">Slide 7</swiper-slide >
    <swiper-slide class="slideList">Slide 9</swiper-slide > -->
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
    // /product_images/${resData[i].product_img_name}.png
    console.log(this.$route);
    // 나중에 도메인 주소로 변경하기
    this.items.push(`"http://localhost:8086/product_images/${this.imgData}.png"`);
  },
  data(){
    return {
      modules: [Autoplay, Pagination, Navigation],
      items: [
        // test 이미지
        'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.slideList{
    width: 100vw;
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