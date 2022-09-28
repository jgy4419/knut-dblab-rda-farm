<template>
    <div>
        <Header :headerProps="headerProps"/>
        <!-- 기본 회원정보 -->
        <header class="n-section-title first info_views-area">
            <h1 class="tit">기본 회원정보</h1>
            <!-- <button class="n-btn btn-sm btn-default" onclick="openGatePassword('001');">가려진정보 보기</button> -->
        </header>


        <!-- 프로필 -->
        <v-form ref="form" v-model="profile" lazy-validation @submit.prevent="">
            <table class="n-table table-row my-info-modify">
                <colgroup>
                    <col style="width:25%">
                    <col style="width:40%">
                    <col style="width:35%">
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row"><strong>이메일</strong></th>
                        <td>
                            {{user.f_email}}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><strong>비밀번호</strong></th>
                        <td>
                            ********
                        </td>
                        <td>
                            <button type="button" @click="f_passwd_show" class="n-btn w100 btn-sm btn-default">비밀번호
                                수정</button>
                        </td>
                    </tr>
                    <tr v-if="isShow1">
                        <td></td>
                        <v-text-field v-model="f_passwd" type='password' label="" required></v-text-field>
                        <td>
                            <button type="button" @click="updateMemberPassword()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><strong>휴대폰 번호</strong></th>
                        <td>
                            {{user.f_phonenum}}
                        </td>
                        <td>
                            <button type="button" @click="f_phonenum_show" class="n-btn w100 btn-sm btn-default">휴대폰 번호 수정</button>
                        </td>
                    </tr>
                    <tr v-if="isShow2">
                        <td></td>
                        <v-text-field v-model="f_phonenum" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="updateMemberPhoneNumber()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><strong>회원명</strong></th>
                        <td>
                            {{user.f_name}}
                        </td>
                        <td>
                            <button type="button" @click="f_name_show" class="n-btn w100 btn-sm btn-default">회원명 수정</button>
                        </td>
                    </tr>
                    <tr v-if="isShow3">
                        <td></td>
                        <v-text-field v-model="f_name" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="updateMemberName()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>

                    <tr class="my-info-img" id="profile-image-area">
                        <th scope="row"><strong>프로필 사진</strong></th>
                        <td>
                            <div>
                                <img class="img" :src="this.user.f_profile_img === '' ? '/member_profile_images/base_image.png' : `/member_profile_images/${this.user.f_profile_img}.png`" alt="프로필 이미지">
                            </div>
                        </td>
                        <td width="65%">
                            <button type="button" @click="profile_img_show" class="n-btn w100 btn-sm btn-default">사진 수정</button>
                        </td>
                    </tr>
                    <tr v-if="isShow4">
                        <td>
                            <input multiple="multiple" @change="imgPreview($event)" class="select-img-hidden" type="file" id="product_img_file" name="product_img_file" accept="image/*"><br>                        
                            <div id="image_container" class="image_container">
                                <p class="change_img_title">바뀔 이미지</p>
                            </div>
                        </td>
                        <td>
                            <button type="button" @click="updateFarmProfileImage()"
                                class="n-btn w100 btn-sm btn-default">기본 이미지로 변경</button>
                            <button type="button" @click="updateFarmProfileImage()"
                                class="n-btn w100 btn-sm btn-default">수정 하기</button>                                
                        </td>
                    </tr>
                </tbody>
            </table>
            <SearchAddress :addressInfo="addressInfo" @searchAddressRes="searchAddressResult"/>
        </v-form>

        <!-- 농가 프로필 -->
        <header class="n-section-title first info_views-area">
            <h1 class="tit">농가 회원정보</h1>
            <!-- <button class="n-btn btn-sm btn-default" onclick="openGatePassword('001');">가려진정보 보기</button> -->
        </header>



        <table class="n-table table-row my-info-modify">
            <colgroup>
                <col style="width:25%">
                <col style="width:40%">
                <col style="width:35%">
            </colgroup>
            <tbody>
                <tr>
                </tr>

                <tr>
                    <th scope="row"><strong>농가명</strong></th>
                    <td>
                        {{user.f_farm_name}}
                    </td>
                    <td>
                        <button type="button" @click="f_farm_name_show" class="n-btn w100 btn-sm btn-default">농가명
                            수정</button>
                    </td>
                </tr>
                <tr v-if="isShow5">
                    <td></td>
                    <v-text-field v-model="f_farm_name" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmMemberFarmName()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><strong>농가 전화번호</strong></th>
                    <td>
                        {{user.f_num}}
                    </td>
                    <td>
                        <button type="button" @click="f_num_show" class="n-btn w100 btn-sm btn-default">농가 전화번호
                            수정</button>
                    </td>
                </tr>
                <tr v-if="isShow6">
                    <td></td>
                    <v-text-field v-model="f_num" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmMemberFarmNumber()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>


                <tr>
                    <th scope="row"><strong>사업자 등록번호</strong></th>
                    <td>
                        {{user.f_BRN}}
                    </td>
                    <td>
                        <button type="button" @click="f_brn_show" class="n-btn w100 btn-sm btn-default">사업자 등록번호 수정</button>
                    </td>
                </tr>

                <tr v-if="isShow7">
                    <td></td>
                    <v-text-field v-model="f_BRN" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmMemberBRN()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><strong>은행</strong></th>
                    <td>
                        {{user.f_bank}}
                    </td>
                    <td>
                        <button type="button" @click="f_bank_show" class="n-btn w100 btn-sm btn-default">계좌 수정</button>
                    </td>
                </tr>
                <tr v-if="isShow8">
                    <td><strong>은행명</strong></td>
                    <v-text-field v-model="user.f_bank" label="" required></v-text-field>
                </tr>
                <tr v-if="isShow8">
                    <td><strong>예금자명</strong></td>
                    <v-text-field v-model="user.f_bank_name" label="" required></v-text-field>
                </tr>
                <tr v-if="isShow8">
                    <td><strong>계좌 번호</strong></td>
                    <v-text-field v-model="user.f_bank_num" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmMemberBank()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>
                <tr class="my-info-img" id="profile-image-area" v-if="isShow8">
                    <th scope="row"><strong>통장 사본 사진</strong></th>
                    <td>
                        <div>
                            <img class="img" :src="this.user.f_bank_img == null || this.user.f_bank_img == '' ? '/bank_images/x_image.png' : `/bank_images/${this.user.f_bank_img}.png`" alt="통장 사본 이미지">
                        </div>
                    </td>
                </tr>
                <tr v-if="isShow8">
                    <td>
                        <input multiple="multiple" @change="imgPreview($event)" class="select-img-hidden" type="file" id="bank_img_file" name="bank_img_file" accept="image/*"><br>                        
                        <div id="image_container" class="image_container">
                            <p class="change_img_title">바뀔 이미지</p>
                        </div>
                    </td>
                    <td>
                        <button type="button" @click="updateFarmMemberBank()"
                            class="n-btn w100 btn-sm btn-default">수정 하기</button>                                
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 농가 소개 -->
        <header class="n-section-title first info_views-area">
            <h1 class="tit">{{user.f_farm_name}}</h1>
        </header>

        <table class="n-table table-row my-info-modify">
            <colgroup>
                <col style="width:25%">
                <col style="width:40%">
                <col style="width:35%">
            </colgroup>
            <tbody>
                <tr>
                    <th scope="row"><strong>농가 설명</strong></th>
                    <td>
                        {{user.f_explanation}}
                    </td>
                    <td>
                        <button type="button" @click="f_explanation_show" class="n-btn w100 btn-sm btn-default">농가 설명
                            수정</button>
                    </td>
                </tr>
                <tr v-if="isShow9">
                    <td></td>
                    <v-text-field v-model="f_explanation" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmExplanation()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><strong>주요 농작물</strong></th>
                    <td>
                        {{user.f_major_crop}}
                    </td>
                    <td>
                        <button type="button" @click="f_major_crop_show" class="n-btn w100 btn-sm btn-default">주요 농작물
                            수정</button>
                    </td>
                </tr>
                <tr v-if="isShow10">
                    <td></td>
                    <v-text-field v-model="f_major_crop" label="" required></v-text-field>
                    <td>
                        <button type="button" @click="updateFarmMajorCrop()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><strong>농가 사진</strong></th>
                    <td>
                        <div>
                            <img class="img" :src="this.user.f_img == null || this.user.f_img == '' ? '/farm_images/base_farm_image.png' : `/farm_images/${this.user.f_img}.png`" alt="통장 사본 이미지">
                        </div>
                    </td>
                    <td>
                        <button type="button" @click="f_img_show" class="n-btn w100 btn-sm btn-default">농가 사진
                            수정</button>
                    </td>
                </tr>

                <tr v-if="isShow11">
                    <input multiple="multiple" @change="uploadFarmImages()" type="file" id="farm_img_files" name="farm_img_files"
                accept="image/*"><br>
                    <td>
                        <button type="button" @click="updateFarmImage()"
                            class="n-btn w100 btn-sm btn-default">수정하기</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <bottom-nav />
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import SearchAddress from '../../components/search_address.vue';
import axios from 'axios';

