<template>
    <div class="contain-404">
        <Header/>
        <h1 class="title">404 페이지 입니다.</h1>
        <h3 class="sub-title">url 주소가 잘 못 되었습니다!</h3>
        <Bottom class="bottom"/>
    </div>    
</template>

<script>
import Header from './components/Header/bellAndAddHeader.vue';
import Bottom from './components/bottomNav.vue';
export default {
    components: {
        Header,
        Bottom
    }
}
</script>

<style lang="scss" scoped>
    .title{
        margin-top: 30%;
        font-size: 30px;
        font-weight: 700;
        color: #ff9771;
        text-align: center;
    }
    .sub-title{
        margin-top: 10%;
        font-size: 25px;
        font-weight: 700;
        color: #FFC1AA;
        text-align: center;
    }
    .bottom{
        position: absolute;
        bottom: 0;
    }
</style>