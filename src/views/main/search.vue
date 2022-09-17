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
                    <a class="nav__link" href="/#"><i class="fas fa-running fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link" href="regester_auction"><i class="fas fa-plus fa-2x" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <div class="div_search">
        <input class="input_search" type="text" placeholder="검색어 입력" @keyup.enter="searchAuction(keyword)" v-model="keyword">
        <button class="button_search" @click="searchAuction(keyword)" >검색</button>
    </div>
    
    <fieldset>
        <h2 class="profileh2">최근 검색어</h2>
        <div class="main_div-1">
            
            <div v-for="(keyword, index) in this.$store.state.keywordList" :key="index" >
                <span class="btn_file">
                    <label for="inputImage" class=""><b id="btnChangeProfile" class="btn2" @click="searchAuction(keyword)">{{keyword}}</b></label>
                </span>
            </div>
        </div>
    </fieldset>

    <fieldset>
        <h2 class="profileh2">인기 검색어</h2>
        <div class="main_div-2">
        <div class="aside_area aside_popular">
            <h3 class="h_popular"><span></span></h3>
            <table class="tbl_home">
                <tbody  v-for="(keyword, index) in this.$store.state.popularKeywordList" :key="index">
                    <tr class="up">
                        <th scope="row"><em>{{index+1}}</em><a href="/item/code=005930"
                                onclick="">{{keyword}}</a>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </fieldset>

    <fieldset>
        <div class="white_div">
            <div class="goods_pay_section ">
                <div class="goods_group">
                    <ul class="goods_group_list">
                        <li v-for="(auction, index) in this.$store.state.auctionList" :key="auction.auction_Id"
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
                                    
                                    <a v-on:click="navigateProduct(auction.auction_Id, index)" 
                                        class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022020394386781)) _stopDefault">경매 상세</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </fieldset>
<bottom-nav/>
</div>
</template>

<script>
import axios from "axios"
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import bottomNav from '../../components/bottomNav.vue';

export default {
  components: { bottomNav },
  name: "search",
  data() {
    return {
        checkUser: 'consumer',
        id: 1,
        keyword: '',
    }
  },
  created(){
    this.connect()
    this.initPopularKeyword()
  },
  methods: {
    searchAuction(keyword) {
      if (keyword !== ''){ //검색어를 입력한 경우
        console.log('keyword: ' + keyword);
        this.$store.commit('PUSH_KEYWORD_LIST', keyword);
        
        // 검색 데이터 받아오기!
        axios.get(`/api/searchAuction/${this.checkUser}/${this.id}/${keyword}`)
        .then(res => {
            this.$store.commit('INIT_AUCTION_LIST', res.data);
        })
        .catch(err => {
            console.log(err);
        });

        // 검색어 초기화
        this.keyword = ''
      } else {
        alert('검색어를 입력해주세요!')  //검색어를 입력하지 않은 경우
      }
    },
    connect() {
        const serverURL = "/socket"
        let socket = new SockJS(serverURL);
        this.stompClient = Stomp.over(socket);
        let headers = { TOKEN: this.$store.state.config.headers.TOKEN };

        this.stompClient.connect(
        headers,
        frame => {
            this.connected = true;
            console.log('소켓 연결 성공', frame);

            this.stompClient.subscribe("/send_bidding",  res => {

                const response_bidding = JSON.parse(res.body);

                if (response_bidding.auction_Id != undefined)
                    this.$store.commit('UPDATE_BID_PRICE', response_bidding);
            });
        },
        error => {
            // 소켓 연결 실패
            console.log('소켓 연결 실패', error);
            this.connected = false;
        });        
    },
    initPopularKeyword(){

        // 검색 데이터 받아오기!
        axios.get('/api/popularKeyword')
        .then(res => {
            this.$store.commit('INIT_POPULAR_KEYWORD_LIST', res.data);
        })
        .catch(err => {
            console.log(err);
        });
    },
    navigateProduct (auction_Id, index) {

      this.$router.push({name:'auction_detail', params: { id: auction_Id, index: index }});
    },
  }
};

</script>
<style>
</style>