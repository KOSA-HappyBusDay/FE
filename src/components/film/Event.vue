<template>
  <div class="wrap">
    <v-app id="inspire">
      <v-card class="elevation-12">
        <v-toolbar dark color="green">
          <v-toolbar-title>이미지 업로드</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form class="upload" @keydown.enter="addImage" method="post">
            <v-text-field v-model="uploadImage.album_path" id="album_path" prepend-icon="photo_album" name="album_path"
              label="Choose an album" type="search">
            </v-text-field>
            <div class="image_part">
              <div class="upload_img1">
                <input @change="onFileSelected('forehead', $event)" type="file" name="forehead" id="image1">
                <div id="imagePreview1">
                  <img id="img1">
                </div>
              </div>
              <div class="upload_img2">
                <input @change="onFileSelected('leftCheek', $event)" type="file" name="leftCheek" id="image2">
                <div id="imagePreview2">
                  <img id="img2">
                </div>
              </div>
              <div class="upload_img3">
                <input @change="onFileSelected('rightCheek', $event)" type="file" name="rightCheek" id="image3">
                <div id="imagePreview3">
                  <img id="img3">
                </div>
              </div>
              <div class="upload_img4">
                <input @change="onFileSelected('chin', $event)" type="file" name="chin" id="image4">
                <div id="imagePreview4">
                  <img id="img4">
                </div>
              </div>
            </div>
          </v-form>
        </v-card-text>
        <div class="button">
          <v-spacer></v-spacer>
          <button @click="addImage" color="green white--text">Upload</button>
        </div>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Event",
  data() {
    return {
      list: [],
      feedback: null,
      uploadImage: {
        album_path: '',
        forehead: null,
        leftCheek: null,
        rightCheek: null,
        chin: null,
      }
    };
  },
  methods: {
    onFileSelected(type, event) {
      if (!event || !event.target || !event.target.files) {
        return;
      }

      const imgFile = event.target.files[0];
      this.uploadImage[type] = imgFile;

      const imgPreview = document.getElementById(`img${type}`);
      if (imgFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgPreview.src = e.target.result;
        };
        reader.readAsDataURL(imgFile);
      } else {
        imgPreview.src = '';
      }
    },
    addImage() {
      const formData = new FormData();
      formData.append('album_path', this.uploadImage.album_path);

      Object.keys(this.uploadImage).forEach(key => {
        const image = this.uploadImage[key];
        if (image) {
          formData.append(key, image);
        }
      });

      const imageUploadUrl = 'http://192.168.0.23:8761/face-picture/upload';

      const imagePromise = axios.post(imageUploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.getters.getToken}`
        }
      });

      imagePromise
        .then(response => {
          console.log(response);
          alert('업로드가 되었습니다');
        })
        .catch(error => {
          console.error(error);
          alert('업로드에 실패했습니다: ' + error.response.data.message);
        });
    },
    // flaskImage() {
    //   const formData = new FormData();
    //   formData.append('album_path', this.uploadImage.album_path);
      
    //   // 각 이미지 속성을 루프하여 FormData에 추가
    //   Object.keys(this.uploadImage).forEach(key => {
    //     const image = this.uploadImage[key];
    //     if (image) {
    //       // 각 이미지를 고유한 키로 추가
    //       formData.append(`file_${key}`, image);
    //     }
    //   });

    //   const flaskUploadUrl = 'http://127.0.0.1:5000/predict';

    //   const flaskPromise = axios.post(flaskUploadUrl, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     }
    //   });

    //   flaskPromise
    //     .then(response => {
    //       console.log(response);
    //       alert('진단 되었습니다');
    //     })
    //     .catch(error => {
    //       console.error(error);
    //       alert('진단에 실패했습니다: ' + error.response.data.message);
    //     });
    //   }
  }
};
</script>

<style scoped>
.wrap{font-family: 'NPSfontBold';}
.red-text {
  color: red;
  font-size: 20px;
  text-align: center;
}
.wrap{margin-top:180px;
      margin-left:30px;}

v-toolbar{width:100%;}
v-toolbar-title{width:180px;
                font-size:30px;
                margin: 0 auto;
                margin-bottom:15px;
                display:block;}

.video_title{width:100%;
             margin-top:20px;}

.image_title p{margin:0 auto;
               width:300px;}

.button{width:100%;
        margin-top:20px;}

.button button{width:50%;
                height:30px;
                display: block;
               margin:0 auto;
               border-radius: 10px;
               border:0;
               color:#fff;
               background-color:#82d7ff;}

#imagePreview1,#imagePreview2,#imagePreview3,#imagePreview4{height:200px;
                                                            width:250px;}

.upload_img1, .upload_img2,.upload_img3,.upload_img4{width:295px;
                                                     height:250px;}

#imagePreview1 #img1,#imagePreview2 #img2,#imagePreview3 #img3,#imagePreview4 #img4{height:200px;
                                                                                    width:250px;
                                                                                    margin-top:10px;
                                                                                    border:3px dashed lightgrey;}


#videoPreview {
  height: 300px;
}
.elevation{width:100%;
           height:100%;}
.image_part{height:100%;}

#videoPreview #videoPlayer {
  height: 300px;
}
.image_part > div {float:left;}
</style>
