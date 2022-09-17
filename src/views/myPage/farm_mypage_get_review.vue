<template>
<div>
    <div class="main_nav_t_div">
        <nav class="main_t_nav">
            <ul class="main_t_nav_list">
                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link"><i class="fas fa-bars fa-2x" aria-hidden="true"></i>
                    </a>
                </li>


                <li class="main_m_li_list">
                    <a class="nav_m_link" href="workout.html">
                        <h4 class="user-component__title">이용 후기</h4><i class=" fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>
                <li class="nav__btn">
                    <a class="nav__link" onclick="goBack()"><i class="fas fa-chevron-left fa-2x" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <fieldset>
        <div class="main_nav_t_review_div">
            <div class="lnb_area ">
                <div class="lnb_inner">
                    <div id="menu">
                        <ul class="menu50">
                            <li class="m1 "><a href="farm_mypage_post_review" onclick="">
                                    <span class="tx">내가 쓴 리뷰</span></a></li>
                            <li class="m2 on"><a href="farm_mypage_get_review" onclick="">
                                    <span class="tx">내가 받은 리뷰</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>

    <fieldset>
        <div class="white_div">
            <div class="goods_pay_section ">
                <div class="goods_group">
                    <ul class="goods_group_list">

                        <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                            <div class="goods_item">
                                <a href="/orderStatus/2022021339733581" class="goods_thumb">
                                    <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt=""
                                        width="90" height="90"></a>
                                <div class="goods_info">

                                    <p class="guide2">
                                        못난이 사과 10kg
                                    </p>
                                    <p class="guide2">
                                        ★ ★ ★ ★ ★
                                    </p>
                                </div>
                            </div>
                            <div class="seller_item">
                                <div class="inner">

                                    <span class="seller">경북 사과</span>
                                    <span class="tel">1544-0967</span>
                                    <a href="#"
                                        class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022021381488661)) _stopDefault">문의하기</a>
                                </div>
                            </div>



                        </li>
                    </ul>
                </div>
                <div class="goods_group">
                    <ul class="goods_group_list">
                    </ul>
                </div>
                <div class="goods_group">
                    <ul class="goods_group_list">

                        <li id="_rowLi20220203162708CHK2022020394386781"
                            class="goods_pay_item _interlockNo20220211200904406814">
                            <div class="goods_item">
                                <a href="/orderStatus/2022020310590721" class="goods_thumb">
                                    <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMjRfNTYg%2FMDAxNjQzMDE2OTI0OTE3.sGUYSxRlbhHLUx01LG12J2BdlpAWLqEWRe4fBU1STJYg.5t5K7bCjtwGN9snpWHakkj4-VXlyUO6mu9-68YxmuUUg.PNG.dd_hee1111%2F1.png&amp;type=sc960_832"
                                        alt="" width="90" height="90"></a>
                                <div class="goods_info">

                                    <p class="guide2">
                                        못난이 복숭아 10kg
                                    </p>
                                    <p class="guide2">
                                        ★ ★ ★ ★ ★
                                    </p>
                                </div>
                            </div>
                            <div class="seller_item">
                                <div class="inner">

                                    <span class="seller">1st 복숭아</span>
                                    <span class="tel">070-8095-3177</span>
                                    <a href="#"
                                        class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022020394386781)) _stopDefault">문의하기</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </fieldset>

<bottom-nav></bottom-nav>
</div>
</template>


<script>
import bottomNav from '@/components/bottomNav.vue';
import axios from "axios";

export default {
    components: {bottomNav},
    methods() {
      axios.get='/getAuctionReview/{checkUser}/id';  
    },

}
</script>

<style>

</style>