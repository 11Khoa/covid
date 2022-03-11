<template>
  <div class="post grid lg:grid-cols-4 <lg:grid-cols-3 <md:grid-cols-2 relative z-10">
      <div class="item border-dark-900 border p-2 pb-8 ml-1 mr-1 mb-2 relative text-left" v-for="post in posts" :key="post.id">
          <a :href="post.url">
              <p class="date absolute z-10 right-2 text-white bg-dark-300 pt-0 pb-0 pr-2 pl-2 text-xs">{{sortDate(post.publishedAt)}}</p>
          <figure>
              <img class="object-cover h-50 md:hover:scale-10 duration-150 w-full" :src="post.urlToImage || require('@/assets/dummy.png')" alt="post.title">
              <figcaption class="font-semibold leading-tight mt-3 md:hover:text-red-500 duration-150"><a class="title" :href="post.url" target="_blank">{{post.title}}</a></figcaption>
          </figure>
          <p class="description mt-2" v-html="post.description"></p>
          <p class="source text-right absolute right-2 bottom-2 text-xs">source: <span class="text-green-500">{{post.source.name}}</span></p>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"post",
    props:[
        "posts",
        "update"
    ],
    methods:{
        sortDate: function (dateAt) {
            const date=new Date(dateAt)
            return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`
        },
    },
    watch:{
        UpdateArray(){
            this.posts=this.update
        }
    }
}
</script>

<style>
    .title{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }
    .description{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
    }
</style>