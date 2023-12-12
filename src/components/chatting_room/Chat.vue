<template>
    <div id="app">
      <chat-join v-if="!username" @setUsername="setUsername"></chat-join>
      <chat-session v-if="username" :username="username" @disconnect="disconnect"></chat-session>
    </div>
  </template>
  
  <script>
  import ChatJoin from '@/components/chatting_room/ChatJoin.vue';
  import ChatSession from '@/components/chatting_room/ChatSession.vue';
  
  export default {
    name: 'App',
    components: {
      ChatJoin,
      ChatSession
    },
    data() {
      return {
        username: ''
      };
    },
    methods: {
      setUsername(username) {
        this.username = username;
      },
    }
  };
  </script>
  