<template>
    <div>
        <!--  -->
        <Header :headerProps="headerProps"/>
        <div class="contain">
            <p :style="[getData.length === 0 ? {display: 'block'} : {display: 'none'}]" class="not-auction-title">경매 내역이 없습니다.</p>
            <div class="item" v-for="data, i in getData.length" :key="i">
                <img :src='`/product_images/${getData[i].product_img_name}.png`'
                alt="" width="90" height="90" />
                <div class="content">
                    <p class="name">{{getData[i].auction_name}}({{getData[i].p_status}})</p>
                    <div class="auction">
                        <p class="final-bid">현재경매 : {{getData[i].bid_price.toLocaleString()}}원</p>
                        <p class="current-auction">최종낙찰: {{getData[i].a_max_price.toLocaleString()}}원</p>
                    </div>
                    <div class="auctionBtns">
                        <button  v-if="getData[i].bid_status === true" class="auctionBtn-ing">경매중</button>                        
                        <button  v-if="getData[i].bid_status === false && buttonState === 1" class="auctionBtn">경매종료</button>
                        <button v-if="getData[i].bid_status === false && buttonState === 1" class="auctionBtn">계산하기</button>
                        <router-link v-if="getData[i].bid_status === false" :to="`/farm_mypage_auction/writeReview/${getData[i].auction_Id}`">
                        <!-- <router-link v-if="getData[i].bid_status === false" :to="`#`"> -->
                            <button @click="setReviewData(i)" v-if="buttonState === 0" class="reviewBtn">후기작성</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <button class="user-component__title">등록하기</button>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header/backHeader.vue';
export default {
    components: {
        Header
    },
    data(){
        return{
            headerProps: '경매 내역',
            buttonState: 1,
            getData: [],
            auctionState: true,
            user: JSON.parse(localStorage.getItem("user")),
        }
    },
    async mounted(){
        if(localStorage.getItem('checkUser') === 'consumer'){
            this.buttonState = 0;
        }
        // console.log(this.$store.state.login.userInfo.consumer_id);
        console.log(this.$store.state.user.checkUser);
        console.log(this.$store.state.user.id);
        await axios.get(`/api/mypageAuctionDetails/${localStorage.getItem('checkUser')}/${localStorage.getItem('id')}/${0}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {

            this.getData.push(res.data);
            this.getData = this.getData.flat();
            console.log(this.getData);
        }).catch(err => {
			console.log(err); 
			// if(res.headers.token != "token"){     
			// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
			// 	this.$store.commit('LOGOUT');
			// 	this.$router.push('/login');
			// }
        });
    },
    methods: {
        setReviewData(index){
            console.log(this.getData[index]);
            this.$store.commit('GET_REVIEW_DATA', this.getData[index]);
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
    height: 30vh;
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
                .auctionBtn, .reviewBtn, .auctionBtn-ing{
                    width: 80px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid rgb(187, 187, 187);
                    @include text-basic();
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