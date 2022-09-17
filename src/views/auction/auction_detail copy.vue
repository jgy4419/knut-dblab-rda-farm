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

    <table class="tbl_home">
        <tr class="">
            <th>입찰 수</th>
            <td>333</td>
        </tr>

        <tr class="">
            <th>현재 가격</th>
            <td>{{auction.bid_price}}</td>
        </tr>
    </table>
    <form @submit.prevent="auction.bid_price">
        <v-text-field v-model="bid_price"></v-text-field>
        <v-btn @click="bid({auction_Id: auction.auction_Id, bid_price})">입찰</v-btn>
    </form>

    <fieldset>
        <h2 class="profileh2">상품 정보</h2>

        <div class="aside_area aside_popular">
            <h3 class="h_popular"></h3>
            <table class="tbl_home">
                <tbody>
                    <tr class="">
                        <th>{{auction.productDTO.product}}</th>
                        <td>{{auction.productDTO.product_kg}}kg</td>
                    </tr>

                    <tr class="">
                        <th>시작 가격</th>
                        <td>{{auction.a_starting_price}}원</td>
                    </tr>

                    <!-- <tr class="">
                        <th>현재 가격</th>
                        <td>{{auction.bid_price}}원</td>
                    </tr> -->

                    <tr class="">
                        <th>낙과 일자</th>
                        <td>{{auction.productDTO.p_drop_date}}</td>
                    </tr>

                    <tr class="">
                        <th>사이즈</th>
                        <td>{{auction.productDTO.size}} </td>
                    </tr>

                    <tr class="">
                        <th>상태</th>
                        <td>{{auction.productDTO.p_status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </fieldset>

    <h3 class="h3_middle">{{auction.productDTO.p_explanation}}</h3>
    <h2 class="profileh2">생산자 정보</h2>

        <div class="goods_group">
            <ul class="goods_group_list">
                <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                    <div class="goods_item">
                        <a href="/orderStatus/2022021339733581" class="goods_thumb">
                            <img :src='`http://localhost:8080/product_images/${auction.productDTO.product_img_name}.png`'
                                        alt="" width="90" height="90" /></a>
                            <!-- <img src="https://suhofarm.com/_upload/mall/20220112173148_86227.jpg" alt="" width="90" height="90"> -->
                        <div class="goods_info">

                            <p class="guide2">
                                농가명 : {{auction.f_farm_name}}
                            </p>
                            <p class="guide2">
                                대표자 : {{auction.f_name}}
                            </p>
                            <p class="guide2">
                                사업자 등록번호 : {{auction.f_num}}
                            </p>
                            <p class="guide2">
                                농가 주소 : {{auction.f_location}}
                            </p>
                            <p class="guide2">
                                연락처 : {{auction.f_phonenum}}
                            </p>
                        </div>
                    </div>
                    <div class="seller_item">
                        <div class="inner">

                            <span class="seller">{{auction.f_farm_name}}</span>
                            <span class="tel">{{auction.f_phonenum}}</span>
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
    // import { ref } from 'vue';

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
            auction: null
        }),
        created() {
            console.log(this.$route.params.auction);
            this.auction = JSON.parse(this.$route.params.auction)

            // for문 방식
            // console.log("this.$route.params.id");
            // console.log(this.$route.params.id);
            // for (let i = 0; i < this.$store.state.auctionList.length; i++) {
            //     console.log(this.$store.state.auctionList[i].auction_Id); 
            //     if(this.$route.params.id == this.$store.state.auctionList[i].auction_Id){
            //         this.auction = this.$store.state.auctionList[i]
            //         break;
            //     }
            // }
            console.log(this.auction);
        },
        
    }

</script>


<style>

</style>