<template>
    <div class="reviewContain">
        <header class="header">
            <v-icon class="backIcon"
            @click="$router.go(-1)"
                dark
                left
            >mdi-arrow-left</v-icon>
            <p class="headerTitle">이용후기</p>
            <span/>
        </header>
        <div class="inner">
            <Spinner v-if="spinnerState === true"/>
            <ReviewList v-for="data, i in infiniteScrollValue" :key="i" class="reviewList"
            :getData="getData"/>
        </div>
        <Bottom/>
    </div>
</template>

<script>
import Spinner from '../../components/spinner.vue';
import axios from 'axios';
import ReviewList from './reviewList.vue';
import ReviewDetail from './reviewDetail.vue';
import Header from '../../components/Header/bellAndBackHeader.vue';
import Bottom from '../../components/bottomNav.vue';
import _ from 'lodash';
export default {
    components: {
        ReviewList,
        ReviewDetail,
        Bottom,
        Spinner
    },
    data(){
        return {
            spinnerState: true,
            reviewButton: ['내가 쓴 리뷰', '내가 받은 리뷰'],
            reviewState: '내가 쓴 리뷰',
            infiniteScrollValue: 1,
            getData: [],
        }
    },
    mounted(){
        this.getReviewData();

        window.addEventListener('scroll', _.throttle(() => {
            this.infiniteScroll()
        }, 300));
    },
    methods: {
        getReviewData(){
            axios.get(`/api/AuctionReview/${localStorage.getItem('checkUser')}/${localStorage.getItem('id')}`)
            .then(res => {  
                this.getData.push(res.data);
                this.spinnerState = false;
                console.log(this.getData.flat(Infinity));
            }).catch(err => console.log(err));
        },
        async infiniteScroll() {
            // 스크롤 최적화 시키기
            const {innerHeight} = window;
            const {scrollHeight} = document.body;
            const {scrollTop} = document.documentElement;
            if(Math.round(scrollTop + innerHeight) >= scrollHeight){
                this.infiniteScrollValue += 1;
                // await this.getReviewData();
            }
            console.log(innerHeight);
        },
    }
}
</script>

<style lang="scss" scoped>
    .reviewContain{
        width: 100%;
        height: 100vh;
        .header{
            width: 100%;
            height: 55px;
            background-color: #333;
            display: flex;
            justify-content: space-around;
            background-color: #FFC1AA;
            align-items: center;
            border-bottom: 1px solid rgb(234, 234, 234);
            .backIcon{
                cursor: pointer;
                color: #333;
                font-size: 30px;
                font-weight: 900;
            }
            .headerTitle{
                font-size: 20px;
                font-weight: 700;
                color: #333;
            }
        }
        .inner{
            position: relative;
            z-index: 1;
            margin: auto;
            width: 100%;
            height: 90vh;
            .reviewBtn{
                width: 50%;
                font-weight: 700;
                font-size: 16px;
                height: 45px;
                border-bottom: 1px solid rgb(234, 234, 234);
            }
            .reviewBtn.active{
                background-color: #f9e0d7;
            }
            .reviewBtn:nth-child(1){
                border-right: 1px solid rgb(234, 234, 234);
            }
            .reviewList{
                background-color: #fff;
            }
        }
    }
</style>
