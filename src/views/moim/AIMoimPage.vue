<template>
  <div>

    <MoimList :moim-list="moimList" title="AImoim 추천">
      <template v-slot:category>
        <div class="grid grid-cols-3 gap-4 pa-4 justify-center">
          <div>
            <v-text-field v-model="income" type="number" variant="outlined" label="월 평균 수입"
                          placeholder="월 평균 수입을 만원 단위로 입력해주세요."></v-text-field>
          </div>
          <div>
            <v-text-field v-model="outcome" type="number" variant="outlined" label="월 평균 소비"
                          placeholder="월 평균 소비금액을 만원 단위로 입력해주세요."></v-text-field>
          </div>
          <div class="w-fit">
            <v-btn variant="outlined" size="x-large" @click="getAiRecommendedMoim">AI에게 추천 받기</v-btn>
          </div>
        </div>
      </template>

    </MoimList>
  </div>
</template>

<script setup>

import MoimList from "@/components/moimComp/MoimList.vue";
import {reactive, ref} from "vue";
import axiosInstance from "@/utility/axiosInstance";

const moimList = reactive([])
const outcome = ref()
const income = ref()

const getAiRecommendedMoim = () => {
  moimList.length = 0
  axiosInstance.flaskAxiosInst.get('/recommendation/ml', {params: {outcome:outcome.value, income:income.value}})
    .then((res) => {
      moimList.length = 0
      moimList.push(...res.data)
    })
}
</script>

<style scoped>

</style>