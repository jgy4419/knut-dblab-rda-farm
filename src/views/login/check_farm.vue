<template>
	<div>
    <header class="welcome-header1">
        <h1 class="welcome-header__title1">사용자 확인</h1>
        <p class="welcome-header__text1">회원님의 유형을 선택해주세요</p>
    </header>

    <ul class="check button1">
        <li><router-link :to="{ path: '/signupFarm' }"><button type="button" class="fpmgBt1" @click="kind('1')">개인 회원</button></router-link></li>
        <li><router-link :to="{ path: '/signupFarm' }"><button type="button" class="fpmgBt2" @click="kind('2')">사업자 회원</button></router-link></li>
    </ul>
	</div>


</template>


<script>
    export default {
	methods:{
		kind(kindOfFarm){
			this.$store.commit('KIND_OF_FARM', kindOfFarm);
        }
	}
};
</script>

<style lang="scss" scoped>
.fpmgBt1, .fpmgBt2{
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-weight: 500;
}
</style>