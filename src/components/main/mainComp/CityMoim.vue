<template>

  <div>
    <MoimList :title="title" :moimList="moimList">
      <template v-slot:city>
        <div>
          <v-chip-group mandatory v-model="city">
            <v-chip v-for="c in cityList" :key="c.city" :variant="c.variant" :color="c.color"
            @click="selectCity(c)">{{ c.city }}</v-chip>
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

const cityList = reactive([
  {city: "도쿄", variant: "outlined", color: "default"},
  {city: "베이징", variant: "outlined", color: "default"},
  {city: "방콕", variant: "outlined", color: "default"},
  {city: "하와이", variant: "outlined", color: "default"},
  {city: "홍콩", variant: "outlined", color: "default"},
  {city: "타이베이", variant: "outlined", color: "default"},
  {city: "파리", variant: "outlined", color: "default"}])
const title = "도시 MOIM?"
const moimList = reactive([])
const city = reactive({})
const page = ref(0)
const requestRecentMoim = async () => {
  moimList.length=0
  return await axiosInstance.springAxiosInst.get(`/moim/list/city/${city.city}`, {params: {page: 0, size: 4}})
    .then((res) => {
      moimList.push(...res.data.content)
      return res.data
    })
}
const requestMoreMoim = () => {
  page.value = page.value+1
  axiosInstance.springAxiosInst.get(`/moim/list/city/${city.city}`, {params: {page: page.value, size:4}})
    .then((res)=> {
      moimList.push(...res.data.content)
    })
}
const selectCity = (c)=> {
  Object.assign(city, c)
  return requestRecentMoim()
}
onMounted(()=> {
  Object.assign(city, cityList[0])
  requestRecentMoim()
})
</script>

<style scoped>

</style>