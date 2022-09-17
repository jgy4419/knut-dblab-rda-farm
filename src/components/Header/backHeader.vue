<template>
    <!-- 컴포넌트로 나누기 -->
    <header class="header">
        <nav>
            <li class="navLi">
                <a class="nav__link" onclick="goBack()"><i class="fas fa-chevron-left fa-2x"
                        aria-hidden="true"></i>
                </a>
            </li>
            <li class="navLi">리뷰 작성</li>
            <li class="navLi"><v-icon>mdi-home</v-icon></li>
        </nav>
    </header>   
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
*{
    list-style: none;
}
.header{
    position: relative;
    width: 100vw;
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
            font-size: 18px;
            font-weight: 700;
        }
    }
}
</style>