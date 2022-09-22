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
                    <p class="nav_m_link" href="workout.html">{{headerProps}}</p>
                </li>

                <li class="nav__btn">
                    <router-link to="/auction_reg"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></router-link>
                </li>
            </ul>
      </nav>
    </div>
</template>

<script>
export default {
    props: {
        headerProps: String
    },
}
</script>

<style lang="scss" scoped>
.main_t_nav{
    // width: 25vw;
    width: 28vw;
}
.nav_m_link{
    margin-top: 3px;
}
@media screen and (max-width: 500px){
    .main_t_nav{
        width: 100vw;
    } 
}
</style>