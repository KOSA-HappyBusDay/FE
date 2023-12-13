<template>
  <div class="wrap">
    <h2>채팅방</h2>
    <div v-if="rooms && rooms.length > 0">
      <h3>Room List:</h3>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <router-link :to="'/chatting/' + room.id">
            {{ room.name }} - {{ room.creatorName }}
          </router-link>
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
  name: 'ChatList',
  data() {
    return {
      rooms: [],
    };
  },
  computed: {
    memberId() {
      return this.$store.state.memberId;
    },
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get('http://localhost:8761/chatroom/list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`,
          },
        });
        this.rooms = response.data.map(room => ({
          id: room.id,
          name: room.name,
          creatorName: this.getCreatorName(room),
        }));
      } catch (error) {
        console.error(error);
      }
    },
    async createChatroom(clinicMemberId) {
      const roomName = prompt('Enter room name:');
      const memberId = this.$store.state.memberId;

      try {
        const response = await axios.post('http://localhost:8761chatroom/create', {
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
          const { id, name, clinicMember } = response.data;
          this.rooms.push({
            id: id,
            name: name,
            creatorName: this.getCreatorName({ memberId: memberId, clinicMember: clinicMember }),
          });
          this.fetchRooms();
          alert(`채팅방이 생성되었습니다. 채팅방 이름: ${name}`);
        } else {
          console.error('Room creation failed:', response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    getCreatorName(room) {
      if (!room.clinicMember) {
        return room.memberId === this.memberId ? 'You' : 'Unknown';
      }
      return room.memberId === this.memberId ? 'You' : room.clinicMember.clinicName;
    },
  },
  mounted() {
    this.fetchRooms();
  },
};
</script>

<style scoped>
.wrap { width: 100%; }
</style>