<template>
    <div class="wrap">
      <div class="Dlogin">
        <RouterLink to="/dlogin">병원으로 로그인</RouterLink>
      </div>
  <form @submit.prevent="LoginForm">
    <div class="text_box">
      <p>로그인</p>
    </div>
    <div class="email">
            <label for="loginemail">이메일</label>
            <input type="text" class="form-control" placeholder="이메일를 입력해주세요."  v-model="LoginUser.email"/>
        </div>
      <div class="password">
        <label for="loginpassword">비밀번호</label>
        <input type="password" v-model="LoginUser.password" placeholder="비밀번호를 입력해주세요." class="form-control"/>
    </div>
    <div class="button">
      <button class="btn1" type="submit" v-on:touchstart="LoginForm">Login</button>
    </div>
    <div class="button">
      <RouterLink to="/join"><button class="btn2">Join In</button></RouterLink>
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
        LoginUser: reactive({
          email: "",
          password: "",
        }),
      };
    },
    methods: {
      LoginForm() {
        axios
        .post("http://192.168.0.23:8761/auth/login", this.LoginUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.getToken}`
          },
        })
        .then((result) => {
          this.$store.commit('setToken', result.data.token)
          this.$store.commit('setIsLogin', true)
          if (result.status === 200) {
            alert("로그인 성공");
            this.$router.push("/");
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
a{text-decoration:none;}
.wrap{height:560px;
      font-family: 'NPSfontBold';}
      
form{width:37%;
           height:400px;
           margin:0 auto;
           border: 1px solid rgb(128, 128, 128);
           box-shadow:3px 3px 3px 3px lightgray;}

form .text_box{width:100%;
                     margin-top:20px;
                    height:40px;}
.text_box p{margin-left:30px;
            width:60px;
            display:block;
            margin:0 auto;
            font-weight:700;
            font-size:20px;} 

.email, .password{width:100%;
                  margin-top:10px;
               height:80px;}

.email label, .password label{width:100%;
                           height:25px;
                           display:block;
                           font-size:17px;
                           margin-left:30px;}
.email input, .password input{margin-left: 50px;
                           width:85%;
                           height:50px;
                           border:0px;
                           border-radius: 0;
                           margin-top:5px;
                           border-bottom: 1px solid black;
                           background-color:#fff;}
.button{width:85%;
        height:50px;}

.button .btn1{width:100%;
             height:40px;
             margin-left:30px;
             margin-top:10px;
             border-radius: 10px;
             border:0;
             color:#ffffff;
             background-color:#82d7ff;}

.button .btn2{width:100%;
             height:40px;
             margin-left:30px;
             margin-top:10px;
             border-radius: 10px;
             border:0;
             color:#ffffff;
             background-color:#81b0f7;}

.kakao{width:390px;
       margin:0 auto;
       height:40px;
       margin-top:15px;}

.kakao img{width:100%;
           height:100%;}

.Dlogin{margin-top:150px;
        margin-left:60%;}
@media screen and (max-width:1200px){
  form{width:350px;}

}
</style>