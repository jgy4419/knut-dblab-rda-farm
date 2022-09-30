<template>
<div>
    <Header :headerProps="headerProps"/>
    <div class="inner">
        <Spinner v-if="spinnerState === 1"/>
        <div class="main-screen">
            <fieldset>
                <ul class="goods_group">
                    <li v-for="alert, i in $store.state.alertList" :key="i">
                        <div class="user-component">
                            <div class="user-component__column">
                                <img :src="`/product_images/${$store.state.alertList[i].product_img_name}.png`"
                                    class="user-component__avatar" width="50" height="50">
                            </div>
                            <div class="user-component__text">
                                <h4 class="user-component__title">{{$store.state.alertList[i].auction_name}}</h4>
                                <h5 class="user-component__subtitle">{{$store.state.alertList[i].f_farm_name}}</h5>
                                <p class="user-component__content">{{checkUser === 'consumer' ? status.consumerAlert[i] : status.farmAlert[i]}}</p>
                                <!-- <h4 class="user-component__title">농가이름</h4>
                                <h5 class="user-component__subtitle">제목</h5> -->
                            </div>

                            <div class="user-component__column">
                                <p class="user-component__time">{{alert.time.slice(0, 10)}}</p>
                                <button class="check-button" @click="checked(alert.alert_id, i)">확인여부  {{alert.checked}}</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </fieldset>
        </div>

        <div id="imageDownloaderSidebarContainer">
            <div class="image-downloader-ext-container">
                <div tabindex="-1" class="b-sidebar-outer">
                    <div id="image-downloader-sidebar" tabindex="-1" role="dialog" aria-modal="false" aria-hidden="true"
                        class="b-sidebar shadow b-sidebar-right bg-light text-dark" style="width: 500px; display: none;">
                        <div class="b-sidebar-body">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <router-link class="nav__link" to="/auction">
                            <button class="aution_button">경매장으로 가기</button>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
    </div>
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import Spinner from '../../components/spinner.vue';
import axios from 'axios'
export default {
    components: {
        Header,
        Spinner
    },
    data() {
        return {
            headerProps: '경매 알림',
            // 나중에 Store나 로컬스토리지에 있는 사용자 데이터로 변경해서 사용
            checkUser: null,
            id: null,
            user: JSON.parse(localStorage.getItem("user")),
            getData: [],
            spinnerState: 1,
            checkUser: localStorage.getItem('checkUser'),
            status: {
                consumerAlert: [],
                beforeConsumerAlert: [],
                farmAlert: [],
            },
        }
    },
    mounted() {
        setTimeout(() => {
            this.spinnerState = 0;
            this.statusFunc();
            // this.getData.push();            
        }, 3000);

        this.checkUser = localStorage.getItem('checkUser');
        console.log(this.checkUser);
    },
    methods: {
        checked(alert_id, alertList_index){
            console.log("alert_id: " + alert_id);
            // axios를 이용해서 DB에 있는 checked 변경
            axios.patch(`/api/checkedAlert/${alert_id}`,{},{
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
				console.log(res.data);
                if (res.data == 1){
                    this.$store.commit('CHECKED_ALERT', alertList_index);
                } else {
                    alert("읽음 표시 서버 에러!")
                }
			}).catch(err => {
                // if(res.headers.token != "token"){
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }
			});

            
        },
        navigategoback() {
            this.$router.go(-1);
        },
        statusFunc(){
            let alertList = this.$store.state.alertList;
            for(let i = 0; i < alertList.length; i++){
                console.log(alertList[i]);
                switch(alertList[i].d_status){
                    case 0:
                        if(this.checkUser === 'farm'){
                            this.status.farmAlert.push(`${alertList[i].c_name}님이 입찰했습니다.`);
                            
                        }else{
                            this.status.consumerAlert.push(`${alertList[i].f_farm_name}님 것을 입찰했습니다.`);
                        }
                        break;
                    case 1:
                        console.log('alertList.pre_consumer_id: ' + alertList[i].pre_consumer_id);
                        console.log('this.user.consumer_id: ' + this.user.consumer_id);
                        if(this.checkUser === 'farm'){
                            this.status.farmAlert.push(`${alertList[i].c_name}님이 입찰했습니다.`)
                        }else{
                            if(alertList[i].pre_consumer_id === this.user.consumer_id){
                                this.status.consumerAlert.push(`${alertList[i].c_name}님이 ${alertList[i].auction_name}를 더 높은 가격에 입찰했습니다.`);
                            } else {
                                this.status.consumerAlert.push(`${alertList[i].f_farm_name}님 것을 입찰했습니다.`); 
                            }
                        }
                        break;
                    case 2:
                        if(this.checkUser === 'farm'){
                            this.status.farmAlert.push(`${alertList[i].c_name}님이 최대가에 입찰해서 마감되었습니다.`);
                        }else {
                            this.status.consumerAlert.push(`${alertList[i].f_farm_name}님의 경매를 최대가에 입찰했습니다.`);
                        }
                        break;
                    case 3:
                        if(this.checkUser === 'farm'){
                            if(alertList[i].consumer_id){
                                this.status.farmAlert.push('낙찰가 없이 경매가 마감되었습니다.');   
                            }else{
                                this.status.farmAlert.push(`${alertList[i].c_name}님이 낙찰하셨습니다.`);
                            }
                        }else{
                            this.status.consumerAlert.push(`${alertList[i].f_farm_name}님의 경매를 낙찰했습니다.`);
                        }
                        break;
                    case 4:
                        if(this.checkUser === 'farm'){
                            this.status.farmAlert.push(`${alertList[i].c_name}님이 ${alertList[i].auction_name}에 리뷰를 남겼습니다.`);   
                        }
                        break;
                    case 5:
                        if(this.checkUser === 'consumer'){
                            this.status.consumerAlert.push(`${alertList[i].f_farm_name}님이 ${alertList[i].auction_name}의 리뷰에 댓글을 남겼습니다.`);
                        }
                        break;
                    default:
                        return;
                }
                console.log('consumer', this.status.consumerAlert);
                // console.log('beforeConsumer', this.status.beforeConsumerAlert);
                console.log('farm', this.status.farmAlert);
            }
        }

    }

}
</script>