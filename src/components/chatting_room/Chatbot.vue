<template>
  <div class="wrap">
      <b-container class="text-center" id="chatbot"  v-if="isVisible" @click.stop>
        <div class="title">
          <h2 class="h2-title"> 
            <div @click="closeChatbot" class="close">
              <img src="../../static/엑스.png" alt="">
            </div>
            Cleanic
          </h2>
        </div>
    <div class="chat-content">
      <div v-for="(message, index) in messages" :key="index" class="line">
        <span :class="{'chat-box': true, 'mine': message.isMine}">
          {{ message.content }}
        </span>
      </div>    
    </div>
    <div>
      <b-input-group class="mt-3">
        <b-form-input id="input" v-model="userQuestion"></b-form-input>
        <b-input-group-append>
          <b-button @click="sendQuestion()" variant="info" style=" background-color:rgb(38, 150, 255);">전송</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </b-container>
  </div>
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
  props: {
    isVisible: Boolean, // Chatbot의 가시성을 부모로부터 받음
  },
  methods: {
    sendQuestion() {
      if (!this.userQuestion.trim()) {
        return;
      }

      this.addMessageToChat(this.userQuestion, true); // 사용자 질문을 채팅창에 추가
      let data = { question: this.userQuestion };
      this.userQuestion = '';

      axios.post('http://192.168.0.10:8761/chat-bot/question', data, {
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
    },
    closeChatbot() {
      this.$emit('close'); // Chatbot을 닫기 위한 이벤트 발생
    },
  },
};
</script>

<style scoped>
* { margin: 0;
  padding: 0;
}
.wrap{padding:130px;}

#chatbot {
  font-family: 'SUITE';
  position: fixed;
  bottom: 0;
  padding:0;
  right: 10px;
  width: 350px;
  height: 500px;
  border-radius: 10px;
  overflow:hidden;
  opacity:0.97;
  background-color: #fff  ;
}
.title h2{font-size:25px;
          margin-right:10px;}
.title {
  box-shadow: 0px 15px 5px -1px rgb(228, 228, 228);
  padding:10px;
  width: 100%;
  color:#fff;
  background-color: rgb(34, 100, 153);
}

img{width:20px;
   float:left;
   margin-top:5px;}

.chat-content {
  height: 400px;
  overflow-y: scroll;
}

.line {
  margin-top: 10px;
  display: flex;
}

.chat-box {
  background: #eee;
  padding: 5px;
  font-size:14px;
  border-radius:5px;
  max-width: 80%;
}

.mine {
  margin-left: auto;
}
.b{height:50px;}

.m-3{opacity:0.97;}
</style>