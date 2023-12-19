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
   <div class="menu_wrap">
    <div class="menu">
      <ul class="menu_list">
        <li @click="selectContent('inspectionList')">진단 LIST</li>
        <li @click="selectContent('Chatroomlist')">채팅 LIST</li>
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
  padding-top:150px;
  width:97%;
  margin:0 auto;
  height:170vh;
  border-radius: 10px;
  font-family: 'SUITE';
}
.profile{text-align: center;
        height:200px;
        width:100%;}
.file-label {
  cursor: pointer;
  margin-top:10px;
  margin-left:20px;
  width:110px;
  height:30px;
  background-color: rgb(34, 100, 153);
  color: #fff;
  border-radius: 5px;
  display: inline-block;
}

.hidden-input {
  display: none;
}

.menu_wrap{border:1px solid lightgray;
  border-radius:5px;
  min-height: 600px;
  max-height:900px;
margin:0 auto;}

img {
  width:140px;
  height:140px;

  border:1px solid black;
  margin-top: 10px;
  border-radius:100px;
  margin-left:20px;
}

div {
  margin-top: 10px;
}

.menu {
  width:15%;
  display: block;
  height:100%;
  float:left;
}

ul{padding-left:0}
.menu_list li {
font-size: 18px;
font-weight:600;
  text-align: center;
  padding:5px;
  border-bottom:1px solid lightgray;
  border-right:1px solid lightgray;
  margin-top:5px

}

.content {
  width:100%;
}

@media screen and (max-width:1000px){

  .menu_list li {width:130px;

}

}
</style>