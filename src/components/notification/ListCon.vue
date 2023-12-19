<template>
  <div class="section">
    <h2>진단 결과</h2>
    <div v-if="facePicture" class="all">
      <p class="picture-date">{{ facePicture.localDate }}</p>
      <div class="image">
        <div class="image-container" v-for="image in facePicture.images" :key="image.type">
        <img :src="image.url" :alt="image.type" class="face-image"/>
        <p>{{ image.label }}</p>
      </div>
    </div>
      <div class="ai-messages" style="overflow-y: auto; ">
        <div v-for="(item, index) in splitAImessages" :key="index" class="info">
          <h3>{{ item.part }}</h3>
          <p>{{ item.message }}</p>
        </div>
      </div>
    </div>
    <button @click="goBack" class="back-button">뒤로가기</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      facePicture: null
    };
  },
  async mounted() {
    const facePictureId = this.$route.params.id;
    if (facePictureId) {
      try {
        const response = await axios.get(`http://192.168.0.10:8761/face-picture/detail/${facePictureId}`);
        this.facePicture = this.formatFacePictureData(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatFacePictureData(data) {
      const baseUrl = 'http://192.168.0.10:8761/face-picture/image/';
      const images = [
        { type: 'forehead', url: `${baseUrl}forehead/${data.id}`, label: '이마' },
        { type: 'leftCheek', url: `${baseUrl}leftCheek/${data.id}`, label: '좌측 뺨' },
        { type: 'rightCheek', url: `${baseUrl}rightCheek/${data.id}`, label: '우측 뺨' },
        { type: 'chin', url: `${baseUrl}chin/${data.id}`, label: '턱' }
      ];
      return {
        images,
        localDate: data.localDate,
        aimessage: data.aimessage
      };
    }
  },
  computed: {
    splitAImessages() {
      const partNames = {
        'forehead': '이마',
        'leftcheek': '좌측 뺨',
        'rightcheek': '우측 뺨',
        'chin': '턱'
      };
      return this.facePicture.aimessage
        ? this.facePicture.aimessage.split('\n').map((message, index) => {
            const part = Object.keys(partNames)[index];
            return {
              part: partNames[part] || '알 수 없음',
              message
            };
          })
        : [];
    }
  }
}
</script>

<style scoped>
h2{font-weight:600;}

.section {
  display: flex;
  
  flex-wrap: wrap;
  font-family: 'SUITE';
  padding-top:140px;
  padding-left:20px;
}
.ai-messages{flex: 1;
            max-width: 50%; /* 반응형 조절을 위한 최대 너비 설정 */
            box-sizing: border-box;
            padding: 10px;;}
.image{ flex: 1;
            max-width: 50%; /* 반응형 조절을 위한 최대 너비 설정 */
            box-sizing: border-box;
            padding: 10px;
        }
.image-container {
  width:250px;
  height:250px;
  float:left;
  margin-bottom:70px;
  margin-left:80px;
}

.image-container:nth-child(3){margin-left:0px;}


.image-container > p{text-align: center;
                      margin:0 auto;
                      margin-left:60px;
                      font-weight: 600;
                   width:150px;}
.image-container:nth-child(1){margin-left:0px;}
.all{width:100%;}
.face-image {
  width: 100%;
  height:100%;
  object-fit: cover;
  border-radius: 8px;
}


.picture-date {
  font-weight:400;
  margin-top: 20px;
  font-size: 24px;
}

.ai-messages h3 {
  font-weight:400;
  margin-top: 15px;
}

.ai-messages p {
  margin-bottom: 10px;
}

.back-button {
  padding: 10px 20px;
  background-color: rgb(38, 150, 255);
  color: white;
  border: none;
  float:left;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
.info {
  float:left;
  height:auto;
  padding:10px;
      border:1px solid lightgray;
      border-radius: 5px;
  margin-left:30px;
  margin-bottom:20px;
  max-height: 260px; /* Set the maximum height */
  overflow-y: auto; /* Add overflow-y: auto for vertical scrolling */
}

@media screen and (max-width:1250px){
  .image-container{margin-left:0px;
    width:150px;
    height:150px;
  }

  .info {
  float:left;
  height:auto;
  padding:10px;
      border:1px solid lightgray;
      border-radius: 5px;
  margin-left:30px;
  margin-bottom:62px;
  max-height: 150px; /* Set the maximum height */
  overflow-y: auto; /* Add overflow-y: auto for vertical scrolling */
}
}
@media screen and (max-width:500px){
  .title{margin-left:50px;}

}
</style>