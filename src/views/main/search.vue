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
                            <ul class="goods_group_list">
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
                                                    <li class="date"><span class="blind">등록일</span> {{auction.productDTO.p_reg_date}}
                                                    </li>
                                                </ul>
                                            </div>
                                            <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault">{{auction.bid_status}}
                                                ({{auction.deadline_date}} 경매 종료)</p>
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
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button class="more-button" @click="searchAuction(this.preKeyword)">더보기</button>
            </fieldset>
        </div>
    <bottom-nav/>
    </div>
</template>

<script>
import axios from "axios";
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import Header from '../../components/Header/bellAndBackHeader.vue';
import bottomNav from '../../components/bottomNav.vue';

export default {
  components: { bottomNav, Header },
  name: "search",
  data() {
    return {
        headerProps: 'Search',
        checkUser: 'consumer',
        id: 1,
        preKeyword: '',
        keyword: '',
        startLimit: 0,
        NUMBER_OF_AUCTION: 4,
        user: JSON.parse(localStorage.getItem("user")),
    }
  },
  created(){
    this.connect()
    this.initPopularKeyword()
  },
  methods: {
    searchAuction(keyword) {
        if (keyword !== ''){                        //검색어를 입력한 경우
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

                console.log(res.data)
                if(res.data.length){
                    for (let auction of res.data) this.$store.commit('PUSH_SEARCH_AUCTION', auction);
                }
                this.startLimit += this.NUMBER_OF_AUCTION;
            })
            .catch(err => {
                console.log(err);      
                alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                this.$store.commit('LOGOUT');
                this.$router.push('/login');
            });

            // 검색어 초기화
            this.keyword = ''
        } else if(keyword === ''){
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
        
            this.$store.commit('INIT_POPULAR_KEYWORD_LIST', res.data);
        }).catch(err => {
            console.log(err);      
            alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
            this.$store.commit('LOGOUT');
            this.$router.push('/login');
        })
    },
    navigateProduct (auction_Id, index) {

      this.$router.push({name:'auction_detail', params: { id: auction_Id, index: index }});
    }
  }
};
</script>

<style lang="scss" scoped>
.inner{
    height: 93vh;
}
.more-button{
    width: 100%;
    height: 50px;
    font-weight: 700;
    background-color: #FFC1AA;
}
</style>