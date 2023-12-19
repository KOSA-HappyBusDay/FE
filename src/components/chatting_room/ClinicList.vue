<template>
  <div class="wrap">
    <h2>클리닉 리스트</h2>
    <ul>
      <li v-for="clinicMember in clinicMembers" :key="clinicMember.id">
        <div class="img"></div>
        <div class=""></div>
        <span style="margin-top:20px">{{ clinicMember.clinicName }} </span> 
        <span> {{ clinicMember.clinicAddress }}</span>
        <button @click="createChatroom(clinicMember.id)">상담 문의</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({ baseURL: 'http://192.168.0.10:8761' });

export default {
  data() {
    return {
      selectedClinicMember: null,
      clinicMembers: [],
    };
  },
  computed: {
    memberId() {
      return this.$store.state.memberId;
    },
  },
  methods: {
    async fetchClinicMembers() {
      try {
        const response = await api.get('/clinic-members/list', {
          headers: { 'Authorization': `Bearer ${this.$store.state.token}` },
        });
        this.clinicMembers = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createChatroom(clinicMemberId) {
      if (this.$store.getters.getIsLogin) {
        // 로그인되어 있지 않다면 알림 메시지 표시
        alert('로그인을 해주세요.');
        return;
      }
      await this.fetchClinicMembers();
      const roomName = prompt('Enter room name:');
      const memberId = this.$store.state.memberId;
      try {
        const response = await api.post('/chatroom/create', {
          name: roomName,
          memberId: memberId,
          clinicMemberId: clinicMemberId,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          alert(`채팅방이 생성되었습니다. 채팅방 이름: ${response.data.name}`);
          this.fetchRooms();
          console.log(`Received roomId from API: ${response.data.id}`);
          this.$store.commit('setChatRoomId', response.data.id);
          console.log('Updated Vuex state:', this.$store.state);
        } else {
          console.error('Room creation failed:', response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRooms() {
      try {
        const response = await api.get('/chatroom/list', {
          headers: { 'Authorization': `Bearer ${this.$store.state.token}` },
        });
        this.rooms = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchClinicMembers();
    this.fetchRooms();
  },
};
</script>

<style scoped>
li{list-style:none;}
.wrap{font-family: 'SUITE';
      padding-top:120px;}

h2{ font-weight:700;
      font-size:40px;
      margin-top:20px;
    margin-left:30px;
       display:block;}

ul{margin-top:20px;
   padding-left:30px;}

li{padding:10px;
   width:340px;
   border:3.5px solid rgb(232, 232, 232);
  height:450px;
  border-radius: 20px;
  margin-bottom:20px;
  float:left;
  box-shadow:2px 2px 8px rgb(183, 196, 205);
    margin-left:5%;}

li:nth-child(1){margin-left:0}

li:nth-child(1) .img{background-image:url(../../static/병원.jpg);
                     background-size:100% 100%;
                     border-radius:15px;
                     width:250px;
                     margin: auto;
                     margin-top:20px;
                     height:250px;}

              
li:nth-child(2) .img{background-image:url(../../static/건물.jpg);
                     background-size:100% 100%;
                     width:250px;
                     border-radius:10px;
                     margin:0 auto;
                     margin-top:20px;
                     height:250px;}
li:nth-child(3) .img{background-image:url(../../static/3건물.jpg);
                     background-size:100% 100%;
                     width:250px;
                     border-radius:10px;
                     margin:0 auto;
                     margin-top:20px;
                     height:250px;}
.name{width:25%;}


span{width:100%;
     font-weight:500;
     font-size:18px;
     margin-top:10px;
     margin-left:32px;
     display:block;}


button{width:80px;
      background-color:rgb(34, 100, 153);
        color:#fff;
        border:0;
        padding:5px;
        margin-top:15px;
        margin-right:35px;
        border-radius:10px;
       float:right;}

@media screen and (max-width:500px){
  li{margin-left:0px}
}
       
       </style>