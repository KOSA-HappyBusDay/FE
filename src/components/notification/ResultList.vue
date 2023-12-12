<template>
  <div class="wrap">
    <div class="title">검사list</div>
    <div class="list" v-for="(row, idx) in list" :key="idx">
      <div>{{ row.created_at }}</div>
      <div class="img">{{ row.image }}</div>
      <div class="con">
        <router-link to="/listcon"><a href="">상세내역보기</a></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultList',
  props: ['list']
}
</script>
<style scoped>
.wrap{width:100%;}
</style>