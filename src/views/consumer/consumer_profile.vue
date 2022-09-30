<template>
    <div>
        <Header :headerProps="headerProps"/>
        <div class="inner">
            <!-- 기본 회원정보 -->
            <header class="n-section-title first info_views-area">
                <h1 class="tit">회원정보</h1>
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
                                {{user.c_email}}
                            </td>
                            <!-- <td>
                            <button type="button" class="n-btn w100 btn-sm btn-default"  style="float: right;">이메일 수정</button>
                        </td> -->
                        </tr>
                        <tr>
                            <th scope="row"><strong>비밀번호</strong></th>
                            <td>
                                ********
                            </td>
                            <td>
                                <button type="button" @click="c_passwd_show" class="n-btn w100 btn-sm btn-default" style="float: right;">비밀번호
                                    수정</button>
                            </td>
                        </tr>

                        <tr v-if="isShow1">
                            <td></td>
                            <v-text-field v-model="c_passwd" type='password' label="" required></v-text-field>
                            <td>
                                <button type="button" @click="update_consumer_member_c_passwd()"
                                    class="n-btn w100 btn-sm btn-default" style="float: right;">수정하기</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><strong>휴대폰 번호</strong></th>
                            <td>
                                {{user.c_phonenum}}
                            </td>
                            <td>
                                <button type="button" @click="c_phonenum_show" class="n-btn w100 btn-sm btn-default" style="float: right;">휴대폰 번호 수정</button>
                            </td>
                        </tr>
                        <tr v-if="isShow2">
                            <td></td>
                            <v-text-field v-model="c_phonenum" label="" required></v-text-field>
                            <td>
                                <button type="button" @click="update_consumer_member_c_phonenum()"
                                    class="n-btn w100 btn-sm btn-default" style="float: right;">수정하기</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"><strong>회원명</strong></th>
                            <td>
                                {{user.c_name}}
                            </td>
                            <td>
                                <button type="button" @click="c_name_show" class="n-btn w100 btn-sm btn-default" style="float: right;">회원명 수정</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><strong>주민등록번호</strong></th>
                            <td>
                                {{user.c_zipcode}}
                            </td>
                            <!-- <td>
                                <button type="button" @click="c_name_show" class="n-btn w100 btn-sm btn-default" style="float: right;">회원명 수정</button>
                            </td> -->
                        </tr>
                        <tr v-if="isShow3">
                            <td></td>
                            <v-text-field v-model="c_name" label="" required></v-text-field>
                            <td>
                                <button type="button" @click="update_consumer_member_c_name()"
                                    class="n-btn w100 btn-sm btn-default" style="float: right;">수정하기</button>
                            </td>
                        </tr>

                        <tr class="my-info-img" id="profile-image-area">
                            <th scope="row"><strong>프로필 사진</strong></th>
                            <td>
                                <div>
                                    <img class="img" :src="this.user.c_profile_img === '' ? '/member_profile_images/base_image.png' : `/member_profile_images/${this.user.c_profile_img}.png`" alt="프로필 이미지">
                                </div>
                            </td>
                            <td width="65%">
                                <button type="button" @click="c_profile_img_show" class="n-btn w100 btn-sm btn-default" style="float: right;">사진
                                    수정</button>
                            </td>
                        </tr>
                        <tr v-if="isShow4" class="img-edit-contain">
                            <td>
                                <input multiple="multiple" @change="imgPreview($event)" style="display: none" type="file" id="product_img_file" name="product_img_file" accept="image/*"><br>                        
                                <label for="product_img_file" class="img-select-button">이미지 선택</label>
                                <div id="image_container" class="image_container">
                                    <p class="change_img_title">바뀔 이미지</p>
                                </div>
                            </td>

                            <td class="img-change-button">
                                <button type="button" @click="updateConsumerProfileImage()"
                                    class="n-btn w100 btn-sm btn-default" style="float: right;">기본 이미지로 변경</button>
                                <button type="button" @click="updateConsumerProfileImage()"
                                    class="n-btn w100 btn-sm btn-default" style="float: right;">수정 하기</button>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                <SearchAddress :addressInfo="addressInfo" @searchAddressRes="searchAddressResult"/>
                <UserSecession/>
            </v-form>
        </div>
    </div>
<bottomNav/>
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import UserSecession from '../../components/userSecession.vue';
import bottomNav from '@/components/bottomNav.vue';
import axios from 'axios';
import SearchAddress from '../../components/search_address.vue';

