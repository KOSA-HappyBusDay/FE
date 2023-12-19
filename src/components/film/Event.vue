<template>
  <div class="wrap">
    <v-app id="inspire">
      <v-card class="elevation-12">
        <div class="toolbar" dark color="green">
          <div class=title>AI 진단</div>
        </div>
        <div class="q_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="q_modal-content">
          <div class="modal-body">
            <div class="q_title">
              <h2>AI 진단 설명서</h2>
            </div>
            <div class="q_info">
              <p>1. 업로드 하시기 전에 사진을 찍으실 때는 가까이 찍어주세요</p>
              <p>2. 업로드 하실 때에는 4장을 전부 올려주세요</p>
              <p>3. 진단 시작 버튼을 누르고 약 30초정도 걸리니 잠시만 기다려주세요</p>
              <p>4. 결과창은 진단이 끝난 후 바로 보실 수 있습니다 </p>
            </div>
            <div class="q_img">
              <p>이미지 업로드 예시)</p>
              <img src="../../static/example.PNG" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
        <div class="upload_wrap">
          <div class="upload" @keydown.enter="addImage" method="post">
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
                  <img :src="uploadImage.imgforehead" id="img1">
                </div>
              </div>
              <div class="upload_img2">
                <div class="warning">
                  <p>*왼쪽 볼부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('leftCheek', $event)" type="file" name="leftCheek" id="image2">
                <div id="imagePreview2">
                  <img :src="uploadImage.imgleftCheek" id="img2">
                </div>
              </div>
              <div class="upload_img3">
                <div class="warning">
                  <p>*오른쪽 볼부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('rightCheek', $event)" type="file" name="rightCheek" id="image3">
                <div id="imagePreview3">
                  <img :src="uploadImage.imgrightCheek" id="img3">
                </div>
              </div>
              <div class="upload_img4">
                <div class="warning">
                  <p>*턱부분만 찍어주세요</p>
                </div>
                <input @change="onFileSelected('chin', $event)" type="file" name="chin" id="image4">
                <div id="imagePreview4">
                  <img :src="uploadImage.imgchin" id="img4">
                </div>
              </div>
            </div>
          </div>
          <div class="button">
            <v-spacer></v-spacer>
            <button @click="addImage" color="green white--text">진단 시작</button>
          </div>
        </div>
      </v-card>
    </v-app>
    <!-- 모달 -->
    <div v-if="uploadImage.showModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        imgforehead: '',
        imgleftCheek: '',
        imgrightCheek: '',
        imgchin: '',
        forehead: null,
        leftCheek: null,
        rightCheek: null,
        chin: null,
        showModal: false, 
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

      if (imgFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadImage[`img${type}`] = e.target.result;
        };
        reader.readAsDataURL(imgFile);
      } else {
        this.uploadImage[`img${type}`] = '';
      }
    },
    addImage() {
      // 업로드 전에 모달을 표시
      this.uploadImage.showModal = true;

      const formData = new FormData();
      formData.append('album_path', this.uploadImage.album_path);

      Object.keys(this.uploadImage).forEach(key => {
        const image = this.uploadImage[key];
        if (image && key !== 'showModal') {
          formData.append(key, image);
        }
      });

      const imageUploadUrl = 'http://192.168.0.25:5000/predict';

      const imagePromise = axios.post(imageUploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${this.$store.getters.getToken}`
        }
      });

      imagePromise
        .then(response => {
          console.log(response);
          this.list = response.data;
          // 업로드가 완료되면 모달을 닫음
          this.uploadImage.showModal = false;
          alert('진단이 완료되었습니다');
          this.$router.push("/mypage");
        })
        .catch(error => {
          console.error(error);
          // 업로드 실패 시에도 모달을 닫음
          this.uploadImage.showModal = false;
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
.wrap{padding-top:120px;
      font-family: 'SUITE';
      margin-left:20px;}
.image_part{ width:99%;
            border-radius: 10px;
             height:100%;}
.upload_wrap{border:0;
              margin-left:7%;
              width:50%;
              float:left;
width:50%;}
.toolbar{width:99%;}
.title{
      font-weight:700;
      font-size:40px;
      padding-top:20px;
       display:block;}
.image_title p{margin:0 auto;
               width:300px;}

.button{width:300px;
        margin-top:20px;
        height:30px;}
        
.warning p{color:red;
           font-weight:600;}
.button button{width:150px;
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

.upload_img1, .upload_img2,.upload_img3,.upload_img4{width:300px;
                                                     height:300px;}

#imagePreview1 #img1,
#imagePreview2 #img2,
#imagePreview3 #img3,
#imagePreview4 #img4{height:200px;
                     width:300px;
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

.q_info{padding-top:20px;}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.q_modal {
  width: 40%; /* 모달 너비 설정 */
  background-color: #fff;
  height: 72%; /* 모달 높이 설정 */
  margin-top:50px;
  float:left;
  border: 1px solid lightgray; /* 테두리 추가 */
  padding: 10px; /* 내용과 테두리 간격 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 박스 크기에 포함 */
  border-radius: 5px;
  opacity:0.9;
}
.q_modal-content{ background-color: transparent; /* 배경 색 제거 */
  border: none; /* 테두리 제거 */
  width: 100%; /* 보더스핀의 너비 설정 */
  height: 100%; /* 보더스핀의 높이 설정 */
  display: flex;
  align-items: center;
  justify-content: center;}

  .q img{margin-top:20px;
          width:30px;}
.q_modal h2{font-weight:700;
font-size:36px;;}
.q_info{font-size:18px;}

.q_img{width:100%;
 }

 .q_img img{width:60%;}
.modal-content {
  background-color: transparent; /* 배경 색 제거 */
  border: none; /* 테두리 제거 */
  width: 70%; /* 보더스핀의 너비 설정 */
  height: 70%; /* 보더스핀의 높이 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-border {
  width: 10rem; /* 보더스핀의 너비 설정 */
  height: 10rem; /* 보더스핀의 높이 설정 */
}

@media screen and (max-width:1000px){

}

@media screen and (max-width:1000px){
.q_modal{width:340px;}
.upload_wrap{width:350px;
             margin-left:10px;}
.card{width:360px;}
}

</style>