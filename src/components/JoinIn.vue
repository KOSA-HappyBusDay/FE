<template>
    <div class="wrap">
      <form class="join_box" @submit.prevent="joinForm">
        <div class="join_title">
          <p>회원가입</p>
        </div>
        <div class="group" style="margin-top:20px;">
          <label for="name">이름</label>
          <input v-model="joinUser.name" type="text" class="control" placeholder="이름을 입력해주세요">
        </div>
        <div class="group">
          <label for="username">아이디</label>
          <input v-model="joinUser.username" type="text" class="control" placeholder="아이디를 입력해주세요">
        </div>
        <div class="group">
          <label for="nickname">닉네임</label>
          <input v-model="joinUser.nickname" type="text" class="control" placeholder="닉네임을 입력헤주세요">
        </div>
        <div class="group">
          <label for="email">이메일 주소</label>
          <input v-model="joinUser.email" type="email" class="control" placeholder="이메일를 입력해주세요">
        </div>
        <div class="group">
          <label for="password">비밀번호</label>
          <input v-model="joinUser.password" type="password" class="control" placeholder="비밀번호를 입력해주세요">
        </div>
        <div class="group">
          <label for="passwordtest">비밀번호확인</label>
          <input v-model="joinUser.passwordtest" type="password" class="control" placeholder="비밀번호를 입력해주세요">
        </div>
        <div class="group">
          <label for="address">주소</label>
          <input v-model="joinUser.address" type="address" class="control" placeholder="주소를 입력해주세요">
        </div>
        <div class="group">
          <label for="birthday">생일</label>
          <input v-model="joinUser.birthday" type="date"  class="control" placeholder="생일 입력">
        </div>
        <div class="group">
          <label for="gender">성별</label>
            <select v-model="joinUser.gender">
              <option disabled value="">다음 중 하나를 선택하세요</option>
              <option>남성</option>
              <option>여성</option>
            </select>
        </div>
        <div class="group">
          <label for="skintype">피부 성질</label>
            <select v-model="joinUser.skintype">
              <option disabled value="">다음 중 하나를 선택하세요</option>
              <option>건성</option>
              <option>지성</option>
              <option>복합성</option>
            </select>
        </div>
        <div class="button">
          <button class="btn" type="submit" v-on:touchstart="joinForm">회원가입</button>
          <RouterLink to="/Djoin"><button class="btn" style="background-color:rgb(34, 100, 153)">병원으로 회원가입</button></RouterLink>
        </div>
    </form>
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import axios from "axios"; // axios 인스턴스 import
  
  export default {
    data() {
      return {
        joinUser: reactive({
          email: "",
          password: "",
          name: "",
          nickname: "",
          birthday: "",
          passwordtest: "",
          skintype: "",
          gender: "",
          address:"",
        }),
      };
    },
    methods: {
      joinForm() {
        if (this.joinUser.password !== this.joinUser.passwordtest) {
        alert("비밀번호가 일치하지 않습니다.");
        return; // 일치하지 않으면 회원가입 시도를 중단
      }
        axios
        .post("http://192.168.0.10:8761/auth/register", this.joinUser, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          if (result.status === 200) {
            alert("회원 가입 성공");
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        
    },
  },
};
</script>
  <style scoped>
  a{text-decoration:none;
   color:#fff;}
  .wrap{height:1150px;
    font-family: 'SUITE';
         margin-bottom: 30px;
         padding-top:140px;;}
  .join_box{width:40%;;
    border-radius:10px;
    background-color:#fbfbfb;
            height:82%;
            border:1px solid lightgray;
            box-shadow:3px 3px 3px 3px lightgray;
            margin:0 auto;
            margin-top:50px;}
  
  .join_title{width:100%;
             margin-top:20px;
              height:60px;}
  
  .join_title p{font-size:25px;
                width:100px;
                margin:0 auto;
                font-weight:700;}
  
  .group{width:100%;
         margin-top:10px;
         height:50px;}
  .group label{font-size:16px;
               width:90px;
               margin-top:10px;
               display:block;
               float:left;
               margin-left:5%;}
  
  .group input{width:70%;;
               height:40px;
               border:0;
               background-color:#fff;
               background-color:#fbfbfb;
               border-bottom:2px solid lightgray;
               margin-left:20px;
               padding:5px;
               float:left;}
  
  .group select{width:250px;
                height:30px;
                margin-left:3%;
                margin-top:10px;}
  
  .button{width:100%;
          height:50px;}
  
  .button .btn{width:92%;;
               height:40px;
               margin-left:4%;
               margin-top:10px;
               border-radius: 10px;
               border:0;
               color:#ffffff;
               background-color:rgb(38, 150, 255);}


@media screen and (max-width:1200px){
  
  .join_box{width:340px;}

  .group input{width:60%;}

  .group select{width:200px;
                margin-left:15px;}
}
  </style>