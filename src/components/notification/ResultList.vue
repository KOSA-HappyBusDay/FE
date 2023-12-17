<template>
  <div class="wrap">
    <div class="title">검사 LIST</div>
    <div class="list" v-for="(picture, idx) in facePictures" :key="idx">
      <div class="images-grid">
        <div class="image-container">
          <img :src="getImageUrl('forehead', picture.id)" alt="Forehead" />
          <div class="label">이마</div>
        </div>
      </div>
      <div>{{ picture.localDate }}</div>
      <div>{{ picture.AImessage }}</div>
      <div class="con">
        <router-link :to="{ name: 'ListCon', params: { id: picture.id }}">
          <button class="detail-button">상세페이지</button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'ResultList',
  data() {
    return {
      facePictures: [],
    };
  },
  mounted() {
    this.fetchFacePictures();
  },
  methods: {
    async fetchFacePictures() {
      const memberId = this.$store.state.memberId
      if (!memberId) {
        console.error('No memberId found');
      return; // Early return if memberId is not set
      }
      try {
        const response = await axios.get(`http://13.209.76.161:8761//face-picture/list/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        });
        this.facePictures = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    getImageUrl(type, id) {
      return `http://13.209.76.161:8761//face-picture/image/${type}/${id}`;
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  font-family: 'SUITE Variable'
}
.title{width:100%;
       font-size:32px;
       font-weight: 500;}

.list{width:300px;
      height:400px;
      border:1px solid lightgray;
      float:left;
      padding:50px;
      border-radius:10px;}

img{width:200px;
    height:200px;
    display: block;}

</style>