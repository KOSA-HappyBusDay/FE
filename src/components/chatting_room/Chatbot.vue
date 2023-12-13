<template>
  <div class="chatbot" v-if="isVisible" @click.stop>
    <!-- @click.stop prevents the click event from propagating to the parent -->
    <h2 class="h2-title">ChatBot</h2>

    <div class="chat-content">
      <div v-for="(message, index) in messages" :key="index" class="line">
        <span :class="{ 'chat-box': true, 'mine': message.isMine }">
          {{ message.content }}
        </span>
      </div>
    </div>
    <div class="b">
    <div>
      <b-input-group prepend="질문" class="mt-3">
        <b-form-input id="input" v-model="userQuestion"></b-form-input>
        <b-input-group-append>
          <b-button @click="sendQuestion()" variant="info">전송</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div @click="closeChatbot" class="close">닫기</div>
  </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      userQuestion: "",
      messages: [],
    };
  },
  props: {
    isVisible: Boolean, // Chatbot의 가시성을 부모로부터 받음
  },
  methods: {
    sendQuestion() {
      if (!this.userQuestion.trim()) {
        return;
      }

      this.addMessageToChat(this.userQuestion, true);
      let data = { question: this.userQuestion };
      this.userQuestion = "";

      axios
        .post("http://localhost:8761/chat-bot/question", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then((response) => {
          const responseText = response.data.choices[0].message.content;
          this.addMessageToChat(responseText, false);
        })
        .catch((error) => {
          console.error("Error: ", error);
          alert("오류가 발생했습니다.");
        });
    },
    addMessageToChat(message, isMine) {
      this.messages.push({ content: message, isMine });
    },
    closeChatbot() {
      this.$emit('close'); // Chatbot을 닫기 위한 이벤트 발생
    },
  },
};
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.chatbot {
  font-family: 'NPSfontBold';
  position: fixed;
  bottom: 0;
  right: 10px;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  overflow:hidden;
  background-color: rgb(244, 244, 244)  ;
  border: 1px solid #ccc;
}

.h2-title {
  padding:10px;
  width: 100%;
  color:#fff;
  background-color: #ffbea2;
}

.chat-content {
  height: 380px;
  overflow-y: scroll;
}

.line {
  margin-top: 10px;
  display: flex;
}

.chat-box {
  background: #eee;
  padding: 5px;
  max-width: 50%;
}

.mine {
  margin-left: auto;
}
.b{height:50px;}
</style>