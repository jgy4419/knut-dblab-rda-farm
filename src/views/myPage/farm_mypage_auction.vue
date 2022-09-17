<template>
<div>
    <div class="main_nav_t_div">
        <nav class="main_t_nav">
            <ul class="main_t_nav_list">
                <li class="nav__btn">
                    <div class="nav__notification-dot"></div>
                    <a class="nav__link"><i class="fas fa-bars fa-2x" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="main_m_li_list">
                    <a class="nav_m_link" href="workout.html">
                        <h4 class="user-component__title">경매내역</h4><i class=" fa-2x" aria-hidden="true" image
                            src="../image/123.jpg"></i>
                    </a>
                </li>
                <li class="nav__btn">
                    <a class="nav__link" onclick="goBack()"><i class="fas fa-chevron-right fa-2x"
                            aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="contain">
        <div class="item" v-for="data, i in test.name.length" :key="i">
            <img src='data:image/jpeg;base64,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' alt="상품이미지"/>
            <div class="content">
                <p class="name">{{test.name[i]}}</p>
                <div class="auction">
                    <p class="final-bid">현재경매 : {{test.current[i]}}원</p>
                    <p class="current-auction">최종낙찰: {{test.res[i]}}원</p>
                </div>
                <div class="auctionBtns">
                    <button class="auctionBtn" v-for="button in buttons" :key="button">{{button}}</button>
                </div>
            </div>
        </div>
    </div>

    <!-- <fieldset>
        <table class="table table-striped table-bordered table-hover">
            <thead>
                    <tr class="success">
                    <th>날짜</th>
                    <th>작물명</th>
                    <th>현재 경매가</th>
                    <th>최종 낙찰가</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>9/16</td>
                    <td>못난이 복숭아</td>
                    <td>10,000</td>
                    <td>-</td>
                    <td>시간(진행중)</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>데이터2</td>
                    <td>데이터3</td>
                    <td>데이터4</td>
                    <td>정산하기(마감)</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>데이터2</td>
                    <td>데이터3</td>
                    <td>데이터4</td>
                    <td>데이터5</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>데이터2</td>
                    <td>데이터3</td>
                    <td>데이터4</td>
                    <td>데이터5</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>데이터2</td>
                    <td>데이터3</td>
                    <td>데이터4</td>
                    <td>데이터5</td>
                </tr>
            </tbody>
        </table>
    </fieldset> -->

<div class="main_nav_b_div">
    <nav class="main_b_nav">
        <ul class="main_m_ui_list">
            <li class="nav__btn">
                <a class="nav__link" href="#"><h4 class="user-component__title">등록하기</h4>
                </a>
            </li>
        </ul>
    </nav>
</div>

</div>
</template>

<script>
export default {
    data(){
        return{
            test: {
                img: [''],
                name: ['못난이 복숭아', '못난이 사과'],
                current: [10000, 20000],
                res: [10000, 0],
            },
            buttons: ['경매종료', '계산하기', '후기작성'],
        }
    }    
}
</script>

<style lang="scss" scoped>
@mixin text-basic(){
    margin-left: 10px;
    margin-top: 20px;
    font-size: 15px;
    font-weight: 700;
}
.contain{
    margin-top: -50px; // 임시로 넣은 ui
    position: relative;
    background-color: rgb(244, 242, 242);
    width: 100vw;
    height: 80vh;
    .item{
        width: 100%;
        height: 160px;
        margin-top: 10px;
        background-color: #fff;
        display: flex;
        align-items: center;
        img{
            width: 70px;
        }
        .content{
            .name{
                @include text-basic();
            }
            .auction{
                display: flex;
                .final-bid, .current-auction{
                    @include text-basic();
                }
            }
            .auctionBtns{
                display: flex;
                justify-content: space-between;
                .auctionBtn{
                    width: 80px;
                    height: 40px;
                    border-radius: 5px;
                    border: 1px solid rgb(187, 187, 187);
                    @include text-basic();
                    
                }
            }
        }
    }
}
</style>