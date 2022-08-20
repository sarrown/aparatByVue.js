<template>
  <div>
    <div>
      <search-Video :videos="videos" @videoUrls="getUrls"/>
      <show-Video :videos="videos"/>
    </div>

    <div v-if="fullInput">
    <button @click="prevPage" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-36 mx-1	">Previous Page</button>
    <button @click="nextPage" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Next Page</button>
    </div>
  
  </div>
</template>
<script>
import axios from "axios";
import SearchVideo from "./SearchVideo.vue";
import ShowVideo from "./ShowVideo.vue";

export default {
  components: {
    SearchVideo,
    ShowVideo,
  },

 data(){
  return {
    videos:[],
    skip : 1,
    fullInput:false,
  };
 },

 methods: {
  getUrls(inputValue) {
     axios
        .get(
          `https://www.aparat.com/etc/api/videoBySearch/text/${inputValue}/perpage/6/curoffset/${this.skip}`
        )
        .then((resp)=>{
          this.videos = resp.data.videobysearch;
          console.log(this.videos)
          this.fullInput = true;
        });
  },
      nextPage(){
          this.skip += 1;
          this.getUrls();
      },

      prevPage(){
          this.skip -=1;
          this.getUrls();
      },

},
  watch: {},
};
</script>
<style>
body{

   background-color:rgb(187, 228, 239);

}
</style>
