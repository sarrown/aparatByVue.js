<template>
  <div>
    <div class="w-full flex justify-center mt-11">
      <input type="search" v-model="inputValue" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8/12	 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-1"/>
      <button @click="searchVideoHandler" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Search
      </button>
    </div>
    <!-- <div>
      <router-link to="/">Back</router-link>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "searchVideo",
  props: {
    videos:Array,
      default() {
        [];
      },
    },
  data(){
    return{
      inputValue:'',
    }
  },
  
  methods: {
    searchVideoHandler() {
      this.$emit("videoUrls",this.inputValue);
    },
  },
  emits:['videoUrls'],
     

};
</script>