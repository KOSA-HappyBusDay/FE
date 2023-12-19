<template>
  <div class="wrap">
    <div class="escape">
      <router-link to="/mypage">
      <button><img src="../../static/엑스.png" alt=""></button>
   </router-link>
    </div>
<div class="title">
  <h2>채팅방</h2>
</div>
    <div class="list_wrap" ref="listWrap">
      <ul class="list">
        <li class="list-group-item" v-for="(message, index) in messages" :key="index">
          <div :class="{'message-container': true, 'sender': isSender(message.senderId), 'receiver': !isSender(message.senderId)}">
            <div class="message-box" :style="{ width: calculateMessageBoxWidth(message.content.length) }">
              <p>{{ message.content }}</p>
              <div class="translate">
                <img class="translate-icon" src="../../static/translate.png" @click="translateMessage(message)" />
                <p v-show="message.translatedContent" class="translated-content">{{ message.translatedContent }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-group">
      <input type="text" class="form-control" v-model="message" @keypress.enter="sendMessage">
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="sendMessage">메시지 보내기</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
      messages: [],
    };
  },
  computed: {
    senderId() {
    if (this.$store.state.memberType === 'clinicMember') {
      return this.$store.state.clinicMemberId; // 클리닉 멤버로서 로그인한 경우
    } else {
      return this.$store.state.memberId; // 일반 멤버로서 로그인한 경우
    }
  },
    senderName() {
      return this.$store.state.memberName;
    },
    chatRoomId() {
      return this.$store.getters.getChatRoomId;
    },
    isSender() {
      return (sender) => this.senderId === sender;
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
        console.log('보내는 데이터:', {  // 전송하는 데이터를 콘솔에 로그로 남깁니다.
          chatRoomId: this.chatRoomId,
          senderId: this.senderId,
          senderType: senderType,
          content: this.message,
        });
        const response = await axios.post('http://192.168.0.10:8761/message/send', {
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

        this.getMessages();
      } catch (error) {
        console.error("메시지를 보내는 중 오류가 발생했습니다:", error);
      }
    },
    async getMessages() {
      try {
        const response = await axios.get(`http://192.168.0.10:8761/message/${this.chatRoomId}`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        console.log('서버의 응답:', response);

        this.messages = response.data;  // 서버로부터 받은 메시지 목록을 this.messages에 저장합니다.
      } catch (error) {
        console.error("메시지를 가져오는 중 오류가 발생했습니다:", error);
      }
    },

    async sendMessageAsClinicMember() {
      try {
        const response = await axios.post('http://192.168.0.10:8761/message/clinicMember', {
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

        this.getMessages();
      } catch (error) {
        console.error("클리닉 멤버로 메시지를 보내는 중 오류가 발생했습니다:", error);
      }
    },
    async readMessage(messageId) {
      try {
        const response = await axios.put(`http://192.168.0.10:8761/message/${messageId}/read`);

        console.log('서버의 응답:', response);
      } catch (error) {
        console.error("메시지를 읽는 중 오류가 발생했습니다:", error);
      }
    },

    async translateMessage(message) {
      try {
        const response = await axios.post('http://192.168.0.10:8761/message/translate', {
          messageId: message.id,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        message.translatedContent = response.data;
        this.$set(message, 'translatedContent', response.data);
        this.$set(message, 'showTranslatedContent', true);
      } catch (error) {
        console.error("메시지를 번역하는 중 오류가 발생했습니다:", error);
      }
    },
    calculateMessageBoxWidth(contentLength) {
    // 최대 40%의 너비를 유지하되, 최소 너비를 설정하여 글자가 적을 때 너무 작지 않도록 합니다.
    const minWidth = '300px'; // 최소 너비 설정
    const maxWidthPercentage = 300; // 최대 퍼센티지
    const calculatedWidth = Math.min(contentLength * 10, maxWidthPercentage) + '%'; // 글자 양에 따른 동적 계산
    return `min(${calculatedWidth}, ${minWidth})`;
  },
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        // 스크롤이 발생하면 list_wrap의 높이를 조절합니다.
        this.$refs.listWrap.style.height = this.$refs.listWrap.scrollHeight + 'px';
      });
    },
  },
  exitChatRoom() {
         this.$router.push('/mypage');
      },
  
};
</script>

<style scoped>
.escape{padding-top:20px;
  font-family: 'SUITE';
        float:right;
        
        padding-left:10px}
.escape img{width:30px;}
.escape button{border:0;
               background-color:#ffff;

               border-radius:10px;
               padding:10px;}
.title{padding-top:20px;
       display:block;}

.title h2{width:150px;
  font-weight:700;
      font-size:40px;
margin:0 auto;}
 
.translate-icon {
  width: 20px;
  height: 20px;
  float:left;
  cursor: pointer;
}
.list-group-item {
  border: 0;}
.sender {
  padding: 5px;
  max-width: 70%;
}
.list_wrap{height:100%;}
.wrap {
  width: 98%;
  margin:0 auto;
  padding-top: 120px;
  padding-bottom: 40px;
}
.message-container {
  display: flex;
  justify-content: flex-end; /* 기본적으로 오른쪽 정렬되도록 설정 */
  width: 100%;
}


.translated-content {
  font-size: 0.9em;
  float: left;
  color: rgb(128, 128, 128);
}

.input-group {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.message-container.sender {
    justify-content: flex-end;
    float:right;
  }

  .message-container.receiver {
    justify-content: flex-start;
  }
  .message-box {
  border-radius: 10px;
  background-color: rgb(232, 232, 232);
  width: 30%;
  padding: 10px;
  word-wrap: break-word; /* 긴 단어를 자동으로 줄 바꿈합니다. */
}
p{margin-bottom:0;
      display: block;}

ul{height:100%;
margin-bottom: 0;}
.list-group-item {
  height: auto; /* 자동으로 조절되도록 높이를 'auto'로 설정합니다. */
  margin-bottom: 10px; /* 필요에 따라 여백을 조절합니다. */
}
button{background-color: rgb(38, 150, 255)}
</style>