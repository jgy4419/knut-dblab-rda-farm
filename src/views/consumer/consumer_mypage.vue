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
                    <a class="nav__link" href="main"><i class="fas fa-running fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>

                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link" href="auction"><i class="fas fa-plus fa-2x" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <fieldset>
        <div class="goods_group">
            <ul class="goods_group_list">
                <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                    <div class="goods_item">
                        <a href="/orderStatus/2022021339733581" class="goods_thumb">
                            <img class="circle_image" src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90"
                                height="90"></a>
                        <div class="goods_info">
                            <p class="guide2">
                                사용자명 : 김사용자
                            </p>
                            <p class="guide2">
                                대표자 : 김따과
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
            
            <li><button type="button" class="fpmgBt1" onclick="location.href='farm_mypage_auction'"><router-link to='/farm_mypage_auction'>경매 내역</router-link></button></li>
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
import bottomNav from '@/components/bottomNav.vue';

export default {
    components: {bottomNav},
}
</script>
<style>
</style>