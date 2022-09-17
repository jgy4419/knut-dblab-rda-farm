
<template>
	<div>
	<header class="welcome-header">
  	  <h1 class="welcome-header__title">회 원 가 입</h1>
  	</header>

		<!-- @ 는 v-on 과 같은 표현식이다. 폼 내부에서 버튼을 누르면 submit 이벤트가 form 으로 전송되고 v-on:submit이 실행된다.
		이때 페이지가 새로고침되므로 .prevent를 통해 새로고침을 막고 methods의 함수롤 호출하게 한다. -->
		<form @submit.prevent="submitForm" class="check_form">
        <ul class="join_box">
            <li class="checkBox check01">
                <ul class="clearfix">
                    <li>이용약관, 개인정보 수집 및 이용,
                        위치정보 이용약관(선택), 프로모션 안내
                        메일 수신(선택)에 모두 동의합니다.</li>
                    <li class="checkAllBtn">
                        <input class="checkBox" type="checkbox" name="chkAll" id="cbx_chkAll" @click="chAll" v-model="checkAll">
                    </li>
                </ul>
            </li>
            <li class="checkBox check02">
                <ul class="clearfix">
                    <li>이용약관 동의(필수)</li>
                    <li class="checkBtn">
                        <input class="checkBox" type="checkbox" name="chk" v-model="check1">
                    </li>
                </ul>
                <textarea name="" id="">여러분을 환영합니다.
제1조(목적) 이 법은 사업자가 그 거래상의 지위를 남용하여 불공정한 내용의 약관(約款)을 작성하여 거래에 사용하는 것을 방지하고 불공정한 내용의 약관을 규제함으로써 건전한 거래질서를 확립하고, 이를 통하여 소비자를 보호하고 국민생활을 균형 있게 향상시키는 것을 목적으로 한다.

[전문개정 2010. 3. 22.]
 </textarea>
            </li>
            <li class="checkBox check03">
                <ul class="clearfix">
                    <li>개인정보 수집 및 이용에 대한 안내(필수)</li>
                    <li class="checkBtn">
                        <input class="checkBox" type="checkbox" name="chk" v-model="check2">
                    </li>
                </ul>

                <textarea name="" id="">여러분을 환영합니다.
제2조(정의) 이 법에서 사용하는 용어의 정의는 다음과 같다.
1. “약관”이란 그 명칭이나 형태 또는 범위에 상관없이 계약의 한쪽 당사자가 여러 명의 상대방과 계약을 체결하기 위하여 일정한 형식으로 미리 마련한 계약의 내용을 말한다.
                    
2. “사업자”란 계약의 한쪽 당사자로서 상대 당사자에게 약관을 계약의 내용으로 할 것을 제안하는 자를 말한다.
                    
3. “고객”이란 계약의 한쪽 당사자로서 사업자로부터 약관을 계약의 내용으로 할 것을 제안받은 자를 말한다.
                    
[전문개정 2010. 3. 22.]
 </textarea>
            </li>
            <li class="checkBox check03">
                <ul class="clearfix">
                    <li>위치정보 이용약관 동의(선택)</li>
                    <li class="checkBtn">
                        <input class="checkBox" type="checkbox" name="chk" v-model="check3">
                    </li>
                </ul>

                <textarea name="" id="">여러분을 환영합니다.
제3조(약관의 작성 및 설명의무 등) ① 사업자는 고객이 약관의 내용을 쉽게 알 수 있도록 한글로 작성하고, 표준화ㆍ체계화된 용어를 사용하며, 약관의 중요한 내용을 부호, 색채, 굵고 큰 문자 등으로 명확하게 표시하여 알아보기 쉽게 약관을 작성하여야 한다. (개정 2011. 3. 29.)

② 사업자는 계약을 체결할 때에는 고객에게 약관의 내용을 계약의 종류에 따라 일반적으로 예상되는 방법으로 분명하게 밝히고, 고객이 요구할 경우 그 약관의 사본을 고객에게 내주어 고객이 약관의 내용을 알 수 있게 하여야 한다. 다만, 다음 각 호의 어느 하나에 해당하는 업종의 약관에 대하여는 그러하지 아니하다. (개정 2011. 3. 29.)
                    
1. 여객운송업
                    
2. 전기ㆍ가스 및 수도사업
                    
3. 우편업
                    
4. 공중전화 서비스 제공 통신업
                    
③ 사업자는 약관에 정하여져 있는 중요한 내용을 고객이 이해할 수 있도록 설명하여야 한다. 다만, 계약의 성질상 설명하는 것이 현저하게 곤란한 경우에는 그러하지 아니하다.
                    
④ 사업자가 제2항 및 제3항을 위반하여 계약을 체결한 경우에는 해당 약관을 계약의 내용으로 주장할 수 없다.
                    
[전문개정 2010. 3. 22.]
                </textarea>
            </li>
            <li class="checkBox check04">
                <ul class="clearfix">
                    <li>이벤트 등 프로모션 알림 메일 수신(선택)</li>
                    <li class="checkBtn">
                        <input class="checkBox" type="checkbox" name="chk" v-model="check4">
                    </li>
                </ul>

            </li>
        </ul>
        <ul class="footBtwrap clearfix">
            <li><button type="button" class="fpmgBt1" v-on:click="navigatehome">취소</button></li>
            <li><button type="button" class="fpmgBt2" v-on:click="navigatecheck_user">확인</button></li>
        </ul>


		</form>
	</div>


</template>



<script>

export default {
	name: 'check_form',
	data() {
		return {
            checkAll: false,
            check1: false,
			check2: false,
			check3: false,
			check4: false

		}
	},
    mounted(){
        // document.querySelector('.ffpmgBt1').addEventListener('click', () => {
        //     if(this.check1 !== true && this.check2 !== true){
        //         alert('(필수) 부분에 체크 해주세요!')
        //     }else{
        //         this.$router.push('/check_user');
        //     }
        // })
    },
    methods:{
        navigatehome() {
            this.$router.push('/');
        },
        navigatecheck_user() {
            if(this.check1 !== true || this.check2 !== true){
                alert('(필수) 부분에 체크 해주세요!')
            }else{
                this.$router.push('/check_user');
            }
        },
        chAll(){
            if(this.checkAll === false){
                this.check1 = true
                this.check2 = true
                this.check3 = true
                this.check4 = true
            }else{
                this.check1 = false
                this.check2 = false
                this.check3 = false
                this.check4 = false
            }
            console.log(this.checkAll);
        }
        
    },
}



</script>


	
<style lang="scss" scoped>
textarea{
    line-height: 1.4rem;
}
.v-btn.v-btn--density-default{
    width: 50%;
}
</style>