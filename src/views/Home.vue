<template>
  <div class="wrap">
    <div class="main_bg">
      <div class="video-container">
        <iframe
          width="100%"
          height="700px"
          class="video"
          src="https://www.youtube.com/embed/TKedXUyTtvE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div ref="chat" class="chat" @click="toggleChatbot">
        <Chatbot :is-visible="isChatbotVisible" @close="closeChatbot" />
      </div>
      <div class="company_info">
        <div class="company_info_bg">
          <h2>피부검사하헤숑</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chatbot from '@/components/chatting_room/Chatbot.vue';

export default {
  data() {
    return {
      isChatbotVisible: false,
    };
  },
  mounted() {},
  methods: {
    toggleChatbot(event) {
      if (event.target.classList.contains('.chat')) {
        // If clicked on the chat area, don't toggle the chatbot visibility
        return;
      }

      // Toggle the chatbot visibility for other areas
      this.isChatbotVisible = !this.isChatbotVisible;
    },
    closeChatbot() {
      this.isChatbotVisible = false;
    },
  },
  components: {
    Chatbot,
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}

.main_bg {
  width: 100%;
  height: 900px;
}
.company_info{
  width:100%;
  height:700px;
}
.chat {
  background-image: url("../static/chatbot.png");
  background-size:70px 70px;;
  background-repeat: no-repeat;
  position: fixed;
  right: 50%;
  bottom: 20px;
  margin-right:-50%;
  text-align: center;
  width: 90px;
  height: 90px;
}
</style>