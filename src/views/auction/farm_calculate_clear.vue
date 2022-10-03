<template>
<div>
    <Header :headerProps="headerProps"/>
    <Slide :imgData="imgData"/>
    <!-- <div class="main_nav_t_div">
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
    </div> -->

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
                                    <th class="font16">결제 번호</th>
                                    <td class="font16">{{order.paymentDTO.payment_id}}</td>
                                </tr>
                                <tr>
                                    <th class="font16">경매명</th>
                                    <td class="font16">{{order.bidding.auction_name}}</td>
                                </tr>
                                <tr>
                                    <th class="font16">지불액</th>
                                    <td class="font16">{{order.paymentDTO.payment_amount}}원</td>
                                </tr>
                                <tr>
                                    <th class="font16">결제 수단</th>
                                    <td class="font16">카드</td>
                                </tr>
                                <tr>
                                    <th class="font16">배송 번호</th>
                                    <td class="font16">{{order.deliveryDTO.delivery_id}}</td>
                                </tr>
                                <tr>
                                    <th class="font16">배송 상태</th>
                                    <td class="font16">{{order.deliveryDTO.d_status}}</td>
                                </tr>
                                <tr>
                                    <th class="font16">우편번호</th>
                                    <td class="font16">{{order.deliveryDTO.zipcode}}</td>
                                </tr>
                                <tr>
                                    <th class="font16">배송지</th>
                                    <td class="font16">{{order.deliveryDTO.destination}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>

                <!-- <header class="welcome-header1">
                    <h4 class="user-component__title">입금은 정산일 이후로 <br>7일 정도 소요됩니다.</h4>
                </header> -->
            </div>
        </div>
        <p></p>
    </div>

    <div class="main_nav_b_div">
        <nav class="main_b_nav">
            <ul class="main_m_ui_list">
                <li class="nav__btn">
                    <h4 class="user-component__title" v-on:click="navigateMyPageAuction()">확인</h4>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>


<script>
import axios from 'axios';
import Header from '../../components/Header/backHeader.vue';
import Slide from '../../components/slide.vue';

export default {
    components: { Header, Slide },
    data(){
        return{
            headerProps: '결제 완료',
            auctionState: true,
            user: JSON.parse(localStorage.getItem("user")),
            checkUser: localStorage.getItem('checkUser'),
            order: null,
            imgData: [],
        }
    },
    created() {
        console.log('arr', this.$route.params.auction);
        
        this.order = JSON.parse(this.$route.params.order);

        console.log('주문 정보', this.order);

        // 해당 경매 관련 이미지 여러 개 넣기
        let auctionImagesLength = this.order.bidding.product_img_name[this.order.bidding.product_img_name.length-1];
        console.log('img', auctionImagesLength)
        for(let i = 0; i < auctionImagesLength; i++){
            this.imgData.push(this.order.bidding.product_img_name.replace('(0)', `(${i})`))
        }
        console.log('pushImg', this.imgData);
    },
    methods: {
        navigateMyPageAuction() {
            this.$router.push({name:'farm_mypage_auction'});
        },
    }
}
</script>

<style>

</style>