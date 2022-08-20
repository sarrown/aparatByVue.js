<template>
  <div>
    <div class="modal-container" @click="modalClick">
      <div class="modal">
        <iframe :src="this.url"> </iframe>

        <div class="w-max self-center">
          <p
            v-if="this.profileIsTrue"
            class="mt-6 dark:text-slate-200 text-right text-amber-600"
          >
            نام کاربری: {{ this.profilePics.name }}
          </p>
        </div>
        <br />
        <br />

       <p> {{this.videoViews[this.index].counter}}

       </p>
        <div class="w-max self-center">
          <img
            v-if="this.profileIsTrue"
            alt=""
            id="profilePic"
            class="my-3 float-right rounded-full"
            :src="this.profilePics.pic_m"
          />
        </div>
      </div>
      <div
        id="similar-container"
        class="mt-14 w-max self-center"
        v-for="singleVideo in videoVibe.slice(0, 3)"
        :key="singleVideo.id"
      >
        <iframe :src="singleVideo.frame" style="width: 350px"> </iframe>
      </div>

      <span class="close">*</span>
    </div>
  </div>
</template>

<script>
//import Loading from "./LoadingSpinner.vue";
import axios from "axios";
export default {
  name: "VideoModal",
  components: {},

  props: {
    video: Object,
    videos: Array,
  },
  data() {
    return {
      //profile:{},
      playvideo: {},
      username: "",
      url: "",
      tag: "",
      profilePics: [],
      profileIsTrue: false,
      doseVideoExist: false,
      videoViews:[],
      index: 0,
      videoVibe: [],
    };
  },
  methods: {
    modalClick() {
      this.$store.dispatch("toggleModal");
    },

    getProfilePhoto() {
      axios
        .get(
          `https://www.aparat.com/etc/api/profile/username/${this.video.username}`
        )
        .then((resp) => {
          this.profilePics = resp.data.profile;
          this.profileIsTrue = true;
        });
    },
    videoClicked() {
      axios
        .get(`https://www.aparat.com/etc/api/video/videohash/${this.video.uid}`)
        .then((resp) => {
          if (resp) {
            this.tag = resp.data.video.tags[0].name;
          }
        });
    },

    getSimilerVideo() {
      axios
        .get(`https://www.aparat.com/etc/api/videobytag/text/${this.tag}`)
        .then((resp) => {
          this.videoVibe = resp.data.videobytag;
        });
    },
  },

  mounted() {
    this.getProfilePhoto();
    this.getSimilerVideo();
    this.videoClicked();
    this.url = this.video.frame;
    this.uid = this.video.uid;
    // this.playvideo = {
    // //  id: this.video.uid,
    // //  count:1,
    // //  };
  },
    
 created(){ 
     this.videoViews = localStorage.getItem('count') ?
     JSON.parse(localStorage.getItem('count')) 
     : []; 

    
      this.doseVideoExist = this.videoViews.some(
        (view) => view.id === this.video.uid
      );
      this.index = this.videoViews.findIndex(
    (videoIndex) => videoIndex.id === this.video.uid
  );
      if (!this.doseVideoExist) {
        // console.log('video dose not Exist');
        this.videoViews.push({ id: this.video.uid, counter: 1 });
      } else {
        // console.log('video Exist');
        this.videoViews[this.index].counter += 1;
      }
      localStorage.setItem('count',JSON.stringify(this.videoViews))
    
  },


}

</script>


<style>
.modal-container {
  position: absolute;
  top: 300px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 700px;
  height: 600px;

  background-color: burlywood;
}
</style>