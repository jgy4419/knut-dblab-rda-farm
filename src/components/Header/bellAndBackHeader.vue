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
.nav_m_link{
    margin-top: 3px;
}
</style>