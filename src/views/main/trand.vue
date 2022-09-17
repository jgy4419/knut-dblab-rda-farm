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
        <h4 class="h4_middle_20">9월은 추석으로 과일 소비량 증가</h4>
        <button class="button_little">추석 성수기 출하 및 가격 전망 (전년 대비 증감률)</button>
        <h4 class="h4_middle_17_left">출하 전망</h4>
        <h4 class="h4_middle_17_right">가격 전망</h4>
        <div class="div50_left">
            <input type="image" src="/images/trand1.jpg" class="trand_image3">
        </div>
        <div class="div50_right">
            <input type="image" src="/images/trand2.jpg" class="trand_image3">
        </div>
    </fieldset>

    <button class="button_little">9월 주요 과일 출하 및 가격 전망 (전년 대비 증감률)</button>
    <input type="image" src="/images/trand3.jpg" class="trand_image3">
    <fieldset>
        <div class="div12_left">출하량</div>
        <div class="div12_middle">20%</div>
        <div class="div12_middle">30%</div>
        <div class="div12_middle">-40%</div>
        <div class="div12_middle">-10%</div>
        <div class="div12_middle">5%</div>
        <div class="div12_middle">-7%</div>
        <div class="div12_right">0%</div>
        <div class="div12_left">가격</div>
        <div class="div12_middle">상승</div>
        <div class="div12_middle">상승</div>
        <div class="div12_middle">하락</div>
        <div class="div12_middle">하락</div>
        <div class="div12_middle">상승</div>
        <div class="div12_middle">하락</div>
        <div class="div12_right">유지</div>
    </fieldset>

<bottom-nav></bottom-nav>
</div>
</template>


<script>
import bottomNav from '@/components/bottomNav.vue';

export default{
    components: {bottomNav},
}
</script>

<style>

</style>