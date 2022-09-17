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
                            <h4 class="user-component__title">경매 알림</h4><i class=" fa-2x" aria-hidden="true" image
                                src="../image/123.jpg"></i>
                        </a>
                    </li>

                    <li class="nav__btn">
                        <a class="nav__link" onclick="goBack()"><i class="fas fa-chevron-left fa-2x"
                                aria-hidden="true"></i>
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
            <div class="white_div">
                <div class="goods_pay_section ">
                    <div class="goods_group">
                        <ul class="goods_group_list">
                            <li v-for="product in product" :key="product.id"
                                id="_rowLi20220203162708CHK2022020394386781"
                                class="goods_pay_item _interlockNo20220211200904406814">
                                <div class="goods_item">
                                    <a href="/orderStatus/2022020310590721" class="goods_thumb">
                                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMjRfNTYg%2FMDAxNjQzMDE2OTI0OTE3.sGUYSxRlbhHLUx01LG12J2BdlpAWLqEWRe4fBU1STJYg.5t5K7bCjtwGN9snpWHakkj4-VXlyUO6mu9-68YxmuUUg.PNG.dd_hee1111%2F1.png&type=sc960_832"
                                            alt="" width="90" height="90"></a>
                                    <div class="goods_info">
                                        <a href="/orderStatus/2022020310590721" class="goods">
                                            <p class="name">
                                                {{product.p_name}}
                                            </p>
                                            <ul class="info">
                                                <li><span class="blind">상품금액</span>{{product.a_max_price}}원</li>
                                                <li class="date"><span class="blind">등록일</span> {{product.p_reg_date}}
                                                </li>
                                            </ul>
                                        </a>
                                        <a href="#"
                                            class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022020394386781/ORDER_DELIVERY/api)) _stopDefault">{{product.bid_status}}
                                            ({{product.deadline_date}} 경매 종료)</a>
                                        <p class="guide">
                                            {{product.p_explanation}}
                                        </p>
                                    </div>
                                </div>
                                <div class="seller_item">
                                    <div class="inner">

                                        <span class="seller">{{product.f_farm_name}}</span>
                                        <span class="tel">{{product.f_num}}</span>
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
    import { ref } from 'vue';

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

 

        setup() {
            // make users variable reactive with the ref() function
            //상품, 경매 정보, 농가 가져와야 함
            const product = ref([
                { product_id: '1', p_name: '난 1번', a_max_price: '111,111', p_reg_date: '22.05.01', bid_status: '경매중', deadline_date: '22.05.10', p_explanation: '작물 설명1', f_farm_name: '농가명1', f_num: '010-1111-1111', f_url: '농가url' },
                { product_id: '2', p_name: '난 2번', a_max_price: '2,222,222', p_reg_date: '22.05.02', bid_status: '경매중', deadline_date: '22.05.11', p_explanation: '작물 설명2', f_farm_name: '농가명2', f_num: '010-2222-2222', f_url: '농가url' },
                { product_id: '3', p_name: '난 3번', a_max_price: '33,333,333', p_reg_date: '22.05.03', bid_status: '경매중', deadline_date: '22.05.13', p_explanation: '작물 설명3', f_farm_name: '농가명3', f_num: '010-3333-3333', f_url: '농가url' },
                { product_id: '1', p_name: '난 1번', a_max_price: '111,111', p_reg_date: '22.05.01', bid_status: '경매중', deadline_date: '22.05.10', p_explanation: '작물 설명1', f_farm_name: '농가명1', f_num: '010-1111-1111', f_url: '농가url' },
                { product_id: '2', p_name: '난 2번', a_max_price: '2,222,222', p_reg_date: '22.05.02', bid_status: '경매중', deadline_date: '22.05.11', p_explanation: '작물 설명2', f_farm_name: '농가명2', f_num: '010-2222-2222', f_url: '농가url' },
                { product_id: '3', p_name: '난 3번', a_max_price: '33,333,333', p_reg_date: '22.05.03', bid_status: '경매중', deadline_date: '22.05.13', p_explanation: '작물 설명3', f_farm_name: '농가명3', f_num: '010-3333-3333', f_url: '농가url' },
                { product_id: '1', p_name: '난 1번', a_max_price: '111,111', p_reg_date: '22.05.01', bid_status: '경매중', deadline_date: '22.05.10', p_explanation: '작물 설명1', f_farm_name: '농가명1', f_num: '010-1111-1111', f_url: '농가url' },
                { product_id: '2', p_name: '난 2번', a_max_price: '2,222,222', p_reg_date: '22.05.02', bid_status: '경매중', deadline_date: '22.05.11', p_explanation: '작물 설명2', f_farm_name: '농가명2', f_num: '010-2222-2222', f_url: '농가url' },
                { product_id: '3', p_name: '난 3번', a_max_price: '33,333,333', p_reg_date: '22.05.03', bid_status: '경매중', deadline_date: '22.05.13', p_explanation: '작물 설명3', f_farm_name: '농가명3', f_num: '010-3333-3333', f_url: '농가url' },
            ]);

            return {
                product
            };
        }
        
    }

    
</script>

<style>
</style>