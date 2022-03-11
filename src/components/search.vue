<template>
  <div class="search relative w-1/2 ml-auto mr-auto <sm:w-full <sm:pl-10 <sm:pr-10">
      <input type="text" name="search" id="search" class="border mb-10 p-1 w-full" v-model="searchQuery" @keydown.enter="sendresultSearch" @keydown.esc="cancelSearch" @input="debouncedOnChange" placeholder="search...">
      <ul v-if="showSearch" class="resultSearch absolute right-0 left-0 bg-white backdrop-filter sepia-10 z-20 p-2 top-9 shadow rounded-md max-h-60 overflow-auto <sm:left-10 <sm:right-10">
        <li class="text-left md:hover:text-red-600 cursor-pointer flex items-start mb-3" v-for="(item, index) in resultSearch" :key="index"><svg class="w-4 mt-1 mr-3 fill-current opacity-70 md:hover:opacity-100" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg><a class="w-11/12" :href="item.url">{{item.title}}</a></li>
      </ul>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import axios from 'axios';
export default {
    name:"search",
    data(){
        return {
            searchQuery:'',
            resultSearch:[],
            showSearch:false
        }
    },
    computed:{
      debouncedOnChange () {
        return _debounce(this.onChange, 700);
      }
    },
    methods:{
      async onChange(){
        if(this.searchQuery =='') {
          this.resultSearch=[]
        }else{
          const key1=this.searchQuery.replaceAll(" ","+")
          this.showSearch=true
          await axios
          .get(process.env.VUE_APP_LINK_SEARCH+key1+"&apiKey="+process.env.VUE_APP_API_KEY)
          .then(res=>{
              this.resultSearch=res.data.articles
              console.log(this.resultSearch);
          })
          if(this.resultSearch.length==0) this.showSearch=false
        }
      },
      cancelSearch(){
        this.resultSearch=[],
        this.showSearch=false
      },
      sendresultSearch(){
        this.searchQuery=""
        this.showSearch=false
        this.$emit("updateResult", this.resultSearch)
      }
    }
}
</script>

<style>

</style>