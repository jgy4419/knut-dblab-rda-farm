<template>
    <!-- 컴포넌트로 나누기 -->
    <header class="header">
        <nav>
            <li class="navLi"><router-link to="/"><v-icon>mdi-home</v-icon></router-link></li>
            <li class="navLi">{{headerProps}}</li>
            <li class="navLi">
                <p class="nav__link" @click="goBack()"><i class="fas fa-chevron-left fa-2x"
                        aria-hidden="true"></i>
                </p>
            </li>
        </nav>
    </header>   
</template>

<script>
export default {
    props: {
        headerProps: String
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    list-style: none;
}
.header{
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #FFC1AA;
    padding: 10px;
    nav{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navLi{
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
        }
        .navLi:nth-child(1){
            font-size: 23px;
        }
    }
}
</style>