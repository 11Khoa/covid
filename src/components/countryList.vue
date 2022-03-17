<template>
  <div class="source">
    <input
      type="search"
      name="search"
      id="search"
      value=""
      :placeholder="search"
      class="border mb-2 p-1 table"
      v-model="findName"
    />
    <svg
      class="bookmarkAll bookmark"
      :class="{ active: selected }"
      @click="showBookmark()"
      enable-background="new 0 0 50 50"
      height="30px"
      version="1.1"
      viewBox="0 0 50 50"
      width="30px"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <rect fill="none" height="30" width="30" />
      <polygon
        fill="none"
        points="25,3.553 30.695,18.321 46.5,19.173   34.214,29.152 38.287,44.447 25,35.848 11.712,44.447 15.786,29.152 3.5,19.173 19.305,18.321 "
        stroke="#000000"
        stroke-miterlimit="10"
        stroke-width="1"
      />
    </svg>
    <select
      name="select"
      id="select"
      class="ml-auto table mb-2 border"
      v-model="selectSort"
      @change="changeSort()"
    >
      <option disabled value="">Please select one</option>
      <option v-for="item in arrSort" :key="item">
        {{ item }}
      </option>
    </select>
    <div class="list-countries">
      <div
        class="item text-left cursor-pointer md:hover:text-bg-green-700"
        v-for="(item, index) in localALL"
        :key="index"
        v-show="item.show"
      >
        <div class="inner" @click="select(item.CountryCode)">
          <p class="country">
            <strong>{{ item.Country }}</strong>
          </p>
          <p class="TotalConfirmed">
            <small><strong>Total Confirmed: </strong></small
            ><span>{{ numberWithCommas(item.TotalConfirmed) }}</span>
          </p>
          <p class="TotalDeaths text-red-500">
            <small><strong>Total Deaths: </strong></small
            ><span>{{ numberWithCommas(item.TotalDeaths) }}</span>
          </p>
          <p class="TotalRecovered text-green-500">
            <small><strong>Total Recovered: </strong></small
            >{{ numberWithCommas(item.TotalRecovered) }}
          </p>
        </div>
        <svg
          class="bookmark"
          :class="{ active: item.isBookmark }"
          @click.prevent="addbookmark(item)"
          enable-background="new 0 0 50 50"
          height="30px"
          version="1.1"
          viewBox="0 0 50 50"
          width="30px"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect fill="none" height="30" width="30" />
          <polygon
            fill="none"
            points="25,3.553 30.695,18.321 46.5,19.173   34.214,29.152 38.287,44.447 25,35.848 11.712,44.447 15.786,29.152 3.5,19.173 19.305,18.321 "
            stroke="#000000"
            stroke-miterlimit="10"
            stroke-width="1"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["countries"],
  data() {
    return {
      nameCountry: "all",
      countriesAll: [],
      selected: false,
      search: "Search Data by Region...",
      isBookmark: true,
      arrBookmark: [],
      arrSort: ["Total case", "Deaths", "Recoveries"],
      selectSort: "",
      findName: "",
    };
  },
  computed: {
    localALL() {
      const bookmark = JSON.parse(localStorage.getItem("Bookmark"));
      if (bookmark) {
        bookmark.forEach((el) => {
          this.countries.findIndex((index) => {
            if (el.CountryCode == index.CountryCode) {
              index.isBookmark = true;
            }
          });
        });
      }
      return this.countries;
    },
  },
  watch: {
    findName(value) {
      this.countries.forEach((item) => {
        const isVisible = item.Country.toLowerCase().includes(
          value.toLowerCase()
        );
        item.show = isVisible;
      });
    },
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    changeSort() {
      switch (this.selectSort) {
        case "Deaths":
          this.countries.sort(function (a, b) {
            return b.TotalDeaths - a.TotalDeaths;
          });
          break;
        case "Recoveries":
          this.countries.sort(function (a, b) {
            return b.TotalRecovered - a.TotalRecovered;
          });
          break;
        default:
          this.countries.sort(function (a, b) {
            return b.TotalConfirmed - a.TotalConfirmed;
          });
          break;
      }
    },
    select(name) {
      this.$emit("countryCode", name.toLowerCase());
    },
    addbookmark(item) {
      this.$emit("countryCode", null);
      const bookmark = JSON.parse(localStorage.getItem("Bookmark"));
      let currentClick=this.countries.findIndex(index=> item.CountryCode==index.CountryCode)
      if (bookmark) {
        this.arrBookmark = bookmark;
      }
      
      if (item.isBookmark == true) {
        bookmark.forEach((itemDelete,index) => {
          if(itemDelete.CountryCode==item.CountryCode){
            bookmark.splice(index,1)
            localStorage.setItem("Bookmark",JSON.stringify(bookmark))
          }
        });
        return this.countries[currentClick].isBookmark=false
      }

      this.countries.map((x) => {
        if (item.CountryCode == x.CountryCode && item.isBookmark == false) {
          x.isBookmark = true;
          this.arrBookmark.push({
            ID: item.ID,
            Country: item.Country,
            CountryCode: item.CountryCode,
            isBookmark: true,
          });
        }
      });

      localStorage.setItem("Bookmark", JSON.stringify(this.arrBookmark));
    },
    showBookmark() {
      this.selected = !this.selected;
      if (this.selected) {
        this.countries.forEach((el) => {
          el.show = el.isBookmark;
        });
      } else {
        this.countries.forEach((el) => {
          el.show = true;
        });
      }
    },
  },
  // watch(){

  // }
};
</script>

<style scoped>
.bookmarkAll {
  position: absolute;
  top: 0;
  right: 0;
}

.source li.active {
  color: red;
}
/* .list-countries {
  height: calc(100vh - 160px);
} */
.list-countries {
  display: flex;
  flex-wrap: wrap;
}
.list-countries .item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 1px solid #ddd;
  padding: 5px 10px;
  transition: 0.2s;
  width: calc((100% - 30px) / 3);
  margin-bottom: 1%;
  margin-left: 5px;
  margin-right: 5px;
  position: relative;
  z-index: 1;
}
.list-countries .item > div {
  z-index: 1;
  position: relative;
}
.bookmark {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 30px !important;
  cursor: pointer;
}

.bookmark.active polygon {
  fill: #fcf700;
  stroke: #fcf700;
}
@media (min-width: 1000px) {
  .bookmark:hover polygon {
    fill: #fcf700;
    stroke: #fcf700;
  }
}
/* .list-countries .item:nth-child(3n+3){
  margin-right: 0;
} */
.list-countries .item:hover {
  background-color: rgb(41 84 255 / 15%);
  border-color: rgb(41 84 255 / 55%);
}
.list-countries .item > *:first-child {
  width: 100% !important;
}
.list-countries .item > * {
  width: calc((100% - 30px) / 3);
}
@media (max-width: 999px) {
  .list-countries .item {
    width: 49%;
    margin-bottom: 2%;
    margin-right: 0;
  }
  .list-countries .item:nth-child(3n + 3) {
    margin-right: 0;
  }
  .list-countries .item:nth-child(even) {
    margin-left: auto;
    margin-right: 0;
  }
}
@media (max-width: 400px) {
  .list-countries .item {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>