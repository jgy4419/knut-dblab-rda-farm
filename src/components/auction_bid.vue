<template>
    <table class="tbl_home">
        <tr class="">
            <th>입찰 수</th>
            <td>333</td>
        </tr>

        <tr class="">
            <th>현재 가격</th>
            <td>90,600</td>
        </tr>
    </table>
    <form @submit.prevent="auction.bid_price">
        <v-text-field v-model="bid_price"></v-text-field>
        <button @click="bid({auction_id: auction.auction_Id, bid_price})">입찰</button>
    </form>
</template>

<script>
    export default {

    }
</script>

<style>

</style>