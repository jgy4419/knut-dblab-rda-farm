
<template>
<div>
	<div class="main_nav_t_div">
        <nav class="main_t_nav">
            <ul class="main_t_nav_list">
                <li class="nav__btn">
                    <a class="nav__link" href="alert"><i class="fas fa-bell fa-2x" aria-hidden="true"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <a class="nav__link" href="/main"><i class="fas fa-running fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link" href="auction_reg"><i class="fas fa-plus fa-2x" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

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
import bottomNav from '@/components/bottomNav.vue';
import { values } from 'sockjs-client/lib/transport-list';
import check_userVue from '../login/check_user.vue';
import axios from "axios"

const bbb = 1;

export default{
  components: { bottomNav },
    data() {
        return {
            name: null,
            f_data: []
            
        };
    },
    methods: {
        logout(){
            // 로컬스토리지에서 checkUser, email 가져오기
            let user = JSON.parse(localStorage.getItem('user'))

            console.log(user);

            let email = user.c_email;
            let check_user = null;
            if(email != undefined){
                check_user = "consumer"
            } else {
                email = user.f_email;
                check_user = "farm"
            }

            console.log(check_user + '   ' + email);

            axios.get(`/api/logout/${check_user}/${email}`,  {})
            .then(res => {
                console.log('res: ' + res);
                
                // 로컬스토리지 초기화
                localStorage.setItem('user', '');
                this.$router.push({name: 'login'});
            })
            .catch(err => {
                console.log(err);
            });

        },
        testCheck(){
            console.log(name);
            localStorage.setItem(key, values);
            localStorage.setItem("totalinfo", JSON.stringify(f_data));
        }
    },

    

    created() {
        console.log(localStorage.getItem("user"));
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user);
        
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

<style>

</style>

