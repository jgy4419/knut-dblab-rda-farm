<template>
    <button @click="modalState = 1" class="user_secession_button">회원 탈퇴</button>
    <div v-if="modalState === 1" class="user_secession_contain">
        <div class="back"/>
        <div class="user-secession-box">
            <div class="inner">
                <p class="close" @click="modalState = 0">X</p>
                <h2 class="title">회원 탈퇴</h2>
                <div class="passwordBox">
                    <div class="inputBox">
                        <span>아이디 : </span> <input class="input" type="text" placeholder="아이디를 입력하세요" v-model="id"/> 
                    </div>
                    <div class="inputBox">
                        <span>비밀번호 : </span> <input class="input" type="password" placeholder="비밀번호를 입력하세요" v-model="pw"/>
                    </div>
                    <button @click="userSecession()" class="user_secession_button">회원 탈퇴</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            id: '',
            pw: '',
            modalState: 0,
        }
    },
    methods: {
        userSecession(){
            if(window.confirm('정말 회원 탈퇴를 하시겠습니까?')){
                axios.delete('/api/memberPassword', {
                    checkUser: localStorage.getItem('checkUser'),
                    id: this.id,
                    passwd: this.pw
                }).then(res => {
                    if(res.data === 1){
                        alert('탈퇴되었습니다!');
                    }else{
                        alert('아이디나 비밀번호가 잘 못 되었습니다!');
                    }
                })
            }else{
                return;
            }
        }
    }   
}
</script>

<style lang="scss" scoped>
.user_secession_button{
    width: 90%;
    height: 50px;
    font-size: 16px;
    font-weight: 700;
    background-color: rgb(207, 165, 165);
    color: #fff;
    margin-left: 20px;
    border-radius: 10px;
}
.user_secession_button:nth-child(3){
    height: 40px;
    font-size: 14px;
}
.user_secession_contain{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    .back{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
    }
    .user-secession-box{
        position: absolute;
        padding: 20px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 80%;
        height: 320px;
        border-radius: 10px;
        background-color: #fff;
        .inner{
            .close{
                position: absolute;
                right: 10%;
                font-size: 16px;
                font-weight: 700;
            }
            .title{
                font-size: 20px;
                font-weight: 700;
                text-align: center;
            }
            .passwordBox{
                margin-top: 20px;
                .inputBox{
                    margin-top: 40px;
                    span{
                        font-size: 12px;
                        font-weight: 700;
                    }
                    .input{
                        padding: 10px;

                    }
                }
                .user_secession_button{
                    margin-top: 50px;
                }
            }
        }
    }
}
</style>