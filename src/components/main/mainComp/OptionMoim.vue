<template>

  <div>
    <MoimList :title="title" :moimList="moimList">
      <template v-slot:city>
        <div>
          <v-chip-group mandatory v-model="option">
            <v-chip v-for="c in optionList" :key="c.title" :variant="c.variant" :color="c.color"
                    @click="selectCity(c)">{{ c.title }}</v-chip>
          </v-chip-group>
        </div>
      </template>
      <template v-slot:moreMoim>
        <v-col sm="6" md="4">
          <v-card class="pa-4 text-center" @click="requestMoreMoim">
            <v-icon>
              mdi-plus-box-outline
            </v-icon>
            더보기
          </v-card>
        </v-col>
      </template>
    </MoimList>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import MoimList from "@/components/moimComp/MoimList.vue";

const optionList = reactive([
  {title: "항공", variant: "outlined", color: "default", v: "flight"},
  {title: "숙박", variant: "outlined", color: "default", v: "accommodation"},
  {title: "전시", variant: "outlined", color: "default", v: "exhibition"},
  {title: "축제", variant: "outlined", color: "default", v: "festival"},
  {title: "휴양", variant: "outlined", color: "default", v: "nature"},
  {title: "식사", variant: "outlined", color: "default", v: "meal"},
{title: "여행보험", variant: "outlined", color: "default", v: "insure"},
{title: "가이드", variant: "outlined", color: "default", v: "guide"},
{title: "기타", variant: "outlined", color: "default", v: "attraction"},
  ])
const title = "옵션 모임?"
const moimList = reactive([])
const option = reactive({})
const page = ref(0)
const requestRecentMoim = async () => {
  moimList.length=0
  return await axiosInstance.springAxiosInst.get(`/moim/list/option`, {params: {page: 0, size: 4, option: option.v}})
    .then((res) => {
      moimList.push(...res.data.content)
      return res.data
    })
}
const requestMoreMoim = () => {
  page.value = page.value+1
  axiosInstance.springAxiosInst.get(`/moim/list/option`, {params: {page: page.value, size: 4, option: option.v}})
    .then(res=> {
      moimList.push(...res.data.content)
    })
}
const selectCity = (c)=> {
  Object.assign(option, c)
  return requestRecentMoim()
}
onMounted(()=> {
  Object.assign(option, optionList[0])
  requestRecentMoim()
})
</script>

<style scoped>

</style>