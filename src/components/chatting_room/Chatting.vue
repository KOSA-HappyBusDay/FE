<template>
  <div class="wrap">
    <h2>채팅방</h2>
    <div v-if="rooms && rooms.length > 0">
      <h3>Room List:</h3>
      <ul>
        <li v-for="room in rooms" :key="room.roomId" @click="selectRoom(room.roomId)">
          {{ room.name }} - {{ room.creatorName }}
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
  methods: {
    selectRoom(roomId) {
      this.$store.commit('setChatRoomId', roomId);
      this.$router.push(`/chatting/${roomId}`);
    },
    async fetchClinicMembers() {
      try {
        const response = await axios.get('http://192.168.0.9:8761/clinic-members/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });
        this.clinicMembers = response.data;
      } catch (error) {
        console.error('Error fetching clinic members:', error);
      }
    },
    async createChatroom(clinicMemberId) {
      await this.fetchClinicMembers();

      const roomName = prompt('Enter room name:');
      const memberId = this.$store.state.memberId;

      try {
        const response = await axios.post('http://192.168.0.9:8761/chatroom/create', {
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
          this.$store.commit('setChatRoomId', response.data.roomId);
          console.log('저장된 chatRoomId:', this.$store.state.chatRoomId);
        } else {
          console.error('Room creation failed:', response);
        }
      } catch (error) {
        console.error('Error creating room:', error);
      }
    },
    async fetchRooms() {
      try {
        const response = await axios.get('http://192.168.0.9:8761/chatroom/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });
        this.rooms = response.data;
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
  },
  mounted() {
    this.fetchClinicMembers();
    this.fetchRooms();
  },
};
</script>

<style scoped>
.wrap { width: 100%; }
</style>