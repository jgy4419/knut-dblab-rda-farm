<template>
<div>
    <header class="welcome-header">
    <h1 class="welcome-header__title">회 원 가 입</h1>
</header>
    <v-form ref="form" lazy-validation @submit.prevent="SignupForm">
        <v-row>
            <v-col cols="12">
            <v-text-field v-model="c_name" label="이름*" :rules="c_name_rule" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="c_email" label="이메일*" :rules="emailRules"
                    :disabled="state == 'ins' ? false : true" required></v-text-field>
            </v-col>

            <button class="login-form__btn_right" @click="existEmail(c_email)">이메일 중복 검사</button>

            <v-col cols="12">
                <v-text-field v-model="c_passwd" label="비밀번호*" type="password" :rules="c_passwd_rule"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="c_passwd_chk" label="비밀번호 확인*" type="password" :rules="c_passwd_rule2">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field v-model="c_phonenum" label="핸드폰 번호" :rules="c_phonenum_rule"></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
                <v-select v-model="user_auth" label="권한*" :items="authList" item-text="name" item-value="value"
                    return-object :rules="user_auth_rule"></v-select>
            </v-col> -->
        </v-row>

        <button class="login-form__btn_right"
            @click="signupConsumer()">다음</button>
    </v-form>
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
            c_phonenum: null,
            dialog: false,
            state: 'ins',
            authList: [
                { name: '관리자', value: 'A' },
                { name: '일반 사용자', value: 'M' }
            ],
            c_email: '',
            emailRules: [
                v => !!v || '이메일은 필수 입력사항입니다.',
                v => /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(v) || '유효하지 않은 형식의 E-mail 입니다.',
                // v => this.existEmail(v) || '중복된'
            ],
            c_name: '',
            c_name_rule: [
                v => !!v || '이름은 필수 입력사항입니다.',
                v => !(v && v.length >= 10) || '이름은 10자 이상 입력할 수 없습니다.',
                v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
            ],
            c_passwd: '',
            c_passwd_chk: '',
            c_passwd_rule: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
            ],
            c_passwd_rule2: [
                v => this.state === 'ins' ? !!v || '패스워드는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 30) || '패스워드는 30자 이상 입력할 수 없습니다.',
                v => v === this.c_passwd || '패스워드가 일치하지 않습니다.'
            ],
            user_auth: '',
            user_auth_rule: [
                v => !!v || '권한은 필수 선택 사항입니다.'
            ],
            c_phonenum: '',
            c_phonenum_rule: [
                v => this.state === 'ins' ? !!v || '핸드폰 번호는 필수 입력사항입니다.' : true,
                v => !(v && v.length >= 
                12) || '핸드폰 번호는 12자 이상 입력할 수 업습니다.',
                v => /[0-9]/.test(v) || '숫자만 입력해주세요'
            ],
            // State가 0이면 일반 사용자 1이면 농가유저
            urlState: 0,
        }
    },
    mounted(){
        // 일반 사용자
        if(this.$route.fullPath === '/signup'){
            this.urlState = 0;
            console.log(this.urlState);
        // 농가 사용자
        }else if(this.$route.fullPath === '/signupFarm'){
            this.urlState = 1;
            console.log(this.urlState); 
        }
    },
    methods:{
        existEmail(c_email) {
            this.$store.dispatch('existEmail', c_email)
            console.log(c_email);
            if(c_email == c_email){

            }
        },
        async signupConsumer() {
            let validate;
            await this.$refs.form.validate().then( res => {
                validate = res.valid
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
            console.log(validate);
            console.log(this.$store.state.existEmail);
            if(!validate){
                console.log("다른 거 확인하길 바람");
            } else if (this.$store.state.existEmail) {
                alert('이메일 중복 확인을 완료해주세요!')
            } else {
                console.log();
                axios.post('/api/signupConsumer', { c_name: this.c_name, c_email: this.c_email, c_passwd: this.c_passwd, c_phonenum: this.c_phonenum})
                    .then(res => {
                        console.log(res);
                        if (res.data == 0) {
                            alert("회원가입 실패..")
                        } else {
                            alert("회원가입 성공..")
                            // main으로 넘기기
                            console.log("main으로!!");
                            console.log(this.token);
                            console.log(res.data.token);
                            this.token = res.data.token;
                            this.$router.push({ name: 'main', params: this.token });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }}
    }
</script>




<style>

</style>