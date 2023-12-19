<template>
  <div class="wrap">
    <div class="main_bg">
      <div class="section" id="companyInfoScroll1">
        <div class="company_info_bg">
          <p>피부 컨디션 알아보고, 피부를 지켜요</p>
        </div>
      </div>
      <div class="section" id="companyInfoScroll2">
        <div class="doctor_bg">
          <p>병원 의사와 무료 상담까지?!!</p>
        </div>
      </div>
      <div class="section" id="companyInfoScroll3">
         <div class="mobile">
          <p>모바일로도 볼 수 있는 CLEANZONE</p>
         </div>
      </div>
      <div ref="chat" class="chat" @click="toggleChatbot">
        <Chatbot :is-visible="isChatbotVisible" @close="closeChatbot" />
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
  mounted() {
    const sections = document.querySelectorAll('.section');
  const sectionCount = sections.length;

  sections.forEach((section, index) => {
    section.addEventListener('wheel', (event) => {
      event.preventDefault();
      let delta = 0;

      if (event.deltaY) {
        delta = event.deltaY / 120;
      } else if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) {
        delta = -event.detail / 3;
      }

      let moveTop = window.scrollY;
      let sectionSelector = sections[index];

      // 휠을 아래로 돌렸을 때: 다음 섹션으로 이동
      if (delta > 0) {
        if (index !== sectionCount - 1) {
          try {
            moveTop =
              window.pageYOffset +
              sectionSelector.nextElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }
      // 휠을 위로 돌렸을 때: 이전 섹션으로 이동
      else {
  if (index !== 0) {
    try {
      moveTop =
        window.pageYOffset +
        sectionSelector.previousElementSibling.getBoundingClientRect().top;
    } catch (e) {}
        }
      }

      window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
    });
  });
},
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
  font-family: 'SUITE Variable';
  padding-top: 130px;
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}


.company_info {
  width: 100%;
  height: 700px;
}

.chat {
  background-image: url("../static/chatbot.png");
  background-size: 70px 70px;
  background-repeat: no-repeat;
  position: fixed;
  right: 50%;
  bottom: 20px;
  margin-right: -50%;
  text-align: center;
  width: 90px;
  height: 90px;
}

.section {position: relative;
	width:100%;
	height: 0;
	padding-bottom:56.25%;
  float:left;
	overflow: hidden;
}

.section .company_info_bg {
  background-image: url("../static/bg.jpg");
  background-size:100%;
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.company_info_bg p {
  font-size: 3.5vw;
  margin-top: 24%;
  font-weight: 600;
  margin-right: 12%;
  width: 36%;
  float: right;
}
.section .doctor_bg {
  background-image: url("../static/surprise.jpg");
  background-size:100%;
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.doctor_bg p {
  font-size: 3.5vw;
  margin-top: 24%;
 margin-left:5%;
  font-weight: 600;
  width: 50%;
}
.animate-up {
  opacity: 0; /* 초기에는 숨겨진 상태로 설정 */
  transform: translateY(20px); /* 초기에는 약간 아래로 내려간 상태로 설정 */
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

/* 스크롤이 해당 섹션에 도달했을 때 애니메이션 활성화 */
.section.in-view .animate-up {
  opacity: 1;
  transform: translateY(0);
}
@media screen and (max-width:1000px) {  
 .wrap{padding-top:80px;}

 header{height:60px;}
}

.mobile{background-image: url("../static/bg_3.png");
  background-size:100%;
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;}

  .mobile p{font-size: 3.5vw;
  margin-top: 30%;
  font-weight: 600;
  margin-right: 12%;
  width: 36%;
  float: right;}
</style>