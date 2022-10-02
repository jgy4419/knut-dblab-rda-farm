<template>
  <div class="main_nav_t_div">
    <nav class="main_t_nav">
        <ul class="main_t_nav_list">
            <li class="nav__btn">
                <div class="nav__notification-dot"></div>
                <a class="nav__link"><i class="fas fa-bars fa-2x" aria-hidden="true"></i>
                </a>
            </li>

            
            <li class="main_m_li_list">
                <a class="nav_m_link" href="workout.html">
                    <h4 class="user-component__title">경매 알림</h4><i class=" fa-2x" aria-hidden="true" image
                        src="../image/123.jpg"></i>
                </a>
            </li>

            <li class="nav__btn">
                <a class="nav__link" onclick="goBack()"><i class="fas fa-chevron-left fa-2x"
                        aria-hidden="true"></i>
                </a>
            </li>
          </ul>
      </nav>
  
    <v-carousel v-model="model">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">
                      Slide {{ i + 1 }}
                  </div>
              </v-row>
          </v-sheet>
      </v-carousel-item>
    </v-carousel>
    
    <fieldset>
        <div class="white_div">
            <div class="goods_pay_section ">
                <div class="goods_group">
                    <ul class="list" ref="auctions" >
                        <li v-for="(auction, index) in this.$store.state.auctionList" :key="auction.auction_Id"
                            id="_rowLi20220203162708CHK2022020394386781"
                            class="goods_pay_item _interlockNo20220211200904406814">
                            <div class="goods_item">
                              <!-- a 태그 -> router 태그 -->
                                <a href="/orderStatus/2022020310590721" class="goods_thumb">
                                    <img :src='`http://localhost:8080/product_images/${auction.productDTO.product_img_name}.png`'
                                        alt="" width="90" height="90" /></a>
                                <div class="goods_info">
                                    <a href="/orderStatus/2022020310590721" class="goods">
                                        <p class="name">
                                            {{auction.productDTO.product}}
                                        </p>
                                        <ul class="info">
                                            <li><span class="blind">상품금액</span>{{auction.bid_price}}원</li>
                                            <li class="date"><span class="blind">등록일</span> {{auction.productDTO.p_reg_date}}
                                            </li>
                                        </ul>
                                    </a>
                                    <a href="#"
                                        class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault">{{auction.bid_status}}
                                        ({{auction.deadline_date}} 경매 종료)</a>
                                    <p class="guide">
                                        {{auction.productDTO.p_explanation}}
                                    </p>
                                </div>
                            </div>
                            <div class="seller_item">
                                <div class="inner">

                                    <span class="seller">{{auction.f_farm_name}}</span>
                                    <span class="tel">{{auction.f_phonenum}}</span>
                                    <!-- <router-link :to="{ name: 'auction_detail', params: { auction}, }"> auction_detail </router-link> -->
                                    <br><br>
                                    
                                    <a v-on:click="navigateProduct(auction.auction_Id, index)" 
                                        class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022020394386781)) _stopDefault">경매 상세</a>
                                </div>
                            </div>
                        </li>
                        <!-- </infinite-scroll> -->
                    </ul>
                </div>
            </div>
        </div>
    </fieldset>
    <div>
      <!-- {{window.scrollY}} -->
      <button @click="moreAuction()">웹소켓</button>
    </div>

    <!-- <bottom-nav></bottom-nav> -->
  </div>
</template>

<script>
// import InfiniteScroll from 'infinite-loading-vue3';
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
// import axios from "axios";


export default{

  // components: { InfiniteScroll},
  data() {
      return { 
        model: 0,
        colors: [
            'primary',
            'secondary',
            'yellow darken-2',
            'red',
            'orange',
        ],
        addLimit: 2,
        existResult: true,
        innerHeight: window.innerHeight,          // 1100 고정 값!
      }
  },
  created() {
    // vue 생성 시 소켓 연결
    this.connect()
  },

  mounted() {
    window.scrollTo(0,0);
    this.auctions = this.$refs.auctions;
    this.auctions.addEventListener('scroll', this.scrollEvents);
    // this.auctions.addEventListener('scroll', this.scrollEvents);
  },
  unmounted() {
    this.auctions.addEventListener('scroll', this.scrollEvents);
  },

  methods: {
    scrollEvents(){
      
      // 값 체크용 log
      console.log('스크롤 중!');
      console.log('window.scrollY: '+ window.scrollY);
      console.log('window.innerHeight: '+ innerHeight);
      console.log('document.body.scrollHeight: '+ document.body.scrollHeight);

      console.log('auctions.scrollHeight: '+ this.$refs.auctions.scrollHeight);
      console.log('auctions.scrollTop: '+ this.$refs.auctions.scrollTop);


      /*  scrollTop: 현재 스크롤 위치(경매 표시 하나당 픽셀 높이: 326)
          innerHeight: 1100
          scrollHeight 범위: 1332 ~ 무한대
          existResult: 데이터 존재 유무에 대한 변수, 더 이상 받아 올 데이터가 없는 경우 false 처리
      */

      // 스크롤이 마지막 부분까지 왔을 때
      if (this.$refs.auctions.scrollTop + innerHeight > this.$refs.auctions.scrollHeight && this.existResult) this.moreAuction()
    },
    navigateProduct (auction_id, index) {

      this.$router.push({name:'auction_detail', params: { id: auction_id, index: index }});
    },
    moreAuction() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send("/receive_limit/"+this.$store.state.config.headers.TOKEN, this.$store.state.limit, {});
        
        // this.$store.commit('UP_LIMIT', this.addLimit);

        console.log(this.$store.state.auctionList);
      }
    },
    connect() {
      const serverURL = "http://localhost:8080/socket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      let headers = { TOKEN: this.$store.state.config.headers.TOKEN };
      
      this.stompClient.connect(
        headers,
        frame => {
          this.connected = true;
          console.log('소켓 연결 성공', frame);

          this.stompClient.subscribe("/send_auction_data/"+this.$store.state.config.headers.TOKEN,  res => {

            const response_data = JSON.parse(res.body);

            console.log(response_data);
            if (response_data.length == 0) {
              console.log("noResult");
              this.existResult = false
            }

            for (let i = 0; i < response_data.length; i++)
              this.$store.commit('PUSH_AUCTION', response_data[i]);
            
          });
          this.stompClient.subscribe("/send_bidding",  res => {

            const response_bidding = JSON.parse(res.body);
            
            if (response_bidding != undefined)
              this.$store.commit('UPDATE_BID_PRICE', response_bidding);
          });

          // 처음 시작할 떼 경매 데이터 가져오기
          for (let index = 0; index < 2; index++)
            this.moreAuction();
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      ); 
    },
  },
}
</script>

<style>
.list {
  height: calc(100vh - 70px);
  overflow: auto;
}
</style>

