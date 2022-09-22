<template>
<div>
    <Header :headerProps="headerProps"/>

    <div class="main-screen">
        <fieldset>
            <ul class="goods_group">
                <li v-for="(alert, index) in this.$store.state.alertList" :key="alert.alert_id">
                    <div class="user-component">
                        <div class="user-component__column">
                            <img src="https://static.smalljoys.me/2020/08/2898992_mfwfp-ch_400x400_1597309435.jpg"
                                class="user-component__avatar user-component__avatar">
                            <div class="user-component__text">
                                <h4 class="user-component__title">{{alert.d_status}}</h4>
                                <h6 class="user-component__subtitle">내용    {{alert.auction_name}}</h6>
                            </div>
                        </div>
                        <button @click="checked(alert.alert_id, index)">확인여부  {{alert.checked}}</button>

                        <div class="user-component__column">
                        <span class="user-component__time">{{alert.time}}</span>
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
                    <a class="nav__link" href="auction"><h4 class="user-component__title">경매장으로 가기</h4>
                    </a>
                </li>
            </ul>
        </nav>
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
        }
    },
    mounted() {
        if (this.user.farm_id == undefined) {
            this.checkUser = 'consumer'
            this.id = this.user.consumer_id
        } else {
            this.checkUser = 'farm'
            this.id = this.user.farm_id
        }
        console.log(this.checkUser + '/' + this.id);

        this.$sse.create(`http://118.67.134.38:8080/api/subscribeAlert/` + this.checkUser + '/' + this.id)
        .on('init', (init_data) => {

            console.log('init: ');
            this.$store.commit('INIT_ALERT_LIST', JSON.parse(init_data));
        })
        .on('alert', (alert_data) => {

            this.$store.commit('PUSH_ALERT_LIST', JSON.parse(alert_data));
        })
        .on('error', (err) => console.error('Failed to parse or lost connection:', err))
        .connect()
        .catch((err) => console.error('Failed make initial connection:', err));
    },
    methods: {
        checked(alert_id, alertList_index){
            console.log("alert_id: " + alert_id);
            // axios를 이용해서 DB에 있는 checked 변경
            axios.patch(`/api/checkedAlert/${alert_id}`)
			.then(res => {
				console.log(res.data);
                if (res.data == 1){
                    this.$store.commit('CHECKED_ALERT', alertList_index);
                } else {
                    alert("읽음 표시 서버 에러!")
                }
			})
			.catch(err => {
				console.log(err);
			});

            
        },
        navigategoback() {
            this.$router.go(-1);
        },

    }

}
</script>

<style>

</style>