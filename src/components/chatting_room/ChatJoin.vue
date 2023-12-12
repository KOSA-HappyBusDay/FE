<template>
    <div class="chat-join">
        <form @submit.prevent="connect">
            <input type="text" v-model="username" placeholder="Username" autocomplete="off"/>
            <button type="submit">채팅 시작하기</button>
        </form>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: ''
    };
  },
  methods: {
    connect() {
      this.$emit('setUsername', this.username);
    }
  }
};
</script>