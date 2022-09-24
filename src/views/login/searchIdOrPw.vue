<template>
    <div>
        <header class="welcome-header1">
            <h1 class="welcome-header__title1">따 과 농 가</h1>
            <p class="welcome-header__text1">{{$route.path === '/login/searchId' ? '아이디 찾기' : '비밀번호 찾기'}}</p>
            <!-- {{this.$store.state.test.id}} -->
        </header>
        <!-- @ 는 v-on 과 같은 표현식이다. 폼 내부에서 버튼을 누르면 submit 이벤트가 form 으로 전송되고 v-on:submit이 실행된다.
		이때 페이지가 새로고침되므로 .prevent를 통해 새로고침을 막고 methods의 함수롤 호출하게 한다. -->


        <v-form class="form-contain" ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
            <div class="login_keep_wrap" id="login_keep_wrap">
                <div class="keep_check">
                    <div>
                        <input type="radio" id="consumer" value="consumer" v-model="info.checkUser">
                        <label id="consumer-text" for="consumer">소비자</label>
                    </div>

                    <br>
                    <div>
                        <input type="radio" id="farm" value="farm" v-model="info.checkUser">
                        <label class="farm-text" for="farm">농가</label>  
                    </div>
                    <br>
                </div>
            </div>
            <v-text-field v-model="info.name" label="이름" required ></v-text-field>
            <v-text-field :style="[$route.path === '/login/searchId' ? {display: 'block'} : {display: 'none'}]"
            v-model="info.phonenum" label="핸드폰 번호" required ></v-text-field>

            <v-text-field :style="[$route.path === '/login/searchId' ? {display: 'none'} : {display: 'block'}]"
            v-model="info.email" :rules="emailRules" label="E-mail" required ></v-text-field>
        </v-form>
        <button class="id-search-btn"
         :style="[$route.path === '/login/searchId' ? {display: 'block'} : {display: 'none'}]" @click="findId()">아이디 찾기</button>
        <Auth :info="info" :style="[$route.path === '/login/searchId' ? {display: 'none'} : {display: 'block'}]" @authRes="log"/>
        <div :style="[authModal === true ? {display: 'block'} : {display: 'none'}]" class="search-pw-input-box">
            <div class="back"/>
            <div class="inner">
                <h2 class="title">비밀번호 변경</h2>
                <v-col cols="12">
                    <v-text-field class="inutBox" v-model="passwd" label="비밀번호*" type="password" :rules="c_passwd_rule"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field class="inutBox" v-model="passwd_chk" label="비밀번호 확인*" type="password" :rules="c_passwd_rule2">
                    </v-text-field>
                </v-col>
                <button class="pw-change-btn" @click="updatePassword()">비밀번호 변경 완료!</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"
import Auth from '../../components/auth.vue';
export default {
    components: {
        Auth,
    },
    mounted(){
        console.log(this.$route.path);
    },
    data() {
        return {
            passwd: null,
            passwd_chk: null,
            valid: false,
            info: {
                checkUser: 'consumer',
                name: null,
                email: null,
                phonenum: null,
            },
            token: null,
            show1: false,
            show2: true,
            emailRules: [
                v => !!v || 'E-mail을 입력해주세요.',
                v => /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(v) || '유효하지 않은 형식의 E-mail 입니다.',
            ],
            loginButton: {
                title: ['회원가입', '아이디찾기', '비밀번호 찾기'],
                url: ['/clause', '/searchId', 'searchPw']
            },
            c_passwd_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
            ],
            c_passwd_rule2: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                v => v === this.c_passwd || '패스워드가 일치하지 않습니다.'
            ],
            authModal: false,
            phoneAuthNumber: null,
            id: null,
        };
    },
    methods: { 
        findId(){
            axios.post('/api/findEmail', { checkUser: this.info.checkUser, name: this.info.name, phonenum: this.info.phonenum})
            .then(res => {
                console.log(res.data);
                if (res.data == "") {
                    alert("이름 또는 핸드폰 번호가 틀렸습니다!");
                } else {
					alert(`회원님의 이메일은 ${res.data}입니다.`);
				}
            }).catch(err => {
                console.log(err);
            });
        },
        log(event){
            // 인증번호 맞는지 검사하고 맞다면 비밀번호 변경창 띄우기
            console.log('event: ', event);
            if(event.authInput == event.phoneAuthNumber){
                this.authModal = true;
                this.id = event.id;
            } else {
                alert("인증번호가 맞지 않습니다!")
            }
            console.log('this.authModal: ', this.authModal);
            console.log(authCounter);
        },
        updatePassword(){
            console.log()
            if(this.passwd != this.passwd_chk){
                alert("비밀번호가 같지 않습니다!");
                return;
            }
            axios.patch('/api/memberPassword',  { checkUser: this.info.checkUser, id: this.id, passwd: this.passwd})
            .then(res => {
                console.log(res.data);
                if (res.data.consumer_id == 0){
					alert("중복 로그인입니다! 다시 한번 로그인 해주세요!")
					console.log("중복 로그인!");
				} else {
					// main으로 넘기기
					console.log(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));

					this.$store.commit('login/TOKEN_SAVE', res.data.token);
					console.log(this.$store.state.config.headers.TOKEN);
					this.$router.push({name: 'main'});
				}
            })
            .catch(err => {
                console.log(err);
            });
        },
    },
}
</script>

<style>

    /* 
	https://github.com/vuetifyjs/vuetify/blob/next/packages/docs/src/examples/v-form/usage.vue 
	https://minu0807.tistory.com/82 아이디 유효성체크
	*/
</style>

<style lang="scss" scoped>
.pw-change-btn, .id-search-btn{
    width: 100%;
    height: 60px;
    font-weight: 700;
    font-size: 16px;
    background-color: #FFC1AA;
}
label{
  font-size: 17px;
  font-weight: 500;
}
[type="radio"] {
    vertical-align: middle;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
} 
.login-buttons{
  display: flex;
  justify-content: space-around;
    .login-button{
        background-color: transparent;
        font-weight: 500;
        color: rgb(129, 129, 129);
    }
}
.form-contain{
    position: relative;
    
    z-index: 1;
}
.search-pw-input-box{
    position: absolute;
    z-index: 10;
    top: 0;
    width: 28vw;
    height: 100vh;
    .back{
        position: absolute;
        z-index: 2;
        width: 28vw;
        height: 100%;
        background: rgba($color: #000000, $alpha: .7);
    }
    .inner{
        position: absolute;
        border-radius: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
        z-index: 10;
        width: 26vw;
        height: 70vh;
        .title{
            text-align: center;
            font-size: 18px;
            font-weight: 700;
            margin: 40px 0;
        }
    }
}
@media screen and (max-width: 500px){
    .search-pw-input-box{
        width: 100vw;
        .back{
            width: 100vw;
        }
        .inner{
            width: 95vw;
        }
    }
    
}
</style>
