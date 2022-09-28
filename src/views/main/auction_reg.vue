<template>
    <div>
        <Header :headerProps="headerProps"/>
        <div>
            <input multiple="multiple" @change="upload()" type="file" id="product_img_files" name="product_img_files"
                accept="image/*"><br>
            <img src="image">
            <!-- <Slide/> -->
        </div>

        <fieldset>
            <table class="table-100">

                <tbody>
                    <tr>
                        <td class="table-100-tyfk">경매명</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="경매명을 입력해주세요" v-model="p_name"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">작물</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="작물을 입력해주세요" v-model="product"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">중량</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="kg   (숫자만 입력 가능합니다.)" v-model="product_kg"></td>
                    </tr> 
                    <tr>
                        <td class="table-100-tyfk">시작 가격</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="원   (숫자만 입력 가능합니다.)" v-model="p_starting_price"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">최대 가격</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="원   (숫자만 입력 가능합니다.)" v-model="p_max_price"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">낙과 일자</td>
                        <td class="table-100-1pky" colspan="3"><input type="datetime-local" v-model="p_drop_date"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">마감일</td>
                        <td class="table-100-1pky" colspan="3"><input type="datetime-local" v-model="deadline_date"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">크기</td>
                        <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="소"> 소</td>
                        <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="중"> 중</td>
                        <td class="table-100-1pky"><input type='radio' name="size" v-model="size" value="대"> 대</td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">상태</td>
                        <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="상"> 상
                        </td>
                        <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="중"> 중
                        </td>
                        <td class="table-100-1pky"><input type='radio' name="status" v-model="p_status" value="하"> 하
                        </td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">설명</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="작물의 세부사항을 적어주세요"
                                v-model="p_explanation"></td>
                    </tr>
                </tbody>
            </table>
        </fieldset>

        <div class="main_nav_b_div">
            <nav class="main_b_nav">
                <ul class="main_m_ui_list">
                    <li class="nav__btn">
                        <a class="nav__link" href="#">
                            <h4 class="user-component__title" @click="submitAuction()">{{auctionSubmit}}</h4>
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

    export default {
        components: {
            Header,
            Slide
        },
        name: 'submitProduct',
        data() {
            return {
                headerProps: '경매 등록',
                auctionSubmit: '등록하기',
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
                farm_id: JSON.parse(localStorage.getItem("user")).farm_id,
                auctionId: 0,
                blankErrorText: "모두 작성해주셔야 합니다!",
                numberErrorText: "중량, 시작가, 최대가는 숫자만 입력 가능합니다!",
                auctionPriceErrorText: "시작가는 최대가격 보다 작아야 합니다!",
                auctionDropDateErrorText: "낙과일자는 현재 시간 이전이어야 합니다!",
                auctionDeadlineDateErrorText: "경매 마감일자는 최소 현재 시간보다 5분 이후이어야 합니다.!",
                auctionRegistText: "경매 등록하시겠습까?",
                FIVE_MINUTE: 1000 * 60 * 5,                // millisecond 단위
            };
        },
        mounted(){
            // 실제 구현 시 !== -> === 로 바꿔주기
            if(this.farm_id == null){
                alert('농가회원이 아닙니다!');
                this.$router.go(-1);
            }
            if(this.$route.path !== '/auction_reg'){
                this.headerProps = '경매 수정';
                this.auctionSubmit = '수정하기';
                this.writeState();   
            }
        },
        methods: {
            writeState(){
                let auction_id = this.$route.params.id;
                // 글 수정 페이지면 ex) /auction_reg/33 => input창의 value에 값을 가각 넣어주기
                axios.get(`/api/auctionInfo/${auction_id}`, {
                    headers: {
                        TOKEN: this.user.token
                    }
                }).then(res => {
          
                    console.log(res.data[0]);
                    const data = res.data[0];
                    this.p_name = data.auction_name;
                    this.p_starting_price = data.a_starting_price;
                    this.p_max_price = data.a_max_price; 
                    this.deadline_date = data.deadline_date;
                }).catch(err => {
                    console.log(err);      
                    alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                });
            },
            upload() {
                this.product_img_files = document.getElementById("product_img_files");
                console.log('test', this.product_img_files.files);
            },
            submitAuction() {
                // 빈 문자열 검사
                if(this.p_name == null || this.product == null || this.product_kg == null || this.p_starting_price == null || this.p_max_price == null 
                || this.p_drop_date == null || this.deadline_date == null || this.size == null || this.p_status == null || this.p_explanation == null){
                    return alert(this.blankErrorText);
                }
                if(this.p_name == "" || this.product == "" || this.product_kg == "" || this.p_starting_price == "" || this.p_max_price == "" 
                || this.p_drop_date == "" || this.deadline_date == "" || this.size == "" || this.p_status == "" || this.p_explanation == ""){
                    return alert(this.blankErrorText);
                }
                
                if(!this.isNumber(this.product_kg) || !this.isNumber(this.p_starting_price) || !this.isNumber(this.p_max_price)) return alert(this.numberErrorText);    // 중량, 시작가, 최대가 숫자 검사
                if(Number(this.p_max_price) < Number(this.p_starting_price)) return alert(this.auctionPriceErrorText);                                                            // 시작가 최대가 검사
                
                // 낙과일자 검사, 현재 시간 전만 허용
                let now = new Date();
                if(new Date(this.p_drop_date) > now) return alert(this.auctionDropDateErrorText);

                // 마감일 검사, 현재 시간 5분 이후 허용
                if(new Date(this.deadline_date).getTime() < now.getTime() + this.FIVE_MINUTE) return alert(this.auctionDeadlineDateErrorText);

                // 마지막 확인
                if(!confirm(this.auctionRegistText)) return;
                let frm = new FormData();
                

                // 서버에 데이터 전송하는 코드
                console.log('p_drop_date : ' + this.p_drop_date);
                console.log('deadline_date : ' + this.deadline_date);

                for(let imageFile of this.product_img_files.files) frm.append("productDTO.product_img_files", imageFile);
                frm.append('auction_name', this.p_name);
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
                frm.append('farm_id', this.farm_id);

                // 이미지 파일을 안 넣었으면 경고창.
                if(this.product_img_files.length < 1){
                    alert('이미지 파일이 없습니다.');
                    return;
                }
                // 글 수정
                if(this.$route.path !== '/auction_reg'){
                    axios.patch('/api/updateAuction', frm, {
                        headers: {
                            TOKEN: this.user.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {

                        alert('등록 완료!');
                        this.$router.push('/auction');
                    })
                    .catch(err => {
                        console.log(err);      
                        alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                        this.$store.commit('LOGOUT');
                        this.$router.push('/login');
                    });
                }else{
                    // 글 등록
                    axios.post('/api/registAuction', frm, {
                        headers: {
                            TOKEN: this.user.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(() => {

                        alert('등록 완료!');
                        this.$router.push('/auction');
                    })
                    .catch(err => {
                        console.log(err);      
                        alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
                        this.$store.commit('LOGOUT');
                        this.$router.push('/login');
                    });
                }
            },
            isNumber(number){
                if(Number.isNaN(number)) return false;
                let tempNumber = Number(number);
                return Number.isInteger(tempNumber) ? tempNumber > 0  : false;
            },
        },
    };
</script>

<style>

</style>