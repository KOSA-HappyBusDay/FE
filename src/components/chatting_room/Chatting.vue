<template>
  <div id="app" v-cloak>
    <div>
      <h2>{{ chatRoom.name }}</h2>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">내용</label>
      </div>
      <input type="text" class="form-control" v-model="message" @keypress.enter="sendMessage">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(message, index) in messages" :key="index">
        {{ message.sender }} - {{ message.message }}
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
import stomp from 'stompjs';
import SockJS from 'sockjs-client';

export default {
  data() {
    return {
      chatRoomName: '', // 채팅방 이름
      chatRoom: {},
      sender: '',
      message: '',
      messages: [],
      reconnect: 0,
      websocket: null,
    };
  },
  created() {
    // localStorage에서 채팅방 정보 가져오기
    this.chatRoomName = localStorage.getItem('wschat.roomName');
    this.sender = localStorage.getItem('wschat.sender');
    // 채팅방 정보가 있다면 바로 웹소켓 초기화
    if (this.chatRoomName) {
      this.initializeWebSocket();
    }
  },
  methods: {
    initializeWebSocket() {
      var sock = new SockJS("http://localhost:8761/ws");
      this.websocket = stomp.over(sock);
      this.websocket.onclose = this.onClose.bind(this); // bind 추가
      this.connectWebSocket();
    },
    onClose(event) {
      console.log("WebSocket connection closed:", event);
      // 추가적인 처리 로직을 넣을 수 있습니다.
    },
    connectWebSocket() {
      const serverURL = "http://localhost:8761"
      let socket = new SockJS("/ws");
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소:http://localhost:8761/ws`)
      this.stompClient.connect(
        {},
        frame => {
          console.log("WebSocket connected", frame); // 연결 성공 시 로그
          // 메시지 수신
          this.websocket.subscribe("/topic/messages", message => {
            var recv = JSON.parse(message.body);
            this.recvMessage(recv);
          });
          // 읽은 메시지 수신
          this.websocket.subscribe("/topic/chat/read/" + this.messageId, () => {
            // 읽은 메시지를 처리하는 로직 추가
          });
          // 방 입장 메시지 전송
          this.websocket.send("/app/chat", {}, JSON.stringify({ type: 'ENTER', roomName: this.chatRoomName, sender: this.sender }));
        },
        error => {
          // 연결 실패 시 처리
          if (this.reconnect++ <= 5) {
            setTimeout(() => {
              console.log("connection reconnect");
              this.initializeWebSocket();
            }, 10 * 1000);
          }
        }
      );
    },
    sendMessage() {
      if (this.websocket && this.websocket.connected) {
        // 메시지 전송
        const chatMessage = {
          type: 'TALK',
          roomName: this.chatRoomName,
          sender: this.sender,
          message: this.message
        };
        this.websocket.send("/app/chat", {}, JSON.stringify(chatMessage));
        this.message = '';
      } else {
        console.error("WebSocket 연결이 설정되지 않았습니다.");
      }
    },
    recvMessage(recv) {
      this.messages.unshift({ "type": recv.type, "sender": recv.type == 'ENTER' ? '[알림]' : recv.sender, "message": recv.message });
    },
  },
};
</script>

<style scoped>
/* 스타일은 필요에 따라 조정하세요 */
.wrap { width: 100%; }
</style>