<template>
    <div class="reviewListContain">
        <ReviewDetail v-if="reviewModalState === 1"
        @closeModal="reviewModalState = 0"
        :reviewModalState="reviewModalState"/>
        <infinite-loading @infinite="infineteHandler"></infinite-loading>
        <!-- // -->
        <div class="reviews">
            <div class="review" @click="reviewModalState = 1" v-for="reviewCount, i in getData.flat(Infinity).length" :key="i">
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
                    <button class="write-button">작성하기</button>
                    <p>{{getData[0][i].f_phonenum}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ReviewDetail from './reviewDetail.vue';
export default {
    components: {
        ReviewDetail,
    },
    data(){
        return {
            testData: {
                img: 'data:image/jpeg;base64,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',
                nickName: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6',' test7', 'test8'],
                title: ['title1', 'title2',' title3', 'title4', 'title5', 'title6', 'title7', 'title8'],
                star: [2, 5, 3, 2, 5, 2, 1, 5]
            },
            getData: [],
            reviewState: '내가 쓴 리뷰',
            reviewModalState: 0,
        }
    },
    mounted(){
        axios.get(`/api/AuctionReview/${localStorage.getItem('checkUser')}/${localStorage.getItem('id')}`)
        .then(res => {  
            this.getData.push(res.data);
            console.log(this.getData.flat(Infinity));
        }).catch(err => console.log(err));
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
    .reviewListContain{
        .reviews{
            position: relative;
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