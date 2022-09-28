<template>
    <div>
        <!-- <header class="welcome-header1">
            <h1 class="welcome-header__title1">맵 테스트</h1>
        </header> -->
        <div id="map" style="width:500px;height:400px;"></div>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit_address">
            <input type="text" id="postcode" placeholder="우편번호" v-model="zipcode">
            <v-vtn @click="search()">우편번호 찾기</v-vtn><br>
            <!--onclick이 아니라 @click으로 바꿔야한다. -->
            <input type="text" id="roadAddress" placeholder="도로명주소" v-model="r_Addr">
            <input type="text" id="jibunAddress" placeholder="지번주소" v-model="j_Addr">
            <span id="guide" style="color:#000;display:none"></span>
            <input type="text" id="detailAddress" placeholder="상세주소" v-model="d_Addr">
            <input type="text" id="extraAddress" placeholder="참고항목">
            <button class="login-form__btn" type="submit" @click="submit_address">수정하기</button>
        </v-form>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            postcode: "",
            address: "",
            extraAddress: "",
            zipcode: "",
            r_Addr: "",
            j_Addr: "",
            d_Addr: "",
        };
    },
    mounted() {
        //카카오 맵이 sciprt 에 등록되었는지 확인
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
    },

    methods: {

        initMap() {
            var container = document.getElementById('map');
            var options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
            var map = new kakao.maps.Map(container, options);

            //마커추가하려면 객체를 아래와 같이 하나 만든다.
            var marker = new kakao.maps.Marker({
                position: map.getCenter()
            });
            marker.setMap(map);
        },

        addScript() {
            // vue 에서는 <script src=""> 형태를 사용할 수 없기때문에
            // script 객체 생성 후
            const script = document.createElement('script');
            // 아래의 주석이 없으면 동작하지 않음 (크롤링?)
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            // src 속성을 추가해야 javaScript API를 불러올 수 있다
            // 카카오 맵 api 를 동적으로 script를 로딩하긴 위해선 autoload=false 옵션을 지정해주어야 함
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e912469aedfe46c334cf869f731be1fa&libraries=services';
            document.head.appendChild(script);
        },
        search() { //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            new window.daum.Postcode({
                oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('postcode').value = data.zonecode;
                    document.getElementById("roadAddress").value = roadAddr;
                    document.getElementById("jibunAddress").value = data.jibunAddress;

                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if (roadAddr !== '') {
                        document.getElementById("extraAddress").value = extraRoadAddr;
                    } else {
                        document.getElementById("extraAddress").value = '';
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                    if (data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if (data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else {
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }
                }
            }).open();


        },

        submitaddress() {
            let frm = new FormData();

            frm.append("f_zipcode", this.f_zipcode);
            frm.append('r_Addr', this.r_Addr);
            frm.append('j_Addr', this.j_Addr);
            frm.append('d_Addr', this.d_Addr);

            axios.post('http://localhost:8080/', frm, {
                headers: {
                    TOKEN: this.user.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res);
                    if(res.headers.token != "token"){
                        this.$store.commit('LOGOUT');
                        this.$router.push('/login');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

    }
}
</script>
<style>

</style>