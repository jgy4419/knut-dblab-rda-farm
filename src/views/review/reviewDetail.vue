<template>
    <div class="reviewModalDetail">
        <div class="back"/>
        <div class="inner">
            <p class="close" @click="$emit('closeModal', '모달 닫기')">X</p>
            <h2 class="title">{{clickedData.auction_name}}</h2>
            <p>{{clickedData.auction_Id}}</p>
            <!-- 이미지..불러오기,, -->
            <img class="reviewImg" :src="`/auciton_review_images/${clickedData.review_img_name}.png`" 
            alt="auction 이미지" width="200" height="200">
            <p class="reviewContent">{{clickedData.consumer_review}}</p>
            <Comment 
                :auction_id="clickedData.auction_Id"
                :clickedData="clickedData"/>
        </div>
        <hr/>
    </div>    
</template>

<script>
import Comment from '../../components/Comment/comment.vue';
export default {
    props: {
        reviewModalState: Number,
        clickedData: Object
    },
    mounted(){
        console.log(`/auciton_review_images/${this.clickedData.review_img_name}.png`);
        console.log(this.clickedData);
    },
    components: {
        Comment,
        // CommentInput
    }
}
</script>

<style lang="scss" scoped>
*{
    color: #333;
}
.reviewModalDetail{
    position: fixed;
    top: 0;
    z-index: 100;
    width: 28vw;
    height: 100vh;
    .back{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.7);
    }
    .inner{
        overflow-y: scroll;
        padding: 20px;
        position: absolute;
        text-align: center;
        z-index: 100;
        width: 80%;
        height: 80%;
        left: 0; right: 0; top: -8%; bottom: 0;
        margin: auto;
        background-color: #fff;
        border-radius: 10px;
        .close{
            position: absolute;
            right: 0;
            width: 60px;
            height: 60px;
            color: #333;
            font-weight: 900;
            cursor: pointer;
        }
        .title{
            font-size: 25px;
            font-weight: 900;
            margin: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgb(232, 232, 232);
        }
        .reviewImg{
            // width: 80%;
        }
        .reviewContent{
            font-size: 15px;
            font-weight: 500;
            margin-top: 10%;
            line-height: 1.4;
        }
        .reviewComment{
            border-top: 1px solid rgb(232, 232, 232);
            margin-top: 20px;
            padding-top: 20px;
        }
    }
}
@media screen and (max-width: 400px){
    .reviewModalDetail{
        width: 100vw;
        .inner{
            .reviewImg{
                // width: 30%;
            }
        }
    }
}
</style>    