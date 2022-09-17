<template>
<!-- props나 vuex로 받은 댓글 데이터들을 가져오기 -->
    <div class="commentContain">
        <div class="inner">
            <i class="fa fa-comment commentIcon" @click="inputState = 1"/>
            <div class="commentInput" v-if="inputState === 1">
                <div class="inputHeader">
                    <h2>댓글 쓰기</h2>
                    <p class="close" @click="inputState = 0">X</p>
                </div>
                <textarea type="text" placeholder="댓글을 입력해주세요!"/>
            </div>
        </div>
        <div class="commentList">
            <div class="comment" v-for="comment, i in testData.user.length" :key="i">
                <h3 class="userName">{{testData.user[i]}}</h3>
                <p class="userComment">{{testData.comment[i]}}</p>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            testData: {
                user: ['jgy', 'mjh', 'pss', 'jgy', 'mjh', 'pss'],
                comment: ['저도 사고싶네요 ㅠㅠ', '맛있겠네요!', '상태가 좋네요^^', '저도 사고싶네요 ㅠㅠ', '맛있겠네요!', '상태가 좋네요^^'],
            },
            inputState: 0,
        }
    }
}
</script>

<style lang="scss" scoped>
.commentContain{
    .inner{
        position: relative;
        .commentIcon{
            position: absolute;
            left: 0;
            cursor: pointer;
            color: rgb(232, 232, 232);
            padding: 20px;
            font-size: 25px;
        }
        .commentInput{
            position: relative;
            height: 120px;
            top: 50px;
            text-align: left;
            .inputHeader{
                display: flex;
                justify-content: space-between;
                padding: 20px;
                h2{
                    font-size: 16px;
                    font-weight: 700;
                }
                .close{
                    cursor: pointer;
                    font-weight: 18px;
                    font-weight: 700;
                }
            }
            textarea{
                height: 50px;
                width: 80%;
                margin-left: 20px;
                padding: 5px;
                border: 1px solid #333;
                border-radius: 5px;
            }
        }
    }
    .commentList{
            position: relative;
            top: 40px;
            left: 0;
            right: 0;
            height: 100%;
            padding-bottom: 20px;
            .comment{
                position: relative;
                text-align: left;
                padding: 20px;
                width: 100%;
                height: 60px;
                .userName{
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
            }
        }
}
</style>