<template>
    <div class="contain">
        <BackHeader/>
        <div class="reviewInformation">
            <img src="data:image/jpeg;base64,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" alt="리뷰할 사진">
            <div class="information">
                <p>상품명 : {{getTest.name}}</p>
                <p>최종낙찰 : {{getTest.price}}</p>
            </div>
        </div>  
        <hr class="line"/>
        <div class="star-select">
            <h2>별점 선택</h2>
            <i v-for="star in reqData.starState" :key="star" class="fa fa-star review-star"/>
            <div class="starState">
                <button class="star-choice-button" v-for="state in starState" :key="state">
                    {{state}}
                </button>
            </div>
        </div>
        <hr class="line"/>
        <div class="review-comment">
            <h2>내용</h2>
            <textarea placeholder="상품에 대한 평가를 20자 이상 작성해주세요!" name="" id="product-contents" cols="40" rows="5"/>
        </div>
        <hr class="line"/>
        <h2 class="title">사진 등록</h2>
        <div class="file-img-container">
            <label for="input-file" class="select-img">+</label>
            <input @change="imgPreview($event)" id="input-file" class="select-img-hidden" type="file"/>
            <!-- 파일 크기 조절하기 -->
            <div id="image_container" class="image_container"></div>
        </div>
        <div class="final-buttons">
            <button class="final-button">취소</button>
            <button class="final-button" @click="reqDatas()">등록</button>
        </div>
    </div>    
</template>

<script>
import BackHeader from '../../components/Header/backHeader.vue';
export default {
    components: {
        BackHeader
    },
    data(){
        return{
            starState: ['안좋아요', '그냥 그래요', '보통이에요', '안좋아요', '정말좋아요'],
            // 벡엔드한테 받을 상품 데이터
            getTest: {
                img: '',
                name: '못난이 복숭아',
                price: 10000,
            },
            // 벡엔드한테 보낼 데이터
            reqData: {
                starState: 0,
                comment: '',
                selectPicture: '',
            }
        }
    },
    mounted(){
        console.log(this.$store.state.login.userInfo.consumer_id);
        // 별점 선택
        let starStateBtns = document.querySelectorAll('.star-choice-button');
        starStateBtns.forEach((starStateBtns, i) => {
            starStateBtns.addEventListener('click', () => {
                this.reqData.starState = i+1;
            })
        })
    },
    methods: {
        imgPreview(event){
            var reader = new FileReader();
            reader.onload = function(event) {
                var img = document.createElement("img")
                img.setAttribute("src", event.target.result);
                img.setAttribute("width", '60px');
                img.setAttribute("height", '60px');
                document.getElementById("image_container").appendChild(img);
            };
            reader.readAsDataURL(event.target.files[0]);
            console.log(event.target.files[0]);
        },
        reqDatas(){ 
            // 리뷰 등록 요청 시 JSON 데이터에 "checkUser: consumer or farm" 추가해주기
            let data = {
                productContents: document.getElementById('product-contents').value,
                start: this.reqData.starState,
                img: document.getElementById('input-file').value,
                checkUser: this.$store.state.login.userInfo.checkUser === undefined ? false : true
            }
            // axios.post('', {})
            // .then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
.line{
    border: .7px solid lightgrey;
    margin-top: 20px;
}
h2{
    font-size: 18px;
    font-weight: 700;
}
.contain{
    position: relative;
    width: 100vw;
    height: 100vh;
    .reviewInformation{
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        img{
            width: 75px;
        }
        .information{
            margin-left: 20px;
            p{
                font-size: 14px;
                font-weight: 700;
            }
            p:nth-child(1){
                margin-bottom: 10px;
            }
        }
    }
    .star-select{
        margin-top: 10px;
        margin-left: 10px;
        .review-star{
            color: #FFC1AA;
            font-size: 25px;
            margin-top: 20px;
            margin-left: 10%;
        }
        .starState{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            margin-top: 10px;
            .star-choice-button{
                border: 1px solid rgb(187, 187, 187);
                margin-left: 5px;
                color: #333;
                border-radius: 3px;
                width: 70px;
                height: 30px;
                font-size: 12px;
                font-weight: 700;
            }
            .star-choice-button:nth-child(1){
                margin-left: 0px;
            }
        }
    }
    .review-comment{
        margin-left: 10px;
        margin-top: 10px;
        h2{
            font-size: 18px;
            font-weight: 700;    
        }
        textarea{
            margin-top: 20px;
            margin-left: -8px;
            padding: 10px;
            box-sizing: content-box;
            border: 1px solid rgb(187, 187, 187);
            border-radius: 10px;
        }
    }
    .title{
        margin: 10px 10px 0px;
    }
    .file-img-container{
        display: flex;
        .select-img{
            position: absolute;
            color: #333;
            margin-top: 20px;
            margin-left: 10px;
            text-align: center;
            cursor: pointer;
            padding: 2px 10px;
            font-size: 30px;
            // border: 2px solid #333;
            border-radius: 10px;
        }
        .image_container{
            margin-left: 70px;
            margin-top: 10px;
        }
    }
    .select-img-hidden{
        display: none;
    }
    .final-buttons{
        position: absolute;
        width: 100%;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .final-button{
            width: 50%;
            height: 40px;
            font-size: 16px;
            font-weight: 700;
            background-color: #FFC1AA;
        }
        .final-button:nth-child(1){
            background-color: rgb(233, 233, 233);
            border-right: 1px solid rgb(234, 234, 234);
        }
    }
}
</style>