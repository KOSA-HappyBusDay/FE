<template>
  <div>
    <h2>Clinic List</h2>
    <ul>
      <li v-for="clinicMember in clinicMembers" :key="clinicMember.id">
        <span>{{ clinicMember.clinicName }} - {{ clinicMember.clinicEmail }} - {{ clinicMember.clinicAddress }}</span>
        <button @click="createChatroom(clinicMember.id)">Create Chatroom</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

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
    }
  },
  methods: {
    async fetchClinicMembers() {
      try {
        const response = await axios.get('http://localhost:8761/clinic-members/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        });
        this.clinicMembers = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createChatroom(clinicMemberId) {
      const roomName = prompt('Enter room name:');
      const memberId = this.$store.state.memberId;

      try {
        const response = await axios.post('http://localhost:8761/chatroom/create', {
          name: roomName,
          memberId: memberId,
          clinicMemberId: clinicMemberId,
        }, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          // 채팅방 생성 후 응답으로 받은 정보를 출력
          alert(`채팅방이 생성되었습니다. 채팅방 이름: ${response.data.name}`);
          this.fetchRooms();
        } else {
          console.error('Room creation failed:', response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRooms() {
      // 채팅방 목록을 다시 불러오는 로직 추가
      try {
        const response = await axios.get('http://localhost:8761/chatroom/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
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