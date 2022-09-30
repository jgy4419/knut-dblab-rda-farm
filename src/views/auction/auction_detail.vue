<template>
    <div>
        <Header :headerProps="headerProps"/>
        <!-- 슬라이드 이미지 props로 넘겨주시면 됩니다! -->
        <Slide :imgData="imgData"/>
        <fieldset class="auction-info">
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
                            <th>시작가</th>
                            <td>{{auction.a_starting_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="">
                            <th>최대 입찰가</th>
                            <td>{{auction.a_max_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="">
                            <th>현재가</th>
                            <td>{{auction.bid_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="">
                            <th>낙과 일자</th>
                            <td>{{auction.productDTO.p_drop_date.slice(0, 19)}}</td>
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
            <div v-if="this.auction.farm_id == user.farm_id" >
                <v-btn class="delete-button" block @click="bid()">삭제하기</v-btn>
                <!-- /auction_reg/:id -->
                <v-btn class="edit-button" block @click="$router.push({name: `auction_reg_patch`, params: { id: this.auction.auction_Id} })">
                    수정하기
                </v-btn>
            </div>
            <div v-if=" user.consumer_id != undefined">
                <input type="number" placeholder="입찰할 가격을 입력(숫자만)해주세요!" id="bid_price" v-model="bid_price"/>
                <!-- <v-text-field placeholder="입찰할 가격을 입력해주세요!" type="number" id="bid_price" v-model="bid_price"></v-text-field> -->
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
                                <img :src='`/member_profile_images/${auction.f_profile_img}.png`'
                                    alt="" width="90" height="90" /></p>
                                <!-- <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90" height="90"> -->
                            <div class="goods_info">

                                <p class="guide2">
                                    농가명 : {{auction.f_farm_name}}
                                </p>
                                <p class="guide2">
                                    대표자 : {{auction.f_name}}
                                </p>
                                <p class="guide2">
                                    연락처 : {{auction.f_phonenum}}
                                </p>
                                <p class="guide2">
                                    농가 주소 : {{auction.f_location}}
                                </p>
                                
                            </div>
                        </div>
                    </li>                
                </ul>
            </div>
        <form action="farm_intro" class="login-form">
            <router-link :to="`/auction_detail/farm_intro/${auction.farm_id}`"><input class="login-form__btn" type="submit" value="농가 상세 소개"></router-link>
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
        user: JSON.parse(localStorage.getItem("user")),
        headerProps: '경매 상세',
        auction: null,
        bid_price: null,
        consumer_id: null,
        testConsumerId: 12,
        userState: false,
        likeState: 0,
        isMaxPrice: 0,
        bidAlertText: "입찰하시겠습니까?",
        imgData: [],
    }),
    created() {
        this.connect()
        console.log('arr', this.$route.params.auction);
        
        if(this.$route.params.auction == undefined) {
            this.auction = JSON.parse(localStorage.getItem('auction'));
            // undefined가 아니면 
        } else {
            this.auction = JSON.parse(this.$route.params.auction);
            localStorage.setItem('auction', JSON.stringify(this.auction));
        }
        
        console.log('경매 정보', this.auction);
        // 해당 경매 관련 이미지 여러 개 넣기
        let auctionImagesLength = this.auction.productDTO.product_img_name[this.auction.productDTO.product_img_name.length-1];
        console.log('img', auctionImagesLength)
        for(let i = 0; i < auctionImagesLength; i++){
            this.imgData.push(this.auction.productDTO.product_img_name.replace('(0)', `(${i})`))
        }
        console.log('pushImg', this.imgData);
    },
    methods: {
        likeStateFunc(){
            this.likeState === 0 ? this.likeState = 1 : this.likeState = 0;
        },
        bid(){
            console.log('datas', this.auction.consumer_id);
            // console.log('user', JSON.parse(localStorage.getItem('user').consumer_id));
            console.log(this.bid_price, this.auction.a_max_price);

            console.log("auction.auction_Id:" + this.auction.auction_Id);
            console.log("auction.consumer_id:" + this.auction.consumer_id);
            console.log("auction.a_starting_price: " + this.auction.a_starting_price);
            console.log("bid_price:" + this.bid_price);
            console.log("auction.bid_price: " + this.auction.bid_price);
            console.log("this.user.consumer_id: " + this.user.consumer_id);
            console.log("farm_id: " + this.auction.farm_id);
            console.log(this.stompClient);
            console.log(this.stompClient.connected);

            // 이미 경매에 참여한 사람들 알아내기
            if(this.auction.consumer_id == this.user.consumer_id){
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
                if(confirm(this.bidAlertText)){
                    this.stompClient.send("/receive_bidding", JSON.stringify(
                    {
                        auction_Id: this.auction.auction_Id, 
                        bid_price: this.bid_price, 
                        farm_id: this.auction.farm_id,
                        auction_consumer_id: this.auction.consumer_id,
                        consumer_id: this.user.consumer_id, 
                        auction_name: this.auction.auction_name, 
                        isMaxPrice: this.isMaxPrice, 
                        product_img_name: this.auction.productDTO.product_img_name,
                        f_farm_name: this.auction.f_farm_name,
                        c_name: this.user.c_name,
                        // product_img_name, farm_name, c_name 추가하기
                        }), {});
                    this.auction.comsumer_id = JSON.parse(localStorage.getItem('user')).consumer_id
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
            console.log(this.user);
            let headers = { TOKEN: this.user.token};
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
                        if(this.auction.auction_Id == response_bidding.auction_Id){
                            this.auction.consumer_id = response_bidding.consumer_id;
                            this.auction.c_name = response_bidding.c_name;
                            this.auction.bid_price = response_bidding.bid_price;
                        }
                        
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
td, th{
    font-weight: 500;
}
.auction-info{
    padding: 10px;
}
.delete-button, .edit-button{
    width: 20vw;
    background-color: rgb(255, 176, 176);
    color: #fff;
    margin-top: 10px;
}
.edit-button{
    background-color: #FFC1AA;
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
#bid_price{
    padding: 10px;
    height: 50px;
    width: 100%;
}
</style>