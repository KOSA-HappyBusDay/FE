<template>
    <div class="chat-room-name-dialog">
      <h3>채팅방 이름 입력</h3>
      <input v-model="roomName" placeholder="채팅방 이름" />
      <button @click="confirmRoomName">확인</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roomName: '',
      };
    },
    methods: {
      confirmRoomName() {
        this.$emit('confirm', this.roomName);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일링을 적절하게 추가하세요. */

  </style>