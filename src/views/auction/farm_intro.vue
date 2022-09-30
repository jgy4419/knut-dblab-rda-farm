<template>
    <div class="farm-contain">
        <Header :headerProps="test.farmName"/>
        <Slide :imgData="imgData"
        :key="reload"/>
        <div class="farm-information">
            <img class="farm-image" :src='`/member_profile_images/${this.farmIntroData.f_profile_img}.png`' alt="농가 사진"/>
        </div>
        <div class="farm-name-tel">
            <div class="farm-userName">
                <h3 class="userName">이름</h3>
                <p>{{farmIntroData.f_name}}</p>
            </div>
            <div class="farm-tel">
                <h3 class="tel">연락처</h3>
                <p>{{farmIntroData.f_phonenum}}</p>
            </div>
        </div>
        <div class="farm-description">
            <h3 class="description">농가설명</h3>
            <p>{{farmIntroData.f_explanation}}</p>
        </div>
        <div class="buttons">
            <div class="farm-best">
                <button class="best" @click="bestToggle()">주요 농작물</button>
                <div v-if="bestState === true" class="best-detail">
                    <ul>
                        <li v-for="best, i in bestFarm[0].length" :key="i">{{i + 1}}. {{bestFarm[0][i]}}</li>
                    </ul>
                </div>
            </div>
            <div class="farm-address">
                <button @click="addressToggle()" class="address">농가 주소</button>
                <div class="address-detail">
                    <!-- <div id="map">456</div> -->
                    <!-- <div id="map" class="map" style="width: 600px; height: 600px" v-if="this.addressState === true">지도 생길 부분</div> -->
                </div>
            </div>
        </div> 
        <div id="map">456</div>   
        <!-- <div id="map" v-if="this.addressState === true">789</div>    -->
    </div>
</template>

<script>
import axios from 'axios';
/*global kakao*/
import Header from '../../components/Header/bellAndBackHeader.vue';
import Slide from '../../components/slide.vue';
export default {
    components: {
        Header, Slide
    },
    data(){
        return {
            reload: 0,
            headerName: '',
            // map: null,
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
            f_location: '충북 충주시 대소원면 대학로 50',
            f_farm_name: '교통농가',
            // 실제 들어올 데이터
            // 프로필 사진, 농가설명, 주요농작물, 농가 주소 x, y 좌표(이건 나중에)
            farmIntroData: {},
            user: JSON.parse(localStorage.getItem("user")),
            imgData: [],
            bestFarm: [],
        }
    },
    watch: {
        farmIntroData(){
            
        }
    },
    // // 해당 경매 관련 이미지 여러 개 넣기
    created(){
        console.log(this.$route.params.id);
        axios.get(`/api/farmMember/${this.$route.params.id}`, {
            headers: {
                TOKEN: this.user.token
            }
        }).then(res => {
            this.farmIntroData = res.data;
            
            let auctionImagesLength = this.farmIntroData.f_img[this.farmIntroData.f_img.length - 1];
            console.log(auctionImagesLength);
            for(let i = 0; i < auctionImagesLength; i++){
                this.imgData.push(this.farmIntroData.f_img.replace('(0)', `(${i})`))
            }
            this.reload = 1;
            console.log(this.imgData);

            if(this.farmIntroData.f_explanation == undefined) {
                this.farmIntroData.f_explanation = this.test.description;
            }

        }).catch(err => {
			console.log(err); 
			// if(res.headers.token != "token"){     
			// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
			// 	this.$store.commit('LOGOUT');
			// 	this.$router.push('/login');
			// }
        });
    },
    beforeMount(){

    },
    mounted(){
        // console.log(this.$route.params.id);
        // axios.get(`/api/farmMember/${this.$route.params.id}`, {
        //     headers: {
        //         TOKEN: this.user.token
        //     }
        // }).then(res => {
        //     this.farmIntroData = res.data;
            
        //     let auctionImagesLength = this.farmIntroData.f_img[this.farmIntroData.f_img.length - 1];
        //     console.log(auctionImagesLength);
        //     for(let i = 0; i < auctionImagesLength; i++){
        //         this.imgData.push(this.farmIntroData.f_img.replace('(0)', `(${i})`))
        //     }

        //     if(this.farmIntroData.f_explanation == undefined) {
        //         this.farmIntroData.f_explanation = this.test.description;
        //     }

        // }).catch(err => {
		// 	console.log(err); 
		// 	// if(res.headers.token != "token"){     
		// 	// 	alert("중복 로그인으로 인해 로그아웃되었습니다. 다시 로그인 해 주시기 바랍니다.");        
		// 	// 	this.$store.commit('LOGOUT');
		// 	// 	this.$router.push('/login');
		// 	// }
        // });

        if (window.kakao && window.kakao.maps && !(new kakao.maps.services.Geocoder())) {
            this.initMap();     
        } else {
            const script = document.createElement("script");
            script.style.width = '300px';
            script.style.height = '300px';
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=e912469aedfe46c334cf869f731be1fa&libraries=services";
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            container.style.width = '300px';
            container.style.height = '300px';
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };
            var map = new kakao.maps.Map(container, options);


            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(this.f_location, (result, status) => {
                console.log(result);
                console.log(status);
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.f_farm_name}</div>`
                    });
                    infowindow.open(map, marker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
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