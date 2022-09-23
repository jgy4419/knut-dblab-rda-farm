<template>
    <div class="mypage_contain">
        <Header :headerProps="headerProps"/>

        <fieldset>
            <div class="goods_group">
                <ul class="goods_group_list">
                    <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                        <div class="goods_item">
                            <a href="/orderStatus/2022021339733581" class="goods_thumb">
                                <img class="circle_image" :src="userData.c_profile_img === null ? 'https://image.msscdn.net/mfile_s01/_simbols/_basic/d.png' :  userData.c_profile_img"
                                alt="" width="90"
                                    height="90"></a>
                            <div class="goods_info">
                                <p class="guide2">
                                    사용자명 : {{userData.c_name}}
                                </p>
                                <p class="guide2">
                                    대표자 : {{userData.username}}
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
                <li><button type="button" class="fpmgBt2" onclick="location.href='/#'">적립금</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='/#'">10</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='/#'">50,000</button></li>
            </ul>
        </fieldset>

        <fieldset>
            <ul class="button-100">
                
                <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_auction'">
                    <router-link to='/farm_mypage_auction'>경매 내역</router-link></button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_keep'">찜한목록</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_get_review'">이용후기</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='ServiceCenter'">고객센터</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='consumer_profile'">개인정보 수정</button></li>
                <li><button type="button" class="fpmgBt1" onclick="location.href='/'">로그아웃</button></li>
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
            userData: {}
        }
    },
    mounted(){
        this.userData = this.$store.state.login.userInfo;
        console.log(this.userData.consumer_id);
        axios.get(`/api/consumetPachiPoint/${this.userData.consumer_id}`)
        .then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }
}
</script>
<style lang="scss" scoped>
img{
    border-radius: 50%;
}
.mypage_contain{
    height: 85vh;
    .goods_info{
        .guide2{
            font-size: 18px;
            font-weight: 600;
            line-height: 1.4;
        }
    }
}
</style>