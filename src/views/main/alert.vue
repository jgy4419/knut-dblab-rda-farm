<template>
<div>
    <Header :headerProps="headerProps"/>
    <div class="inner">
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
import axios from 'axios'
export default {
    components: {
        Header
    },
    data() {
        return {
            headerProps: '경매 알림',
            // 나중에 Store나 로컬스토리지에 있는 사용자 데이터로 변경해서 사용
            checkUser: null,
            id: null,
            user: JSON.parse(localStorage.getItem("user")),
            getData: [],
        }
    },
    mounted() {
        // console.log('집어넣을 데이터', this.$store.state.alertList[69].f_farm_name);
        // 로그인 했을 때 실행되도록 하기
        if (this.user.farm_id == undefined) {
            this.checkUser = 'consumer'
            this.id = this.user.consumer_id
        } else {
            this.checkUser = 'farm'
            this.id = this.user.farm_id
        }
        console.log(this.checkUser + '/' + this.id);

        this.$sse.create(`https://118.67.134.38:80/api/subscribeAlert/` + this.checkUser + '/' + this.id)
        .on('init', (init_data) => {
            console.log('initssss', init_data);
            this.$store.commit('INIT_ALERT_LIST', JSON.parse(init_data));
        })
        .on('alert', (alert_data) => {
            let data = JSON.parse(alert_data);
            // 페이지에 보여줄 코드 작성 
            this.$store.commit('PUSH_ALERT_LIST', data);

        })
        .on('error', (err) => console.error('Failed to parse or lost connection:', err))
        .connect()
        .catch((err) => console.error('Failed make initial connection:', err));
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

    }

}
</script>