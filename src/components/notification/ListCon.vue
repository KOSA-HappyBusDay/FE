<template>
  <div class="wrap">
    <div class="title">검사결과지</div>
    <div class="list" v-for="(row, idx) in list" :key="idx">
      <div class="img">{{ row.forehead }}</div>
      <div class="img">{{ row.leftCheek }}</div>
      <div class="img">{{ row.rightCheek }}</div>
      <div class="img">{{ row.chin }}</div>
      <div class="AI">{{ row.AImessga }}</div>
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

.img{width:200px;
    height:200px;}
</style>