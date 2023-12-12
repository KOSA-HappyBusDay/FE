<template>
  <div class="chat" fluid mt-5>
    <div class="text-sm-h3 text-h4 font-weight-bold ml-3">실시간 채팅</div>

    <!-- 병원 선택 드롭다운 -->
    <select v-model="selectedHospital">
      <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">
        {{ hospital.name }}
      </option>
    </select>

    <v-list id="chats">
      <template v-for="(item, idx) in messages" :key="idx">
        <v-list-item>
          <v-list-item-avatar v-if="item.senderName !== senderName">
            <v-icon x-large>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content :class="{ 'text-right': item.senderName === senderName }">
            <v-list-item-title>{{ item.content }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar v-if="item.senderName === senderName">
            <!-- 여기에 발신자의 프로필 이미지를 선택적으로 포함할 수 있습니다 -->
          </v-list-item-avatar>
        </v-list-item>
      </template>
    </v-list>
    
    <v-form class="input mt-5 d-flex">
      <v-textarea
        v-model="message"
        autofocus
        label="채팅을 남겨주세요."
        color="green darken-1"
        auto-grow
        outlined
        rows="1"
        row-height="15"
        @keyup.enter="sendMessage"
      ></v-textarea>
      <div>
        <v-btn @click="sendMessage" text class="mt-3 font-weight-bold">등록</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'

export default {
  name: 'LiveChat',
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  data() {
    return {
      senderName: '',
      id: '',
      message: '',
      messages: [],
      stompClient: null,
      hospitals: [],  // 병원 목록
      selectedHospital: null  // 선택된 병원
    }
  },
  created() {
    this.senderName = this.userInfo.nickname;
    this.id = this.userInfo.id;
    this.fetchHospitals();
    this.connect();
  },
  methods: {
    fetchHospitals() {
      // 병원 목록을 가져오는 코드를 여기에 추가하세요.
    },
    sendMessage() {
      if (this.senderName !== '' && this.message !== '') {
        this.send()
        this.message = ''
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = { 
          senderName: this.senderName,
          content: this.message,
          id: this.id,
          hospitalId: this.selectedHospital  // 선택된 병원 ID를 메시지에 추가
        }
        this.stompClient.send("/chat/message", JSON.stringify(msg), {})  // "/chat/chat"을 "/chat/message"로 변경
      }
    },   
    connect() {
      const serverURL = "http://localhost:8761/chat"
      let socket = new SockJS(serverURL)
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        () => {
          this.connected = true
          this.stompClient.subscribe(`/topic/messages/${this.selectedHospital}`, res => {  // "/topic/chat/messages"를 "/topic/messages"로 변경
            this.messages.push(JSON.parse(res.body))
          })
        },
      )        
    },
    scrollToTop() {
      this.$vuetify.goTo(0)
    },
    goToHome() {
      this.$router.push('/main')
    }
  },
  watch: {
    selectedHospital(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.stompClient.unsubscribe(`/topic/messages/${oldVal}`);
        this.stompClient.subscribe(`/topic/messages/${newVal}`, res => {
          this.messages.push(JSON.parse(res.body))
        });
      }
    }
  },
  updated() {
    const chatbox = document.querySelector('#chats') 
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight
    }
  }
} 
</script>

<style scoped>
  #jara {
    top: 10vh;
  }

  .input {
    position: absolute;
    bottom: 0;
  }

  #chats{
    position: absolute;
    overflow-y: scroll;
    height: 500px;
    width: 100%;
    top: 100px;
  }

  .chat{margin-top:300px;}
</style>