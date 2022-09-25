<template>
    <div class="main_nav_t_div">
    <nav class="main_t_nav">
        <ul class="main_t_nav_list">
            <li class="nav__btn">
                <a class="nav__link" href="alert"><i class="fas fa-bell fa-2x" aria-hidden="true"></i>
                </a>
            </li>

            
            <li class="main_m_li_list">
                <p class="nav_m_link" href="workout.html">{{headerProps}}</p>
            </li>

            <li class="nav__btn">
                <a class="nav__link" v-on:click="$router.go(-1)"><i class="fas fa-chevron-left fa-2x"
                        aria-hidden="true"></i>
                </a>
            </li>
          </ul>
<!--  -->
      </nav>
  </div>
</template>

<script>
export default {
    props: {
        headerProps: String
    }
}
</script>

<style lang="scss" scoped>
i{
    font-size: 25px;
}
.main_nav_t_div{
    position: relative;
    z-index: 10;
}
.main_t_nav{
    width: 28vw;
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