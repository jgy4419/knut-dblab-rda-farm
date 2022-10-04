<template>
    <div class="search-contain">
        <div class="inner">
            <Header :headerProps="headerProps"/>

            <div class="div_search">
                <input class="input_search" type="text" placeholder="검색어 입력" @keyup.enter="searchAuction(keyword)" v-model="keyword">
                <button class="button_search" @click="searchAuction(keyword)">검색</button>
            </div>
            
            <fieldset class="recentSearchBox">
                <h2 class="profileh2">최근 검색어</h2>
                <div class="main_div-1">
                    
                    <div v-for="(keyword, index) in this.$store.state.keywordList" :key="index" >
                        <span class="btn_file">
                            <label for="inputImage" class=""><b id="btnChangeProfile" class="popularityList" @click="searchAuction(keyword)"><em>{{index + 1}}.</em> {{keyword}}</b></label>
                        </span>
                    </div>
                </div>
            </fieldset>

            <fieldset class="popularityBox">
                <h2 class="profileh2">인기 검색어</h2>
                <div class="main_div-2">
                    <div class="aside_area aside_popular">
                        <h3 class="h_popular"><span></span></h3>
                        <table class="tbl_home">
                            <tbody  v-for="(keyword, index) in this.$store.state.popularKeywordList" :key="index">
                                <tr class="up">
                                    <th class="upRow" scope="row"><em>{{index + 1}}.</em>
                                    <span @click="searchAuction(keyword)">{{keyword}}</span>
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
                            <ul ref="items" class="goods_group_list">
                                <li v-for="(auction, index) in this.$store.state.searchAuctionList" :key="auction.auction_Id"
                                    id="_rowLi20220203162708CHK2022020394386781"
                                    class="goods_pay_item _interlockNo20220211200904406814">
                                    <div @click="navigateProduct(auction.auction_Id, index)" class="goods_item">
                                    <!-- a 태그 -> router 태그 -->
                                        <p class="goods_thumb">
                                            <img :src='`/product_images/${auction.productDTO.product_img_name}.png`'
                                                alt="" width="90" height="90" /></p>
                                        <div class="goods_info">
                                            <div class="goods">
                                                <p class="name">
                                                    {{auction.auction_name}}
                                                </p>
                                                <ul class="info">
                                                    <li><span class="blind">상품금액</span>{{auction.bid_price}}원</li>
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
                                            <span class="tel">0{{auction.f_phonenum.toString().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{1}|^0[0-9]{4})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-")}}</span>
                                            <li class="date"><span class="blind">등록일</span> {{auction.productDTO.p_reg_date}}</li>
                                            <!-- <router-link :to="{ name: 'auction_detail', params: { auction}, }"> auction_detail </router-link> -->
                                            <br><br>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <button class="more-button" @click="searchAuction(this.preKeyword)">더보기</button> -->
            </fieldset>
        </div>
    </div>
    <p style="display: none">{{now}}</p>
    <bottom-nav class="bottom"/> 
</template>

<script>
import axios from "axios";
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import Header from '../../components/Header/bellAndBackHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import _ from 'lodash';

export default {
  components: {  Header, bottomNav},
  name: "search",
  data() {
    return {
        headerProps: 'Search',
        checkUser: 'consumer',
        id: 1,
        preKeyword: '',
        keyword: '',
        startLimit: 0,
        NUMBER_OF_AUCTION: 5,
        user: JSON.parse(localStorage.getItem("user")),
        isMaxLimit: false,
        now: 0,
    }
  },
  created(){
    this.connect()
    this.initPopularKeyword()
  },
  mounted(){
    window.addEventListener('scroll', _.throttle(() => {
        this.infiniteScroll();
        this.height = document.documentElement.scrollHeight;
    }, 500), true);
    this.updateNow();
    console.log(this.updateNow.bind(this));
    setInterval(this.updateNow.bind(this) , 1000);
    console.log('-----updateNow--');
  },
  methods: {
    infiniteScroll(){
        if (this.keyword === '') return;
        console.log(this.$refs.items.scrollTop + innerHeight);
        console.log(this.$refs.items.scrollHeight);
        // console.log(this.preKeyword);
        console.log(this.$route.path);
        if(this.$route.path === '/search'){
            const {innerHeight} = window;
            if(Math.round(this.$refs.items.scrollTop + innerHeight) >= this.$refs.items.scrollHeight){
                console.log('스크롤 실행');
                this.searchAuction(this.preKeyword);
            }
            console.log(innerHeight);
        }else{
            return;
        }
    },
    updateNow() {
        console.log('-------');
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
    searchAuction(keyword) {
        // if(this.isMaxLimit) return alert("더 이상 불러올 경매가 없습니다!");
        if (keyword !== ''){ //검색어를 입력한 경우
            console.log('keyword: ' + keyword);

            if(this.preKeyword != keyword) {
                this.$store.commit('RESET_SEARCH_AUCTION_LIST');
                this.startLimit = 0;
            }
            this.preKeyword = keyword;
            this.$store.commit('PUSH_KEYWORD_LIST', keyword);

            // 검색 데이터 받아오기!
            axios.get(`/api/searchAuction/${this.checkUser}/${this.id}/${keyword}/${this.startLimit}`, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }
                console.log(res.data)
                if(res.data.length){
                    for (let auction of res.data) this.$store.commit('PUSH_SEARCH_AUCTION', auction);
                }
                this.startLimit += this.NUMBER_OF_AUCTION;
            })
            .catch(err => {
                console.log(err);
            });
            // 검색어 초기화
            this.keyword = ''
        } else if(keyword === '' && this.preKeyword === ''){
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
                    this.$store.commit('UPDATE_SEARCH_BID_PRICE', response_bidding);
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
        axios.get('/api/popularKeyword', {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            if(res.headers.token != "token"){
                this.$store.commit('LOGOUT');
                this.$router.push('/login');
            }            
            this.$store.commit('INIT_POPULAR_KEYWORD_LIST', res.data);
        }).catch(err => {
            console.log(err);
            // alert('')
            //     this.$store.commit('LOGOUT');
            //     this.$router.push('/login');
        })
    },
    navigateProduct (auction_Id, index) {

      this.$router.push({name:'auction_detail', params: { id: auction_Id, index: index }});
    }
  }
};
</script>

<style lang="scss" scoped>
.popularityBox{
    min-height: 20vh;
}
.more-button{
    width: 400px;
    height: 50px;
    font-weight: 700;
    background-color: #FFC1AA;
}
.search-contain{
    height: 80vh;
}
.goods_pay_item{
    border: 0;
    position: relative;
    width: 100%;
    height: 120px;
    .goods_item{
        left: 0;
        width: 100%;
        height: 100%;
        .goods_info{
            .goods{
                height: 50px;
            .info{
                height: 50px;
                    li{
                        border: 0;
                    }
                }
            }
        }
    }
    .seller_item{
    height: 100px;
    .inner{
        height: 50px;
            .date{
                border: 0;
                margin-bottom: 10px;
                font-size: 10px;
                color: lightgrey;
                font-weight: 700;
            }
        }
    }
}
.goods_group_list{
    position: relative;
    height: 300px;
    overflow-y: scroll;
}
.bottom{
    position: fixed;
    // position: absolute;
    bottom: 0;
}
@media screen and (max-width: 500px){
    .more-button{
        width: 100%;
    }
}
</style>