<template>
  <div class="flex justify-between relative z-10 <sm:flex-wrap">
    <div class="categories w-full <sm:ml-4 <sm:mr-4 <sm:mb-5">
      <countryList :countries="countries" @countryCode="onfilter"></countryList>
    </div>
    <modal
      :countryCode="countryCode"
      @closeModal="closeModal"
      v-if="isOpen"
    ></modal>
  </div>
</template>

<script>
import axios from "axios";
import modal from "../components/modal.vue";
import countryList from "../components/countryList.vue";
export default {
  name: "posts",
  components: {
    modal,
    countryList,
  },
  props: ["resultSearch"],
  data() {
    return {
      posts: [],
      source_news: [],
      filters: "All",
      countries: [],
      selectCountry: [],
      countryCode: "",
      result: [],
      isOpen: false,
    };
  },
  created() {
    axios
      .get(process.env.VUE_APP_LINK)
      .then((res) => {
          (res.data.Countries).map(item =>{
            this.countries.push({
              ID:item.ID,
              Country:item.Country,
              CountryCode:item.CountryCode,
              Slug:item.Slug,
              TotalConfirmed:item.TotalConfirmed,
              TotalDeaths:item.TotalDeaths,
              TotalRecovered:item.TotalRecovered,
              isBookmark:false,
              show:true
            })
          })
        
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onfilter(name) {
      if(name== null) return
      this.countryCode = name;
      this.isOpen = true;
    },
    closeModal(close) {
      this.isOpen = close;
    },
    // openModal(){
    //     if(this.countryCode.length>0) return this.isOpen=true
    // },
    // closeModal(){
    //     return this.isOpen=this.isOpen1
    // }
  },
};
</script>

<style scoped>
</style>>