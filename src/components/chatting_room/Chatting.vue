<template>
  <div class="wrap">
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">내용</label>
      </div>
      <input type="text" class="form-control" v-model="message" @keypress.enter="sendMessage">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="sendMessage">메시지 보내기</button>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(message, index) in messages" :key="index">
        {{ message.sender }} - {{ message.content }}
        <button class="btn btn-primary" type="button" @click="translateMessage(message.id)">번역하기</button>
      </li>
    </ul>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      messages: [],
      intervalId: null,
    };
  },
  computed: {
    senderId() {
      if (this.$store.state.memberType === 'clinicMember') {
        return this.$store.state.clinicMemberId;
      }
      return this.$store.state.memberId;
    },
    senderName() {
      return this.$store.state.memberName;
    },
    chatRoomId() {
      return this.$store.getters.getChatRoomId;
    },
  },
  created() {
    if (this.chatRoomId) {
      this.getMessages();
      setInterval(this.getMessages, 1000);
    }
  },
  methods: {
    async sendMessage() {
      try {
        const senderType = this.$store.state.memberType === 'member' ? 'member' : 'clinicMember';
        const response = await axios.post('http://13.209.76.161:8761//message/send', {
          chatRoomId: this.chatRoomId,
          senderId: this.senderId,
          senderType: senderType,
          content: this.message,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        console.log('서버의 응답:', response);

        if (!this.intervalId) {
          this.intervalId = setInterval(this.getMessages, 1000);
        }
      } catch (error) {
        console.error("메시지를 보내는 중 오류가 발생했습니다:", error);
      }
    },

    async getMessages() {
      try {
        const response = await axios.get(`http://13.209.76.161:8761//message/${this.chatRoomId}`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        console.log('서버의 응답:', response);

        this.messages = response.data;
      } catch (error) {
        console.error("메시지를 가져오는 중 오류가 발생했습니다:", error);

        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    },

    async sendMessageAsClinicMember() {
      try {
        const response = await axios.post('http://13.209.76.161:8761//message/clinicMember', {
          chatRoom: this.chatRoomId,
          sender: this.senderId,
          senderName: this.senderName,
          senderType: 'clinicMember',
          content: this.message,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        console.log('서버의 응답:', response);

        if (!this.intervalId) {
          this.intervalId = setInterval(this.getMessages, 1000);
        }
      } catch (error) {
        console.error("클리닉 멤버로 메시지를 보내는 중 오류가 발생했습니다:", error);
      }
    },

    async translateMessage(messageId) {
      try {
        const response = await axios.post('http://13.209.76.161:8761//message/translate', {
          messageId: messageId,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        alert(`번역된 메세지: ${response.data}`);
      } catch (error) {
        console.error("메시지를 번역하는 중 오류가 발생했습니다:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 스타일은 필요에 따라 조정하세요 */
.wrap { width: 100%; padding-top: 200px; }
</style>