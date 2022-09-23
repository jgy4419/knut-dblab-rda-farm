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
                        <button class="auctionBtn">경매종료</button>
                        <button class="auctionBtn">계산하기</button>
                        <router-link :to="`/farm_mypage_auction/writeReview/${getData[i].auction_Id}`"><button class="reviewBtn">후기작성</button></router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <a class="nav__link" href="#"><h4 class="user-component__title">등록하기</h4>
                        </a>
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
            test: {
                img: [''],
                name: ['못난이 복숭아', '못난이 사과'],
                current: [10000, 20000],
                res: [10000, 0],
            },

            getData: [],
            auctionState: true,
        }
    },
    async mounted(){
        // string, int, int
        let userState = 'consumer';
        if(!this.$store.state.login.userInfo.consumer_id){
            userState = 'farm'
        }
        console.log(userState);
        console.log(this.$store.state.login.userInfo.consumer_id);
        console.log(0);
        await axios.get(`/api/mypageAuctionDetails/${userState}/${this.$store.state.login.userInfo.consumer_id}/${0}`)
        .then(res => {
            this.getData.push(res.data);
            this.getData = this.getData.flat();
            console.log(this.getData);
        }).catch(err => console.log(err));
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
.contain{
    // margin-top: -50px; // 임시로 넣은 ui
    position: relative;
    background-color: rgb(244, 242, 242);
    width: 100%;
    height: 80vh;
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
                .auctionBtn, .reviewBtn{
                    width: 80px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid rgb(187, 187, 187);
                    @include text-basic();
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