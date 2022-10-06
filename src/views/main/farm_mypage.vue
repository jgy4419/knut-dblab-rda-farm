<template>
<div class="mypage-contain">
    <div class="inner">
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
                <li v-for="data, i in ['경매횟수', '나의 파치포인트', pachiCount, pachiPoint]" :key="i">
                    <button type="button" :class="usingData.className[i]">{{data}}</button>
                </li>
            </ul>
        </fieldset>

        <fieldset>
            <ul class="button-100">
                <li v-for="data, i in usingData.title.length" :key="i">
                    <router-link :to='usingData.url[i]'>
                        <button type="button" class="fpmgBt1">{{usingData.title[i]}}</button>
                    </router-link>
                </li>
                <li><button type="button" class="logout-button" @click="logout()">로그아웃</button></li>
            </ul>
        </fieldset>
    </div>

    <bottom-nav class="bottom"/>
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
            usingData: {
                className: ['fpmgBt2', 'fpmgBt2', 'fpmgBt1', 'fpmgBt1'],
                url: ['/farm_mypage_auction', '/farm_mypage_get_review', 
                '/ServiceCenter', '/farm_profile'],
                title: ['경매 내역', '이용후기', '고객센터', '개인정보 수정']
            }
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
            this.pachiPoint = res.data;
            console.log(res);
        }).catch(error => {
			console.log(err); 
			// if(res.headers.token != "token"){     
			// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
			// 	this.$store.commit('LOGOUT');
			// 	this.$router.push('/login');
			// }
            console.log(error)
        });
        
        axios.get(`/api/farmCountAuction/${this.userData.farm_id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {


            this.pachiCount = res.data;
        }).catch(error => {
			console.log(err); 
			// if(res.headers.token != "token"){     
			// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
			// 	this.$store.commit('LOGOUT');
			// 	this.$router.push('/login');
			// }
        });
    }
}
</script>

<style lang="scss" scoped>
.inner{
    min-height: 95vh;
    .goods_group{
        margin-top: -50px;
        .goods_info{
            p{
                font-size: 16px;
                font-weight: 700
            }
        }
    }
}
.bottom{
    position: fixed;
    bottom: 0;
}
.fpmgBt1{
    height: 40px;
    font-size: 16x;
    font-weight: 600;
    color: #333;
    text-align: center;
}
.logout-button{
    font-size: 16px;
    margin-top: -10px;
    font-weight: 600;
}
</style>