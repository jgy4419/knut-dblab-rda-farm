<template>
<div class="bottom-contain">
    <v-btn v-for="btn, i in button.url.length" :key="i" :to=button.url[i] class="button">
        <span class="icon-text">{{button.text[i]}}</span>
        <v-icon class="icon">{{button.icon[i]}}</v-icon>
    </v-btn>
    <!-- <v-btn to="/trand">
        <span>Trand</span>

        <v-icon>mdi-chart-box-outline</v-icon>
    </v-btn> -->

    <v-btn v-on:click="navigatedivision()" class="button">
        <span class="icon-text">My Page</span>
        <v-icon class="icon">mdi-account</v-icon>
        
    </v-btn>


</div>
</template>

<script>
export default {
    // data: () => ({ value: 1 }),
	data() { 
		return {
            user: JSON.parse(localStorage.getItem("user")) || "",
            consumer_id: this.consumer_id,
            farm_id: this.farm_id,
            button: {
                url: ['/main', '/search', '/auction'],
                icon: ['mdi-home', 'mdi-magnify', 'mdi-gavel'],
                text: ['Home', 'Search', 'Auction']
            }
		}
	},
    methods: {
        navigatedivision() {
            console.log(this.user);
            console.log(this.user.consumer_id);
            if (this.user.consumer_id == null) {
                this.$router.push({name: 'farm_mypage'});
                // this.$router.push('@/views/myPage/farm_profile');
            } else {
                this.$router.push({name: 'consumer_mypage'});
                // this.$router.push('@/views/consumer/consumer_mypage');
            }
        },
        getPost() {
            let user = JSON.parse(localStorage.getItem("user"));
        }
    }
}
</script>

<style lang="scss" scoped>
.v-bottom-navigation--grow .v-bottom-navigation__content > .v-btn {
    width: 25%;
}
.bottom-contain{
    position : relative;
    transform : translateY(-10%);
    // padding: 5px;
    // bottom: 0;
    width: 400px;
    display: flex;
    justify-content: space-between;
    .button{
        width: 24%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        color: 3333;
        .icon-text{
            font-size: 10px;
            color: grey;
        }
    }
}
@media screen and (max-width: 500px){
    .bottom-contain{
        width: 100%;
    }
}
</style>