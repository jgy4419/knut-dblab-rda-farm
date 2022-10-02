
<template>

	<div>
    <header class="welcome-header">
        <h1 class="welcome-header__title">정 보 입 력</h1>
      </header>
		<!-- @ 는 v-on 과 같은 표현식이다. 폼 내부에서 버튼을 누르면 submit 이벤트가 form 으로 전송되고 v-on:submit이 실행된다.
		이때 페이지가 새로고침되므로 .prevent를 통해 새로고침을 막고 methods의 함수롤 호출하게 한다. -->
		<form @submit.prevent="submitBizForm" class="login-form">
        <label id="login-form-label">농가명</label>
        <input v-model="farm_member_info.f_farm_name" class="information-form__input" type="text" required placeholder="농가명">

        <label id="login-form-label">대표자</label>
        <input v-model="farm_member_info.f_representative" class="information-form__input" type="text" required placeholder="대표자">

        <label id="login-form-label">사업자 등록번호</label>
        <input v-model="farm_member_info.f_BRN" class="login-form__input" type="text" required placeholder="사업자 등록번호">

        <label id="login-form-label">사업장 소재지</label>
		<SearchAddress :addressInfo="addressInfo" @searchAddressRes="searchAddressResult"/>
        <!-- <input v-model="farm_member_info.f_location" class="login-form__input" type="text" required placeholder="사업장 소재지"> -->

        <label id="login-form-label">농가 전화번호</label>
        <input v-model="farm_member_info.f_num" class="login-form__input" type="text" required placeholder="농가 전화번호">
		
        <input class="login-form__btn" type="submit" @click="submitBizSignUp()" value="다음">
		</form>
	</div>
</template>

<script>
import axios from "axios"
import SearchAddress from '../../components/search_address.vue';

export default {
	name: 'submitBizForm',
	components: {
        SearchAddress,
    },
	data() {
		return {
			addressInfo:{
                zipcode: '',
                address: '',
                c_detail_location: '',
                isConsumer: this.$route.fullPath == '/signup',
            },
			farm_member_info: {
				f_name: this.$store.state.user.name,
				f_email: this.$store.state.user.email,
				f_passwd: this.$store.state.user.passwd,
				f_phonenum: this.$store.state.user.phonenum,
				f_farm_name: null,
				f_representative: null,
				f_BRN: null,
				f_zipcode: null,
				f_location: null,
				f_num: null
			},
			addressCheck: false,
		};
	},
	methods:{
		searchAddressResult(event){
            // 인증번호 맞는지 검사하고 맞다면 비밀번호 변경창 띄우기
            console.log('event: ', event);
            this.farm_member_info.f_zipcode = event.zipcode;
            this.farm_member_info.f_location = event.address;
            this.addressCheck = true;
			alert("주소 입력이 완료되었습니다!");
        },
		submitBizSignUp() {
			console.log(this.farm_member_info);
			if(!this.addressCheck) return alert('주소 입력을 완료해주세요!');
			axios.post('/api/signupFarmMember', this.farm_member_info)
			.then(res => {
				console.log(res);
				if (res.data == 0){
					alert("회원가입 실패..")
				} else {
					alert("회원가입 성공..")
					// main으로 넘기기
					console.log("main으로!!");
					console.log(res.data.token);
					
					localStorage.setItem('expire', JSON.stringify(Date.now() + 86400000));
					localStorage.setItem("user", JSON.stringify(res.data));
					localStorage.setItem('checkUser', 'farm');
					localStorage.setItem('id', res.data.farm_id);
					this.$store.commit('TOKEN_SAVE', res.data.token);
					this.$router.push({name: 'main'});
				}
			})
			.catch(err => {
				console.log(err);
			});
		},
	}
};



</script>

<style>

</style>