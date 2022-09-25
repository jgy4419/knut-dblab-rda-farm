<template>
    <div>
        <!-- vue.js 3항연산자로 style 지정하기 -->
        <i @click="likeClick()" class="fa fa-heart like-icon" :style="[like.state === 1 ? {color: '#FFC1AA'}: {color: 'lightgrey'}]"></i>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            like: {
                users: [],
                count: 0,
                state: 0,
                auction_id: 0,
                consumer_id: 0,
            }
        }
    },

    // checkWish -> get, 상품번호, auction_id, consumer_id
    async mounted(){
        this.like.auction_id = parseInt(this.$route.params.id)
        this.like.consumer_id = JSON.parse(localStorage.getItem('user').consumer_id);
           await axios.get(`/api/checkWish/${this.like.auction_id}/${this.like.consumer_id}`)
           .then(res => {
                console.log(res.data);
                this.like.state = res.data;
                
            }).catch(err => {alert(err)});
    },
    methods: {
        likeClick(){
            let data = {
                auction_id: this.like.auction_id,
                consumer_id: this.like.consumer_id                
            }
            if(this.like.state === 0){
                axios.post('/api/registWish', data).then(() => {
                    alert('좋아요를 클릭했습니다!');
                }).catch(err => {console.log(err)});
            }else if(this.like.state === 1){
                axios.delete(`/api/deleteWish/${this.like.auction_id}/${this.like.consumer_id}`)
                .then(() => {
                    alert('좋아요를 취소하였습니다!')
                }).catch(err => console.log(err))
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.like-icon{
    z-index: 10;
    position: absolute;
    font-size: 30px;
    // width: 20%;
    cursor: pointer;
    color: rgb(225, 225, 225);
}
</style>