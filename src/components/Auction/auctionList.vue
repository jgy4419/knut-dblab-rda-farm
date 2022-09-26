<template>
  <div>
    <Spinner v-if="spinnerState === true"/>
      <fieldset>
          <div class="white_div">
              <div class="goods_pay_section ">
                  <div class="goods_group">
                      <ul class="goods_group_list">
                          <li v-on:click="navigateProduct(auction)"  v-for="auction in this.$store.state.auctionList" :key="auction.auction_Id"
                              id="_rowLi20220203162708CHK2022020394386781"
                              class="goods_pay_item _interlockNo20220211200904406814">
                              <div class="goods_item">
                                <!-- a 태그 -> router 태그 -->
                                  <div class="goods_thumb">
                                      <img :src='`/product_images/${auction.productDTO.product_img_name}.png`'
                                          alt="" width="90" height="90" /></div>
                                  <div class="goods_info">
                                      <div class="goods">
                                          <p class="name">
                                              {{auction.auction_name}}
                                          </p>
                                          <ul class="info">
                                              <li><span class="blind">상품금액</span>{{auction.bid_price}}원</li>
                                              <li class="date"><span class="blind">등록일</span> {{auction.productDTO.p_reg_date}}
                                              </li>
                                          </ul>
                                      </div>
                                      <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault"
                                      v-if="auction.bid_status === 1">
                                          ({{updateDeadlineDate(auction.deadline_date)}} 경매 종료)</p>
                                      <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault"
                                        v-if="auction.bid_status === 0">
                                          최종 낙찰가격 {{auction.a_max_price.toLocaleString()}}원</p>
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
                                      
                                      <!-- <a v-on:click="navigateProduct(auction)" 
                                          class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022020394386781)) _stopDefault">경매 상세</a> -->
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </fieldset>
      <div>
        <button class="more-data" @click="moreProduct()">더보기</button>
      </div>
      <p style="display: none">{{now}}</p>
      <InfiniteLoading :comments="auction" @infinite="moreProduct()"/>
  </div>
</template>


<script>
// import axios from "axios"
import Spinner from '../../components/spinner.vue';
import Like from '../like.vue';
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
// import { ref } from 'vue';


export default{
  components: {
    Like,
    Spinner,
  },
  data() {
      return {     
        spinnerState: false,   
        limit: 0,
        infiniteId: +new Date(),
        now: 0,
      }
  },
  mounted () {
    this.updateNow();
    setInterval(this.updateNow.bind(this) , 1000);
  },
  //데이터베이스 에서 배열로 가져와서
  created() {
    // vue 생성 시 소켓 연결
    this.connect();
  },

  methods: {
    updateNow() {
      this.now = Math.round(Date.now() / 1000);
      // aution들이 가지고 있는 시간 빼기
    },
    updateDeadlineDate(deadline){
      let date = new Date(); // 2022-07-25 00:00:00.0
      console.log('date', date); // 현재시간 밀리초
      console.log('auction', this.auction);
      console.log('deadline', deadline)
      date.setFullYear(Number(deadline.substr(0, 4)))
      date.setMonth(Number(deadline.substr(5, 2))-1)  // 1월~12월 => 0~11
      date.setDate(Number(deadline.substr(8, 2)))
      date.setHours(Number(deadline.substr(11, 2)))
      date.setMinutes(Number(deadline.substr(14, 2)))
      date.setSeconds(Number(deadline.substr(17, 2)))
      
      let remaining_time = Math.round(date.getTime() / 1000) - this.now;
      
      // 남은 시간이 ( - )인 경우 경매 마감 처리
      if (remaining_time < 0) return ''

      let day = Math.floor(remaining_time / (24*60*60));
      let tmp_time = Math.floor(remaining_time % (24*60*60)); 
      let hours =  Math.floor(tmp_time / (60*60));
      let minutes = Math.floor(tmp_time % (60*60) / 60);
      let seconds = Math.floor(tmp_time % (60*60) % 60);
      return `${day}일 ${hours}시간 ${minutes}분 ${seconds}초 후`;
    },
    navigateProduct (auction) {
      // this.$router.push({path:`/user/${auction_id}`, params: { auction_id: 3}});
      this.$router.push({name:'auction_detail', params: { id: auction.auction_Id, auction: JSON.stringify(auction) }});
      
    },
    navigategoback() {
      console.log('!!');
        this.$router.go(-1);
    },
    moreProduct() {
      this.spinnerState = true;
      this.send();
    },
    // 소켓 연결 -> 데이터 가져옴
    send() { // 데이터 불러오는 부분
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send("/receive_limit/"+this.$store.state.config.headers.TOKEN, this.$store.state.limit, {});
      }
    },
    connect() {
      const serverURL = "/socket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      let headers = { TOKEN: this.$store.state.config.headers.TOKEN };
      this.stompClient.connect(
        headers,
        frame => {
          this.connected = true;
          console.log('소켓 연결 성공', frame);

          this.stompClient.subscribe("/send_auction_data/"+this.$store.state.config.headers.TOKEN,  res => {
            this.spinnerState = false;

            const response_data = JSON.parse(res.body);
            console.log("response_data.length: " + response_data.length);
            
            if(response_data.length){
                for (let i = 0; i < response_data.length; i++) {
                  this.$store.commit('PUSH_AUCTION', response_data[i]);
                }
                // 4로 바꿔주기..?
                this.$store.commit('UP_LIMIT', 2);
            }
            
            console.log("2131231limit:" + this.$store.state.limit);
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

<style lang="scss" scoped>
.main_nav_t_div{
  position: relative;
  z-index: 10;
}
.more-data{
  width: 100%;
  height: 55px;
  font-size: 16px;
  font-weight: 700;
  background-color: #FFC1AA;
}
.goods_pay_item{
  position: relative;
  width: 100%;
  .goods_item{
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>