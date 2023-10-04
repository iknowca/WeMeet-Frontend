<template>
  <div class="border-4 rounded-xl pa-4">
    <div><strong>03. 옵션 정보</strong></div>
    <v-card v-for="o in optionList" :key="o">
      <div class="grid grid-cols-2 pa-4">
        <div class="relative h-[200px]">
          <img :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+o.imageKey" alt=""
               class="rounded-xl" style="object-fit: cover; width: 100%; height: 100%">
        </div>
        <div class="pa-4">
          <div>
            <div class="my-auto">
              <v-card-title>
                {{ o.name }}
              </v-card-title>
            </div>
            <div>
              <v-card-subtitle>
                {{ o.price }} 원
              </v-card-subtitle>
            </div>
          </div>
          <div class="my-auto">
            <v-card-text class="line-clamp-3 hover:line-clamp-none">
              {{ o.info }}
            </v-card-text>
          </div>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axiosInstance from "@/utility/axiosInstance";

const props = defineProps({
  moimId: Number,
})
const optionList = reactive([])
onMounted(() => {
  optionList.length = 0
  axiosInstance.springAxiosInst.get(`/moim/${props.moimId}/destination/option/list`)
    .then(res => {
      optionList.push(...res.data)
    })
})
</script>

<style scoped>

</style>