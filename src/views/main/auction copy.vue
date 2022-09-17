<template>
<div>
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
                <a class="nav__link" v-on:click="navigategoback"><i class="fas fa-chevron-left fa-2x"
                        aria-hidden="true"></i>
                </a>
            </li>
          </ul>
      </nav>
  </div>

  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

    <fieldset>
        <div class="white_div">
            <div class="goods_pay_section ">
                <div class="goods_group">
                    <ul class="goods_group_list">
                        <li v-for="auction in this.$store.state.auctionList" :key="auction.auction_Id"
                            id="_rowLi20220203162708CHK2022020394386781"
                            class="goods_pay_item _interlockNo20220211200904406814">
                            <div class="goods_item">
                              <!-- a 태그 -> router 태그 -->
                                <a href="/orderStatus/2022020310590721" class="goods_thumb">
                                    <img :src='`/product_images/${auction.productDTO.product_img_name}.png`'
                                        alt="" width="90" height="90" /></a>
                                <div class="goods_info">
                                    <a href="/orderStatus/2022020310590721" class="goods">
                                        <p class="name">
                                            {{auction.auction_name}}
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
                                    
                                    <a v-on:click="navigateProduct(auction)" 
                                        class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022020394386781)) _stopDefault">경매 상세</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </fieldset>
    <div></div>
    <div>
      <button @click="moreProduct()">웹소켓</button>
    </div>
    <InfiniteLoading :comments="auction" @infinite="moreProduct()"/>
    <bottom-nav/>
</div>
</template>

<script>
// import axios from "axios"
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import bottomNav from '@/components/bottomNav.vue';
import axios from "axios"
import InfiniteLoading from "v3-infinite-loading";
// import { ref } from 'vue';


export default{

  components: { bottomNav },
  data() {
      return {            
          limit: 0,
          // auctionList: [], // 배열에 저장 v-for="product in productList" -> v-for 문 사용해서 표시
        items: [
          {
            src: 'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/v2/9/4/9/6/5/4/cPJKf/4569949654_B.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
          infiniteId: +new Date()
      }
  },
  
  //데이터베이스 에서 배열로 가져와서
  created() {
    // vue 생성 시 소켓 연결
    this.connect()
  },

  methods: {
    navigateProduct (auction) {
      console.log("navigateProduct");
      console.log(auction);
      console.log(auction.bid_num);
      // this.$router.push({path:`/user/${auction_id}`, params: { auction_id: 3}});
      this.$router.push({name:'auction_detail', params: { id: auction.auction_Id, auction: JSON.stringify(auction) }});
      
    },
    navigategoback() {
        this.$router.go(-1);
    },
    // moreProduct () {
      
    //   this.send()
      
    // },
    moreProduct($state) {
      this.send(), 
      then(({ data }) => {
        if (data.hits.length) {
          this.page += 1;
          this.list.push(...data.hits);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    send() {
      console.log("limit:" + this.$store.state.limit);
      console.log(this.stompClient);
      console.log(this.stompClient.connected);
      if (this.stompClient && this.stompClient.connected) {
        console.log(this.$store.state.limit);
        console.log(this.$store.state.config.headers.TOKEN);
        this.stompClient.send("/receive_limit/"+this.$store.state.config.headers.TOKEN, this.$store.state.limit, {});
        
        this.$store.commit('UP_LIMIT', 2);

        console.log(this.$store.state.auctionList);
      }
    },
    connect() {
      const serverURL = "/socket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)

      console.log(this.$store.state.config.headers);
      let headers = { TOKEN: this.$store.state.config.headers.TOKEN };
      console.log(headers);
      this.stompClient.connect(
        headers,
        frame => {
          this.connected = true;
          console.log('소켓 연결 성공', frame);

          this.stompClient.subscribe("/send_auction_data/"+this.$store.state.config.headers.TOKEN,  res => {

            const response_data = JSON.parse(res.body);
            console.log(response_data[0]);
            console.log(response_data.length);
            JSON.parse(res.body)
            for (let i = 0; i < response_data.length; i++) {
              this.$store.commit('PUSH_AUCTION', response_data[i]);
              // this.auctionList.push(response_data[i])
            }
            console.log("this.auctionList");
            console.log(this.$store.state.auctionList[0]);
          });
          this.stompClient.subscribe("/send_bidding",  res => {

            const response_bidding = JSON.parse(res.body);
            console.log(response_bidding);
            if (response_bidding != undefined) {
              this.$store.commit('UPDATE_BID_PRICE', response_bidding);
            }

            // response_data.auction_id로 현재 가지고 있는 리스트의 가격을 변경
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );        
    }
  },
}
</script>

<style>
</style>

