
<template>
<div class="main-contain">
    <Header :headerProps="headerProps"/>

	<fieldset>
        <div class="sh_group">
            <img class="profile_photo3" id="profile_photo" src="https://static.nid.naver.com/images/web/user/default.png?type=s160">
        </div>
    </fieldset>

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
<bottom-nav></bottom-nav>
</template>


<script>
import { useStorage } from "vue3-storage";
import Header from '../../components/Header/bellAndAddHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import { values } from 'sockjs-client/lib/transport-list';
import check_userVue from '../login/check_user.vue';
import axios from "axios"

const bbb = 1;

export default{
  components: { bottomNav, Header },
    data() {
        return {
            headerProps: 'Main',
            name: null,
            f_data: []
            
        };
    },
    methods: {
        logout(){
            this.$store.commit('LOGOUT')
            this.$router.push('/login');
        },
        testCheck(){
            console.log(name);
            localStorage.setItem(key, values);
            localStorage.setItem("totalinfo", JSON.stringify(f_data));
        }
    },

    

    created() {
        
        this.$storage.setStorageSync("test-key", "5");
    },

//     export default {
//   data() {
//     return {
//       newTodoItem: ''
//     }
//   },
//   methods: {
//     addTodo() {
//       localStorage.setItem(this.newTodoItem, this.newTodoItem);
//     }
//   }
// }

    



}
</script>

<style lang="scss" scoped>
.main-contain{
    // height: 10vh;
    fieldset{
        margin-top: -50px;
    }
}
</style>
