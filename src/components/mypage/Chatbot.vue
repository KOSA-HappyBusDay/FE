<template>
  <b-container class="text-center">
    <h2 class="h2-title">ChatBot Cleanic!</h2>

    <div class="chat-content">
      <div v-for="(message, index) in messages" :key="index" class="line">
        <span :class="{'chat-box': true, 'mine': message.isMine}">
          {{ message.content }}
        </span>
      </div>    
    </div>

    <div>
      <b-input-group prepend="질문" class="mt-3">
        <b-form-input id="input" v-model="userQuestion"></b-form-input>
        <b-input-group-append>
          <b-button @click="sendQuestion()" variant="info">전송</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      userQuestion: '',
      messages: [],
    };
  },
  methods: {
    sendQuestion() {
      if (!this.userQuestion.trim()) {
        return;
      }

      this.addMessageToChat(this.userQuestion, true); // 사용자 질문을 채팅창에 추가
      let data = { question: this.userQuestion };
      this.userQuestion = '';

      axios.post('http://192.168.0.23:8761/chat-bot/question', data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.$store.getters.getToken}`
        }
      })
      .then(response => {
          const responseText = response.data.choices[0].message.content;
          this.addMessageToChat(responseText, false); // 챗봇의 응답을 채팅창에 추가
      })
      .catch(error => {
          console.error("Error: ", error);
          alert("오류가 발생했습니다.");
      });
    },
    addMessageToChat(message, isMine) {
      this.messages.push({ content: message, isMine });
      // DOM 조작 대신 Vue의 반응형 데이터를 사용
    }
  }
}
</script>

<style>
.h2-title { margin-top: 30px; }
.chat-content { height: 500px; overflow-y: scroll; }
.line { margin-top: 10px; display: flex; }
.chat-box { background: #eee; padding: 5px; max-width: 50%; }
.mine { margin-left: auto; }
</style>