<template>
      <Header />
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue'
export default{
  components:{
    Header
  },

}
</script>
<style scoped>
.content{height:100%;}
</style>
