<template>
    <div>
        <Header :headerProps="headerProps"/>
        <!-- 슬라이드 이미지 props로 넘겨주시면 됩니다! -->
        <Slide :imgData="imgData" class="auction-image"/>
        <fieldset class="auction-info">
            <h2 class="profileh2">상세 정보</h2>
            <h2 class="profileh2">{{auction.auction_name}}</h2>
            <h3 class="h3_middle">{{auction.productDTO.p_explanation}}</h3>
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

                        <tr class="" v-if="auction.bid_status === 1">
                            <th>최대 입찰가</th>
                            <td>{{auction.a_max_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="" v-if="auction.bid_status === 1">
                            <th>현재가</th>
                            <td>{{auction.bid_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="" v-if="auction.bid_status === 0">
                            <th>최종 낙찰가</th>
                            <td>{{auction.a_max_price.toLocaleString()}}원</td>
                        </tr>

                        <tr class="">
                            <th>낙과 일자</th>
                            <td>{{auction.productDTO.p_drop_date.slice(0, 19)}}</td>
                        </tr>

                        <tr class="">
                            <th>사이즈</th>
                            <td>{{auction.productDTO.size}}</td>
                        </tr>

                        <tr class="">
                            <th>상태</th>
                            <td>{{auction.productDTO.p_status}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <p class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault">
                                        {{updateDeadlineDate(auction.deadline_date)}} 경매 종료</p>
            </div>
            <div v-if="auction.bid_status === 1">
                <div v-if="this.auction.farm_id == user.farm_id" >
                    <v-btn class="delete-button" block @click="deleteAuction()">삭제하기</v-btn>
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
            </div>
        </fieldset>
        <h2 class="profileh2">생산자 정보</h2>

            <div class="goods_group" @click="$router.push('/auction_detail/farm_intro')">
                <ul class="goods_group_list">
                    <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                        <div class="goods_item">
                            <p class="goods_thumb">
                                <img :src="user.f_profile_img == null || user.f_profile_img == '' ? '/member_profile_images/base_image.png' : `/member_profile_images/${auction.f_profile_img}.png`"
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
import axios from 'axios';
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
        consumerBidDeletedAuctionText: "경매가 삭제되어 입찰 불가합니다.",
        deleteAuctionConsumerExistText: "이미 입찰이 진행된 경매는 삭제 불가합니다!",
        deleteAuctionFourHourText: "현재시간으로부터 마감시간까지 4시간 이내 경매는 삭제 불가합니다!",
        deleteAuctionConfirmText: "해당 경매를 삭제하시겠습니까?",
        deleteAuctionAlertText: "경매가 삭제되었습니다.",
        FOUR_HOUR: 1000 * 60 * 60 * 4,
        imgData: [],
        now: 0,
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
    mounted () {
        this.updateNow();
        setInterval(this.updateNow.bind(this) , 1000);
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
                            if(response_bidding.bid_price == -1){                       // bid_price가 -1인 경우(삭제된 경매) 알림 후 뒤로 보내기
                                alert(this.consumerBidDeletedAuctionText);
                                this.$router.go(-1);
                            }
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
        },
        deleteAuction(){
            if(this.auction.consumer_id) return alert(this.deleteAuctionConsumerExistText);
            if(new Date(this.auction.deadline_date).getTime() < new Date().getTime() + this.FOUR_HOUR) return alert(this.deleteAuctionFourHourText);
            if(!confirm(this.deleteAuctionConfirmText)) return;
            console.log(this.user.token);
            axios.delete(`/api/auction/${this.auction.auction_Id}/${this.auction.product_id}/${this.auction.productDTO.product_img_name}`, {
                headers: {
                    TOKEN: this.user.token
                }
           })
           .then(res => {
                console.log(res);
                alert(this.deleteAuctionAlertText);
                this.$router.go(-1);
            }).catch(err => {    
                console.log(err); 
                // if(res.headers.token != "token"){     
                //     alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }  
            });
        },
        updateNow() {
            this.now = Math.round(Date.now() / 1000);
            // aution들이 가지고 있는 시간 빼기
        },
        updateDeadlineDate(deadline){
            if(this.auction.bid_status === 0) return  '';
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
            if (remaining_time < 0) return '';

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
    },

    
}

</script>


<style lang="scss" scoped>
.auction-image{
    margin-top: 20px;
}
td, th{
    font-weight: 500;
}
.h3_middle{
    font-weight: 600;
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