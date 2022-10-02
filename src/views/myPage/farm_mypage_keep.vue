<template>
<div>
    <Header :headerProps="headerProps"/>
    <fieldset>
        <div class="goods_pay_section ">
            <div v-for="data, i in resData.length" :key="i" class="goods_group" v-on:click="navigateAuction(resData[i].auction_Id)">
                <ul class="goods_group_list">
                    <li id="_rowLi20220213173042CHK2022021381488661" class="goods_pay_item ">
                        <div class="goods_item">
                            <div class="goods_thumb">
                                <img :src='`/product_images/${resData[i].product_img_name}.png`'
                                    alt="" width="90" height="90" />
                            </div>
                            <div class="goods_info">
                                <div class="goods">
                                    <p class="name">
                                        {{resData[i].auction_name}} ({{resData[i].p_status}})
                                    </p>
                                    <ul class="info">
                                        <li><span class="blind">상품금액</span>{{resData[i].a_max_price.toLocaleString()}}원</li>
                                    </ul>
                                </div>
                                <div class="state _statusName value_color_green _click(nmp.front.order.timeline.home.list.openDeliveryPopup(/o/orderStatus/deliveryTracking/2022021381488661/ORDER_DELIVERY/api)) _stopDefault">경매중
                                    ({{deadline_date[i]}} 경매 종료)</div>
                                <p class="guide">
                                    {{resData[i].p_explanation}}
                                </p>
                            </div>
                        </div>
                        <div class="seller_item">
                            <div class="inner">
                                <span class="seller">{{resData[i].product}}</span>
                                <span class="tel">1544-0967</span>
                                <li class="date"><span class="blind">경매 종료 날짜</span> {{deadline_date[i]}}</li>
                                <router-link to="/ServiceCenter"><p class="state_button qna _click(nmp.front.order.timeline.home.list.shoppingInquiry(/merchant/shoppingInquiry/2022021381488661)) _stopDefault">
                                문의하기</p></router-link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </fieldset>
    <button class="more-data" @click="moreProduct()">더보기</button>
    <!-- <button @click="$router.push('/auction')" class="auction_link_button">경매장으로 가기</button> -->
</div>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header/backHeader.vue';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            headerProps: '찜한 목록',
            limit: 0,
            resData: [],
            deadline_date: [],
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    components: {
        Header,
    },
    async mounted(){
        this.moreProduct();
    },
    methods: {
        async moreProduct(){
            await axios.get(`/api/getWishList/${this.user.consumer_id}/${this.limit}`, {
            headers: {
                TOKEN: this.user.token
            }
            }).then(res => {
                this.resData.push(...res.data);
                console.log(this.user.consumer_id);
                console.log(this.limit);
                console.log(res.data);
                for(let i = 0; i < this.resData.length; i++){
                    this.deadline_date.push(dayjs(this.resData[i].deadline_date).format("YY-MM-DD"));
                }
                this.limit += 4;
                console.log(this.limit);
            }).catch(err => {
                console.log(err); 
                // if(res.headers.token != "token"){     
                //     alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }           
            });
        },
        navigateAuction (auction_Id) {
            axios.get(`/api/auctionInfo/${auction_Id}`, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                console.log(res.data);
                this.$router.push({name:'auction_detail', params: { id: auction_Id, auction: JSON.stringify(res.data) }});
            }).catch(err => {
                console.log(err); 
                // if(res.headers.token != "token"){     
                // 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                // 	this.$store.commit('LOGOUT');
                // 	this.$router.push('/login');
                // }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.goods_pay_item{
  position: relative;
  width: 100%;
  height: 120px;
  .goods_item{
    left: 0;
    width: 100%;
    height: 100%;
    .goods_info{
      .goods{
        height: 50px;
        .info{
          height: 50px;
          li{
            border: 0;
            
          }
        }
      }
    }
  }
  .seller_item{
    height: 100px;
    .inner{
      height: 100px;
      .date{
            border: 0;
            height: 20px;
            margin-bottom: 10px;
            font-size: 10px;
            color: lightgrey;
            font-weight: 700;
      }
      .state_button{
         // margin-bottom: 50px;
      }
    }
  }
}
.more-data, .auction_link_button{
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: 700;
    background-color: #FFC1AA;
}
</style>