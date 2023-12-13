<template>
  <div class="wrap">
    <div class="title">검사list</div>
    <div class="list" v-for="(row, idx) in list" :key="idx">
      <div>{{ row.created_at }}</div>
      <div class="img">{{ row.forehead }}</div>
      <div class="img">{{ row.leftCheek }}</div>
      <div class="img">{{ row.rightCheek }}</div>
      <div class="img">{{ row.chin }}</div>
      <div class="">결과가 나왔습니다 확인해보세요</div>
      <div class="con">
        <router-link to="/listcon"><a href="">상세내역보기</a></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultList',
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async fetchlist() {
      try {
        const response = await axios.get('http://localhost:8761/face-picture/result-list', {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        });
        this.clinicMembers = response.data;
      } catch (error) {
        console.error(error);
      }
    }
}
}
</script>
<style scoped>
.wrap{width:100%;}
</style>