<template>
  <Carousel :transition="600" style="width: 1280px" :itemsToShow="2" :item-to-show="3" :autoplay="2000" :wrapAround="true">
    <Slide v-for="slide in boards" :key="slide">
      <div class="w-[626px] h-[344px]">
      <img :src="`https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/${slide.additionalInfo.imageKey}`" alt=""
      class="rounded-2xl" style="object-fit: cover; width: 100%; height: 100%">
      </div>
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

const props = defineProps({
  category:String
  }
)
const boards = reactive([])
onMounted(() => {
  axiosInstance.springAxiosInst.get(`/board/list/event/${props.category}`)
    .then((res)=> {
      boards.push(...res.data)
    })
})
</script>

<style scoped>

</style>