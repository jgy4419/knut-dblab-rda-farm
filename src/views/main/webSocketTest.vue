<template>
  <div id="app">
    title: 
    <input
      v-model="title"
      type="text"
    >
    내용: <input
      v-model="content"
      type="text"
      @keyup="sendcontent"
    >
    <div
      v-for="(item, idx) in recvList"
      :key="idx"
    >
      <h3>title: {{ item.title }}</h3>
      <h3>내용: {{ item.content }}</h3>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'


export default {
  name: 'App',
  data() {
    return {
      title: "",
      content: "",
      recvList: []
    }
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    this.connect()
  },
  methods: {
    sendcontent (e) {
      console.log("keyup: " + e.keyCode);
      if(e.keyCode === 13 && this.title !== '' && this.content !== ''){
        
        this.send()
        this.send2()
        this.content = ''
      }
    },    
    send() {
      console.log("Send content:" + this.content);
      console.log(this.stompClient);
      console.log(this.stompClient.connected);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          title: this.title,
          content: this.content 
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    send2() {
      console.log("Send content2222222:" + this.content);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          title: this.title,
          content: this.content 
        };
        this.stompClient.send("/receive2", JSON.stringify(msg), {});
      }
    },       
    connect() {
      const serverURL = "/socket"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      this.stompClient.connect(
        {},
        frame => {
          // 소켓 연결 성공
          this.connected = true;
          console.log('소켓 연결 성공', frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe("/send", res => {
            console.log('구독으로 받은 메시지 입니다.', res.body);

            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body))
          });
          this.stompClient.subscribe("/send2", res => {
            console.log('222222222222', res.body);
          });
        },
        error => {
          // 소켓 연결 실패
          console.log('소켓 연결 실패', error);
          this.connected = false;
        }
      );        
    }
  }
}
</script>