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
                    <tr>
                        <th scope="row"><strong>우편번호</strong></th>
                        <td>
                            {{c_zipcode}}
                        </td>
                        <td>
                            <button type="button" @click="c_zipcode_show" class="n-btn w100 btn-sm btn-default">우편번호
                                수정</button>
                        </td>
                    </tr>

                    <tr v-if="isShow5">
                        <td></td>
                        <v-text-field v-model="c_zipcode" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="navigatecheck_consumer_loc()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><strong>주소</strong></th>
                        <td>
                            {{c_location}}
                        </td>
                        <td>
                            <button type="button" v-on:click="navigatecheck_consumer_loc()"
                                class="n-btn w100 btn-sm btn-default">주소
                                수정</button>
                        </td>
                    </tr>

                    <tr v-if="isShow6">
                        <td></td>
                        <v-text-field v-model="c_location" label="" required></v-text-field>
                        <td>
                            <button type="button" @click="update_consumer_member_c_location()"
                                class="n-btn w100 btn-sm btn-default">수정하기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-form>
    </div>
<bottomNav/>
</template>

<script>
import Header from '../../components/Header/backHeader.vue';
import bottomNav from '@/components/bottomNav.vue';
import axios from 'axios';

export default {
    components: { Header, bottomNav },
    data() {
        var consumer_id = localStorage.getItem("user.consumer_id") || "";
        return {
            pro_test: JSON.parse(localStorage.getItem("pro_test")) || "",
            user: JSON.parse(localStorage.getItem("user")) || "",
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

        };
    },

    // mounted() {
    // this.value = this.userInfo.value || "";
    // },

    methods: {
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

        navigatecheck_consumer_loc() {
            this.$router.push('../views/consumer/consumer_loc');
            
        },

        update_consumer_member_c_passwd() {
            axios.patch('api/update_consumer_member_c_passwd', { consumer_id: this.consumer_id, c_passwd: this.c_passwd })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        update_consumer_member_c_phonenum() {
            axios.patch('api/updateConsumerMember/phonenum', { consumer_id: this.consumer_id, c_phonenum: this.c_phonenum })
            
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        update_consumer_member_c_name() {
            axios.patch('api/updateConsumerMember/name', { consumer_id: this.consumer_id, c_name: this.c_name })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        update_consumer_member_c_zipcode() {
            axios.patch('api/updateConsumerMember/zipcode', { consumer_id: this.consumer_id, c_zipcode: this.c_zipcode })
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
            this.product_img_file = document.getElementById("product_img_file");
            console.log(this.product_img_file.files[0]);
            let frm = new FormData();
            frm.append("id", this.consumer_id);
            frm.append("profile_img", this.c_profile_img);
            frm.append('new_profile_img', this.new_profile_img);

            axios.patch('/api/updateConsumerMember/', frm, {
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