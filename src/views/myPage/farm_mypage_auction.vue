<template>
    <div>
        <!--  -->
        <Header :headerProps="headerProps"/>
        <div class="contain" ref="items">
            <p :style="[getData.length === 0 ? {display: 'block'} : {display: 'none'}]" class="not-auction-title">경매 내역이 없습니다.</p>
            <div class="item" v-for="data, i in getData.length" :key="i">
                <img :src='`/product_images/${getData[i].product_img_name}.png`'
                alt="" width="90" height="90" v-on:click="navigateAuction(getData[i].auction_Id)"/>
                <div class="content">
                    <div v-on:click="navigateAuction(getData[i].auction_Id)">
                        <p class="name">{{getData[i].auction_name}}({{getData[i].p_status}})</p>
                        <div class="auction">
                            <p class="final-bid">현재경매 : {{getData[i].bid_price.toLocaleString()}}원</p>
                            <p class="current-auction">최종낙찰: {{getData[i].a_max_price.toLocaleString()}}원</p>
                        </div>
                    </div>
                    <div class="auctionBtns">
                        <button  v-if="getData[i].bid_status" class="auctionBtn-ing">경매중</button>                        
                        <button  v-if="!getData[i].bid_status" class="auctionBtn">경매종료</button>
                        <button v-if="!getData[i].bid_status && !getData[i].payment_status && checkUser === 'consumer'" class="auctionBtn" v-on:click="navigateAuctionPayment(getData[i])">결제하기</button>
                        <button v-if="!getData[i].bid_status && !getData[i].payment_status && checkUser === 'farm'" class="auctionBtn">결제 대기</button>
                        <button v-if="getData[i].payment_status" class="auctionBtn" v-on:click="navigateAuctionPaymentHistory(getData[i].auction_Id)">결제 내역</button>
                        <button v-if="writeUrlState[i] === 0" class="reviewBtn-end">작성완료</button>
                        <router-link v-if="getData[i].bid_status === false" :to="`/farm_mypage_auction/writeReview/${getData[i].auction_Id}`">
                        <!-- <router-link v-if="getData[i].bid_status === false" :to="`#`"> -->
                            <button @click="setReviewData(i)" v-if="writeUrlState[i] === 1 && checkUser === 'consumer'" class="reviewBtn">후기작성</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <button class="user-component__title">등록하기</button>
                    </li>
                </ul>
            </nav>
        </div> -->

    </div>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header/backHeader.vue';
import _ from 'lodash';

export default {
    components: {
        Header
    },
    data(){
        return{
            headerProps: '경매 내역',
            // buttonState: 1,
            reviewState: 1,
            getData: [],
            auctionState: true,
            user: JSON.parse(localStorage.getItem("user")),
            checkUser: localStorage.getItem('checkUser'),
            writeUrlState: [],
            startLimit: 0,
        }
    },
    async mounted(){
        window.addEventListener('scroll', _.throttle(() => {
            this.infiniteScroll();
        }, 500), true);
        // if(this.checkUser === 'consumer'){
        //     this.buttonState = 0;
        // }
        // console.log(this.$store.state.login.userInfo.consumer_id);
        console.log(this.$store.state.user.checkUser);
        console.log(this.$store.state.user.id);
        await this.getDatas();
    },
    methods: {
        getDatas(){
            axios.get(`/api/mypageAuctionDetails/${localStorage.getItem('checkUser')}/${localStorage.getItem('id')}/${this.startLimit}`, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                console.log(res.data);
                this.getData.push(res.data);
                this.getData = this.getData.flat();
                for(let i = 0; i < this.getData.length; i++){
                    console.log(this.getData[i].consumer_review);
                    if(this.getData[i].consumer_review){
                        this.writeUrlState.push(0);
                    }else{
                        this.writeUrlState.push(1);
                    }
                }
                this.startLimit += 5
                console.log(this.writeUrlState);
            }).catch(err => {
                console.log(err); 
                // if(res.headers.token != "token"){     
                // 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                // 	this.$store.commit('LOGOUT');
                // 	this.$router.push('/login');
                // }
            });
        },
        infiniteScroll(){
            // console.log(this.$refs.items.scrollTop + innerHeight);
            // console.log(this.$refs.items.scrollHeight);
            // console.log(this.$route.path);
            if(this.$route.path === '/farm_mypage_auction'){
                const {innerHeight} = window;
                if(Math.round(this.$refs.items.scrollTop + window.innerHeight) >= this.$refs.items.scrollHeight){
                    console.log('스크롤 실행');
                    this.getDatas();
                }
            }else{
                return;
            }
            console.log(innerHeight);
        },      
        setReviewData(index){
            console.log(this.getData[index]);
            this.$store.commit('GET_REVIEW_DATA', this.getData[index]);
        },
        navigateAuction(auction_Id) {
            axios.get(`/api/auctionInfo/${auction_Id}`, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                console.log(res.data);
                this.$router.push({name:'auction_detail', params: { id: auction_Id, auction: JSON.stringify(res.data) }});
            }).catch(err => {
                console.log(err); 
                // if(res.headers.token != "token"){     
                // 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                // 	this.$store.commit('LOGOUT');
                // 	this.$router.push('/login');
                // }
            });
        },
        navigateAuctionPayment(auction) {
            this.$router.push({name:'farm_calculate', params: { id: auction.auction_Id, auction: JSON.stringify(auction) }});
        },
        navigateAuctionPaymentHistory(auction_Id){
            // router로 페이지 이동 전에 order 값 가져오기
            axios.get(`/api/order/${auction_Id}`, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                console.log(res.data);
                this.$router.push({name:'auction_detail', params: { id: auction_Id, auction: JSON.stringify(res.data) }});
            }).catch(err => {
                console.log(err); 
                // if(res.headers.token != "token"){     
                // 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                // 	this.$store.commit('LOGOUT');
                // 	this.$router.push('/login');
                // }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin text-basic(){
    margin-left: 10px;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 700;
}
.user-component__title{
    width: 95%;
    height: 50px;
    margin: auto;
    border-radius: 20px;
    margin-left: 10px;
    background-color: #FFC1AA;
}
.contain{
    // margin-top: -50px; // 임시로 넣은 ui
    position: relative;
    // background-color: rgb(245, 245, 245);
    width: 100%;
    height: 90vh;
    overflow-y: scroll;
    .not-auction-title{
        font-size: 20px;
        margin-top: 50%;
        font-weight: 700;
        text-align: center;
    }
    .item{
        width: 100%;
        height: 160px;
        margin-top: 10px;
        background-color: #fff;
        display: flex;
        align-items: center;
        img{
            width: 70px;
            margin-left: 20px;
        }
        .content{
            .name{
                @include text-basic();
            }
            .auction{
                display: flex;
                .final-bid, .current-auction{
                    @include text-basic();
                }
            }
            .auctionBtns{
                display: flex;
                justify-content: space-between;
                .auctionBtn, .reviewBtn, .auctionBtn-ing, .reviewBtn-end{
                    width: 80px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid rgb(187, 187, 187);
                    @include text-basic();
                }
                .reviewBtn-end{
                    background-color: lightgrey;
                    color: #fff;
                }
                .auctionBtn-ing{
                    background-color: #f5dad1;
                }
                .auctionBtn:nth-child(1){
                    background-color: rgb(237, 103, 103);
                    color: #fff;
                }
                .auctionBtn:nth-child(2){
                    background-color: #FFC1AA;
                }
            }
        }
    }
}
</style>