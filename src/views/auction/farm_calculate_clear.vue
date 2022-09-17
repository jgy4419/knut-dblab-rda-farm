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
                        <h4 class="user-component__title">정산 완료</h4><i class=" fa-2x" aria-hidden="true" image
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

    <div class="sh_group">
        <div class="sh_header">
            <div id="map1" style="width:auto;height:700px;">
                <header class="welcome-header1">
                    <h1 class="welcome-header__title1">정 산 완 료</h1>
                </header>

                <fieldset>
                    <div class="aside_area aside_popular">
                        <h3 class="h_popular"><span></span></h3>
                        <table class="tbl_home">
                            <tbody>
                                <tr>
                                    <th class="font16">주문번호</th>
                                    <td class="font16">23458921231231234</td>
                                </tr>
                                <tr>
                                    <th class="font16">제품명</th>
                                    <td class="font16">맛있는 딸기</td>
                                </tr>
                                <tr>
                                    <th class="font16">입금가격</th>
                                    <td class="font16">55,000 원</td>
                                </tr>
                                <tr>
                                    <th class="font16">입금수단</th>
                                    <td class="font16">계좌이체</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>

                <header class="welcome-header1">
                    <h4 class="user-component__title">입금은 정산일 이후로 <br>7일 정도 소요됩니다.</h4>
                </header>
            </div>
        </div>
        <p></p>
    </div>

    <div class="main_nav_b_div">
        <nav class="main_b_nav">
            <ul class="main_m_ui_list">
                <li class="nav__btn">
                    <a class="nav__link" href="calculate_clear">
                        <h4 class="user-component__title">확인</h4>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>


<script>

</script>

<style>

</style>