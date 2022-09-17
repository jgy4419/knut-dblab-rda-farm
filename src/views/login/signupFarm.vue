<template>
    <div>
        <header class="welcome-header">
            <h1 class="welcome-header__title">회 원 가 입</h1>
        </header>
        <div id ="signup">
        <form @submit.prevent="SignupForm" class="signup">
            <input v-model="name" class="login-form__input" type="text" name="name" required placeholder="이름" >
            <input v-model="email" class="login-form__input" type="text" name="email" required placeholder="이메일" >
            <button class="login-form__btn_right" @click="existEmail(email)">이메일 중복 검사</button>
			<!-- <input class="login-form__input" type="email" required placeholder="이메일"> -->
            <input v-model="passwd" class="login-form__input" type="password" name="password" id="password" required placeholder="비밀번호" minlength="6" >
            <input class="login-form__input" type="password" name="passwordcheck" id="passwordcheck" required placeholder="비밀번호확인"
                minlength="6">
            <input v-model="phonenum" class="login-form__input" type="number" name="phonenum" required placeholder="휴대폰번호">
		<!-- 인증번호 받는 부분 추가 요망 -->
            <!-- <input class="login-form__btn_right" type="submit" value="인증번호 받기">
            <input class="login-form__input" type="text" required placeholder="인증번호를 입력해주세요">
            <input class="login-form__btn_right" type="submit" value="인 증 확 인"> -->
			<button class="login-form__btn_right" @click="kind({name, email, passwd, phonenum})">다음</button>
        </form>
        </div>
    </div>
</template>


<script>
// import axios from "axios"
// import { mapState, mapGetters } from 'vuex'

export default {
	name: 'SignupForm',
	data() {
		return {
			f_name: null,
			f_email: null,
			f_passwd: null,
			f_phonenum: null
		};
	},
	methods:{
        existEmail(email) {
            console.log(email);
			this.$store.dispatch('existEmail', email)
		},
        kind(userInfo){
            // 아이디 중복 확인 추가하기
            this.$store.commit('FARM_INFO', userInfo)
            console.log(this.$store.state.kindOfFarm);
            console.log(this.$store.state.user);

            if (this.$store.state.kindOfFarm == '1') {
                this.$router.push({name: 'farm_user_info'})
            } else {
                this.$router.push({name: 'farm_biz_info'})
            }
        }
	}
};

</script>




<style>

</style>