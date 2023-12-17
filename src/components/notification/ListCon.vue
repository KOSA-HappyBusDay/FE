<template>
  <div class="container">
    <h2>FacePicture Details</h2>
    <div v-if="facePicture">
      <div class="image">
      <div class="image-container" v-for="image in facePicture.images" :key="image.type">
        <img :src="image.url" :alt="image.type" class="face-image"/>
        <p>{{ image.label }}</p>
      </div>
    </div>
      <p class="picture-date">Date: {{ facePicture.localDate }}</p>
      <div class="ai-messages">
        <div v-for="(item, index) in splitAImessages" :key="index">
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
        const response = await axios.get(`http://13.209.76.161:8761//face-picture/detail/${facePictureId}`);
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
      const baseUrl = 'http://13.209.76.161:8761//face-picture/image/';
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
.container {
  padding:140px;
}
.image{width:100%;}
.image-container {
  width:260px;
  margin-bottom: 20px;
  float:left;
}

.face-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}



.picture-date {
  margin-top: 20px;
  font-size: 16px;
}

.ai-messages h3 {
  margin-top: 15px;
}

.ai-messages p {
  margin-bottom: 10px;
}

.back-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

</style>