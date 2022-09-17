
<template>
	<div>
    <header class="welcome-header1">
        <h1 class="welcome-header__title1">사용자 확인</h1>
        <p class="welcome-header__text1">회원님의 유형을 선택해주세요</p>
    </header>

    <ul class="check button1">
    <ul class="check button1">
        
        <li><button type="button" class="fpmgBt1" v-on:click="navigatesignup">소비자 회원</button></li>
        <li><button type="button" class="fpmgBt2" v-on:click="navigatecheck_farm">농가 회원</button></li>
    </ul>
    </ul>
	</div>


</template>


<script>
export default{
    
    methods: {
        navigatesignup() {
            this.$router.push('/signup');
        },
        navigatecheck_farm() {
            this.$router.push('/check_farm');
        } 
    }
}

</script>


	
<style>
</style>