export default {
    components: { Header, bottomNav, SearchAddress, UserSecession },
    data() {
        return {
            headerProps: '개인정보 수정',
            pro_test: JSON.parse(localStorage.getItem("pro_test")) || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
            addressInfo: {
                zipcode: JSON.parse(localStorage.getItem("user")).c_zipcode, 
                address: JSON.parse(localStorage.getItem("user")).c_location,
                c_detail_location: JSON.parse(localStorage.getItem("user")).c_detail_location,
                isConsumer: true,
            },
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            c_passwd: null,
            c_phonenum: null,
            c_name: null,
            c_zipcode: null,
            c_location: null,
            checkUser: 'consumer',
            c_profile_img: null,
            new_profile_img:JSON.parse(localStorage.getItem("user")).new_profile_img,
            passwordChangeConfirmation: "비밀번호를 변경하시겠습니까?",
            passwordChangeSuccess: "비밀번호가 변경되었습니다!",

            phonenumberRuleWarning: "휴대폰 번호는 11자리 숫자로 이루어져야 합니다!",
            samePhonenumberWarning: "변경할 휴대폰 번호는 이전 휴대폰 번호와 달라야 합니다!",
            phonenumberChangeConfirmation: "휴대폰 번호를 변경하시겠습니까?",
            phonenumberChangeSuccess: "휴대폰 번호가 변경되었습니다!",

            profileImageChangeConfirmation: "프로필 사진을 변경하시겠습니까?",
            profileImageChangeSuccess: "프로필 사진이 변경되었습니다!",

            nameChangeConfirmation: "회원명을 변경하시겠습니까?",
            sameNameWarning: "동일한 회원명입니다!",
            nameChangeSuccess: "회원명이 변경되었습니다!",

            addressChangeConfirmation: "주소를 변경하시겠습니까?",
            addressChangeSuccess: "주소가 변경되었습니다!",
        };
    },
    mounted(){
        console.log(this.user);
        if(!this.user.consumer_id){
            this.checkUser = 'farm'
        }
    },

    methods: {
        c_passwd_show() {
            this.isShow1 = !this.isShow1;
            console.log("passwd");
        },
        c_phonenum_show() {
            this.isShow2 = !this.isShow2;
            console.log("num");
        },
        c_name_show() {
            this.isShow3 = !this.isShow3;
            console.log("name");
        },
        c_profile_img_show() {
            this.isShow4 = !this.isShow4;
            console.log("img");
        },

        update_consumer_member_c_passwd() {
            if(!confirm(this.passwordChangeConfirmation)) return;
            axios.patch('api/memberPassword', { 
                checkUser: this.checkUser, 
                id: this.user.consumer_id, 
                passwd: this.c_passwd 
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            })
            .then(res => {
                console.log(res);

                alert(this.passwordChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        isNotPhonenumber(){
            if(this.c_phonenum.length != 11) return true;
            for(let number of this.c_phonenum){
                console.log(number);
                if(isNaN(number)) return true;
            }
            return false;
        },
        update_consumer_member_c_phonenum() {
            if(this.isNotPhonenumber()) return alert(this.phonenumberRuleWarning);
            if(this.user.c_phonenum == this.c_phonenum) return alert(this.samePhonenumberWarning);
            if(!confirm(this.phonenumberChangeConfirmation)) return;
            axios.patch('api/memberPhoneNumber', { 
                checkUser:this.checkUser, 
                id: this.user.consumer_id, 
                phonenum: this.c_phonenum
            }, {
                headers: {
                    TOKEN: this.user.token
                }
            }).then(res => {
                console.log(res);
                // if(res.headers.token != "token"){
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }
                this.user.c_phonenum = this.c_phonenum;
                localStorage.setItem("user", JSON.stringify(this.user));
                alert(this.phonenumberChangeSuccess);
            })
            .catch(err => {
                console.log(err);
            });
        },
        // 
        update_consumer_member_c_name() {
            if(this.user.c_name == this.c_name) return alert(this.sameNameWarning);
            if(!confirm(this.nameChangeConfirmation)) return;
            axios.patch('api/memberName', {
                checkUser: this.checkUser, 
                id: this.user.consumer_id, 
                name: this.c_name 
            }, {
                    headers: {
                        TOKEN: this.user.token
                    }
            }).then(res => {
                console.log(res);

                this.user.c_name = this.c_name;
                localStorage.setItem("user", JSON.stringify(this.user));                
                alert(this.nameChangeSuccess);
            }).catch(err => {
                console.log(err);
                // if(res.headers.token != "token"){
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }
            });
        },
        updateConsumerProfileImage() {
            if(!confirm(this.profileImageChangeConfirmation)) return;
            let frm = new FormData();
            this.product_img_file = document.getElementById("product_img_file");
            this.new_profile_img = document.getElementById("product_img_file").files[0];
            console.log(this.product_img_file.files[0]);
            console.log(this.new_profile_img);

            
        
            frm.append("checkUser", "consumer");
            frm.append("id", this.user.consumer_id);
            frm.append("profile_img",this.user.c_profile_img);
            if(this.new_profile_img != undefined) frm.append('new_profile_img', this.new_profile_img);
            axios.patch('/api/memberProfileImage', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {

                console.log(res);
                console.log(res.data);
                this.user.c_profile_img = res.data;
                localStorage.setItem("user", JSON.stringify(this.user));
                location.reload();
                alert(this.profileImageChangeSuccess);
            })
            .catch(err => {
                // if(res.headers.token != "token"){
                //     this.$store.commit('LOGOUT');
                //     this.$router.push('/login');
                // }
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
            console.log('event: ', event);
            this.addressInfo.zipcode = event.zipcode;
            this.addressInfo.location = event.address;
            if(!confirm(this.addressChangeConfirmation)) return;

            axios.patch('api/memberAddress', { 
                checkUser: "consumer", 
                id: this.user.consumer_id, 
                zipcode: event.zipcode,
                location: event.address,
                c_detail_location: event.c_detail_location,
                }, {
                    headers: {
                        TOKEN: this.user.token
                    }
                }).then(res => {

                    console.log(res.data);
                    alert(this.addressChangeSuccess);
                }).catch(err => {
                    // if(res.headers.token != "token"){
                    //     this.$store.commit('LOGOUT');
                    //     this.$router.push('/login');
                    // }
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.change_img_title{
    float: left;
    font-size: 14px;
    font-weight: 700;
    color: #333;
    margin: 0px 10px 20px;
}
.inner{
    padding: 10px;
}
th{
    width: 140px;
}
.img-edit-contain{
    td{
        .img-select-button{
            border: .5px solid #333;
            margin-left: 10px;
            margin-bottom: 10px;
            padding: 5px;
        }
        .image_container{
            width: 100%;
        }
    }
    .img-change-button{
        margin-left: 100%;
    }
}
</style>