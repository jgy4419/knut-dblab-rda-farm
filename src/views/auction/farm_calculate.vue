<template>
<div>
    <Header :headerProps="headerProps"/>
    <Slide :imgData="imgData"/>
    <h2 class="profile_loc_h2">결제 상품</h2>

    <fieldset>
        <div class="aside_area aside_popular">
            <h3 class="h_popular"><span></span></h3>
            <table class="tbl_home">
                <tbody>
                    <tr 
                    v-for="data, i in [auction.auction_name, `${auction.product_kg}kg`, auction.p_drop_date.slice(0, 19).replace('T', ' '),
                    auction.size, auction.p_status, `${auction.bid_price.toLocaleString()}원`]" :key="i">
                        <th>{{title[i]}}</th>
                        <td>{{data}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </fieldset>
    <hr class="line"/>
    <fieldset>
        <div class="aside_area aside_popular">
            <div class="gray_div">
                <h3 class="h_popular"></h3>
                <table class="tbl_home">
                    <tbody>
                        <tr>
                            <th class="whitefont">수수료 (5%)</th>
                            <td class="whitefont">{{fee.toLocaleString()}}원</td>
                        </tr>
                        <tr>
                            <th class="whitefont">상품금액</th>
                            <td class="whitefont">{{auction.bid_price.toLocaleString()}}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </fieldset>
    <hr class="line"/>
    <fieldset>
        <div class="aside_area aside_popular">
            <h3 class="h_popular"></h3>
                <table class="tbl_home">
                    <tbody>
                        <tr>
                            <th class="font15">최종입금금액</th>
                            <td class="font15">{{paymentAmount.toLocaleString()}}원</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </fieldset>
    <div class="main_nav_b_div">
        <nav class="main_b_nav">
            <ul class="main_m_ui_list">
                <li class="nav__btn">
                    <button class="user-component__button" @click="pay()">정산하기</button>
                </li>
            </ul>
        </nav>
    </div>
</div>
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import Slide from '../../components/slide.vue';
import axios from "axios"

export default {
    components: { Header, Slide },
    data() {
        return {
            headerProps: '경매 결제',
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
            user: JSON.parse(localStorage.getItem("user")),
            auction: null,
            fee: null,
            paymentAmount: null,
            imgData: [],
            orderDTO: {},
            title: ['상품이름', '무게', '낙과 일자', '사이즈', '상태', '낙찰된 가격']
        }
    },
    created() {
        document.cookie = "safeCookie1=foo; SameSite=Lax";
        document.cookie = "safeCookie2=foo";
        document.cookie = "crossCookie=bar; SameSite=None; Secure";

        console.log('arr', this.$route.params.auction);
        if(this.$route.params.auction == undefined) this.$router.push({name:'farm_mypage_auction'});

        this.auction = JSON.parse(this.$route.params.auction);
        console.log('경매 정보', this.auction);
        this.fee = this.auction.bid_price / 100 * 5;
        this.paymentAmount = this.auction.bid_price + this.fee;
        this.orderDTO.paymentDTO = {};
        this.orderDTO.paymentDTO.auction_Id = this.auction.auction_Id;
        this.orderDTO.paymentDTO.payment_amount = this.paymentAmount;
        this.orderDTO.paymentDTO.pay_method = 'card';
        this.orderDTO.deliveryDTO = {};
        this.orderDTO.deliveryDTO.zipcode = this.user.c_zipcode;
        this.orderDTO.deliveryDTO.destination = this.user.c_location + ' ' + this.user.c_detail_location;
        this.orderDTO.auction_Id = this.auction.auction_Id;
        this.orderDTO.bidding = {};
        this.orderDTO.bidding.auction_Id = this.auction.auction_Id;
        this.orderDTO.bidding.bid_price = this.paymentAmount;
        this.orderDTO.bidding.farm_id = this.auction.farm_id;
        this.orderDTO.bidding.consumer_id = this.auction.consumer_id;
        this.orderDTO.bidding.auction_name = this.auction.auction_name;
        this.orderDTO.bidding.f_farm_name = this.auction.f_farm_name;
        this.orderDTO.bidding.c_name = this.auction.c_name;
        this.orderDTO.bidding.product_img_name = this.auction.product_img_name;

        let auctionImagesLength = this.auction.product_img_name[this.auction.product_img_name.length-1];
        console.log('img', auctionImagesLength)
        for(let i = 0; i < auctionImagesLength; i++){
            this.imgData.push(this.auction.product_img_name.replace('(0)', `(${i})`))
        }
        console.log('pushImg', this.imgData);
    },
    watch: {
        '$route'(){
            alert('초기화 되었습니다.');
            location.reload();
        }
    },
    methods: {
        navigateAuctionPayment() {
            this.$router.push({name:'payment'});
        },
        pay(){
            IMP.init("imp87328402");

            IMP.request_pay({ // param
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: (new Date()).getTime().toString(),
                // merchant_uid: "ORD20180131-0000012",
                name: "낙과 경매 플랫폼 PACHI",
                amount: this.paymentAmount,
                buyer_email: this.user.c_email,
                buyer_name: this.user.c_name,
                buyer_tel: this.user.c_phonenum.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{1}|^0[0-9]{4})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"),
                buyer_addr: this.user.c_location,
                buyer_postcode: this.user.c_zipcode
            }, res => {   
                console.log(res);
                if (res.success) {
                    console.log("결제 성공");
                    axios.post('/api/payment', this.orderDTO, {
                        headers: {
                            TOKEN: this.user.token,
                        }
                    }).then(res => {
                        // if(res.headers.token != "token"){           
                        //     this.$store.commit('LOGOUT');
                        //     this.$router.push('/login');
                        // }
                        console.log(res.data);
                        this.$router.push({name:'farm_calculate_clear', params: { id: this.orderDTO.paymentDTO.auction_Id, order: JSON.stringify(res.data)}});
                    })
                    .catch(err => {
                        console.log(err);  
                    });
                } else {
                    console.log("결제 실패");
                    alert("결제 실패하셨습니다.");
                    this.$router.go(-1);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.aside_area{
    padding: 10%;
    th{
        font-weight: 600;
        color: #333;
        margin-top: 10px;
    }
    td{
        font-weight: 600;
        color: #fd8b61;
        // margin-top: 10px;
    }
}
.whitefont{
    background-color: #fff;
}
.user-component__button{
    position: fixed;
    width: 350px;
    height: 50px;
    background-color: #FFC1AA;
    color: #333;
    font-weight: 700;
    border-radius: 20px;
    bottom: 0;
    left: 0; right: 0;
    margin: auto;
}
.line{
    border: 1px solid rgb(231, 231, 231);
}
@media screen and (max-width: 500px){
    .user-component__button{
        width: 90%;
    }
}
</style>