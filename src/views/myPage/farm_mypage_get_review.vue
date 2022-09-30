<template>
<div>
    <Header :headerProps="headerProps"/>

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
</div>
</template>


<script>
import Header from '../../components/Header/backHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import axios from "axios";
// 리뷰 썼는지 안썼는지 보고 -> 각 경매내역 데이터들을 가지고 와서 
// checkUser,
// auction_Id, 
// grade_point, 
// consumer_review,
// farm_review,
// auction_name // 
export default {
    components: {Header, bottomNav},
    data(){
        return {
            headerProps: '이용후기',
            getData: [],
            userState: 'consumer',
            user: JSON.parse(localStorage.getItem("user")),
        }
    },
    async mounted(){
        if(!JSON.parse(localStorage.getItem('user').consumer_id)){
            this.userState = 'farm'
        }
        await axios.get(`/api/mypageAuctionDetails/${this.userState}/${JSON.parse(localStorage.getItem('user')).consumer_id}/${0}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            this.getData.push(res.data);
            this.getData = this.getData.flat();
            console.log(this.getData);
        }).catch(err => {
			console.log(err); 
			// if(res.headers.token != "token"){     
			// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
			// 	this.$store.commit('LOGOUT');
			// 	this.$router.push('/login');
			// }
    });
    },
    methods() {
    //   axios.get='/getAuctionReview/{checkUser}/id';  
    },

}
</script>

<style>

</style>