<template>
    <div class="farm-contain">
        <Header :headerProps="test.farmName"/>
        <div class="farm-information">
            <img class="farm-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVGCXTRUebkmD2Yi3Zd4sRGWCryxfM4wdI8jZuPBqqA&s" alt="농가 사진"/>
        </div>
        <div class="farm-name-tel">
            <div class="farm-userName">
                <h3 class="userName">이름</h3>
                <p>{{test.name}}</p>
            </div>
            <div class="farm-tel">
                <h3 class="tel">연락처</h3>
                <p>{{test.tel}}</p>
            </div>
        </div>
        <div class="farm-description">
            <h3 class="description">농가설명</h3>
            <p>{{test.description}}</p>
        </div>
        <div class="buttons">
            <div class="farm-best">
                <button class="best" @click="bestToggle()">주요 농작물</button>
                <div v-if="bestState === true" class="best-detail">
                    <ul>
                        <li v-for="best, i in test.bestFarm.length" :key="i">{{i + 1}}. {{test.bestFarm[i]}}</li>
                    </ul>
                </div>
            </div>
            <div class="farm-address">
                <button @click="addressToggle()" class="address">농가 주소</button>
                <div class="address-detail">
                    <div id="map" class="map" style="width: 600px; height: 600px" v-if="this.addressState === true">지도 생길 부분</div>
                </div>
            </div>
        </div> 
        <div id="map" class="map">123</div>   
        <div id="map">456</div>   
        <div id="map" v-if="this.addressState === true">789</div>   
    </div>
</template>

<script>
/*global kakao*/
import Header from '../../components/Header/bellAndBackHeader.vue';
export default {
    components: {
        Header
    },
    data(){
        return {
            headerName: '',
            map: null,
            test: {
                farmName: '따과의 즐거운 농장',
                name: '김따과',
                tel: '010-1234-1234',
                description: '이 세상에서 농사짓는게 제일 행복한 김따과 입니다 ^~^',
                // 위치 좌표
                address: {
                    x: 0,
                    y: 0
                },
                bestFarm: ['사과', '오렌지', '망고', '수박'],
            },
            bestState: false,
            addressState: false,
        }
    },
    mounted(){
        if (window.kakao && window.kakao.maps) {
            this.initMap();     
        } else {
            const script = document.createElement("script");
            script.style.width = '300px';
            script.style.height = '300px';
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e912469aedfe46c334cf869f731be1fa";
            document.head.appendChild(script);
        }
        // // window.onload = () => {
        //     window.kakao && window.kakao.maps ? this.addScript() : this.initMap();
            
        // // }
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };
            console.log('sdfsdfsd');
            //지도 객체를 등록합니다.
            //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
            this.map = new kakao.maps.Map(container, options);
        },
        addScript() {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap());
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e912469aedfe46c334cf869f731be1fa';
            document.head.appendChild(script);
        },
        bestToggle(){
            this.bestState = !this.bestState;
        },
        addressToggle(){
            this.addressState = !this.addressState;
        },
        // initMap() {
        //     const container = document.getElementById("map");
        //     const options = {
        //         center: new kakao.maps.LatLng(33.450701, 126.570667),
        //         level: 5,
        //     };

        //     //지도 객체를 등록합니다.
        //     //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        //     this.map = new kakao.maps.Map(container, options);
        //     console.log(container);
        // },
    }
}
</script>

<style lang="scss" scoped>
.best, .address{
    width: 100%;
    height: 70px;
    background-color: #f8af94;
    border: 0;
    border-bottom: .5px solid rgb(221, 221, 221);
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
}
.farm-contain{
    position: relative;
    margin: auto;
    width: 100%;
    height: 100vh;
    .farm-information{
        position: relative;
        width: 100%;
        height: 100px;
        margin: auto;
        .farm-image{
            position: absolute;
            // top: 50px;
            left: 0;
            right: 0;
            margin: auto;
            width: 85px;
            height: 85px;
            border-radius: 50%;
        }
    }
    .farm-name-tel{
        width: 100%;
        height: 70px;
        display: flex;
        .farm-userName, .farm-tel{
            font-size: 18px;
            padding-top: 3px;
            font-weight: 700;
            color: rgb(159, 158, 158);
            width: 50%;
            height: 60px;
            // border: 1px solid #333;
            text-align: center;
            p{
                color: #333;
                margin-top: 10px;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
    .farm-best{
        .best-detail{
            ul{
                li{
                    margin: 10px 0px;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }
    .farm-description{
        width: 100%;
        height: 80px;
        text-align: center;
        padding-top: 10px;
        .description{
            color: rgb(159, 158, 158);
            font-weight: 700;
            font-size: 18px;
        }
        p{
            margin-top: 10px;
            font-size: 16px;
            font-weight: 500;
        }
    }
}
</style>