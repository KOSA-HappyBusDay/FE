<template>
    <div class="wrap">
      <div class="main_bg">
        <div class="video-container">
          <iframe
            width="560"
            height="315"
            class="video"
            src="https://www.youtube.com/embed/TKedXUyTtvE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="company_info">
            <div class="company_info_bg">
                
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // 컴포넌트 로직은 이곳에 추가하세요.
  };
  </script>
  
  <style scoped>

  .wrap{width:100%;
        height:100%;}
    li {
      list-style: none;
    }
    * {
      margin: 0;
      padding: 0;
    }
    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 비율 */
      height: 0;
    }
    .video-container .video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>