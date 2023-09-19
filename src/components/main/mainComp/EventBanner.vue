<template>
  <Carousel :wrap-around="true" style="width: 1000px" transition="600">
    <Slide v-for="slide in boards" :key="slide">
      <img :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+slide.additionalInfo.imagePath">
    </Slide>
    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel'
import axiosInstance from "@/utility/axiosInstance";

const boards = reactive([])
onMounted(() => {
  axiosInstance.springAxiosInst.get("/board/list/event/main")
    .then((res)=> {
      boards.push(...res.data)
    })
})
</script>

<style scoped>

</style>