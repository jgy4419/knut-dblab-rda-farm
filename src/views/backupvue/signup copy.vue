<template>
    <div>
        <header class="welcome-header">
            <h1 class="welcome-header__title">회 원 가 입</h1>
        </header>
        <div id ="signup">
        <form @submit.prevent="SignupForm" class="signup">
            <input v-model="c_name" class="login-form__input" type="text" name="name" required placeholder="이름" >
            <input v-model="c_email" class="login-form__input" type="text" name="email" required placeholder="이메일" > 
            <button class="login-form__btn_right" @click="existEmail(c_email)">이메일 중복 검사</button>
			<!-- <input class="login-form__input" type="email" required placeholder="이메일"> -->
            <input v-model="c_passwd" class="login-form__input" type="password" name="password" id="password" required placeholder="비밀번호" minlength="6" rules="emailRule">
            <input class="login-form__input" type="password" name="passwordcheck" id="passwordcheck" required placeholder="비밀번호확인"
                minlength="6">
            <input v-model="c_phonenum" class="login-form__input" type="number" name="phonenum" required placeholder="휴대폰번호" minlength="11" maxlength="11">
		<!-- 인증번호 받는 부분 추가 요망 -->
            <!-- <input class="login-form__btn_right" type="submit" value="인증번호 받기">
            <input class="login-form__input" type="text" required placeholder="인증번호를 입력해주세요">
            <input class="login-form__btn_right" type="submit" value="인 증 확 인"> -->
			<button class="login-form__btn_right" @click="signupConsumer({c_name, c_email, c_passwd, c_phonenum})">다음</button>
        </form>
        </div>
    </div>
</template>


<script>
import axios from "axios"

export default {
	name: 'SignupForm',
	data() {
		return {
            c_name: null,
			c_email: null,
			c_passwd: null,
			c_phonenum: null
		};
	},
	methods:{
        existEmail(c_email) {
            console.log(c_email);
			this.$store.dispatch('existEmail', c_email)
		},
        // emailRule:(c_email) {
        //     v => !!v || '이메일을 입력해주세요.',
        //     v => { 
        // const replaceV = v.replace(/(\s*)/g, '')
        // const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
        // return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        //     }
        // },
		signupConsumer(signupObj) {
            console.log(this.$store.state.existEmail);
            if(this.$store.state.existEmail){
                alert('이메일 중복 확인을 완료해주세요!')
            } else {
                console.log(signupObj);
                axios.post('http://localhost:8080/api/signupConsumer', signupObj) 
                .then(res => {
                    console.log(res);
                    if (res.data == 0){
                        alert("회원가입 실패..")
                    } else {
                        alert("회원가입 성공..")
                        // main으로 넘기기
                        console.log("main으로!!");
                        console.log(res.data.token);
                        this.$store.commit('TOKEN_SAVE', res.data.token);
                        this.$router.push({name: 'main', params: res.data.token});
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
		}
	},
};

</script>




<style>

</style>