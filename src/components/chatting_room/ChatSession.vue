<template>
    <div id="chat-session">
        <ul class="message-list">
            <li v-for="(message, index) in messages" :key="index">
                <div class="avatar" :style="{ backgroundColor: getAvatarColor(message.sender) }">{{ message.sender[0] }}</div>
                <div class="message-content">
                    <span class="sender">{{ message.sender }}</span>
                    <p>{{ message.content }}</p>
                </div>
            </li>
        </ul>
      <form @submit.prevent="sendMessage" class="message-form">
        <input type="text" v-model="messageContent" placeholder="Type a message..."/>
        <button type="submit">보내기</button>
      </form>
    </div>
</template>
  
  <script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  
  export default {
    props: ['username', 'roomId'],
    data() {
      return {
        stompClient: null,
        messages: [],
        messageContent: ''
      };
    },
    created() {
      this.connect();
    },
    methods: {
      connect() {
        const socket = new SockJS('/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
      },
      onConnected() {
        this.stompClient.subscribe(`/topic/${this.roomId}`, this.onMessageReceived);
        this.sendJoinMessage();
      },
      sendJoinMessage() {
        this.stompClient.send(`/app/chat.sendMessage/${this.roomId}`, {}, JSON.stringify({sender: this.username, type: 'JOIN'}));
      },
      sendMessage() {
        if (this.messageContent && this.stompClient) {
          const chatMessage = { sender: this.username, content: this.messageContent, type: 'CHAT' };
          this.stompClient.send(`/app/chat.sendMessage/${this.roomId}`, {}, JSON.stringify(chatMessage));
          this.messageContent = '';
        }
      },
      onMessageReceived(payload) {
        const message = JSON.parse(payload.body);
        this.messages.push(message);
      },
      onError(error) {
        console.error('WebSocket 연결 실패:', error);
      },
      getAvatarColor(sender) {
        let hash = 0;
        for (let i = 0; i < sender.length; i++) {
            hash = 31 * hash + sender.charCodeAt(i);
        }
        const index = Math.abs(hash % colors.length);
        return colors[index];
      }
    }
  };
  </script>

<style scoped>
.message-list {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  max-height: 400px; /* 적절한 높이 설정 */
}

.message-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
}

.message-content {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 10px;
}

.sender {
  font-weight: bold;
}

.my-message {
  justify-content: flex-end;
}

.message-form {
  display: flex;
  margin-top: 10px;
}

.message-form input {
  flex: 1;
  margin-right: 10px;
}
</style>
  