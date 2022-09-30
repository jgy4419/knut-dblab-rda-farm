<template>
    <div class="main-contain">
        <Header :headerProps="headerProps"/>

        <!-- <fieldset> -->
            <Slide/>
            <!-- <div class="sh_group">
                <img class="profile_photo3" id="profile_photo" :src="`/member_profile_images/${userState}.png`">
            </div> -->
        <!-- </fieldset> -->

        <fieldset>
            <div class="sh_group">
                <!-- <img class="main_logo" src="../images/logo.jpg"> -->
                    <text class="main_text"><br>'파치' 의 사전적 의미는 깨어지거나 흠이 나서 못 쓰게 된 물건을 말하는데 농산물이 떨어져서 깨지거나 흠이 나 있지만 일반 농산물보다 맛있고, 신선함을 표현하기 위해 애벌레가 사과를 베어먹었다는 것을 표현하였다.
                    </text>
            </div>
            
        </fieldset>

        <div>
            <button class="login-form__btn" type="submit" @click="logout()">로그아웃</button>
        </div>

    </div>
    <bottom-nav/>
</template>


<script>
import Header from '../../components/Header/bellAndAddHeader.vue';
import Slide from '../../components/slide.vue';
import bottomNav from '@/components/bottomNav.vue';
import { values } from 'sockjs-client/lib/transport-list';

export default{
  components: { bottomNav, Header, Slide },
    data() {
        return {
            headerProps: 'Main',
            name: null,
            f_data: [],
            user: JSON.parse(localStorage.getItem("user")),
            userState: '',
        };
    },
    mounted(){
        console.log(this.userState);
        if(localStorage.getItem('checkUser') === 'farm'){
            this.userState = this.user.f_profile_img
        }else{
            this.userState = this.user.c_profile_img
        }
    },
    methods: {
        logout(){
            console.log('logout');
            this.$store.commit('LOGOUT')
            this.$router.push('/login');
        },
        testCheck(){
            console.log(name);
            localStorage.setItem(key, values);
            localStorage.setItem("totalinfo", JSON.stringify(f_data));
        }
    },
    // created() {
        
    //     this.$storage.setStorageSync("test-key", "5");
    // },

    



}
</script>
<style lang="scss" scoped>
.main-contain{
    min-height: 95vh;
    fieldset{
        margin-top: -50px;
    }
}
</style>
