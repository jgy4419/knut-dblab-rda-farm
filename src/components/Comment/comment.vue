<template>
<!-- props나 vuex로 받은 댓글 데이터들을 가져오기 -->
    <div class="commentContain">
        <div class="inner">
            <div class="commentList">
                <hr>
                <br/>
                <div class="comment" v-if="inputState === 0">
                    <h3 class="userName">{{checkUser === 'consumer' ? getData.f_farm_name : user.f_farm_name}}</h3>
                    <p class="userComment">{{!clickedData.farm_review || clickedData.farm_review === '' ? "아직 답글이 없습니다." : clickedData.farm_review}}</p>
                </div>
            </div>
            <div class="control-button" v-if="checkUser === 'farm'">
                <button class="commentButton" v-if="inputState === 0" @click="inputState = 1">{{ !clickedData.farm_review ? '답글달기' : '수정하기'}}</button>
                <!--  -->
                <button class="deleteButton" v-if="inputState === 0" @click="commentPush(0)">삭제하기</button>
            </div>
            <div class="commentInput" v-if="inputState === 1">
                <div class="inputHeader">
                    <h2>댓글 쓰기</h2>
                    <p class="close" @click="inputState = 0">X</p>
                </div>
                <textarea type="text" v-model="reqData.comment" placeholder="댓글을 입력해주세요!"/>
                <br/>
                <button @click="commentPush(1)" class="comment-button">확인</button>
            </div>
        </div>
        <br/>
    </div>    
</template>

<script>
import axios from 'axios'
export default {
    props: {
        auction_id: Number,
        clickedData: Object
    },
    data(){
        return {
            reqData: {
                comment: ''
            },
            checkUser: localStorage.getItem('checkUser'),
            // 0이면 사용자, 1이면 농가 (댓글 작성 여부 판단하기)
            userState: 0,
            inputState: 0,
            user: JSON.parse(localStorage.getItem("user")),
            getData: {},
        }
    },
    // farm_review
    mounted(){
        console.log(this.clickedData);
        if(localStorage.getItem('checkUser') === 'farm') this.userState = 1;
        else this.userState = 0;
        console.log(JSON.parse(localStorage.getItem('id')));
        let check = localStorage.getItem('checkUser');
        console.log(check);
        axios.get(`/api/AuctionReview/${check}/${parseInt(localStorage.getItem('id'))}`, {
            headers: {
                TOKEN: this.user.token
            }
        })
        .then(res => {
            console.log(res);
            this.getData = res.data[0];
            console.log(this.getData);
        })
        .catch(err => console.log(err));
    },
    methods: {
        // state가 1이면 작성 0이면 삭제 시켜주기
        commentPush(state){
            let frm = new FormData();
            frm.append('checkUser', localStorage.getItem('checkUser'));
            frm.append('auction_Id', this.clickedData.auction_Id);
            frm.append('grade_point', this.getData.grade_point);
            frm.append('consumer_review', this.getData.auction_name);
            frm.append('review_img_name', this.getData.review_img_name);
            frm.append('product_img_name', this.getData.product_img_name);
            if(state === 0){ // 삭제하면 빈 값              
                if(window.confirm('댓글을 삭제하시겠습니까?')){
                    alert('삭제되었습니다!');
                    frm.append('farm_review', '');
                }else{
                    return;
                }
            }else{ // 작성하면 input 값
                frm.append('farm_review', this.reqData.comment);
            }
            frm.append('consumer_id', 12);
            frm.append('auction_name', this.getData.auction_name);
            frm.append('f_farm_name', JSON.parse(localStorage.getItem('user')).f_farm_name);
            frm.append('c_name', this.getData.c_name);
            for(let i of frm) console.log(i);
            axios.patch('/api/AuctionReview', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res);
                location.reload();
            }).catch(err => {
                console.log(err);
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.commentContain{
    .inner{
        position: relative;
        .commentButton, .deleteButton{
            border-radius: 10px;
            position: relative;
            margin-left: 10px;
            right: 0;
            z-index: 100;
            font-size: 10px;
            border: .5px solid #333;
            padding: 10px;
            font-weight: 600;
        }
        .deleteButton{
            background-color: rgb(248, 185, 185);
            border: 0;
            color: #fff;
        }
        .commentIcon{
            position: absolute;
            right: 0;
            cursor: pointer;
            color: rgb(232, 232, 232);
            padding: 20px;
            font-size: 25px;
        }
        .commentInput{
            position: relative;
            height: 150px;
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
                font-size: 12px;
                margin-left: 20px;
                padding: 5px;
                border: 1px solid #333;
                border-radius: 5px;
            }
            .comment-button{
                position: absolute;
                margin-top: 5px;
                right: 12%;
                width: 40px;
                height: 30px;
                border-radius: 5px;
                cursor: pointer;
                color: #333;
                background-color: rgb(232, 232, 232);
                font-size: 14px;
                font-weight: 700;
            }
        }
        .control-button{
            position: relative;
            top: 40px;
            right: 0;
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
            // padding: 20px;
            width: 100%;
            height: 60px;
            .userName{
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            .userComment{
                font-weight: 600;
            }
        }
    }
}
</style>