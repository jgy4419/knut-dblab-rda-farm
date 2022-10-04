<template>
  <div class="auctionList-contain">
    <Spinner v-if="spinnerState === true"/>
      <fieldset>
          <div class="white_div">
              <div class="goods_pay_section ">
                  <div class="goods_groups">
                      <ul ref="items" class="goods_group_list">
                          <li v-on:click="navigateAuction(auction)"  v-for="auction, i in this.$store.state.auctionList" :key="i"
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
                                            <li><span class="blind">상품금액</span>{{auction.bid_price.toLocaleString()}}원</li>
                                        </ul>
                                    </div>
                                    <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault"
                                    v-if="auction.bid_status === 1">
                                        {{updateDeadlineDate(auction.deadline_date)}} 경매 종료</p>
                                    <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault"
                                      v-if="auction.bid_status === 0">
                                        최종 낙찰가 {{auction.a_max_price.toLocaleString()}}원</p>
                                    <p class="guide">
                                        {{auction.productDTO.p_explanation}}
                                    </p>
                                </div>
                              </div>
                              <div class="seller_item">
                                  <div class="inner">
                                      <span class="seller">{{auction.f_farm_name}}</span>
                                      <span class="tel">Tel : 0{{auction.f_phonenum.toString().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{1}|^0[0-9]{4})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-")}}</span>
                                      <span class="date">{{auction.productDTO.p_reg_date}}</span>
                                      <br/>
                                      <b v-if="auction.isMyConsumerAuction" class="bid-price">입찰했습니다.</b>
                                      <!-- <b v-if="bidPrice[i] === 1" class="bid-price">입찰했습니다.</b> -->
                                      <br><br>
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </fieldset>
      <!-- <div>
        <button class="more-data" @click="moreProduct()">더보기</button>
      </div> -->
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
import _ from 'lodash';

export default{
  components: {
    Like,
    Spinner,
  },
  data() {
      return {     
        user: JSON.parse(localStorage.getItem('user')),
        spinnerState: false,   
        limit: 0,
        // infiniteId: +new Date(),
        now: 0,
        bidPrice: [],
      }
  },
  mounted () {
    console.log(this.bidPrice);
    window.addEventListener('scroll', _.throttle(() => {
        this.infiniteScroll();
    }, 500), true);
    this.updateNow();
    setInterval(this.updateNow.bind(this) , 1000);
  },
  //데이터베이스 에서 배열로 가져와서
  created() {
    // vue 생성 시 소켓 연결
    this.connect();
  },
  methods: {
    infiniteScroll(){
        console.log(this.$route.path);
        if(this.$route.path === '/auction'){
          const {innerHeight} = window;
          if(Math.round(this.$refs.items.scrollTop + window.innerHeight) >= this.$refs.items.scrollHeight){
              console.log('스크롤 실행');
              this.moreProduct();
          }
        }
        console.log(innerHeight);
    },
    updateNow() {
      this.now = Math.round(Date.now() / 1000);
      // aution들이 가지고 있는 시간 빼기
    },
    updateDeadlineDate(deadline){
      let date = new Date(); // 2022-07-25 00:00:00.0
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
      let remainingTime = '';

      if(day != 0) remainingTime += day + '일 ';
      if(hours != 0) remainingTime += hours + '시간 ';
      if(minutes != 0) remainingTime += minutes + '분 ';
      if(seconds != 0) remainingTime += seconds + '초 후';
      return remainingTime;
    },
    navigateAuction(auction) {
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
                  if(this.$store.state.auctionList[i].consumer_id === this.user.consumer_id){
                    this.$store.state.auctionList[i].isMyConsumerAuction = true;
                    this.bidPrice.push(1);
                  }else{
                    this.bidPrice.push(0);
                  }
                }
                console.log(this.bidPrice)
                this.$store.commit('UP_LIMIT', 4);
            }
          });
          this.moreProduct();
          this.stompClient.subscribe("/send_bidding",  res => {
            const response_bidding = JSON.parse(res.body);
            console.log(response_bidding);
            if (response_bidding != undefined) {
              this.$store.commit('UPDATE_BID_PRICE', response_bidding, this.user.consumer_id == response_bidding.consumer_id);
              // for (let i = 0; i < this.$store.state.auctionList.length; i++) {
              //   if(this.$store.state.auctionList[i].auction_Id === this.response_bidding.auction_Id){
              //     this.bidPrice[i] = 0;
              //     break;
              //   }
              // }
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
.auctionList-contain{
  position: relative;
  // height: 80vh;
}
.goods_groups{
  .goods_group_list{
    position: relative;
    height: 45vh;
    overflow-y: scroll;
  }
  @media screen and (min-height: 850px){
    .goods_group_list{
      height: 70vh;
    }
  }
}

.date, .bid-price{
  font-size: 12px;
  color: rgb(183, 183, 183);
}
.bid-price{
  color: rgb(137, 133, 133);
}
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
  height: 120px;
  .goods_item{
    left: 0;
    width: 100%;
    height: 100%;
    .goods_info{
      .goods{
        .info{
          height: 20px;
          .blind{
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 700;
          }
        }
      }
    }
  }
  .seller_item{
    height: 100px;
    .inner{
      height: 100px;
      .tel{
        width: 100px;
      }
    }
  }
}
.state{
  font-size: 10px;
}
@media screen and (max-width: 500px){
  .goods_groups{
    // .goods_group_list{
    //   height: 280px;
    // }
  }
}
</style>