<template>
        <div class="alter_wrap">
            <div class="title">
                <p class="h2">회원정보 조회/수정</p>
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
                <input v-model="joinUser.email" type="email" class="control" placeholder="이메일를 입력해주세요" disabled>
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
                <label for="gender">성별</label>
                <select v-model="joinUser.gender">
                    <option disabled value="">다음 중 하나를 선택하세요</option>
                    <option>남성</option>
                    <option>여성</option>
                </select>
            </div>
            <div class="group" style="margin-top:20px;">
                <label for="birthday">생일</label>
                <input v-model="joinUser.birthday" type="date" class="control" placeholder="생일 입력">
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
            <div style="text-align: center">
                <button type="submit" class="btn btn-primary">수정사항 저장</button>
            </div>
        </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  name: 'MemberAlter',
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
      }),
    };
  },
  methods: {
    async updateUserInfo() {
      if (this.joinUser.password !== this.joinUser.passwordtest) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      try {
        const response = await axios.put(
          `http://localhost:8761/auth/update/`,
          this.joinUser,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          alert("수정사항을 저장하였습니다");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    font-family: 'NPSfontBold';
}

.alter_wrap {
    width: 40%;
    height: 100%;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 40px;
    border: 1px solid black;
}

.alter_wrap .title {
    width: 100%;
    height: 50px;
    margin-top: 20px;
}

.alter_wrap .title p {
    width: 150px;
    font-size: 18px;
    ;
    margin: 0 auto;
}

label,
span {
    font-size: 18px;
    width: 110px;
    margin-top: 10px;
    display: block;
    float: left;
    margin-left: 30px;
}

.group {
    width: 100%;
    margin-top: 10px;
    height: 50px;
}

input {
    width: 60%;
    height: 40px;
    margin-left: 10px;
    border: 0;
    background-color: rgba(211, 211, 211, 0.573);
    border-radius: 10px;
    float: left;
}

button {
    width: 90%;
    height: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 0;
    color: #ffffff;
    background-color: #50a14a;
}
select{width:60%;
    padding:8px;
    margin-top:5px;
    margin-left:10px;}
</style>