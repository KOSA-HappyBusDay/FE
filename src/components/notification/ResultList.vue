<template>
  <div class="Result_wrap">
    <div class="title">진단 LIST</div>
    <div class="list_wrap">
       <div class="list" v-for="(picture, idx) in facePictures" :key="idx">
      <div class="images-grid">
        <div class="image-container">
          <img :src="getImageUrl('forehead', picture.id)" alt="Forehead" />
        </div>
      </div>
      <div class="info">
        <div>{{ picture.localDate }}</div>
      <div class="label">검사결과가 나왔습니다</div>
      <div>{{ picture.AImessage }}</div>
      <div class="con">
        <router-link :to="{ name: 'ListCon', params: { id: picture.id }}">
          <button class="detail-button">상세페이지</button>
        </router-link>
      </div>
    </div>  
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
        const response = await axios.get(`http://192.168.0.10:8761/face-picture/list/${memberId}`, {
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
      return `http://192.168.0.10:8761/face-picture/image/${type}/${id}`;
    }
  }
}
</script>

<style scoped>
.Result_wrap {
  width: 83%;
  min-height:500px;
  float:right;
  font-family: 'SUITE';
  flex-wrap: wrap; /* 필요에 따라 줄 바꿈을 활성화할 수 있습니다. */
}
.list_wrap {
  width: 100%;
  height: 100%;
  display: flex; /* display flex 추가 */
  flex-wrap: wrap; /* 필요에 따라 줄 바꿈을 활성화할 수 있습니다. */
}
.title{width:100%;
       font-size:24px;
       margin-left:10px;
       font-family: 'SUITE';
       font-weight:700;}

.image-container{width:200px;
               float:left;}

.label{font-weight:600;
       margin-top:5px;
       margin-bottom:5px;
       font-size:18px;}
      
.info{margin-top:10px;
  margin-left:30px;
      width:70%;
float:left;}

.list {
  width:80%;
  background-color:#fff;
  border-top:1px solid lightgrey;
  border-bottom:1px solid lightgrey ;
  padding:10px;
  margin: 10px; /* 각 항목 사이의 간격을 주기 위해 margin 추가 */
}

img{width:200px;
    height:200px;
    border-radius:5px;
    display: block;}

button{border:0;
       font-size:16px;
       color:#fff;
       width:100px;
       padding:5px;
       background-color: rgb(34, 100, 153);
      border-radius:20px;}
@media screen and (max-width:900px){
  .title{margin-left:90px;}

  .list{margin-left:90px;}
}
</style>