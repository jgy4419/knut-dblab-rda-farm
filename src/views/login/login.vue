<template>
    <div>
        <header class="welcome-header1">
            <h1 class="welcome-header__title1">따 과 농 가</h1>
            <p class="welcome-header__text1">우리들의 농가 따과농가</p>
            <!-- {{this.$store.state.test.id}} -->
        </header>
        <!-- @ 는 v-on 과 같은 표현식이다. 폼 내부에서 버튼을 누르면 submit 이벤트가 form 으로 전송되고 v-on:submit이 실행된다.
		이때 페이지가 새로고침되므로 .prevent를 통해 새로고침을 막고 methods의 함수롤 호출하게 한다. -->


        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="loginContain">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>

            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                label="Password" hint="비밀번호는 최소 6글자 입니다" counter @click:append="show1 = !show1"></v-text-field>

            <div class="login_keep_wrap" id="login_keep_wrap">
                <div class="keep_check">
                    <!-- <input type="checkbox" id="keep" name="nvlong" class="input_keep" value="on">
                    <label for="keep" class="keep_text">로그인 상태 유지</label>
                    <br>
                    <br> -->
                    <div>
                        <input type="radio" id="consumer" value="consumer" v-model="checkUser">
                        <label id="consumer-text" for="consumer">소비자</label>
                    </div>

                    <br>
                    <div>
                        <input type="radio" id="farm" value="farm" v-model="checkUser">
                        <label class="farm-text" for="farm">농가</label>  
                    </div>
                    <br>
                </div>
            </div>
            <button class="login-form__btn" type="submit" @click="login()">로그인</button>
            <div class="login-buttons">
                <router-link v-for="url, i in loginButton.url.length" :key="i" :to='loginButton.url[i]'>
                    <button class="login-button" type="submit">{{loginButton.title[i]}}</button>
                </router-link>
            </div>
            <!-- <a class="login-form__a" href="#">아이디 찾기</a> -->
        </v-form>
    </div>
</template>

<script>

import axios from "axios"

export default {
    // name: 'SignupForm',
    data() {
        return {
            valid: false,
            checkUser: 'consumer',
            email: null,
            password: null,
            token: null,
            show1: false,
            show2: true,
            emailRules: [
                v => !!v || 'E-mail을 입력해주세요.',
                v => /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(v) || '유효하지 않은 형식의 E-mail 입니다.',
            ],
            // passwordRules: [
            //     v => !!v || 'password is required',
            //     v => v.length <= 6 || 'password must be less than 6 characters',
            // ],
            rules: {
                required: value => !!value || '비밀번호를 입력해주세요.',
                min: v => v.length >= 6 || '비밀번호는 최소 6글자 입니다',
                emailMatch: () => (`The email and password you entered don't match`),
            },  
            loginButton: {
                title: ['회원가입', '아이디찾기', '비밀번호 찾기'],
                url: ['/clause', '/login/searchId', '/login/searchPw']
            }
        };
    },
    methods: { 
        login() {
            let payload = {};
            axios.post('/api/login',  { email: this.email, checkUser: this.checkUser, password: this.password})
            .then(res => {
                if (res.data == "") {
                    alert("아이디 또는 비밀번호가 틀렸습니다! 그리고 소비자 및 농가 체크 다시 확인해주세요!")
                    console.log("....");
                } else if (res.data.consumer_id == 0){
					alert("중복 로그인입니다! 다시 한번 로그인 해주세요!")
					console.log("중복 로그인!");
				} else {
                    let expire = Date.now() + 86400000;
                    localStorage.setItem('expire', JSON.stringify(expire));
					// main으로 넘기기
					console.log(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));

					this.$store.commit('TOKEN_SAVE', res.data.token);
                    // console.log(res.data.consumer_id);
                    if(res.data.consumer_id){
                        localStorage.setItem('checkUser', 'consumer');
                        localStorage.setItem('id', res.data.consumer_id);
                    }else{
                        localStorage.setItem('checkUser', 'farm')
                        localStorage.setItem('id', res.data.farm_id);
                    }
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
        font-size: 14px;
        background-color: transparent;
        font-weight: 500;
        color: rgb(129, 129, 129);
    }
}
</style>
