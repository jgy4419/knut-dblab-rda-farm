<template>
<div>
    <div class="main_nav_t_div">
        <nav class="main_t_nav">
            <ul class="main_t_nav_list">
                <li class="nav__btn">
                    <a class="nav__link" href="alert"><i class="fas fa-bell fa-2x" aria-hidden="true"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <a class="nav__link" href="main"><i class="fas fa-running fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link" href="auction"><i class="fas fa-plus fa-2x" aria-hidden="true"></i>
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
        <h2 class="profileh2">상세 정보</h2>
        <h2 class="profileh2">{{auction.auction_name}}</h2>
        <div class="aside_area aside_popular">
            <h3 class="h_popular"></h3>
            <table class="tbl_home">
                <tbody>
                    <tr class="">
                        <th>{{auction.productDTO.product}}</th>
                        <td>{{auction.productDTO.product_kg}}kg</td>
                    </tr>

                    <tr class="">
                        <th>시작 가격</th>
                        <td>{{auction.a_starting_price}}원</td>
                    </tr>

                    <tr class="">
                        <th>현재 가격</th>
                        <td>{{auction.bid_price}}원</td>
                    </tr>

                    <tr class="">
                        <th>낙과 일자</th>
                        <td>{{auction.productDTO.p_drop_date}}</td>
                    </tr>

                    <tr class="">
                        <th>사이즈</th>
                        <td>{{auction.productDTO.size}} </td>
                    </tr>

                    <tr class="">
                        <th>상태</th>
                        <td>{{auction.productDTO.p_status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <v-text-field type="number" id=bid_price v-model="bid_price"></v-text-field>
            <v-btn block @click="bid()">입찰하기</v-btn>
        </div>
    </fieldset>

    <h3 class="h3_middle">{{auction.productDTO.p_explanation}}</h3>
    <h2 class="profileh2">생산자 정보</h2>

        <div class="goods_group">
            <ul class="goods_group_list">
                <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                    <div class="goods_item">
                        <a href="/orderStatus/2022021339733581" class="goods_thumb">
                            <img :src='`/product_images/${auction.productDTO.product_img_name}.png`'
                                        alt="" width="90" height="90" /></a>
                            <!-- <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90" height="90"> -->
                        <div class="goods_info">

                            <p class="guide2">
                                농가명 : {{auction.f_farm_name}}
                            </p>
                            <p class="guide2">
                                대표자 : {{auction.f_name}}
                            </p>
                            <p class="guide2">
                                사업자 등록번호 : {{auction.f_num}}
                            </p>
                            <p class="guide2">
                                농가 주소 : {{auction.f_location}}
                            </p>
                            <p class="guide2">
                                연락처 : {{auction.f_phonenum}}
                            </p>
                        </div>
                    </div>
                    <div class="seller_item">
                        <div class="inner">

                            <span class="seller">{{auction.f_farm_name}}</span>
                            <span class="tel">{{auction.f_phonenum}}</span>
                            <a href="#"
                                class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022021381488661)) _stopDefault">문의하기</a>
                        </div>
                    </div>
                </li>                
            </ul>
        </div>
    <form action="farm_intro" class="login-form">
        <input class="login-form__btn" type="submit" value="농가 상세 소개">
    </form>
    <bottom-nav></bottom-nav>
</div>
</template>



<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import bottomNav from '@/components/bottomNav.vue';
// import { ref } from 'vue';

export default {
    name: 'App',
    components: { bottomNav },

    data: () => ({
        items: [
          {
            src: 'https://images.mypetlife.co.kr/content/uploads/2018/06/09160331/strawberries-red-fruit-royalty-free-70746-1024x768.jpeg',
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
        auction: null,
        bid_price: null,
        consumer_id: null,
        user: JSON.parse(localStorage.getItem("user"))
    }),
    created() {
        this.connect()

        console.log(this.$route.params.auction);
        this.auction = JSON.parse(this.$route.params.auction)
        console.log(this.auction); 
    },
    methods: {
        bid(){
            console.log("auction.auction_Id:" + this.auction.auction_Id);
            console.log("auction.a_starting_price: " + this.auction.a_starting_price);
            console.log("bid_price:" + this.bid_price);
            console.log("auction.bid_price: " + this.auction.bid_price);
            console.log("this.user.consumer_id: " + this.user.consumer_id);
            console.log(this.stompClient);
            console.log(this.stompClient.connected);

            if (this.bid_price < this.auction.a_starting_price) {
                alert("시작가격보다 낮습니다!!")
                return
            }

            if (this.bid_price > this.auction.bid_price && this.stompClient && this.stompClient.connected){
                this.stompClient.send("/receive_bidding", JSON.stringify({auction_Id: this.auction.auction_Id, 
                                                                        bid_price: this.bid_price, 
                                                                        consumer_id: this.user.consumer_id, 
                                                                        auction_name: this.auction.auction_name}), {});
            } else {
                alert("현재 경매가격보다 낮습니다!!")
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

                this.stompClient.subscribe("/send_bidding",  res => {

                    const response_bidding = JSON.parse(res.body);
                    console.log(response_bidding);
                    if (response_bidding.auction_Id != undefined) {
                        this.$store.commit('UPDATE_BID_PRICE', response_bidding);
                        
                        this.auction.bid_price = response_bidding.bid_price
                    }
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