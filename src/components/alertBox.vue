<template>
    <!-- 클릭하면 해당 경매 사이트로 이동시켜주기 -->
    <div class="alert-box-contain">
        <div class="alert-box">
            <img :src=" `/product_images/${alertData.product_img_name}.png`" alt="알림 이미지"
            width="50" height="50">
            <div class="alert-information">
                <p class="alert-user">{{alertData.f_farm_name}}</p>
                <p class="alert-title">{{alertData.auction_name}}</p>
                <p class="alert-text">{{alertText}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            alertState: false,
            checkUser: localStorage.getItem('chekUser'),
            id: localStorage.getItem('id'),
            user: JSON.parse(localStorage.getItem('user')),
            alertData: {},
            alertText: '',
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
        alertSseInit(){
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
                    this.$store.commit('UNSHIFT_ALERT_LIST', data);
                    this.statusFunc(this.alertData.d_status);
                    this.modalToggle();
                })
                .on('error', (err) => {
                    console.error('Failed to parse or lost connection:', err);
                    this.alertState = false;
                })
                .connect()
                .catch((err) => {
                    console.error('Failed make initial connection:', err)
                    this.alertState = false;
                });
        },
        async checkAlert(){
            console.log("checkAlert: " + this.alertState);
            if(!this.alertState){
                console.log(localStorage.getItem('user'));
                if(localStorage.getItem('user')){
                    console.log("알림 SSE 실행 구간");
                    this.user = JSON.parse(localStorage.getItem("user"));
                    if(this.user.consumer_id == undefined){
                        this.checkUser = "farm";
                        this.id = this.user.farm_id;
                    } else{
                        this.checkUser = "consumer";
                        this.id = this.user.consumer_id;
                    }
                    this.alertState = true;
                    this.alertSseInit();
                    
                }
            }
        },
        statusFunc(status){
            let alertList = this.$store.state.alertList;
            switch(status){
                case 0:
                    if(this.checkUser === 'farm'){
                        this.alertText = `${this.aletData.c_name}님이 입찰했습니다.`;
                        
                    }else{
                        this.alertText = `${this.alertData.c_name}님이 입찰했습니다.`;
                    }
                    break;
                case 1:
                    // console.log('alertList.pre_consumer_id: ' + alertList[i].pre_consumer_id);
                    // console.log('this.user.consumer_id: ' + this.user.consumer_id);
                    if(this.checkUser === 'farm'){
                        this.alertText = `${this.alertData.c_name}님이 입찰했습니다.`;
                    }else{
                        if(this.alertData.pre_consumer_id === this.user.consumer_id){
                            this.alertText = `${this.alertData.c_name}님이 ${this.alertData.auction_name}를 더 높은 가격에 입찰했습니다.`;
                        } else {
                            this.alertText = `${this.aletData.f_farm_name}님 것을 입찰했습니다.`; 
                        }
                    }
                    break;
                case 2:
                    if(this.checkUser === 'farm'){
                        this.alertText = `${this.aletData.c_name}님이 최대가에 입찰해서 마감되었습니다.`;
                    }else {
                        this.alertText = `${this.aletData.f_farm_name}님의 경매를 최대가에 입찰했습니다.`;
                    }
                    break;
                case 3:
                    if(this.checkUser === 'farm'){
                        if(!this.alertData.consumer_id){
                            this.alertText = '낙찰가 없이 경매가 마감되었습니다.';   
                        }else{
                            this.alertText = `${this.aletData.c_name}님이 낙찰하셨습니다.`;
                        }
                    }else{
                        this.alertText = `${this.aletData.f_farm_name}님의 경매를 낙찰했습니다.`;
                    }
                    break;
                case 4:
                    if(this.checkUser === 'farm'){
                        this.alertText = `${this.aletData.c_name}님이 ${this.aletData.auction_name}에 리뷰를 남겼습니다.`;   
                    }
                    break;
                case 5:
                    if(this.checkUser === 'consumer'){
                        this.alertText = `${this.aletData.f_farm_name}님이 ${this.aletData.auction_name}의 리뷰에 댓글을 남겼습니다.`;
                    }
                    break;
                default:
                    return;
            }
            console.log('message', this.alertText);
        }
        
    },
    mounted(){
        setInterval(this.checkAlert, 3000);
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
        width: 200px;
        height: 90px;
        overflow-y: hidden;
        img{
            margin-top: 10px;
            margin-right: 10px;
        }
        p{
            margin-top: 5px;
            font-size: 12px;
            width: 100px;
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
            font-weight: 600;
        }
        .alert-text{
            white-space: pre-wrap;
            font-size: 10px;
            font-weight: 500;
        }
    }
}
.alert-box-contain.event{
    opacity: 1;
    transform: translateX(0px);
}
</style>