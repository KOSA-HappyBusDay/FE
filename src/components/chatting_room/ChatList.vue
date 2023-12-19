<template>
  <div class="chat_wrap">
    <div class="title">채팅 LIST</div>
    <div v-if="rooms && rooms.length > 0">
      <ul>
        <li v-for="room in rooms" :key="room.id" @click="selectRoom(room.id)">
          <img src="../../static/건물.jpg" alt="">
          {{ room.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>채팅방이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedClinicMember: null,
      clinicMembers: [],
      rooms: [],
    };
  },
  created() {
    console.log(this.$store.state.chatRoomId);
  },
  computed: {
    memberId() {
      return this.$store.state.memberId;
    },
  },
  methods: {
    selectRoom(roomId) {
      this.$store.commit('setChatRoomId', roomId);
      this.$router.push(`/chatting/${roomId}`);
    },

    async fetchClinicMembers() {
      try {
        const response = await axios.get('http://192.168.0.10:8761/clinic-members/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });
        this.clinicMembers = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createChatroom(clinicMemberId) {
      await this.fetchClinicMembers();
      const roomName = prompt('Enter room name:');
      const memberId = this.$store.state.memberId;

      try {
        const response = await axios.post(
          'http://192.168.0.10:8761/chatroom/create',
          {
            name: roomName,
            memberId: memberId,
            clinicMemberId: clinicMemberId,
          },
          {
            headers: {
              'Authorization': `Bearer ${this.$store.state.token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert(`채팅방이 생성되었습니다. 채팅방 이름: ${response.data.name}`);
          this.fetchRooms();
          this.$store.commit('setChatRoomId', response.data.roomId);
          console.log('저장된 chatRoomId:', this.$store.state.chatRoomId);
        } else {
          console.error('Room creation failed:', response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRooms() {
      try {
        const response = await axios.get('http://192.168.0.10:8761/chatroom/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });

        const rooms = response.data;
        const memberId = this.$store.state.memberId;
        const clinicMemberId = this.$store.state.clinicMemberId;
        console.log(memberId, clinicMemberId)
        this.rooms = rooms.filter(
          (room) => room.member.id === memberId || room.clinicMember.id === clinicMemberId
        );
      } catch (error) {
        console.error(error);
        this.rooms = []; // 오류 발생 시 방 목록을 빈 배열로 설정하여 초기화
      }
    },
    shouldDisplayRoomName(room) {
      return true; // 항상 채팅방 이름을 보여줍니다.
    },
  },
  mounted() {
    this.fetchClinicMembers();
    this.fetchRooms();
  },
};
</script>

<style scoped>
.chat_wrap {
  width: 84%;
  height:500px;
  max-height: 600px;
  font-family: 'SUITE';
  flex-wrap: wrap; 
  float:right;
}



ul{padding-left:10px;}
.title{width:100%;
       font-size:24px;
       margin-left:10px;
       margin-bottom: 10px;
       font-family: 'SUITE';
       height:30px;
       font-weight:700;}

       li img{width:60px;
      border-radius:20px;
      margin-right:20px;
       height:60px;
       ;}

li{border-top:1px solid lightgray;
   padding:20px;
   width:50%;
   font-weight: 500;
   font-size:20px;
  border-bottom:1px solid lightgray;}

@media screen and (max-width:900px){
  .chat_wrap{  padding-left:80px;}



  li{width:100%;}
}
</style>