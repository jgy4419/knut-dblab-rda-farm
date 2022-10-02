<template>
    <div class="reviewListContain">
        <ReviewDetail v-if="reviewModalState === 1"
        @closeModal="reviewModalState = 0"
        :clickedData="getData[0][clickedData]"
        :reviewModalState="reviewModalState"/>
        <infinite-loading @infinite="infineteHandler"></infinite-loading>
        <!-- // -->
        <div class="reviews" >
            <h2 class="zero-review-text" v-if="reviewZeroState === 1">리뷰가 없습니다.</h2>
            <div class="review" v-for="reviewCount, i in getData.flat(Infinity).length" :key="i">
                <img @click="reviewModalState = 1, clickedData = i" :src="!getData[0][i].review_img_name ? '/member_profile_images/base_image.png' : `/auciton_review_images/${getData[0][i].review_img_name}.png`" 
                alt="상품 이미지" width="50" height="50"/>
                <div class="reviewContent"  @click="reviewModalState = 1, clickedData = i">
                    <p class="reviewTitle">{{userState === 0 ? getData[0][i].f_name : getData[0][i].c_name}}</p>
                    <p class="reviewTitle">{{getData[0][i].auction_name}}</p>
                    <div class="stars">
                        <!-- testData.star[i] -->
                        <i v-for="star, j in getData[0][i].grade_point" :key="j" class="fa fa-star reviewStar"/>
                    </div>
                </div>
                <div class="rightInfo">
                    <!-- 리뷰가 달려있을 때 작성가능 -->
                    <div class="button-contain">
                        <button v-if="userState === 0 && getData[0][i].consumer_review" @click="$store.commit('GET_REVIEW_DATA', getData[0][i]), $router.push(`/farm_mypage_auction/writeReview/edit/${getData[0][i].auction_Id}`)" class="write-button">
                            수정하기
                        </button>
                        <button v-if="userState === 0 && getData[0][i].consumer_review" @click="deleteReview(getData[0][i].auction_Id, getData[0][i].consumer_id, getData[0][i].review_img_name)" class="delete-button">
                            삭제하기
                        </button>
                    </div>
                    <!-- <p class="tel">0{{getData[0][i].f_phonenum.toString().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{1}|^0[0-9]{4})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") }}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReviewDetail from './reviewDetail.vue';
export default {
    data(){
        return {
            reviewZeroState: 0, // 리뷰 작성이 없는지 있는지 
            clickedData: 0,
            reviewState: '내가 쓴 리뷰',
            reviewModalState: 0,
            userState: 0,
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    props: {
        getData: Array
    },
    components: {
        ReviewDetail,
    },
    mounted(){
        console.log( localStorage.getItem('checkUser'));
        console.log(this.getData.length);
        // setTimeout(() => {
        //     if(this.getData.length === 0){
        //         alert('리뷰가 없습니다');
        //     }
        // }, 1000);

        if(localStorage.getItem('checkUser') === 'farm') this.userState = 1
        else this.userState = 0;
    },
    methods: {
        deleteReview(auction_id, consumer_id, review_img_name){
            console.log(auction_id, consumer_id, review_img_name);
            console.log(this.user.token);
            if(window.confirm('리뷰를 삭제하시겠습니까?')){
                alert('삭제되었습니다!');
                axios.delete(`/api/auctionReview/${auction_id}/${consumer_id}/${review_img_name}`, {
                    headers: {
                        TOKEN: this.user.token
                    }
                })
                .then(res => {
                    console.log(res)
                    console.log(res.data.length);
                })
                .catch(err => {
                    console.log(err);
                })
            }else{
                return;
            }
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
            .zero-review-text{
                color: #333;
                font-size: 20px;
                margin-top: 10%;
                font-weight: 700;
                text-align: center;
            }
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
                    .button-contain{
                        display: flex;
                        flex-direction: column;
                        .write-button, .delete-button{
                            position: relative;
                            z-index: 120;
                            font-size: 10px;
                            font-weight: 700;
                            width: 70px;
                            height: 25px;
                            border: 1px solid #333;
                            margin-top: 5px;
                            border-radius: 3px;
                            transition: .3s;
                        }
                        .delete-button{
                            background-color: rgb(250, 183, 183);
                            color: #fff;
                            border: 0;
                        }
                        .write-button:active{
                            border: 0;
                            background-color: #FFC1AA;
                            color: #fff;
                        }
                    }
                    .tel{
                        // margin-top: -1px;
                        color: #a5a5a5;   
                    }
                }
            }
        }
    }
</style>