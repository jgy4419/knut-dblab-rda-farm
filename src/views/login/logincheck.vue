<template>
  <div>
      <!-- 유효성 검사 통과 못했을 경우, 버튼을 disabled 처리 -->
      <button v-bind:disabled="!isUsernameValid || !password">로그인</button>
  </div>
</template>

<script>
export default {
async checkDuplicate() {
	//일단은 사용가능한 이메일로 true로 초기화 한다.
	this.availableEmail = true;
    
    //이메일 유효성을 검사한다.
	if (!validateEmail(this.email)) {
		//유효성이 틀리다면 data 값을 false로 한다.
        this.availableEmailForm = false;
		return;
	} else {
		this.availableEmailForm = true;
	}
    
    //이메일 중복체크를 한다.
	const response = await checkDuplicateEmail(this.email);
	if (!response.data) {
		this.availableEmail = false;
	} else {
		this.availableEmail = true;
	}
},



  methods: {
    checkForm(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.name) {
        this.errors.push("이름은 필수입니다.");
      }
      if (!this.email) {
        this.errors.push("이메일은 필수입니다.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("이메일 형식을 확인하세요.");
      }
      if (!this.errors.length) return true;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};



</script>

<style>

</style>