<template>
  <div class="auction-contain">
    <Header :headerProps="headerProps"/>
    <!-- 사진 데이터 props로 넣어주기 :imgData = "imgData"명으로 넣어주기-->
    <Slide />
    <AuctionList/>
      <bottom-nav/>
  </div>
</template>


<script>
// import axios from "axios"
// import Stomp from 'webstomp-client'
// import SockJS from 'sockjs-client'
import Header from '../../components/Header/bellAndBackHeader.vue';
import Slide from '../../components/slide';
import AuctionList from '../../components/Auction/auctionList.vue';
import bottomNav from '@/components/bottomNav.vue';
// import { ref } from 'vue';


export default{

  components: { bottomNav, Header, AuctionList, Slide },
  data() {
      return {        
        headerProps: '경매 알림',
        // limit: 0,
        // infiniteId: +new Date(),
        // now: 0,
      }
  },
  /*
  mounted () {
    this.updateNow();
    
    setInterval(this.updateNow.bind(this) , 1000);
  },
  //데이터베이스 에서 배열로 가져와서
  created() {
    // vue 생성 시 소켓 연결
    this.connect();
  },

  methods: {
    updateNow() {
      this.now = Math.round(Date.now() / 1000)
      // aution들이 가지고 있는 시간 빼기

    },
    updateDeadlineDate(deadline){
      let date = new Date(); // 2022-07-25 00:00:00.0

      date.setFullYear(Number(deadline.substr(0, 4)))
      date.setMonth(Number(deadline.substr(5, 2))-1)  // 1월~12월 => 0~11
      date.setDate(Number(deadline.substr(8, 2)))
      date.setHours(Number(deadline.substr(11, 2)))
      date.setMinutes(Number(deadline.substr(14, 2)))
      date.setSeconds(Number(deadline.substr(17, 2)))
      
      let remaining_time = Math.round(date.getTime() / 1000) - this.now;
      
      // 남은 시간이 ( - )인 경우 경매 마감 처리
      if (remaining_time < 0) return ''

      let day = Math.floor(remaining_time / (24*60*60));
      let tmp_time = Math.floor(remaining_time % (24*60*60)); 
      let hours =  Math.floor(tmp_time / (60*60));
      let minutes = Math.floor(tmp_time % (60*60) / 60);
      let seconds = Math.floor(tmp_time % (60*60) % 60);
      return `${day}일 ${hours}시 ${minutes}분 ${seconds}초 후`;
    },
    connect() {
      const serverURL = "/socket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)

      console.log(this.$store.state.config.headers);
      let headers = { TOKEN: this.$store.state.config.headers.TOKEN };
      console.log(headers);
      this.stompClient.connect(
        headers,
        frame => {
          this.connected = true;
          console.log('소켓 연결 성공', frame);

          this.stompClient.subscribe("/send_auction_data/"+this.$store.state.config.headers.TOKEN,  res => {

            const response_data = JSON.parse(res.body);
            console.log(response_data[0]);
            // console.log('deadline: ' + response_data[0].deadline_date);
            // console.log('deadline_date type 확인: ' + typeof(response_data[0].deadline_date));
            console.log(response_data.length);
            JSON.parse(res.body)
            for (let i = 0; i < response_data.length; i++) {
              this.$store.commit('PUSH_AUCTION', response_data[i]);
              // this.auctionList.push(response_data[i])
            }
            console.log("this.auctionList");
            console.log(this.$store.state.auctionList[0]);
          });
          this.stompClient.subscribe("/send_bidding",  res => {

            const response_bidding = JSON.parse(res.body);
            console.log(response_bidding);
            if (response_bidding != undefined) {
              this.$store.commit('UPDATE_BID_PRICE', response_bidding);
            }

            // response_data.auction_id로 현재 가지고 있는 리스트의 가격을 변경
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );        
    }
  },
  */
}
</script>




