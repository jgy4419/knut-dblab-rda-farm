<template>
    <div class="reviewModalDetail">
        <div class="back"/>
        <div class="inner">
            <p class="close" @click="$emit('closeModal', '모달 닫기')">X</p>
            <h2 class="title">제목</h2>
            <img class="reviewImg" src="data:image/jpeg;base64,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" alt="사과">
            <p class="reviewContent">리뷰 내용 내용내용내용내용..........내용내요앤욘욘요뇽</p>
            <Comment/>
            <!-- <CommentInput/> -->
        </div>
        <hr/>
    </div>    
</template>

<script>
// import CommentInput from '../../components/Comment/commentInput.vue';
import Comment from '../../components/Comment/comment.vue';
export default {
    props: {
        reviewModalState: Number
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
            width: 80%;
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
                width: 30%;
            }
        }
    }
}
</style>    