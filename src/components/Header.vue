<template>
    <header>
        <nav class="navbar">
            <div class="container-fluid">
                <RouterLink to="/">
                    <a class="navbar-brand" href="#">
                        <img src="../static/로고.png" alt="">
                    </a>
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">CLEAN ZONE</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li  class="nav-item" v-if="$store.getters.getIsLogin">
                                <RouterLink to="/logout" type="button" @click="logout">
                                    <a class="nav-link" href="#">
                                        로그아웃
                                    </a>
                                </RouterLink>
                            </li>
                            <li class="nav-item" v-else-if="!$store.getters.getIsLogin">
                                <RouterLink to="/login">
                                    <a class="nav-link" href="#">
                                        로그인
                                    </a>
                                </RouterLink>
                            </li>
                            <li class="nav-item" v-if="!$store.getters.getIsLogin">
                                <RouterLink to="/join"><a class="nav-link" href="#">회원가입</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/event"><a class="nav-link" href="#">얼굴 촬영</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/mypage"><a class="nav-link" href="#">마이페이지</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/alter"><a class="nav-link" href="#">회원정보수정</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/cliniclist"><a class="nav-link" href="#">병원채팅리스트</a></RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
</header>
</template>
<script>
import { RouterLink } from 'vue-router';

export default{
    name: "Header",
    data() {
        return {
            switch: false
        };
    },
    methods: {
        clk() {
            this.switch = !this.switch;
        },
        logout() {
      // 만약 Vuex 스토어에 로그아웃 메서드가 있다면 호출합니다.
      this.$store.commit('logout'); // 이 mutation은 스토어에 구현되어 있어야 합니다.
    },
    },
    components: { RouterLink }
};
</script>


<style scoped>
li{list-style:none;}

a{text-decoration:none;
  color:#000;}
.navbar{position:absolute;
      width:100%;
        top:0; }

img{width:120px;
    margin-top:20px;}
.navbar a{width:90px;}
header{font-family: 'NPSfontBold';
       margin-top:120px;}
.container-fluid img{width:90%;}

@media screen and (max-width:600px){
.router-link-active{width:280px;}

#offcanvasNavbar{width:250px;}




}
</style>
