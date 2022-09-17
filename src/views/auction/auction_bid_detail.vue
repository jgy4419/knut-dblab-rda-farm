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

        <v-carousel v-model="model">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
                <v-sheet :color="color" height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <div class="text-h2">
                            Slide {{ i + 1 }}
                        </div>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>

        <fieldset>
            <h2 class="profileh2">인기 검색어</h2>

            <div class="aside_area aside_popular">
                <h3 class="h_popular"></h3>
                <table class="tbl_home">
                    <tbody>
                        <tr class="">
                            <th>못난이 복숭아</th>
                            <td>10kg</td>
                        </tr>

                        <tr class="">
                            <th>시작 가격</th>
                            <td>50,00원</td>
                        </tr>

                        <tr class="">
                            <th>현재 가격</th>
                            <td>90,600</td>
                        </tr>

                        <tr class="">
                            <th>낙과 일자</th>
                            <td>2022.02.19</td>
                        </tr>

                        <tr class="">
                            <th>사이즈</th>
                            <td>대 중 소</td>
                        </tr>

                        <tr class="">
                            <th>상태</th>
                            <td>상 중 하</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>

        <h3 class="h3_middle">설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명</h3>
        <h2 class="profileh2">생산자 정보</h2>

        <div class="goods_group">
            <ul class="goods_group_list">
                <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                    <div class="goods_item">
                        <a href="/orderStatus/2022021339733581" class="goods_thumb">
                            <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90"
                                height="90"></a>
                        <div class="goods_info">

                            <p class="guide2">
                                농가명 : 따과농과
                            </p>
                            <p class="guide2">
                                대표자 : 김따과
                            </p>
                            <p class="guide2">
                                사업자 등록번호 : 2349782431978
                            </p>
                            <p class="guide2">
                                농가 주소 : 충청북도 충주시 대학로 50
                            </p>
                            <p class="guide2">
                                연락처 : 010-2343-2342
                            </p>
                        </div>
                    </div>
                    <div class="seller_item">
                        <div class="inner">

                            <span class="seller">따과농과</span>
                            <span class="tel">1544-0967</span>
                            <a href="#"
                                class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022021381488661)) _stopDefault">문의하기</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <form action="farm_intro" class="login-form">
            <input class="login-form__btn" type="submit" value="농가 상세 소개">
        </form>

        <bottom-nav></bottom-nav>
    </div>
</template>



<script>
    import bottomNav from '@/components/bottomNav.vue';

    export default {
        name: 'App',
        components: { bottomNav },
        data: () => ({
            model: 0,
            colors: [
                'primary',
                'secondary',
                'yellow darken-2',
                'red',
                'orange',
            ],
        }),

    }
</script>

<style>

</style>