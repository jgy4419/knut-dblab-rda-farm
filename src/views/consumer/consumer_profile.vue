<template>
    <div>
        <Header/>
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
                        <button type="button" class="n-btn w100 btn-sm btn-default">이메일 수정</button>
                    </td> -->
                    </tr>
                    <tr>
                        <th scope="row"><strong>비밀번호</strong></th>
                        <td>
                            ********
                        </td>
                        <td>
                            <button type="button" @click="c_passwd_show" class="n-btn w100 btn-sm btn-default">비밀번호
                                수정</button>
                        </td>
                    </tr>

                    <tr v-if="isShow1">
                        <td></td>
                        <v-text-field v-model="c_passwd" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="update_consumer_member_c_passwd()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><strong>휴대폰번호</strong></th>
                        <td>
                            {{user.c_phonenum}}
                        </td>
                        <td>
                            <button type="button" @click="c_phonenum_show" class="n-btn w100 btn-sm btn-default">휴대폰번호
                                수정</button>
                        </td>
                    </tr>

                    <tr v-if="isShow2">
                        <td></td>
                        <v-text-field v-model="c_phonenum" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="update_consumer_member_c_phonenum()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr class="my-info-img" id="profile-image-area">
                        <th scope="row"><strong>프로필 사진</strong></th>
                        <td>
                            <div>
                                <div class="img"
                                    style="background-image: url(https://image.msscdn.net/mfile_s01/_simbols/_basic/d.png)">
                                    
                                </div>
                            </div>
                        </td>
                        <td width="65%">
                            <button type="button" @click="c_profile_img_show" class="n-btn w100 btn-sm btn-default">사진
                                수정</button>
                        </td>
                    </tr>
                    <tr v-if="isShow3">
                        <td>
                            <input multiple="multiple" @change="upload()" type="file" id="product_img_file" name="product_img_file" accept="image/*"><br> <img src="image">                            
                        </td>

                        <td>
                            <button type="button" @click="update_consumer_member_c_img()"
                                class="n-btn w100 btn-sm btn-default">기본 이미지로 변경</button>
                            <button type="button" @click="update_consumer_member_c_img()"
                                class="n-btn w100 btn-sm btn-default">수정 하기</button>                                
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><strong>회원명</strong></th>
                        <td>
                            {{c_name}}
                        </td>
                        <td>
                            <button type="button" @click="c_name_show" class="n-btn w100 btn-sm btn-default">회원명
                                수정</button>
                        </td>
                    </tr>

                    <tr v-if="isShow4">
                        <td></td>
                        <v-text-field v-model="c_name" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="update_consumer_member_c_name()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <SearchAddress :addressInfo="addressInfo" @searchAddressRes="searchAddressResult"/>
        </v-form>
    </div>
<bottomNav/>
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import axios from 'axios';
import SearchAddress from '../../components/search_address.vue';

export default {
    components: { Header, bottomNav, SearchAddress },
    data() {
        var consumer_id = localStorage.getItem("user.consumer_id") || "";
        return {
            pro_test: JSON.parse(localStorage.getItem("pro_test")) || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
            addressInfo: {
                zipcode: JSON.parse(localStorage.getItem("user")).f_zipcode, 
                address: JSON.parse(localStorage.getItem("user")).f_location
            },
            isShow1: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            isShow5: false,
            isShow6: false,
            consumer_id: consumer_id,
            c_passwd: this.c_passwd,
            c_phonenum: this.c_phonenum,
            c_name: this.c_name,
            c_zipcode: this.c_zipcode,
            c_location: this.c_location,
            checkUser: 'consumer'
        };
    },
    mounted(){
        if(!JSON.parse(localStorage.getItem('user')).consumer_id){
            this.checkUser = 'farm'
        }
    },

    methods: {
        searchAddressResult(event){
            // 인증번호 맞는지 검사하고 맞다면 비밀번호 변경창 띄우기
            console.log('event: ', event);
            this.addressInfo.zipcode = event.zipcode;
            this.addressInfo.location = event.address;

            // 서버에 변경된 데이터 보내기
            axios.patch('api/memberAddress', { 
                checkUser: "consumer", 
                id: this.user.consumer_id, 
                zipcode: event.zipcode,
                location: event.address
                }).then(res => {
                    console.log(res.data);
                    alert("주소 변경이 완료되었습니다!");
                }).catch(err => {
                    console.log(err);
            });
        },
        c_passwd_show() {
            this.isShow1 = !this.isShow1;
            console.log("passwd");
        },
        c_phonenum_show() {
            this.isShow2 = !this.isShow2;
            console.log("num");
        },
        c_profile_img_show() {
                this.isShow3 = !this.isShow3;
                console.log("img");
        },
        c_name_show() {
            this.isShow4 = !this.isShow4;
            console.log("name");
        },
        c_zipcode_show() {
            this.isShow5 = !this.isShow5;
            console.log("zip");
        },
        c_location_show() {
            this.isShow6 = !this.isShow6;
            console.log("loc");
        },
        // 비밀번호 405 에러 
        update_consumer_member_c_passwd() {
            console.log(this.checkUser, JSON.parse(localStorage.getItem('user')).consumer_id, this.c_passwd);
            axios.patch('api/memberPassword', { 
                    checkUser: this.checkUser, 
                    id: JSON.parse(localStorage.getItem('user')).consumer_id, 
                    passwd: this.c_passwd 
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 405 에러
        update_consumer_member_c_phonenum() {
            console.log(this.checkUser, JSON.parse(localStorage.getItem('user')).consumer_id, this.c_phonenum );
            console.log(typeof this.c_phonenum );
            axios.patch('api/memberPhoneNumber', { 
                checkUser:this.checkUser, 
                id: JSON.parse(localStorage.getItem('user')).consumer_id, 
                phonenum: this.c_phonenum
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        },
        // 
        update_consumer_member_c_name() {
            axios.patch('api/memberName', {
                checkUser: this.checkUser, 
                id: JSON.parse(localStorage.getItem('user')).consumer_id, 
                name: this.c_name 
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        },
        update_consumer_member_c_zipcode() {
            axios.patch('api/memberAddress', { consumer_id: this.consumer_id, c_zipcode: this.c_zipcode })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        update_consumer_member_c_location() {
            axios.patch('api/updateConsumerMember/location', { consumer_id: this.consumer_id, c_location: this.c_location })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        update_consumer_member_c_img() {
            let frm = new FormData();
            this.product_img_file = document.getElementById("product_img_file");
            console.log(this.product_img_file.files[0]);
        
            frm.append("checkUser", "consumer");
            frm.append("id", JSON.parse(localStorage.getItem('user')).consumer_id);
            frm.append("profile_img",this.c_profile_img);
            frm.append('new_profile_img', this.new_profile_img);
            console.log(frm);
            for(let a of frm) console.log(a);
            //this.$store.state.login.userInfo.consumer_id
            axios.patch('/api/memberProfileImage', frm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res);
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