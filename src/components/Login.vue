<template>
    <div class="wrap"> 
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
      <button class="btn2" type="submit" v-on:touchstart="LoginForm">Login</button>
    </div>
    <div class="button">
      <RouterLink to="/join"><button class="btn1">Join In</button></RouterLink>
    </div>
    <div class="button">
      <RouterLink to="/dlogin"><button class="btn2">병원으로 로그인</button></RouterLink>
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
      if (!this.LoginUser.email || !this.LoginUser.password) {
    alert("이메일과 비밀번호를 입력해주세요.");
    return; // Stop the function execution
  }
      axios.post("http://192.168.0.10:8761/auth/login", this.LoginUser, {
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${this.$store.getters.getToken}`
},
})
.then((result) => {
console.log("Login response:", result); // 응답 출력
this.$store.commit('setToken', result.data.token);
this.$store.commit('setIsLogin', true);
if (result.status === 200) {
  alert("로그인 성공");
this.$store.commit('setMemberId', result.data.id);
this.$store.commit('setEmail', this.LoginUser.email); // memberId 저장
this.$store.commit('setMemberType', 'member'); // memberType을 'member'로 설정
console.log('Vuex 상태 업데이트 후:', this.$store.state); 
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
.wrap{font-family: 'SUITE';
      padding-top:200px;
       height:80vh;}

      
form{width:33%;
      border-radius:10px;
           height:470px;
           background-color: #fff;
           margin:0 auto;
           border: 1px solid rgb(185, 185, 185);
           background-color:#fbfbfb;
           box-shadow:3px 3px 3px 3px rgb(229, 229, 229);}
form .text_box{width:100%;
               height:80px;
              padding:20px;}
.text_box p{margin-left:30px;
            width:90px;
            display:block;
            margin:0 auto;
            font-weight:800;
            font-size:30px;} 

.email, .password{width:100%;
                 margin-left:3%;
               height:80px;}

.email label, .password label{width:100%;
                            font-weight:700;
                           height:25px;
                           display:block;
                           font-size:17px;
                           margin-top:10px;
                           margin-left:30px;}
.email input, .password input{margin-left: 30px;
                           width:83%;
                           height:50px;
                           border:0px;
                           border-radius: 0;
                           margin-top:5px;
                           border-bottom: 1px solid black;
                           background-color:#fbfbfb;}
.button{width:85%;
        margin-top:5px;
        height:50px;}

.button .btn1{width:100%;
             height:40px;
             margin-left:9%;
             margin-top:10px;
             border-radius: 10px;
             border:0;
             color:#ffffff;
             font-weight:700;
             background-color:rgb(34, 100, 153);}

.button .btn2{width:100%;
             height:40px;
             margin-left:9%;
             margin-top:10px;
             font-weight:700;
             border-radius: 10px;
             border:0;
             color:#ffffff;
             background-color:rgb(38, 150, 255);}

.Dlogin{margin-top:150px;
        margin-left:60%;}
@media screen and (max-width:1200px){
  form{width:350px;}

}
</style>