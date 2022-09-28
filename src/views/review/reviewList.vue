<template>
    <div class="reviewListContain">
        <ReviewDetail v-if="reviewModalState === 1"
        @closeModal="reviewModalState = 0"
        :clickedData="getData[0][clickedData]"
        :reviewModalState="reviewModalState"/>
        <infinite-loading @infinite="infineteHandler"></infinite-loading>
        <!-- // -->
        <div class="reviews" >
            <div class="review" @click="reviewModalState = 1, clickedData = i" v-for="reviewCount, i in getData.flat(Infinity).length" :key="i">
                <img :src="`/product_images/${getData[0][i].product_img_name}.png`" alt="상품 이미지" width="50" height="50"/>
                <div class="reviewContent">
                    <p class="reviewTitle">{{getData[0][i].f_name}}</p>
                    <p class="reviewTitle">{{getData[0][i].auction_name}}</p>
                    <div class="stars">
                        <!-- testData.star[i] -->
                        <i v-for="star, j in getData[0][i].grade_point" :key="j" class="fa fa-star reviewStar"/>
                    </div>
                </div>
                <div class="rightInfo">
                    <!-- 리뷰가 달려있을 때 작성가능 -->
                    <button v-if="userState === 0 && getData[0][i].consumer_review" @click="$store.commit('GET_REVIEW_DATA', getData[0][i]), $router.push(`/farm_mypage_auction/writeReview/edit/${getData[0][i].auction_Id}`)" class="write-button">
                        수정하기
                    </button>
                    <p>{{getData[0][i].f_phonenum}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewDetail from './reviewDetail.vue';
export default {
    props: {
        getData: Array
    },
    components: {
        ReviewDetail,
    },
    mounted(){
        console.log( localStorage.getItem('checkUser'));
        if(localStorage.getItem('checkUser') === 'farm') this.userState = 1
        else this.userState = 0;
    },
    data(){
        return {
            clickedData: 0,
            reviewState: '내가 쓴 리뷰',
            reviewModalState: 0,
            userState: 0,
        }
    },
}
</script>

<style lang="scss" scoped>
    .reviewListContain{
        .reviews{
            position: relative;
            z-index: 1;
            height: 100%;
            .review{
                cursor: pointer;
                width: 80%;
                height: 90px;
                box-shadow: 4px 5px 10px 3px rgb(231, 231, 231);
                border-radius: 10px;
                margin: auto;
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .img{
                    border-radius: 5px;
                    width: 60px;
                    height: 60px;
                    background-color: rgb(239, 239, 239);
                }
                .reviewContent{
                    margin-left: -30px;
                    .reviewTitle{
                        font-weight: 700;
                        font-size: 14px;
                        margin-bottom: 10px;
                        width: 70px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .stars{
                        position: absolute;
                        .reviewStar{
                            color: #f8af94;
                            font-size: 13px;
                        }
                    }
                }
                .rightInfo{
                    text-align: right;
                    display: block;
                    p{
                        color: #333;
                        font-weight: 700;
                        font-size: 10px;
                    }
                    .write-button{
                        position: relative;
                        z-index: 100;
                        font-size: 12px;
                        font-weight: 700;
                        border: 1px solid #333;
                        padding: 10px;
                        border-radius: 3px;
                        transition: .3s;
                    }
                    .write-button:active{
                        border: 0;
                        background-color: #FFC1AA;
                        color: #fff;
                    }
                    p:nth-child(2){
                        margin-top: 10px;
                        color: #a5a5a5;
                    }
                }
            }
        }
    }
</style>