export default {
    components: { Header, bottomNav, SearchAddress },
    data() {
        return {
            headerProps: '개인정보 수정',
            pro_test: JSON.parse(localStorage.getItem("pro_test")) || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
            addressInfo: {
                zipcode: JSON.parse(localStorage.getItem("user")).f_zipcode, 
                address: JSON.parse(localStorage.getItem("user")).f_location
            },
            checkUser: "farm",
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            isShow7: false,
            isShow8: false,
            isShow9: false,
            isShow10: false,
            isShow11: false,

            farm_id: null,
            f_passwd: null,
            f_phonenum: null,
            f_name: null,
            f_num: null,
            f_bank: null,
            f_bank_name: null,
            f_bank_num: null,
            f_farm_name: null,
            f_explanation: null,
            f_major_crop: null,
            f_img: null,
            f_profile_img: null,

            passwordChangeConfirmation: "비밀번호를 변경하시겠습니까?",
            passwordChangeSuccess: "비밀번호가 변경되었습니다!",
            
            phonenumberRuleWarning: "휴대폰 번호는 11자리 숫자로 이루어져야 합니다!",
            samePhonenumberWarning: "변경할 휴대폰 번호는 이전 휴대폰 번호와 달라야 합니다!",
            phonenumberChangeConfirmation: "휴대폰 번호를 변경하시겠습니까?",
            phonenumberChangeSuccess: "휴대폰 번호가 변경되었습니다!",

            profileImageChangeConfirmation: "프로필 사진을 변경하시겠습니까?",
            profileImageChangeSuccess: "프로필 사진이 변경되었습니다!",

            sameNameWarning: "동일한 회원명입니다!",
            nameChangeConfirmation: "회원명을 변경하시겠습니까?",
            nameChangeSuccess: "회원명이 변경되었습니다!",

            addressChangeConfirmation: "주소를 변경하시겠습니까?",
            addressChangeSuccess: "주소가 변경되었습니다!",

            sameFarmNameWarning: "동일한 농가명입니다!",
            farmNameChangeConfirmation: "농가명을 변경하시겠습니까?",
            farmNameChangeSuccess: "농가명이 변경되었습니다!",

            farmNumberRuleWarning: "전화번호는 9~11자리 숫자로 이루어져야 합니다!",
            sameFarmNumberWarning: "동일한 전화번호입니다!",
            farmNumberChangeConfirmation: "전화번호을 변경하시겠습니까?",
            farmNumberChangeSuccess: "전화번호이 변경되었습니다!",

            bankInfoChangeConfirmation: "은행 정보를 변경하시겠습니까?",
            bankInfoChangeSuccess: "은행 정보가 변경되었습니다!",

            farmExplanationChangeConfirmation: "농가 설명을 변경하시겠습니까?",
            farmExplanationChangeSuccess: "농가 설명이 변경되었습니다!",

            majorCropChangeConfirmation: "주요 농작물을 변경하시겠습니까?",
            majorCropChangeSuccess: "주요 농작물이 변경되었습니다!",

            farmImageChangeConfirmation: "농가 사진을 변경하시겠습니까?",
            farmImageChangeSuccess: "농가 사진이 변경되었습니다!",
        };
    },

    // mounted() {
    // this.value = this.userInfo.value || "";
    // },

    methods: {
        f_passwd_show() {
            this.isShow1 = !this.isShow1;
        },
        f_phonenum_show() {
            this.isShow2 = !this.isShow2;
        },
        f_name_show() {
            this.isShow3 = !this.isShow3;
        },
        profile_img_show() {
            this.isShow4 = !this.isShow4;
        },

        f_farm_name_show(){
            this.isShow5 = !this.isShow5;
        },
        f_num_show() {
            this.isShow6 = !this.isShow6;
        },
        f_brn_show() {
            this.isShow7 = !this.isShow7;
        },
        f_bank_show() {
            this.isShow8 = !this.isShow8;
        },

        f_explanation_show() {
            this.isShow9 = !this.isShow9;
        },
        f_major_crop_show() {
            this.isShow10 = !this.isShow10;
        },
        f_img_show() {
            this.isShow11 = !this.isShow11;
        },

        
        updateFarmImage() {
            console.log(this.user);

            let frm = new FormData();
            for(let imageFile of this.f_img.files) frm.append("new_farm_img", imageFile);
            frm.append('farm_id', this.user.farm_id);
            frm.append('f_img', this.user.f_img);

            // 이미지 파일을 안 넣었으면 경고창.
            if(this.f_img.length < 1){
                alert('이미지 파일이 없습니다.');
                return;
            }
            if(this.f_img.length > 1){
                alert('이미지 파일은 1개만 넣어주세요!');
                return;
            }
            if(this.$route.path == '/farm_profile'){
                axios.patch('/api/farmImages', frm, {
                    headers: {
                        TOKEN: this.user.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    if(res.headers.token != "token"){
                        this.$store.commit('LOGOUT');
                        this.$router.push('/login');
                    }                    
                    console.log('res.data', res.data);
                    alert('등록 완료!');
                })
                .catch(err => {
                    console.log(err);
                });
                
            }else{
                alert('잘못된 접근입니다!');
            }
        },

        updateMemberPassword() {
            if(!confirm(this.passwordChangeConfirmation)) return;
            axios.patch('api/memberPassword', { 
                checkUser: this.checkUser, 
                id: this.user.farm_id, 
                passwd: this.f_passwd }, {
                headers: {
                    TOKEN: this.user.token
                }
            })
            .then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }                
                console.log(res);
                alert(this.passwordChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        isNotPhonenumber(){
            if(this.f_phonenum.length != 11) return true;
            if(Number.isNaN(this.f_phonenum)) return true;
            let tempNumber = Number(this.f_phonenum);
            return Number.isInteger(tempNumber) ? tempNumber < 0  : true;
        },
        updateMemberPhoneNumber() {
            if(this.isNotPhonenumber()) return alert(this.phonenumberRuleWarning);
            if(this.user.f_phonenum == this.f_phonenum) return alert(this.samePhonenumberWarning);
            if(!confirm(this.phonenumberChangeConfirmation)) return;
            axios.patch('api/memberPhoneNumber', { 
                checkUser: this.checkUser, 
                id: this.user.farm_id, 
            phonenum: this.f_phonenum }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }                
                this.user.f_phonenum = this.f_phonenum;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.phonenumberChangeSuccess);
            }).catch(err => {
                console.log(err);
            });
        },
        updateMemberName() {
            if(this.user.f_name == this.f_name) return alert(this.sameNameWarning);
            if(!confirm(this.nameChangeConfirmation)) return;
            axios.patch('api/memberName', { 
                checkUser: this.checkUser, 
                id: this.user.farm_id, 
                name: this.f_name }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }      
                this.user.f_name = this.f_name;
                localStorage.setItem("user", JSON.stringify(this.user));                
                alert(this.nameChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        updateFarmProfileImage() {
            if(!confirm(this.profileImageChangeConfirmation)) return;
            let frm = new FormData();
            this.new_profile_img = document.getElementById("product_img_file").files[0];
            
            frm.append("checkUser", "farm");
            frm.append("id", this.user.farm_id);
            frm.append("profile_img",this.user.f_profile_img);
            if(this.new_profile_img != undefined) frm.append('new_profile_img', this.new_profile_img);
            axios.patch('/api/memberProfileImage', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }
                console.log(res);
                console.log(res.data);
                this.user.f_profile_img = res.data;
                localStorage.setItem("user", JSON.stringify(this.user));
                location.reload();
                alert(this.profileImageChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        // 바꿀 이지 미리 띄워주기
        imgPreview(event){
            let reader = new FileReader();
            reader.onload = function(event){
                let img = document.createElement('img');
                img.setAttribute('src', event.target.result);
                img.setAttribute('width', '100px');
                img.setAttribute('height', '100px');
                document.getElementById('image_container').appendChild(img);
            }
            reader.readAsDataURL(event.target.files[0]);
            console.log(event.target.files[0]);
        },
        searchAddressResult(event){
            // 인증번호 맞는지 검사하고 맞다면 비밀번호 변경창 띄우기
            console.log('event: ', event);
            this.addressInfo.zipcode = event.zipcode;
            this.addressInfo.location = event.address;
            if(!confirm(this.addressChangeConfirmation)) return;

            // 서버에 변경된 데이터 보내기
            axios.patch('api/memberAddress', { 
                checkUser: "farm", 
                id: this.user.farm_id, 
                zipcode: event.zipcode,
                location: event.address
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }            
                console.log(res.data);
                alert(this.addressChangeSuccess);
            }).catch(err => {
                console.log(err);
            });
        },
        updateFarmMemberFarmName(){
            if(this.user.f_farm_name == this.f_farm_name) return alert(this.sameFarmNameWarning);
            if(!confirm(this.farmNameChangeConfirmation)) return;

            // 서버에 변경된 데이터 보내기
            axios.patch('api/farmMemberFarmName', { 
                farm_id: this.user.farm_id,
                f_farm_name: this.f_farm_name
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }            
                this.user.f_farm_name = this.f_farm_name;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.farmNameChangeSuccess);
            }).catch(err => {
                console.log(err);
            });
        },
        isNotFarmNumber(){
            if(this.f_num.length > 11 || this.f_num.length < 9) return true;
            if(Number.isNaN(this.f_num)) return true;
            let tempNumber = Number(this.f_num);
            return Number.isInteger(tempNumber) ? tempNumber < 0  : true;
        },
        updateFarmMemberFarmNumber(){
            if(this.isNotFarmNumber()) return alert(this.farmNumberRuleWarning);
            if(this.user.f_num == this.f_num) return alert(this.sameFarmNumberWarning);
            if(!confirm(this.farmNameChangeConfirmation)) return;

            // 서버에 변경된 데이터 보내기
            axios.patch('api/farmMemberNumber', { 
                farm_id: this.user.farm_id,
                f_num: this.f_num
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }            
                this.user.f_num = this.f_num;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.farmNumberChangeSuccess);
            }).catch(err => {
                console.log(err);
            });
        },
        isNotBrn(){
            if(this.f_BRN.length != 10) return true;
            if(Number.isNaN(this.isNotBrn)) return true;
            let tempNumber = Number(this.isNotBrn);
            return Number.isInteger(tempNumber) ? tempNumber < 0  : true;
        },
        // 아직 백엔드 구현 x
        updateFarmMemberBRN(){
            if(this.isNotBrn()) return alert(this.farmNumberRuleWarning);
            if(this.user.f_BRN == this.f_BRN) return alert(this.sameFarmNumberWarning);
            if(!confirm(this.farmNameChangeConfirmation)) return;

            // 서버에 변경된 데이터 보내기
            axios.patch('api/farmMemberNumber', { 
                farm_id: this.user.farm_id,
                f_BRN: this.f_BRN
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }            
                this.user.f_BRN = this.f_BRN;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.farmNumberChangeSuccess);
            }).catch(err => {
                console.log(err);
            });
        },

        updateFarmMemberBank() {
            if(!confirm(this.bankInfoChangeConfirmation)) return;
            let frm = new FormData();
            this.new_bank_img = document.getElementById("bank_img_file").files[0];
            frm.append("farm_id", this.user.farm_id);
            frm.append("f_bank",this.f_bank);
            frm.append("f_bank_name", this.f_bank_name);
            frm.append("f_bank_num",Number(this.f_bank_num));
            frm.append("f_bank_img",this.user.f_bank_img);
            console.log(frm);
            if(this.new_bank_img != undefined) frm.append('new_bank_img', this.new_bank_img);
            axios.patch('/api/farmMemberBank', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }
                console.log(res);
                console.log(res.data);
                this.user.f_bank = this.f_bank;
                this.user.f_bank_name = this.f_bank_name;
                this.user.f_bank_num = this.f_bank_num;
                this.user.f_bank_img = res.data;
                localStorage.setItem("user", JSON.stringify(this.user));
                location.reload();
                alert(this.bankInfoChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        updateFarmExplanation() {
            if(!confirm(this.farmExplanationChangeConfirmation)) return;
            axios.patch('api/farmMemberExplanation', { farm_id: this.user.farm_id, f_explanation: this.f_explanation }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                    if(res.headers.token != "token"){
                        this.$store.commit('LOGOUT');
                        this.$router.push('/login');
                    }            
                    console.log(res);
                    this.user.f_explanation = this.f_explanation;
                    localStorage.setItem("user", JSON.stringify(this.user));
                    alert(this.farmExplanationChangeSuccess);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updateFarmMajorCrop() {
            if(!confirm(this.majorCropChangeConfirmation)) return;
            axios.patch('api/farmMemberMajorCrop', { farm_id: this.user.farm_id, f_major_crop: this.f_major_crop }, {
                    headers: {
                        TOKEN: this.user.token
                }
            }).then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }            
                console.log(res);
                this.user.f_major_crop = this.f_major_crop;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.majorCropChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        uploadFarmImages() {
            this.f_img = document.getElementById("farm_img_files");
            console.log('test', this.f_img.files);
        },
        updateFarmImage() {
            if(!confirm(this.farmImageChangeConfirmation)) return;
            let frm = new FormData();
            console.log(this.f_img);

            frm.append("farm_id", this.user.farm_id);
            frm.append("f_img", this.user.f_img);
            if(this.f_img != undefined){
                console.log('---------');
                for(let imageFile of this.f_img.files) {
                    frm.append("farm_img_files", imageFile);
                }
            }
            axios.patch('/api/farmImages', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                if(res.headers.token != "token"){
                    this.$store.commit('LOGOUT');
                    this.$router.push('/login');
                }                
                console.log(res);
                this.user.f_img = res.data;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.farmImageChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
    },

}
</script>

<style>

</style>