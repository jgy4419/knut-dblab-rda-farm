<template>
<v-bottom-navigation
 value="value"
    color="teal"
    grow
>
    <v-btn to="/main">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/search">
        <span>Search</span>

        <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn to="/auction">
        <span>Auction</span>

        <v-icon>mdi-gavel</v-icon>
    </v-btn>

    <!-- <v-btn to="/trand">
        <span>Trand</span>

        <v-icon>mdi-chart-box-outline</v-icon>
    </v-btn> -->

    <v-btn v-on:click="navigatedivision()">
        <span>My Page</span>

        <v-icon>mdi-account</v-icon>
        
    </v-btn>


</v-bottom-navigation>
</template>

<script>
export default {
    // data: () => ({ value: 1 }),
	data() { 
		return {
            user: JSON.parse(localStorage.getItem("user")) || "",
            consumer_id: this.consumer_id,
            farm_id: this.farm_id
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

<style>
.v-bottom-navigation--grow .v-bottom-navigation__content > .v-btn {
    width: 25%;
}
</style>