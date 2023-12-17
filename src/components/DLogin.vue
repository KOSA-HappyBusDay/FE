<template>
  <div class="wrap">
    <form @submit.prevent="LoginForm">
      <div class="text_box">
        <p>병원 로그인</p>
      </div>
      <div class="email">
        <label for="clinicEmail">이메일</label>
        <input type="text" class="form-control" placeholder="이메일를 입력해주세요." v-model="LoginUser.clinicEmail" />
      </div>
      <div class="password">
        <label for="loginpassword">비밀번호</label>
        <input type="password" v-model="LoginUser.password" placeholder="비밀번호를 입력해주세요." class="form-control" />
      </div>
      <div class="button">
        <button class="btn1" type="submit" @click="LoginForm">Login</button>
        <router-link to="/Djoin"><button class="btn2">Join In</button></router-link>
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
      LoginUser: reactive({
        clinicEmail: "",
        password: "",
      }),
    };
  },
  methods: {
    LoginForm() {
      if (!this.LoginUser.clinicEmail || !this.LoginUser.password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return; // 함수 실행 중지
      }
      axios
        .post("http://13.209.76.161:8761//clinic-members/login", this.LoginUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.getters.getToken}`,
          },
        })
        .then((result) => {
          console.log("Login response:", result); // 응답 출력
          this.$store.commit('setToken', result.data.token);
          this.$store.commit('setIsLogin', true);
          if (result.status === 200) {
            alert("로그인 성공");
            this.$store.commit('setClinicMemberId', result.data.id); // memberId 저장
            this.$store.commit('setClinicEmail', result.data.clinicEmail); // clinicEmail 저장
            this.$store.commit('setMemberType', 'clinicMember'); // memberType을 'clinicMember'로 설정
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
a {
  text-decoration: none;
}

.wrap {
  font-family: 'NPSfontBold';
  padding-top: 140px;
}

form {
  width: 35%;
  height: 400px;
  background-color: #fbfbfb;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 200px;
  border: 1px solid rgb(128, 128, 128);
  box-shadow: 3px 3px 3px 3px lightgray;
}

form .text_box {
  width: 100%;
  margin-top: 20px;
  height: 40px;
}

.text_box p {
  margin-left: 30px;
  width: 170px;
  display: block;
  margin: 0 auto;
  font-weight: 700;
  font-size: 30px;
}

.email,
.password {
  width: 100%;
  margin-top: 20px;
  height: 80px;
}

.email label,
.password label {
  width: 100%;
  height: 25px;
  display: block;
  font-size: 17px;
  margin-left: 30px;
}

.email input,
.password input {
  margin-left: 30px;
  width: 85%;
  background-color: #fbfbfb;
  height: 50px;
  border: 0px;
  border-radius: 0;
  margin-top: 5px;
  border-bottom: 1px solid black;
}

.button {
  width: 85%;
  height: 100px;
  margin-top: 15px;
}

.button .btn1 {
  width: 100%;
  height: 40px;
  margin-left: 30px;
  margin-top: 10px;
  border-radius: 10px;
  border: 0;
  color: #ffffff;
  background-color: rgb(38, 150, 255);
}

.button .btn2 {
  width: 100%;
  height: 40px;
  margin-left: 30px;
  margin-top: 10px;
  border-radius: 10px;
  border: 0;
  color: #ffffff;
  background-color: rgb(34, 100, 153);
}

@media screen and (max-width:400px) {
  form {
    width: 340px
  }
}</style>