<template>
    <!-- 클릭하면 해당 경매 사이트로 이동시켜주기 -->
    <div class="alert-box-contain">
        <div class="alert-box">
            <img :src=" `/product_images/${alertData.product_img_name}.png`" alt="알림 이미지"
            width="50" height="50">
            <div class="alert-information">
                <p></p>
                <p class="alert-user">{{alertData.f_farm_name}}</p>
                <p class="alert-title">{{alertData.auction_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            alertState: 0,
            checkUser: null,
            id: null,
            user: JSON.parse(localStorage.getItem("user")),
            alertData: {},
        }
    },
    methods: {
        modalToggle(){
            console.log('열리는 중~~');
            let alertModal = document.querySelector('.alert-box-contain');
            alertModal.classList.add('event');
            setTimeout(() => {
                alertModal.classList.remove('event');
            }, 3000);
        },
        checkAlert(){
            if (this.user.farm_id == undefined) {
            this.checkUser = 'consumer'
            this.id = this.user.consumer_id
            } else {
                this.checkUser = 'farm'
                this.id = this.user.farm_id
            }
            if(localStorage.getItem('user')){
                this.$sse.create(`https://118.67.134.38:80/api/subscribeAlert/` + this.checkUser + '/' + this.id)
                .on('init', (init_data) => {
                    console.log('init: ', JSON.parse(init_data));
                    this.$store.commit('INIT_ALERT_LIST', JSON.parse(init_data));
                })
                .on('alert', (alert_data) => {
                    let data = JSON.parse(alert_data);
                    console.log('받은 데이터', data);
                    // 알림 데이터 넣기
                    this.alertData = data;
                    // 페이지에 보여줄 코드 작성 
                    this.$store.commit('PUSH_ALERT_LIST', data);
                    this.modalToggle();
                })
                .on('error', (err) => console.error('Failed to parse or lost connection:', err))
                .connect()
                .catch((err) => console.error('Failed make initial connection:', err));
            }else if(!JSON.parse(localStorage.getItem('user'))){
                this.$router.push('/login');
            }
        }
    },
    mounted(){
        // 로그인 했을 때 실행되도록 하기
        // if (this.user.farm_id == undefined) {
        //     this.checkUser = 'consumer'
        //     this.id = this.user.consumer_id
        // } else {
        //     this.checkUser = 'farm'
        //     this.id = this.user.farm_id
        // }
        if(localStorage.getItem('user')){
            console.log('mounted 실행');
            this.checkAlert();
        }
    },
}
</script>

<style lang="scss" scoped>
.alert-box-contain{
    position: fixed;
    width: 100%;
    right: 0;
    z-index: 100;
    top: 20%;
    transition: .7s;
    transform: translateX(200px);
    opacity: 0;
    .alert-box{
        position: absolute;
        margin-top: 40px;
        display: flex;
        padding: 5px;
        background-color: rgb(232, 232, 232);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        right: 0;
        width: 150px;
        height: 80px;
        img{
            margin-top: 10px;
            margin-right: 10px;
        }
        p{
            margin-top: 5px;
            font-size: 12px;
            width: 70px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .alert-user{
            font-size: 14px;
            font-weight: 700;
            color: rgb(124, 122, 122);
        }
        .alert-title{
            margin-top: 10px;
            font-weight: 500;
        }
    }
}
.alert-box-contain.event{
    opacity: 1;
    transform: translateX(0px);
}
</style>