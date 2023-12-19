<template>
  <header>
    <nav class="navbar">
      <div class="container-fluid">
        <RouterLink to="/">
          <a class="navbar-brand" href="#">
            <img src="../static/로고.png" alt="">
          </a>
        </RouterLink>

        <div class="header-right">
          <div class="Slogin_header" v-if="$store.state.isLogin">
            <p v-if="isClinicMember">{{ fetchedClinicName }}</p>
            <p v-else>{{ fetchedUserNickname }}님</p>
          </div>

          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
       

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">CLEAN ZONE</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <div class="Slogin" v-if="$store.state.isLogin">
                  <p v-if="isClinicMember">{{ fetchedClinicName }}</p>
                  <p v-else>{{ fetchedUserNickname }}님</p>
                </div>
              </li>
              <li class="nav-item">
                <RouterLink to="/"><a class="nav-link active" aria-current="page" href="#">Home</a></RouterLink>
              </li>

              <li class="nav-item" v-if="$store.state.isLogin">
                <RouterLink to="/logout" type="button" @click="logout">
                  <a class="nav-link" href="#">로그아웃</a>
                </RouterLink>
              </li>
              <li class="nav-item" v-else>
                <RouterLink to="/login">
                  <a class="nav-link" href="#">로그인</a>
                </RouterLink>
              </li>
              <li class="nav-item" v-if="!$store.state.isLogin">
                <RouterLink to="/join">
                  <a class="nav-link" href="#">회원가입</a>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/event"><a class="nav-link" href="#">진단</a></RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/cliniclist"><a class="nav-link" href="#">클리닉 리스트</a></RouterLink>
              </li>
              <li class="nav-item"  v-if="$store.state.isLogin">
                <RouterLink to="/mypage"><a class="nav-link" href="#">마이페이지</a></RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
 name: "Header",
 data() {
   return {
     fetchedUserNickname: '',
     fetchedClinicName: '',
   };
 },
 computed: {
   isClinicMember() {
      return this.$store.state.memberType === 'clinicMember';
   }
 },
 created() {
   if (this.$store.state.isLogin) {
     if (this.isClinicMember) {
       this.fetchClinicInfo();
     } else {
       this.fetchUserNickname();
     }
   }
 },
 watch: {
   // 사용자의 로그인 상태가 변경될 때마다 실행됩니다.
   '$store.state.isLogin': function (newIsLogin) {
     if (newIsLogin) {
       if (this.isClinicMember) {
         this.fetchClinicInfo();
       } else {
         this.fetchUserNickname();
       }
     } else {
       this.fetchedUserNickname = '';
     }
   },
 },
 methods: {
   async fetchClinicInfo() {
     // 클리닉 정보를 가져오는 메서드입니다.
     const clinicEmail = this.$store.state.clinicEmail;
     try {
       const response = await axios.get(`http://192.168.0.10:8761/clinic-members/info?clinicEmail=${clinicEmail}`, {
         headers: {
           "Content-Type": "application/json",
           'Authorization': `Bearer ${this.$store.state.token}`
         }
       });
       this.fetchedClinicName = response.data.clinicName;
     } catch (error) {
       console.error("클리닉 정보를 가져오는 중 오류가 발생했습니다:", error);
     }
   },
   fetchUserNickname() {
     // 사용자 닉네임을 가져오는 메서드입니다.
     const email = this.$store.state.email;
     axios.get(`http://192.168.0.10:8761/auth/member-info?email=${email}`, {
       headers: {
         "Content-Type": "application/json",
         'Authorization': `Bearer ${this.$store.state.token}`
       }
     })
     .then(response => {
       this.fetchedUserNickname = response.data.nickname;
     })
     .catch(error => {
       console.error("사용자 닉네임을 가져오는 중 오류가 발생했습니다:", error);
     });
   },
   logout() {
     this.$store.commit('setToken', ''); // 토큰 초기화
     this.$store.commit('setUser', { type: '' }); // 사용자 정보 초기화
     this.$store.commit('setIsLogin', false); // 로그인 상태 초기화
     this.$store.commit('setMemberId', null); // 멤버 ID 초기화
     this.$store.commit('setClinicMemberId', null); // 클리닉 멤버 ID 초기화
     this.$store.commit('setChatRoomId', null); // 채팅방 ID 초기화
     this.$store.commit('setClinicEmail', null); 
     this.$store.commit('setEmail', null); // 채팅방 ID 초기화
     this.$store.commit('setMemberType', null); // 채팅방 ID 초기화
     this.$store.commit('setLogout');
   },
   clk() {
     // clk 메서드는 토글 스위치 기능을 수행합니다.
     this.switch = !this.switch;
   },
 },
 components: { RouterLink }
};
</script>

<style scoped>
li {list-style: none;
}

.offcanvas-title {
  font-family: 'Song Myung';
  font-size: 25PX;
}

header {
  position: fixed;
  width: 100%;
  /* 헤더의 배경색을 적절히 지정하세요 */
  z-index: 1000;
  background-color: #fff;
  padding-top: 140px;
  font-family: 'SUITE';
  font-weight: 600;
}

a {
  text-decoration: none;
  color: #000;
}

.navbar {
  position: absolute;
  width: 100%;
  top: 0;
}
.container-fluid >a{width:100px;}

img {
  width: 100px;
  margin-top: 20px;
  margin-bottom: 0px;
}

.navbar > a {
  width: 100px;
  margin-left:10px;
}
.Slogin {
  width: 100px;
}
.Slogin_header {
  margin-right: 25px; /* 토글 버튼과의 간격 */
  margin-top: 15px;
}
.navbar-toggler {
  /* display: inline-block; 인라인 블록으로 설정 */
  vertical-align: top; /* 상단 정렬 */
  margin-left: 0; /* 왼쪽 여백 제거 */
}

.navbar-nav {
  display: inline-block; /* 네비게이션 요소들을 인라인으로 표시 */
}

.offcanvas-body {
  /* .offcanvas-body에 대한 스타일 수정 */
  display: flex;
  flex-direction: column;
}

.header-right {
  display: inline-flex;
  align-items: center;
  /* justify-content: flex-end; */
}

@media screen and (max-width: 1000px) {

  header{padding-top:100px;}
  .navbar-toggler {
    order: -1;
    margin-right: 10px;
  }  
  .Slogin_header {
    order: -1; /* 토글 버튼 앞으로 이동 */
    margin-right: 10px; /* 여백 제거 */
  }
  .navbar > a {
  width: 60px;
  margin-left:10px;
}
img{width:70px;}

}
</style>