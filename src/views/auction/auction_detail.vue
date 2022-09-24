<template>
    <div>
        <Header :headerProps="headerProps"/>
        <!-- 슬라이드 이미지 props로 넘겨주시면 됩니다! -->
        <Slide :imgData="imgData"/>
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
                        <!-- <tr class="">
                            <th>consumer_id : {{testConsumerId}}</th>
                        </tr> -->
                        <tr class="">
                            <th>시작가</th>
                            <td>{{auction.a_starting_price}}원</td>
                        </tr>

                        <tr class="">
                            <th>최대 입찰가</th>
                            <td>{{auction.a_max_price}}원</td>
                        </tr>

                        <tr class="">
                            <th>현재가</th>
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
                <v-btn class="delete-button" v-if="userState === true" block @click="bid()">삭제하기</v-btn>
                <!-- /auction_reg/:id -->
                <v-btn class="delete-button" v-if="userState === true" block @click="$router.push(`/auction_reg/${auction}`)">
                    수정하기
                </v-btn>
                <v-text-field type="number" id=bid_price v-model="bid_price"></v-text-field>
                <div class="stateBtn">
                    <Like class="like-button" :key="likeState" @click="likeStateFunc()"/>
                    <v-btn class="bid-button" block @click="bid()">입찰하기</v-btn>
                </div>
            </div>
        </fieldset>

        <h3 class="h3_middle">{{auction.productDTO.p_explanation}}</h3>
        <h2 class="profileh2">생산자 정보</h2>

            <div class="goods_group" @click="$router.push('/auction_detail/farm_intro')">
                <ul class="goods_group_list">
                    <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                        <div class="goods_item">
                            <p class="goods_thumb">
                                <img :src='`/product_images/${farmInformation.productDTO.product_img_name}.png`'
                                    alt="" width="90" height="90" /></p>
                                <!-- <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90" height="90"> -->
                            <div class="goods_info">

                                <p class="guide2">
                                    농가명 : {{farmInformation.f_farm_name}}
                                </p>
                                <p class="guide2">
                                    대표자 : {{farmInformation.f_name}}
                                </p>
                                <p class="guide2">
                                    사업자 등록번호 : {{farmInformation.f_num}}
                                </p>
                                <p class="guide2">
                                    농가 주소 : {{farmInformation.f_location}}
                                </p>
                                <p class="guide2">
                                    연락처 : {{farmInformation.f_phonenum}}
                                </p>
                            </div>
                        </div>
                        <div class="seller_item">
                            <div class="inner">

                                <span class="seller">{{farmInformation.f_farm_name}}</span>
                                <span class="tel">{{farmInformation.f_phonenum}}</span>
                                <p
                                    class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022021381488661)) _stopDefault">
                                    문의하기
                                </p>
                            </div>
                        </div>
                    </li>                
                </ul>
            </div>
        <form action="farm_intro" class="login-form">
            <router-link :to="`/auction_detail/farm_intro/${farmInformation.farm_id}`"><input class="login-form__btn" type="submit" value="농가 상세 소개"></router-link>
        </form>
    </div>
</template>



<script>
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import Header from '../../components/Header/backHeader.vue';
import Like from '../../components/like.vue';
import Slide from '../../components/slide.vue';
// import bottomNav from '@/components/bottomNav.vue';
// import { ref } from 'vue';

export default {
    name: 'App',
    components: { Header, Slide, Like },

    data: () => ({
        headerProps: '경매 상세',
        auction: null,
        bid_price: null,
        consumer_id: null,
        user: JSON.parse(localStorage.getItem("user")),
        testConsumerId: 12,
        userState: false,
        likeState: 0,
        isMaxPrice: 0,
        bidAlertText: "입찰하시겠습니까?",
        imgData: [],
        farmInformation: {},
    }),
    mounted(){
        this.$store.state.login.userInfo.farm_id === this.auction.farm_id || this.$store.state.login.userInfo.farm_id
        ? this.userState = true 
        : this.userState = false;
    },
    created() {
        this.connect()
        this.farmInformation = JSON.parse(this.$route.params.auction);
        console.log('생산자 정보', this.farmInformation);
        this.auction = JSON.parse(this.$route.params.auction)
        this.imgData.push(this.auction.productDTO.product_img_name);
        console.log('pushImg', this.imgData);
    },
    methods: {
        likeStateFunc(){
            this.likeState === 0 ? this.likeState = 1 : this.likeState = 0;
        },
        bid(){
            console.log('datas', this.auction.consumer_id);
            console.log('user', this.$store.state.login.userInfo.consumer_id);
            console.log(this.bid_price, this.auction.a_max_price);

            console.log("auction.auction_Id:" + this.auction.auction_Id);
            console.log("auction.a_starting_price: " + this.auction.a_starting_price);
            console.log("bid_price:" + this.bid_price);
            console.log("auction.bid_price: " + this.auction.bid_price);
            console.log("this.user.consumer_id: " + this.user.consumer_id);
            console.log(this.stompClient);
            console.log(this.stompClient.connected);

            // 이미 경매에 참여한 사람들 알아내기
            if(this.auction.comsumer_id == this.$store.state.login.userInfo.consumer_id){
                alert('이미 경매에 참여하셨습니다!');
                return;
            }
            if(this.bid_price > this.auction.a_max_price){
                alert('최대 입찰가를 초과했습니다!');
                return;
            }
            if(this.bid_price == this.auction.a_max_price){
                this.isMaxPrice = 1;
                this.bidAlertText = "최고 입찰가로 " + this.bidAlertText;
            }

            if (this.bid_price > this.auction.bid_price && this.stompClient && this.stompClient.connected){
                if(confirm(this.bidAlertText) == true){
                    this.stompClient.send("/receive_bidding", JSON.stringify(
                    {
                        auction_Id: this.auction.auction_Id, 
                        bid_price: this.bid_price, 
                        farm_id: this.auction.farm_id,
                        auction_consumer_id: this.auction.consumer_id,
                        consumer_id: this.user.consumer_id, 
                        auction_name: this.auction.auction_name, 
                        isMaxPrice: this.isMaxPrice }), {});
                    this.auction.comsumer_id = this.$store.state.login.userInfo.consumer_id
                }
            } else {
                alert("현재 경매가보다 낮습니다!!")
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


<style lang="scss" scoped>
.delete-button{
    width: 20vw;
    background-color: rgb(255, 176, 176);
    color: #fff;
}
.stateBtn{
    display: flex;
    justify-content: space-around;
}
.like-button{
    margin-top: 3px;
}
.bid-button{
    width: 100px;
}
</style>