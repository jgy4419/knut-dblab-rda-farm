<template>
    <div>
        <Header :headerProps="headerProps"/>
        <div class="image-box">
            <!-- <input multiple="multiple" @change="upload()" type="file" id="product_img_files" name="product_img_files"
                accept="image/*"><br> -->
            <!-- <img src="image"> -->
            <!-- 테스트 해보기 -->
            <h2 class="img-title">사진을 선택해주세요</h2>
            <input multiple="multiple" style="display: 'none'" @change="imgPreview($event)" class="select-img-hidden" type="file" id="product_img_files" name="product_img_files" accept="image/*"><br>                        
            <!-- <input type="button" id="input-file" value="이미지 파일 올리기"/> -->
            <div id="image_container" class="image_container">
                <label for="product_img_files" class="select-img">+</label>
            </div>
            <!-- <Slide/> -->
        </div>
        <Spinner v-if="spinnerState === 1"/>
        <fieldset class="reg-contain">
            <table class="table-100 table-contain">
                <tbody>
                    <tr>
                        <td class="table-100-tyfk">경매명</td>
                        <td class="table-100-0pky" colspan="3" v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;" required placeholder="경매명을 입력해주세요" v-model="auction_name"></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.auction_name}}</p></td>
                        <!-- <td class="table-100-0pky" colspan="3" v-if="this.$route.path !== '/auction_reg'">{{auction.productDTO.product}}</td> -->
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">작물</td>
                        <td class="table-100-0pky" colspan="3" v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;" required placeholder="작물을 입력해주세요" v-model="product"></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.productDTO.product}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">중량</td>
                        <td class="table-100-0pky" colspan="3" v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="kg   (숫자만 입력 가능합니다.)" v-model="product_kg"></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.productDTO.product_kg}}</p></td>
                    </tr> 
                    <tr>
                        <td class="table-100-tyfk">시작 가격</td>
                        <td class="table-100-0pky" colspan="3" v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;" required placeholder="원   (숫자만 입력 가능합니다.)" v-model="p_starting_price"></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.a_starting_price}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">최대 가격</td>
                        <td class="table-100-0pky" colspan="3" v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="원   (숫자만 입력 가능합니다.)" v-model="p_max_price"></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.a_max_price}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">낙과 일자</td>
                        <td class="table-100-1pky" colspan="3" v-if="isAuctionRegistPage"><input type="datetime-local" v-model="p_drop_date"/></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.productDTO.p_drop_date.slice(0, 16)}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">마감일</td>
                        <td class="table-100-1pky" colspan="3" v-if="isAuctionRegistPage"><input type="datetime-local" v-model="deadline_date"/></td>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.deadline_date.slice(0, 16)}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">크기</td>
                        <div v-if="isAuctionRegistPage">
                            <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="소"> 소</td>
                            <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="중"> 중</td>
                            <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="대"> 대</td>
                        </div>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.productDTO.size}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">상태</td>
                        <div v-if="isAuctionRegistPage">
                            <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="상"> 상
                            </td>
                            <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="중"> 중
                            </td>
                            <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="하"> 하
                            </td>
                        </div>
                        <td class="table-100-0pky" colspan="3" v-if="!isAuctionRegistPage"><p id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;">{{auction.productDTO.p_status}}</p></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">설명</td>
                        <td class="table-100-0pky" colspan="3"  v-if="isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;" required placeholder="작물의 세부사항을 적어주세요" v-model="p_explanation"></td>
                        <td class="table-100-0pky" colspan="3"  v-if="!isAuctionRegistPage"><input id="td_input_text" type="text" name="text"
                            size="20" style="width:100%;" required placeholder="작물의 세부사항을 적어주세요" v-model="auction.productDTO.p_explanation"></td>
                    </tr>
                </tbody>
            </table>
        </fieldset>

        <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <a class="nav__link" href="#">
                            <button class="user-component__title" @click="submitAuction()">{{auctionSubmit}}</button>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Header from '../../components/Header/bellAndBackHeader.vue';
    import Slide from '../../components/slide.vue';
    import Spinner from '@/components/spinner.vue';

    export default {
        components: {
            Header,
            Slide,
            Spinner
        },
        name: 'submitProduct',
        data() {
            return {
                headerProps: this.$route.path == '/auction_reg' ? '경매 등록' : '경매 수정',
                auctionSubmit: this.$route.path == '/auction_reg' ? '등록하기' : '수정하기',
                isAuctionRegistPage: this.$route.path == '/auction_reg',
                auction: JSON.parse(localStorage.getItem('auction')),
                auction_name: null,
                p_name: null,
                product: null,
                product_kg: null,
                p_starting_price: null,
                p_max_price: null,
                p_drop_date: null,
                deadline_date: null,
                size: null,
                p_status: null,
                p_explanation: null,
                product_img_files: [],
                user: JSON.parse(localStorage.getItem("user")),
                auctionId: 0,
                blankErrorText: "모두 작성해주셔야 합니다!",
                numberErrorText: "중량, 시작가, 최대가는 숫자만 입력 가능합니다!",
                auctionPriceErrorText: "시작가는 최대가격 보다 작아야 합니다!",
                auctionDropDateErrorText: "낙과일자는 현재 시간 이전이어야 합니다!",
                auctionDeadlineDateErrorText: "경매 마감일자는 최소 현재시간보다 5분 이후이어야 합니다.!",
                auctionRegistText: "경매 등록하시겠습까?\n주의사항: 경매 삭제는 마감시간 기준 4시간 이전 경매만 가능합니다.",
                productUpdateText: "상품 내용을 수정하시겠습까?",
                FIVE_MINUTE: 1000 * 60 * 5,                // millisecond 단위
                spinnerState: 0,
            };
        },
        mounted(){
            // 실제 구현 시 !== -> === 로 바꿔주기
            if(this.user.farm_id == null){
                alert('농가회원이 아닙니다!');
                this.$router.go(-1);
            }
            console.log(this.$route.params.id);
            if(this.$route.path !== '/auction_reg'){
                console.log(this.auction);
            }
        },
        methods: {
            imgPreview(event){
                console.log(event.target.files);
                if(this.product_img_files.length + event.target.files.length > 9) return alert('상품 이미지는 10개 이상 저장 불가능합니다!');
                for(let idx in event.target.files){
                    let reader = new FileReader();
                    reader.onload = function(event){
                        let img = document.createElement('img');
                        img.setAttribute('src', event.target.result);
                        img.setAttribute('width', '80px');
                        img.setAttribute('height', '80px');
                        document.getElementById('image_container').appendChild(img);
                    }
                    if(this.product_img_files.length > 9) return alert('이미지는 10 이상 저장 불가능합니다!');
                    reader.readAsDataURL(event.target.files[idx]);
                    this.product_img_files.push(event.target.files[idx]);
                }
                console.log(this.product_img_files);
                
                // this.upload();
            },
            // upload() {
            //     this.product_img_files.push(document.getElementById("product_img_files"));
            //     console.log('test', this.product_img_files.files);
            // },
            submitAuction() {
                this.spinnerState = 1;
                let frm = new FormData();
                console.log(this.isAuctionRegistPage);
                // 글 수정
                if(!this.isAuctionRegistPage){
                    if(this.product_img_files.length < 1){
                        alert('이미지 파일이 없습니다.');
                        return;
                    }
                    if(!confirm(this.productUpdateText)) return;
                    console.log(this.product_img_files.files);
                    for(let i = 0; i < this.product_img_files.length; i++){
                        frm.append('product_img_files', this.product_img_files[i]);
                    }
                    frm.append('product_id', this.auction.product_id);
                    frm.append('product_img_name', this.auction.productDTO.product_img_name);
                    frm.append('p_explanation', this.auction.productDTO.p_explanation);

                    for(let data of frm) console.log(data);

                    axios.patch('/api/product', frm, {
                        headers: {
                            TOKEN: this.user.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        this.spinnerState = 0;
                        console.log(res.data);
                        alert('수정 완료!');
                        // this.$router.push('/auction');
                    })
                    .catch(err => {
                        console.log(err); 
                        // if(res.headers.token != "token"){     
                        //     alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                        //     this.$store.commit('LOGOUT');
                        //     this.$router.push('/login');
                        // }
                    });
                    return;
                }

                // 빈 문자열 검사
                if(this.auction_name == null || this.product == null || this.product_kg == null || this.p_starting_price == null || this.p_max_price == null 
                || this.p_drop_date == null || this.deadline_date == null || this.size == null || this.p_status == null || this.p_explanation == null){
                    return alert(this.blankErrorText);
                }
                if(this.auction_name == "" || this.product == "" || this.product_kg == "" || this.p_starting_price == "" || this.p_max_price == "" 
                || this.p_drop_date == "" || this.deadline_date == "" || this.size == "" || this.p_status == "" || this.p_explanation == ""){
                    return alert(this.blankErrorText);
                }
                
                if(!this.isNumber(this.product_kg) || !this.isNumber(this.p_starting_price) || !this.isNumber(this.p_max_price)) return alert(this.numberErrorText);    // 중량, 시작가, 최대가 숫자 검사
                if(Number(this.p_max_price) < Number(this.p_starting_price)) return alert(this.auctionPriceErrorText);                                                            // 시작가 최대가 검사
                
                // 낙과일자 검사, 현재 시간 전만 허용
                let now = new Date();
                if(new Date(this.p_drop_date) > now) return alert(this.auctionDropDateErrorText);

                // 마감일 검사, 현재 시간 5분 이후 허용
                // if(new Date(this.deadline_date).getTime() < now.getTime() + this.FIVE_MINUTE) return alert(this.auctionDeadlineDateErrorText);

                // 마지막 확인
                if(!confirm(this.auctionRegistText)) return;

                // 서버에 데이터 전송하는 코드
                console.log('p_drop_date : ' + this.p_drop_date);
                console.log('deadline_date : ' + this.deadline_date);

                // 이미지 파일을 안 넣었으면 경고창.
                if(this.product_img_files.length < 1){
                    alert('이미지 파일이 없습니다.');
                    return;
                }
                // for(let imageFile of this.product_img_files.files) frm.append("productDTO.product_img_files", imageFile);
                for(let i = 0; i < this.product_img_files.length; i++){
                    console.log(this.product_img_files[i]);
                    frm.append("productDTO.product_img_files", this.product_img_files[i]);
                }
                frm.append('auction_name', this.auction_name);
                frm.append('productDTO.product', this.product);
                frm.append('productDTO.product_kg', this.product_kg);
                frm.append('productDTO.p_drop_date', this.p_drop_date);
                frm.append('productDTO.size', this.size);
                frm.append('productDTO.p_status', this.p_status);
                frm.append('productDTO.p_explanation', this.p_explanation);
                frm.append('a_starting_price', this.p_starting_price);
                frm.append('bid_price', this.p_starting_price);
                frm.append('a_max_price', this.p_max_price);
                frm.append('deadline_date', this.deadline_date);
                frm.append('farm_id', this.user.farm_id);
                frm.append('f_farm_name', this.user.f_farm_name);

                for(let i of frm) console.log(i);
                // 글 등록
                axios.post('/api/registAuction', frm, {
                    headers: {
                        TOKEN: this.user.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    // if(res.headers.token != "token"){           
                    //     this.$store.commit('LOGOUT');
                    //     this.$router.push('/login');
                    // }
                    this.spinnerState = 0;
                    alert('등록 완료!');
                    this.$router.push('/auction');
                })
                .catch(err => {
                    console.log(err);  
                });
            },
            isNumber(number){
                if(Number.isNaN(number)) return false;
                let tempNumber = Number(number);
                return Number.isInteger(tempNumber) ? tempNumber > 0  : false;
            },
        },
    };
</script>

<style lang="scss" scoped>
input[type="datetime-local"]
{
    display:block;
     -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-height: 1.2em; 
  
    /* Solution 2 */
    min-width: 96%;
}
.reg-contain{
    padding: 10px;
}
td{
    padding: 10px;
}
.image-box{
    padding: 10px;
}
.user-component__title{
    width: 95%;
    height: 50px;
    border-radius: 10px;
    margin-left: 10px;
    background-color: #FFC1AA;
    color: #333;
}
.img-title{
    fibt-size: 16px;
    font-weight: 700;
}
.select-img-hidden{
    display: none;
}
.select-img{
    font-size: 23px;
    font-weight: 600;
    // border: 1px solid #333;
    // border-radius: 10px;
    padding: 2px 10px;
}
</style>