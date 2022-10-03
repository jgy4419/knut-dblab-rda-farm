<template>
    <div class="auth-contain">
        <v-col cols="12">
            <div v-if="auth.phoneAuthState === true" class="auth-box">
                <p class="auth-title">인증번호를 입력해주세요!</p>
                <div class="auth">
                    <input type="number" id="authInput" v-model="auth.authInput" placeholder="인증번호를 입력해주세요." class="auth-input"/>
                    <p class="timer">
                        {{String(Math.floor((auth.authCounter  / (1000 * 60 )) % 60 )).padStart(2, "0")}} :
                        {{String(Math.floor((auth.authCounter / 1000 ) % 60)).padStart(2, "0")}}
                    </p>
                    <button class="auth-complete-btn" @click="$emit('authRes', {authInput: this.auth.authInput, id: this.id, phoneAuthNumber: this.phoneAuthNumber, phonenum: this.phonenum})">확인</button>
                </div>
            </div>
            <v-text-field class="inputBox" v-model="phonenum" label="핸드폰 번호" :rules="phonenum_rule"></v-text-field>
            <button class="auth-button" @click="authState()">인증 번호 받기</button>
        </v-col>
    </div>
</template>

<script>
import axios from "axios"

export default {
    props: {
        info: {
            checkUser: String,
            name: String,
            email: String
        }
    },
    data(){
        return{
            auth: {
                phoneAuthState: false,
                authCounter: 180000,
                authInput: '',
                min: 0,
                sec: 0,
                authRes: 0,
                authRes: true // 임시로 true false로 바꿔놓기
            },
            id: null,
            phoneAuthNumber: null,
            phonenum: null,
        }
    },
    unmounted(){
        this.auth.authCounter = 0;
    },
    methods: {
        // 인증 input창 생성
        authState(){
            console.log(this.info);
            console.log(this.phonenum);
            if(this.phonenum.length >= 8){
                this.auth.phoneAuthState = true;
                
                axios.post('/api/findPassword',  { checkUser: this.info.checkUser, name: this.info.name, email: this.info.email, phonenum: this.phonenum})
                .then(res => {
                    console.log(res.data);
                    this.id = res.data.id;
                    this.phoneAuthNumber = res.data.phoneAuthNumber;
                    this.auth.authInput = this.phoneAuthNumber;
                    document.getElementById('authInput').value = this.phoneAuthNumber;
                    console.log(this.auth.authInput);
                })
                .catch(err => {
                    console.log(err);
                });

                setInterval(() => {
                    this.auth.authCounter -= 1000;
                    if(this.auth.authCounter === 0){
                        alert('시간이 초과되었습니다.');
                        window.location.reload(true);
                    }
                }, 1000);
            }else{
                alert('핸드폰 번호를 입력해주세요!');
            }
        },
        // 인증번호 일치한지 검사
        authReq(){
            console.log(this.auth.authInput);
            // if(this.auth.authRes === this.auth.authInput){
                // 성공 axios.get(),then(res => {
                //     this.auth.authState = res.data
                // }) 
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
button{
    margin: auto;
    font-weight: 700;
    width: 100%;
    height: 50px;
    border-radius: 20px;
    background-color: #FFC1AA;
    cursor: pointer;
}
.auth-contain{
    width: 100%;
    // height: 100vh;
    .auth-box{
        .auth-title{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            padding-left: 10px;
        }
        .auth{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            .auth-input{
                font-size: 15px;
                padding: 10px;
                width: 45vw;
                height: 50px;
            }
            .auth-complete-btn{
                width: 20vw;
                height: 40px;
            }
            .timer{
                width: 50px;
                font-size: 12px;
                color: rgb(174, 174, 174);
            }
        }
    }
}
.inputBox, .auth-button{
    width: 95%;
    margin: auto;
}
.auth-button{
    margin-left: 10px;
}
</style>