<template>
  <div class="wrap">
    <h2>클리닉 목록</h2>
    <ul>
      <li>
        <span class="name">병원명</span>
        <span>위치</span>
      </li>
      <li v-for="clinicMember in clinicMembers" :key="clinicMember.id">
        <span  class="name">{{ clinicMember.clinicName }} </span> 
        <span> {{ clinicMember.clinicAddress }}</span>
        <button @click="createChatroom(clinicMember.id)">방만들기</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:8761' });

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
      console.log("Creating chat room with memberId=", this.memberId, "and clinicMemberId=", clinicMemberId);
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
.wrap{font-family: 'SUITE Variable';
      padding-top:150px;}

h2{margin-left:20px;}

ul{margin-top:20px;
   padding-left:20px;}

li{border:1px solid lightgrey;
  padding:10px;
  height:50px;
  border-radius: 10px;}

.name{width:20%;}
span{width:30%;
    float:left;
     display:block;}
button{width:80px;
        background-color: rgb(38, 150, 255);
        color:#fff;
        border:0;
        padding:5px;
        border-radius:10px;
       float:right;}
</style>