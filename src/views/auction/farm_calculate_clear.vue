<template>
<div>
    <Header :headerProps="headerProps"/>
    <Slide :imgData="imgData"/>

    <div class="sh_group">
        <div class="sh_header">
            <div id="map1">
                <header class="welcome-header1">
                    <h1 class="welcome-header__title1">정 산 완 료</h1>
                </header>

                <fieldset>
                    <div class="aside_area aside_popular">
                        <h3 class="h_popular"><span></span></h3>
                        <table class="tbl_home">
                            <tbody>
                                <tr class="item" 
                                v-for="data, i in [order.paymentDTO.payment_id, order.bidding.auction_name, order.paymentDTO.payment_amount,
                                '카드', order.deliveryDTO.delivery_id, order.deliveryDTO.d_status, order.deliveryDTO.zipcode, 
                                order.deliveryDTO.destination]" :key="i">
                                    <th class="font16">{{item.title[i]}}</th>
                                    <td class="font16">{{data}}</td>
                                </tr>
                                <!-- <tr class="item">
                                    <th class="font16">결제 번호</th>
                                    <td class="font16">{{order.paymentDTO.payment_id}}</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">경매명</th>
                                    <td class="font16">{{order.bidding.auction_name}}</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">지불액</th>
                                    <td class="font16">{{order.paymentDTO.payment_amount}}원</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">결제 수단</th>
                                    <td class="font16">카드</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">배송 번호</th>
                                    <td class="font16">{{order.deliveryDTO.delivery_id}}</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">배송 상태</th>
                                    <td class="font16">{{order.deliveryDTO.d_status}}</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">우편번호</th>
                                    <td class="font16">{{order.deliveryDTO.zipcode}}</td>
                                </tr>
                                <tr class="item">
                                    <th class="font16">배송지</th>
                                    <td class="font16 shipping-address">{{order.deliveryDTO.destination}}</td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                </fieldset>
            </div>
        </div>
        <p></p>
    </div>

    <div class="main_nav_b_div">
        <nav class="main_b_nav">
            <ul class="main_m_ui_list">
                <li class="nav__btn">
                    <button class="check_button" @click="navigateMyPageAuction()">확인</button>
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
            item: {
                title: ['결제 번호', '경매명', '지불액', '결제 수단', '배송 번호', '배송 상태', '우편번호', '배송지']
            }
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

<style lang="scss" scoped>
.sh_group{
    padding: 0;
    margin: 0;
    border: 0;
    // height: 100px;
    .sh_header{
        .welcom-header__title1{
            color: #333;
            font-size: 20px;
            font-weight: 900;
            padding: 0;
            margin-top: 20px;
        }
    }
}
.aside_area{
    margin-top: -30px;
    padding: 10%;
    .tbl_home{
        .item{
            line-height: 1.3;
            th{
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }
            td{
                font-size: 16px;
                font-weight: 600;
                color: #fd8b61;
            }
            .shipping-address{
                font-size: 12px;
            }
        }
    }
}
.whitefont{
    background-color: #fff;
}
.user-component__button{
    position: fixed;
    width: 95%;
    height: 50px;
    background-color: #FFC1AA;
    color: #333;
    font-weight: 700;
    border-radius: 20px;
    bottom: 0;
    left: 0; right: 0;
    margin: auto;
}
.check_button{
    position: fixed;
    background-color: #FFC1AA;
    height: 50px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #333;
    width: 350px;
    margin: auto;
    bottom: 0;
    left: 0;
    right: 0;
}
.line{
    border: 1px solid rgb(231, 231, 231);
}
@media screen and (max-width: 500px){
    .check_button{
        width: 90%;
    }
}
</style>