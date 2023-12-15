<template>
  <div class="wrap">
    <v-app id="inspire">
      <v-card class="elevation-12">
        <div class="toolbar" dark color="green">
          <div class=title>이미지 업로드</div>
        </div>
        <div class="card">
          <v-form class="upload" @keydown.enter="addImage" method="post">
            <v-text-field v-model="uploadImage.album_path" id="album_path" prepend-icon="photo_album" name="album_path"
              label="Choose an album" type="search">
            </v-text-field>
            <div class="image_part">
              <div class="upload_img1">
                <div class="warning">
                  <p>*이마부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('forehead', $event)" type="file" name="forehead" id="image1">
                <div id="imagePreview1">
                  <img id="img1">
                </div>
              </div>
              <div class="upload_img2">
                <div class="warning">
                  <p>*왼쪽 볼부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('leftCheek', $event)" type="file" name="leftCheek" id="image2">
                <div id="imagePreview2">
                  <img id="img2">
                </div>
              </div>
              <div class="upload_img3">
                <div class="warning">
                  <p>*오른쪽 볼부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('rightCheek', $event)" type="file" name="rightCheek" id="image3">
                <div id="imagePreview3">
                  <img id="img3">
                </div>
              </div>
              <div class="upload_img4">
                <div class="warning">
                  <p>*턱부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('chin', $event)" type="file" name="chin" id="image4">
                <div id="imagePreview4">
                  <img id="img4">
                </div>
              </div>
            </div>
          </v-form>
          <div class="button">
          <v-spacer></v-spacer>
          <button @click="addImage" color="green white--text">Upload</button>
        </div>
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

      const imageUploadUrl = 'http://192.168.0.10:5001/predict';

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
  }
};
</script>

<style scoped>
.red-text {
  color: red;
  font-size: 20px;
  text-align: center;
}
.wrap{padding-top:150px;
      font-family: 'SUITE Variable';
      margin-left:20px;}

.image_part{ width:99%;
            border-radius: 10px;
            margin:0 auto;
             height:100%;}

.toolbar{width:99%;
        border-bottom:1px solid lightgray;}
.title{width:200px;
      font-weight:900;
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
.warning p{color:red;
           font-weight:600;}
.button button{width:50%;
                height:30px;
                display: block;
               margin:0 auto;
               margin-bottom:10px;
               border-radius: 10px;
               border:0;
               color:#fff;
               background-color:rgb(34, 100, 153);}

#imagePreview1,#imagePreview2,#imagePreview3,#imagePreview4{height:300px;
                                                            width:200px;}

.upload_img1, .upload_img2,.upload_img3,.upload_img4{width:350px;
                                                     height:300px;}

#imagePreview1 #img1,
#imagePreview2 #img2,
#imagePreview3 #img3,
#imagePreview4 #img4{height:200px;
                     width:350px;
                    background-color: #fff;
                    margin-top:10px;
                    border:3px dashed lightgrey;}


#videoPreview {
  height: 300px;
}
input{width:250px;}
.elevation{width:100%;
           height:100%;}

#videoPreview #videoPlayer {
  height: 300px;
}
.image_part > div {float:left;
                   margin-left:3%;}

@media screen and (max-width:1650px){
  .image_part{width:800px;}

}

@media screen and (max-width:800px){
  .image_part{width:350px;}
  
}
</style>
