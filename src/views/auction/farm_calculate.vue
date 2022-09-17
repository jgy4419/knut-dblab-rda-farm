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
                        <h4 class="user-component__title">정산금액 입금</h4><i class=" fa-2x" aria-hidden="true" image
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
    <h2 class="profile_loc_h2">결제 상품</h2>

  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

    <fieldset>
        <div class="aside_area aside_popular">
            <h3 class="h_popular"><span></span></h3>
            <table class="tbl_home">
                <tbody>
                    <tr>
                        <th>맛있는 딸기</th>
                        <td>10kg</td>
                    </tr>
                    <tr>
                        <th>낙과 일자</th>
                        <td>2022.02.19</td>
                    </tr>
                    <tr>
                        <th>사이즈</th>
                        <td>중</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>상</td>
                    </tr>
                    <tr>
                        <th>낙찰된 가격</th>
                        <td>50,000 원</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </fieldset>

    <fieldset>
        <div class="aside_area aside_popular">
            <div class="gray_div">
                <h3 class="h_popular"></h3>
                <table class="tbl_home">
                    <tbody>
                        <tr>
                            <th class="whitefont">상품금액</th>
                            <td class="whitefont"> 50,000 원</td>
                        </tr>
                        <tr>
                            <th class="whitefont">수수료 (10%)</th>
                            <td class="whitefont">5,000 원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </fieldset>

    <fieldset>
        <div class="aside_area aside_popular">
            <h3 class="h_popular"></h3>
                <table class="tbl_home">
                    <tbody>
                        <tr>
                            <th class="font15">최종입금금액</th>
                            <td class="font15">55,000 원</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </fieldset>
    <div class="main_nav_b_div">
        <nav class="main_b_nav">
            <ul class="main_m_ui_list">
                <li class="nav__btn">
                    <a class="nav__link" href="farm_calculate_clear">
                        <h4 class="user-component__title">정산하기</h4>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            items: [
            {
                src: 'https://images.mypetlife.co.kr/content/uploads/2018/06/09160331/strawberries-red-fruit-royalty-free-70746-1024x768.jpeg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
            },
            ],
        }
    },
}
</script>

<style>

</style>