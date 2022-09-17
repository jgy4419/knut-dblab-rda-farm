<template>
    <div>
        <Header :headerProps="headerProps"/>
        <div>
            <input multiple="multiple" @change="upload()" type="file" id="product_img_file" name="product_img_file"
                accept="image/*"><br>
            <img src="image">
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
                                size="20" style="width:100%;" required placeholder="kg" v-model="product_kg"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">시작 가격</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="원" v-model="p_starting_price"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">최대 가격</td>
                        <td class="table-100-0pky" colspan="3"><input id="td_input_text" type="text" name="text"
                                size="20" style="width:100%;" required placeholder="원" v-model="p_max_price"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">낙과 일자</td>
                        <td class="table-100-1pky" colspan="3"><input type="datetime-local" v-model="p_drop_date"></td>
                    </tr>
                    <tr>
                        <td class="table-100-tyfk">시작일</td>
                        <td class="table-100-1pky" colspan="3"><input type="datetime-local" v-model="start_date"></td>
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
                            <h4 class="user-component__title" @click="submitProduct()">등록하기</h4>
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

    export default {
        components: {
            Header
        },
        name: 'submitProduct',
        data() {
            return {
                headerProps: '경매 등록',

                p_name: null,
                product: null,
                product_kg: null,
                p_starting_price: null,
                p_max_price: null,
                p_drop_date: null,
                start_date: null,
                deadline_date: null,
                size: null,
                p_status: null,
                p_explanation: null,
                product_img_file: null,
                farm_id: 1,
            };
        },
        methods: {
            upload() {
                this.product_img_file = document.getElementById("product_img_file");
                console.log(this.product_img_file.files[0]);
            },
            submitProduct() {
                let frm = new FormData();
                
                console.log('p_drop_date : ' + this.p_drop_date);
                console.log('deadline_date : ' + this.deadline_date);

                frm.append("productDTO.product_img_file", 
                    this.product_img_file !== null 
                    ? this.product_img_file = this.product_img_file.files[0]
                    : this.product_img_file = '');
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
                frm.append('start_date', this.start_date);
                frm.append('deadline_date', this.deadline_date);
                frm.append('farm_id', this.farm_id);

                // 이미지 파일을 안 넣었으면 경고창.
                if(this.product_img_file = ''){
                    alert('이미지 파일이 없습니다.');
                }

                axios.post('/api/registAuction', frm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                        alert('!!');
                    });
            },
        },


    };
</script>

<style>

</style>