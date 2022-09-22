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
    :style="{backgroundImage: `url(${items[i]})`}">
      Slide 1
    </swiper-slide >
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
  data(){
    return {
      modules: [Autoplay, Pagination, Navigation],
      items: [
        'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/v2/9/4/9/6/5/4/cPJKf/4569949654_B.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
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