<template>
  <h1> 리뷰 모임?</h1>
  <hr>
  <Carousel :items-to-show="3" :wrap-aound="true">
    <Slide v-for="b in boards" :key="b" @click="()=>router.push(`/board/${b.id}`)">
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-16" class="text-gray-500">{{ reformatDate(b.createdDate) }}</time>
        </div>
        <div v-if="!!b.additionalInfo?.imageKey" class="h-[300px] rounded-xl mx-4"
             style="overflow: hidden; position: relative;">
          <img :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+b.additionalInfo.imageKey"
               class="" style="object-fit: cover; position: relative; z-index: 1;">
        </div>
        <div class="grid grid-cols-2">
          <div class="relative mt-3 items-center gap-x-4 grid grid-cols-1 align-self-center">
            <div>
              <toy-face rounded="42" :toy-number="b.writer.profile.number"
                        :group="b.writer.profile.groupNumber"></toy-face>
            </div>
            <div class="text-sm leading-6">
              <p class="font-semibold text-gray-900">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  {{ b.writer.nickName }}
                </a>
              </p>
            </div>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <a href="#">
                <span class="absolute inset-0"></span>
                {{ b.title }}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ b.contents.content }}</p>
          </div>

        </div>
      </article>
    </Slide>
  </Carousel>
  <!--  <Carousel :wrap-around="true" :transition="600" style="width: 1280px">-->
  <!--    <Slide v-for="slide in boards" :key="slide">-->
  <!--      <img :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+slide.additionalInfo.imagePath">-->
  <!--    </Slide>-->
  <!--    <template #addons>-->
  <!--      <Navigation/>-->
  <!--      <Pagination/>-->
  <!--    </template>-->
  <!--  </Carousel>-->
</template>

<script setup>
import {onMounted, reactive} from "vue";
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from 'vue3-carousel'
import axiosInstance from "@/utility/axiosInstance";
import {reformatDate} from "../../../util/dateCalc";
import ToyFace from "@/components/user/ToyFace.vue";
import router from "@/router";

const props = defineProps({
    category: String
  }
)
const boards = reactive([])
onMounted(() => {
  axiosInstance.springAxiosInst.get(`/board/list/review`, {params: {page: 0, size: 5}})
    .then((res) => {
      boards.push(...res.data.content)
    })
})
</script>

<style scoped>
</style>