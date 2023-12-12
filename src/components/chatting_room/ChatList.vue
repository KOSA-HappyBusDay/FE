<template>
  <div class="wrap">
    <h2>채팅방</h2>
    <div v-if="rooms && rooms.length > 0">
      <h3>Room List:</h3>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <router-link :to="'/chatting/' + room.id">{{ room.name }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>채팅방이 없습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
  },
};
</script>
<style scoped>
.wrap{width:100%;}
</style>