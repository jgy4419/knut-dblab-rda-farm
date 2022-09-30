<template>
    <div class="main_nav_t_div">
        <nav class="main_t_nav">
            <ul class="main_t_nav_list">
                <li class="nav__btn">

                    <router-link class="nav__link" to="/alert">
                    <i class="fas fa-bell fa-2x" aria-hidden="true"></i>
                    </router-link>
                </li>
                <li class="main_m_li_list">
                    <img class="logo" :src="logo" alt="로고" width="45">
                </li>

                <li class="nav__btn">
                    <router-link to="/auction_reg"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></router-link>
                </li>
            </ul>
      </nav>
    </div>
</template>

<script>
import img from '../../assets/logo.png';
export default {
    props: {
        headerProps: String
    },
    data(){
        return{
            logo: img,
        }
    },
    mounted(){
        console.log(img);
    }
}
</script>

<style lang="scss" scoped>
i{
    font-size: 25px;
}
.logo{
    position: absolute;
    left: 0;
    right: 0;
    top: 5px;
    margin: auto;
}
.main_nav_t_div{
    position: relative;
    z-index: 10;
}
.main_t_nav{
    // width: 25vw;
    width: 400px;
    .main_t_nav_list{
        display: flex;
        justify-content: space-between;
    }
}
.nav_m_link{
    margin-top: 5px;
    font-size: 18px;
}
@media screen and (max-width: 500px){
    .main_t_nav{
        width: 100vw;
    } 
}
</style>