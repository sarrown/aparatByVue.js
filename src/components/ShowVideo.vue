<template>
  <div>
    <div id="videoContainer" class="flex flex-wrap flex-row">
      <div class="divStyle" v-for="video in videos" :key="video.id"
      @mouseover="mouseHoverVideo(video.id)" @mouseleave="mouseLeaveVideo"  @click="showModal(video)">
      

      <img class="imageStyle" :src="video.big_poster" v-show="hoverId !== video.id">  
      <p v-show="hoverId === video.id">{{video.username}}</p>
     </div>
    </div>
     
     <video-modal v-if="$store.state.showModal" :video="video" :videos="videos"/>
  </div>
</template>

<script>

import VideoModal from "./VideoModal.vue"

export default {
  name: "showVideo",
  components: {
    VideoModal,

  },
  data() {
    return {
      hoverId:"",
      video:{},//obj
    };

  },
  props: {
    videos: Array,
  },

  methods:{
    mouseHoverVideo(videoId){
      this.hoverId = videoId;
},
    mouseLeaveVideo(){
      this.hoverId='';
    },
    showModal(video){
        this.video = video;
        this.$store.dispatch('toggleModal')
    },
}
}
</script>
<style scoped>

#videoContainer {
  margin-top:50px;
  z-index: -10;
}

.divStyle {
  position: relative;
  width: 350px !important;
  height: 250px;
  margin: 20px;
}
.imageStyle {
  z-index: 1;
  width: 350px;
  height: 250px;
}
p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 0;
}

</style>