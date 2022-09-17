<template>
<div>
    <div>
    <h1 class="welcome-header__title1">맵 테스트</h1>
    </div>
    <div id="map" style="width:500px;height:400px;"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
        };
    },

    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.mapsLatLng(37.2429362, 131.8624647, 16),
                level: 5,
            };
            this.map = new kakao.map.Map(container, options);
        },
    },

    mounted() {
        if (!wondow.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
            script.src = `dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE.APP_KAKAOMAP_KEY}`;

            script.addEventListener("load", () => {
                kakao.maps.load(this.initMap);
            });
            document.head.appendChild(script);
            } else {
                this.initMap();
                console.log("로딩됐다");
        }
    },
}
</script>

<style>

</style>