<template>
    <div class="mypage_contain">
        <Header :headerProps="headerProps"/>

        <fieldset class="fieldContain">
            <div class="goods_group">
                <ul class="goods_group_list">
                    <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                        <div class="goods_item">
                            <a href="/orderStatus/2022021339733581" class="goods_thumb">
                                <img class="circle_image" :src="user.c_profile_img == null || user.c_profile_img == '' ? '/member_profile_images/base_image.png' : `/member_profile_images/${user.c_profile_img}.png`"
                                alt="" width="90"
                                    height="90"></a>
                            <div class="goods_info">
                                <p class="guide2">
                                    사용자명 : {{userData.c_name}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </fieldset>

        <fieldset>
            <ul class="check button1">
                <li><button type="button" class="fpmgBt2" onclick="location.href='/#'">경매횟수</button></li>
                <li><button type="button" class="fpmgBt2" onclick="location.href='/#'">나의 파치포인트</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='/#'">{{pachiCount}}</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='/#'">{{pachiPoint.toLocaleString()}}원</button></li>
            </ul>
        </fieldset>

        <fieldset>
            <ul class="button-100">
                
                <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_auction'">
                    <router-link to='/farm_mypage_auction'>경매 내역</router-link></button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_keep'">찜한목록</button></li>
                <li><router-link to="/farm_mypage_get_review"><button type="button" class="fpmgBt1">이용후기</button></router-link></li>
                <li><router-link to="/ServiceCenter"><button type="button" class="fpmgBt1">고객센터</button></router-link></li>
                <li><router-link to="/consumer_profile"><button type="button" class="fpmgBt1">개인정보 수정</button></router-link></li>
                <li><router-link to="/"><button type="button" class="fpmgBt1" @click="logout()">로그아웃</button></router-link></li>
            </ul>
        </fieldset>

        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
import Header from '../../components/Header/bellAndAddHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import axios from 'axios';

export default {
    components: {bottomNav, Header},
    data(){
        return{
            headerProps: '마이페이지',
            userData: {},
            pachiPoint: 0,
            pachiCount: 0,
            user: JSON.parse(localStorage.getItem("user")),
        }
    },
    methods: {
        logout(){
            this.$store.commit('LOGOUT');
            this.$router.push('/login');
        },
    },
    async mounted(){
        console.log(this.$store.state.user);
        console.log(this.$store.state.user.id);
        this.userData = JSON.parse(localStorage.getItem('user'));
        console.log(this.userData.consumer_id);
        await axios.get(`/api/consumerPachiPoint/${this.userData.consumer_id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            console.log("1111" +res);
            console.log("1111" +res.headers);
         
            this.pachiPoint = res.data;
            console.log(res);
        }).catch(error => {
            console.log(err);      
            alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
            this.$store.commit('LOGOUT');
            this.$router.push('/login');   
        });
        
        axios.get(`/api/consumerCountAuction/${this.userData.consumer_id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            console.log("1111" +res);
            console.log("1111" +res.headers);
            console.log("1111" +res.headers);
            this.pachiCount = res.data;

        }).catch(error => {
            console.log(err);      
            alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
            this.$store.commit('LOGOUT');
            this.$router.push('/login');               
        });
    }
}
</script>
<style lang="scss" scoped>
img{
    border-radius: 50%;
}
.mypage_contain{
    height: 85vh;
    .fieldContain{
        margin-top: -50px;
    }
    .goods_info{
        .guide2{
            font-size: 18px;
            font-weight: 600;
            line-height: 1.4;
        }
    }
}
.fpmgBt1{
    width: 100%;
    height: 45px;
    font-size: 17px;
    text-align: center;
    color: #333;
    font-weight: 600;
}
</style>