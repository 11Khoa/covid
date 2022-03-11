<template>
  <div class="max-w-screen-xl mr-auto ml-auto">
    <posts></posts>
  </div>
</template>

<script>
import posts from "../components/posts.vue";
export default {
  name: "home",
  data() {
    return {
    };
  },
  components: {
    posts,
  },
};
</script>

<style>
</style>