<template>
<div class="mypage-contain">
    <Header :headerProps="headerProps"/>

    <fieldset>
        <div class="goods_group">
            <ul class="goods_group_list">
                <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                    <div class="goods_item">
                        <a href="/orderStatus/2022021339733581" class="goods_thumb">
                            <img class="circle_image" :src="user.f_profile_img == null || user.f_profile_img == '' ? '/member_profile_images/base_image.png' : `/member_profile_images/${user.f_profile_img}.png`" alt="" width="90"
                                height="90"></a>
                        <div class="goods_info">
                            <p class="guide2">
                                농가명 : {{user.f_name}}
                            </p>
                            <p class="guide2">
                                대표자 : {{user.username}}
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
            <li><button type="button" class="fpmgBt1" onclick="location.href='/#'">{{pachiPoint}}</button></li>
        </ul>
    </fieldset>

    <fieldset>
        <ul class="button-100">
            
            <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_auction'"><router-link to='/farm_mypage_auction'>경매 내역</router-link></button></li>
            <li v-if=" user.consumer_id != undefined"><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_keep'">찜한목록</button></li>
            <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_get_review'">이용후기</button></li>
            <li><button type="button" class="fpmgBt1" onclick="location.href='ServiceCenter'">고객센터</button></li>
            <li><button type="button" class="fpmgBt1" onclick="location.href='farm_profile'">개인정보 수정</button></li>
            <li><button type="button" class="fpmgBt1" @click="logout()">로그아웃</button></li>
        </ul>
    </fieldset>

<bottom-nav></bottom-nav>
</div>
</template>

<script>
import Header from '@/components/Header/bellAndAddHeader';
import bottomNav from '@/components/bottomNav.vue';
import axios from 'axios';

export default {
    components: {bottomNav, Header},
    data(){
        return{
            headerProps: 'logo',
            user: JSON.parse(localStorage.getItem("user")),
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
        console.log(this.userData.farm_id);
        await axios.get(`/api/farmPachiPoint/${this.userData.farm_id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            if(res.headers.token != "token"){
                this.$store.commit('LOGOUT');
                this.$router.push('/login');
            }
            this.pachiPoint = res.data;
            console.log(res);
        }).catch(error => console.log(error));
        
        axios.get(`/api/farmCountAuction/${this.userData.farm_id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            if(res.headers.token != "token"){
                this.$store.commit('LOGOUT');
                this.$router.push('/login');
            }

            this.pachiCount = res.data;
        }).catch(error => console.log(error));
    }
}
</script>