<template>
    <div class="searchAddress">
        <div class="inner">
            <div class="addressInput">
                <input v-for="type, i in input.type.length" :key="i" 
                @click="getApi()"
                :value="input.values[i]"
                :type="input.type[i]"
                :id="input.id[i]"
                :placeholder="input.placeholder[i]">
                <span id="guide" style="color:#999;display:none"></span><br/>
                <input type="text" id="sample4_detailAddress" placeholder="상세주소">
                <button class="checkAddress" @click="checkAddress()">주소확인</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input: {
                type: ['text', 'button', 'text', 'text'],
                id: ['sample4_postcode', '', 'sample4_roadAddress', 'sample4_jibunAddress'],
                placeholder: ['우편번호', '', '도로명주소', '지번주소'],
                values: ['', '우편번호 찾기', '', ''],
            },
            emitData: {
                zipcode: '',
                address: '',
                detailAddress: ''
            }
        }
    },
    methods: {
        checkAddress(){
            console.log(            document.getElementById('sample4_postcode').value,
            document.getElementById("sample4_roadAddress").value,
            document.getElementById("sample4_jibunAddress").value)
            this.emitData.zipcode = document.getElementById('sample4_postcode').value;
            document.getElementById("sample4_roadAddress").value;
            document.getElementById("sample4_jibunAddress").value;
        },
        getApi(){
            new window.daum.Postcode({
                oncomplete: function(data) {
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample4_postcode').value = data.zonecode;
                    document.getElementById("sample4_roadAddress").value = roadAddr;
                    document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
                    
                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    if(roadAddr !== ''){
                        document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                    } else {
                        document.getElementById("sample4_extraAddress").value = '';
                    }

                    var guideTextBox = document.getElementById("guide");
                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                    if(data.autoRoadAddress) {
                        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                        guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                        guideTextBox.style.display = 'block';

                    } else if(data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                        guideTextBox.style.display = 'block';
                    } else {
                        guideTextBox.innerHTML = '';
                        guideTextBox.style.display = 'none';
                    }
                }
            }).open();
        
        }
    }
}
</script>

<style lang="scss" scoped>
button{
    position: relative;
    z-index: 100;
}
.searchAddress{
    width: 29vw;
    height: 420px;
    .inner{
        position: relative;
        // margin: auto;
        .addressInput{
            position: absolute;
            margin: auto;
            left: 0;
            // right: 0;
            // display: block;
            // justify-content: left;
            flex-wrap: wrap;
            // gap: 20px;
            input{
                margin: 10px auto;
                padding: 20px;
                width: 100%;
                height: 50px;
                background-color: rgb(245, 245, 245);
                // border-radius: 10px;
                border: solid 1px rgb(209, 209, 209);
            }
            input:nth-child(2){
                padding: 0;
                border-radius: 20px;
                background-color: #FFC1AA;
                height: 50px;
                width: 100%;
                font-weight: 700;
                font-size: 16px;
            }
            .checkAddress{
                margin-top: 10px;
                width: 100%;
                height: 50px;
                font-size: 16px;
                font-weight: 700;
                border-radius: 20px;
                background-color: #FFC1AA;
            }
        }
    }
    @media screen and (max-width: 500px){
        .inner{
            width: 75vw;
            margin-bottom: 20px;
            .addressInput{
                input{
                    width: 400px;
                }
            }
        }
    }
}
</style>