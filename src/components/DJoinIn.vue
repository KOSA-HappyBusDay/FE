<template>
  <div class="wrap">
    <form class="join_box" @submit.prevent="DjoinForm">
      <div class="join_title">
        <p>병원 회원가입</p>
      </div>
      <div class="group" style="margin-top:40px">
        <label for="hospitalname">병원명</label>
        <input v-model="DjoinUser.clinicName" type="text" class="control" placeholder="병원이름을 입력해주세요">
      </div>
      <div class="group">
        <label for="hospitalname">의사면허번호</label>
        <input v-model="DjoinUser.registNumber" type="text" class="control" placeholder="번호만 입력해주세요">
      </div>
      <div class="group">
        <label for="email">이메일 주소</label>
        <input v-model="DjoinUser.clinicEmail" type="email" class="control" placeholder="이메일를 입력해주세요">
      </div>
      <div class="group">
        <label for="password">비밀번호</label>
        <input v-model="DjoinUser.password" type="password" class="control" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="group">
        <label for="passwordtest">비밀번호확인</label>
        <input v-model="DjoinUser.passwordtest" type="password" class="control" placeholder="비밀번호를 입력해주세요">
      </div>
      <div class="group">
        <label for="clinicaddress">주소</label>
        <input v-model="DjoinUser.clinicAddress" type="text" class="control" placeholder="주소를 입력해주세요">
      </div>
      <div class="button">
        <button class="btn" type="submit" @click="DjoinForm">회원가입</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      DjoinUser: reactive({
        clinicEmail: "",
        password: "",
        clinicName: "",
        registNumber: "",
        passwordtest: "",
        clinicAddress: "",
      }),
    };
  },
  methods: {
    DjoinForm() {
      if (this.DjoinUser.password !== this.DjoinUser.passwordtest) {
        alert("비밀번호가 일치하지 않습니다.");
        if (!this.DjoinUser.registNumber.startsWith("552")) {
          alert("의사면허번호가 맞지 않습니다");
          return;
        }
        return;
      }

      axios
        .post("http://13.209.76.161:8761//clinic-members/register", this.DjoinUser, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          console.log(result);
          if (result.status === 201) {
            alert("회원 가입 성공");
            this.$router.push("/Dlogin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
  <style scoped>
  .wrap{height:100vh;
        padding-top:150px;
        font-family: 'NPSfontBold';}
  .join_box{width:40%;;
            height:530px;
            background-color:#fbfbfb;
            border:1px solid lightgray;
            box-shadow:3px 3px 3px 3px lightgray;
            margin:0 auto;
            margin-top:50px;
            margin-bottom:60px;}
  
  .join_title{width:100%;
             margin-top:20px;
              height:30px;}
  
  .join_title p{font-size:25px;
                width:160px;
                margin:0 auto;
                font-weight:700;}
  
  .group{width:100%;
         margin-top:10px;
         height:50px;}
  .group label{font-size:16px;
               width:100px;
               margin-top:10px;
               display:block;
               float:left;
               margin-left:5%;}
  
  .group input{width:65%;;
               height:40px;
               margin-left:10px;
               border:0;
               background-color:#fbfbfb;

               border-bottom:2px solid lightgray;
               padding:5px;
               float:left;}
  
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
  
  .join_box{width:335px;}
}

 @media screen and (max-width:850px){
  
  .group input{width:60%;}
} 

  </style>