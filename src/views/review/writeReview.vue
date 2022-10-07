<template>
    <div class="contain">
        <Spinner v-if="spinnerState === 1"/>
        <BackHeader :headerProps="headerProps"/>
        <div class="reviewInformation">
            <img class="review-image" :src="`/product_images/${getData.product_img_name}.png`" alt="리뷰할 사진">
            <div class="information">
                <p>{{getData.auction_name}}</p>
            </div>
        </div>  
        <hr class="line"/>
        <div class="star-select">
            <h2>별점 선택</h2>
            <i v-for="star in reqData.starState" :key="star" class="fa fa-star review-star"/>
            <div class="starState">
                <button @click="reviewBtnActivate" class="star-choice-button" v-for="state in starState" :key="state">
                    {{state}}
                </button>
            </div>
        </div>
        <hr class="line"/>
        <div class="review-comment">
            <h2>내용</h2>
            <textarea placeholder="상품에 대한 평가를 20자 이상 작성해주세요!" name="" id="product-contents" cols="35" rows="5"/>
        </div>
        <hr class="line"/>
        <h2 class="title">사진 등록</h2>
        <div class="file-img-container">
            <label for="input-file" class="select-img">+</label>
            <input @change="imgPreview($event)" id="input-file" class="select-img-hidden" type="file" accept="image/*"/>
            <!-- 파일 크기 조절하기 -->
            <div id="image_container" class="image_container"></div>
        </div>
        <div class="final-buttons">
            <button class="final-button" @click="$router.go(-1)">취소</button>
            <button class="final-button" @click="reqDatas()">{{editState === 0 ? '등록' : '수정'}}</button>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
import BackHeader from '../../components/Header/backHeader.vue';
import Spinner from '../../components/spinner.vue';
export default {
    components: {
        Spinner,
        BackHeader
    },
    data(){
        return{
            headerProps: '리뷰 작성',
            starState: ['안좋아요', '그냥 그래요', '보통이에요', '괜찮아요', '정말좋아요'],
            // 벡엔드한테 받을 상품 데이터
            getTest: {
                img: '',
                name: '못난이 복숭아',
                price: 10000,
            },
            getData: {},
            // 벡엔드한테 보낼 데이터
            reqData: {
                starState: 5,
                comment: '',
                selectPicture: '',
            },
            imgData: [],
            user: JSON.parse(localStorage.getItem("user")),
            editState: 0, // 리뷰 수정 페이지인지 작성 페이지인지 구별하기
            editData: {},
            spinnerState: 0,
        }
    },
    mounted(){
        // url에 edit이 포함되어 있으면 수정페이지로 감지하기
        if(this.$route.fullPath.includes('edit')){
            this.editState = 1;
            this.editData = this.$store.state.review.getReviewData;
            document.getElementById('product-contents').value = this.editData.consumer_review;
            this.reqData.starState = this.editData.grade_point;
            document.querySelectorAll('.star-choice-button')[this.editData.grade_point - 1].classList.add('active');
        }else{
            // 별점 처음에 선택되어져 있는 부분
            document.querySelectorAll('.star-choice-button')[4].classList.add('active');   
        }
        // 후기 작성할 유저 게시글 불러오기 (vuex로 받은 데이터)
        this.getData = this.$store.state.review.getReviewData;
        // 별점 선택
        let starStateBtns = document.querySelectorAll('.star-choice-button');
        starStateBtns.forEach((starStateBtns, i) => {
            starStateBtns.addEventListener('click', () => {
                this.reqData.starState = i + 1;
            })
        })
    },
    methods: {
        reviewBtnActivate({target}){
            this.reviewState = target.innerHTML;
            let noticeItem = document.querySelector('.starState');
            [...noticeItem.children].forEach(info => {
                info.classList.toggle('active', info === target);
            })
        },
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
            this.imgData.push(event.target.files[0]);
            console.log(event.target.files[0]);
        },
        /*  
            checkUser,
            auction_Id, 
            grade_point, 
            consumer_review,
            farm_review,
            auction_name,
            imgData 
        */
        reqDatas(){ 
            this.spinnerState = 1;
            // 이미지 2, 3개 들어왔을 때는 자를 수 있게
            // 리뷰 등록 요청 시 JSON 데이터에 "checkUser: consumer or farm" 추가해주기
            console.log(this.getData.farm_id);
            let frm = new FormData();
            frm.append('checkUser', localStorage.getItem('checkUser'));
            frm.append('auction_Id', this.getData.auction_Id);
            frm.append('farm_id', this.getData.farm_id);
            frm.append('consumer_id', JSON.parse(localStorage.getItem('user')).consumer_id);
            frm.append('grade_point', this.reqData.starState);
            frm.append('consumer_review', document.getElementById('product-contents').value);
            frm.append('auction_name', this.getData.auction_name);
            if(this.imgData.length > 0){
                frm.append('review_img_file', this.imgData[0])
            }
            for(let i of frm) console.log(i);
            if(!this.$route.fullPath.includes('edit')){
                axios.post('/api/AuctionReview', frm, {
                    headers: {
                        TOKEN: this.user.token,
                        'Content-Type': 'multipart/form-data'
                }})
                .then(res => {                
                    this.$router.push('/consumer_mypage');
                    this.spinnerState = 0;
                }).catch(err => {
                    console.log(err); 
                    // if(res.headers.token != "token"){     
                    //     alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                    //     this.$store.commit('LOGOUT');
                    //     this.$router.push('/login');
                    // }       
                })
            }else{
                console.log(this.getData);
                for(let i of frm) console.log(i);
                axios.patch('/api/AuctionReview', frm, {
                    headers: {
                        TOKEN: this.user.token,
                        'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    this.spinnerState = 0;
                    alert('수정이 완료되었습니다.');
                    this.$router.push('/consumer_mypage');
                }).catch(err => {
                    console.log(err);
                    // if(res.headers.token != "token"){     
                    //     alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                    //     this.$store.commit('LOGOUT');
                    //     this.$router.push('/login');
                    // }
                })
            }
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
    width: 100%;
    height: 100vh;
    .reviewInformation{
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        img{
            width: 75px;
            border-radius: 5px;
        }
        .information{
            margin-left: 20px;
            p{
                margin-top: 10px;
                font-size: 18px;
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
                // border: 1px solid rgb(187, 187, 187);
                margin-left: 5px;
                color: #333;
                border-radius: 3px;
                width: 70px;
                height: 30px;
                font-size: 12px;
                font-weight: 700;
            }
            .star-choice-button.active{
                background-color: #FFC1AA;
                color: #fff;
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
            margin-left: 20px;
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