<template>
  <div class="wrap">
    <div class="profile">
      <img :src="profileImage" alt="Profile Picture" v-if="profileImage">
      <div v-else>No profile picture selected</div>
      <form method="post" enctype="multipart/form-data">
        <label for="chooseFile" class="file-label">Select Profile</label>
        <input ref="profileImage" @change="uploadProfileImage" type="file" id="chooseFile" name="chooseFile"
          accept="image/*" class="hidden-input">
      </form>
    </div>

    <div class="menu">
      <ul class="menu_list">
        <li @click="selectContent('inspectionList')">검사 LIST</li>
        <li @click="selectContent('Chatroomlist')">채팅방 내역</li>
        <li @click="selectContent('updateMemberInfo')">회원정보수정</li>
      </ul>
    </div>
    <div class="content">
      <div v-if="selectedContent === 'inspectionList'">
        <ResultList />
      </div>
      <div v-if="selectedContent === 'Chatroomlist'">
        <ChatList />
      </div>
      <div v-if="selectedContent === 'updateMemberInfo'">
        <MemberAlter />
      </div>
    </div>
  </div>
</template>

<script>
import MemberAlter from '../MemberAlter.vue';
import ResultList from '../notification/ResultList.vue';
import ChatList from '../chatting_room/ChatList.vue'
export default {
  components:{
    MemberAlter,
    ResultList,
    ChatList,
},
    data() {
        return {
            profileImage: '',
            selectedContent: 'inspectionList',
        };
    },
    mounted() {
        const storedProfileImage = localStorage.getItem('profileImage');
        if (storedProfileImage) {
            this.profileImage = storedProfileImage;
        }
    },
    methods: {
        uploadProfileImage() {
            const image = this.$refs['profileImage'].files[0];
            if (image) {
                const url = URL.createObjectURL(image);
                this.profileImage = url;
                // 로컬 스토리지에 프로필 이미지 정보 저장
                localStorage.setItem('profileImage', url);
            }
            else {
                // 이미지를 선택하지 않은 경우
                this.profileImage = ''; // 이미지 정보 초기화
                localStorage.removeItem('profileImage'); // 로컬 스토리지에서 이미지 정보 제거
            }
        },
        selectContent(content) {
            this.selectedContent = content;
        },
    },
};
</script>

<style scoped>
.wrap {
  margin-top:150px;
}
.profile{text-align: center;}
.file-label {
  cursor: pointer;
  margin-top:10px;
  margin-left:20px;
  width:110px;
  height:30px;
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
  display: inline-block;
}

.hidden-input {
  display: none;
}

img {
  width:140px;
  margin-top: 10px;
  border-radius:100px;
  margin-left:20px;
  max-width: 200px;
  max-height: 200px;
}

div {
  margin-top: 10px;
}

.menu {
  width:100%;
  display: block;
  height:20px;
}

.menu_list li {
  float:left;    
  margin-top:40px;
  border-top:1px solid black;
  border-bottom: 1px solid black;
  margin-left:20%;
}

.content {
  width:100%;
}
</style>