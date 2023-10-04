<template>

  <div>
    <MoimList :title="title" :moimList="moimList">
      <template v-slot:city>
        <div>
          <v-chip-group mandatory v-model="city">
            <v-chip v-for="c in cityList" :key="c.city" :variant="c.variant" :color="c.color"
                    @click="selectCity(c)">{{ c.city }}
            </v-chip>
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
  {city: "0 ~ 5만원", variant: "outlined", color: "default", min: 0, max: 5},
  {city: "5 ~ 10만원", variant: "outlined", color: "default", min: 5, max: 10},
  {city: "10 ~ 20만원", variant: "outlined", color: "default", min: 10, max: 20},
  {city: "20 ~ 50만원", variant: "outlined", color: "default", min: 20, max: 50},
  {city: "50 ~ 100만원", variant: "outlined", color: "default", min: 50, max: 100},
])
const title = "가격 모임?"
const moimList = reactive([])
const minInstallment = ref()
const maxInstallment = ref()
const page = ref(0)
const requestRecentMoim = async () => {
  moimList.length = 0
  return await axiosInstance.springAxiosInst.get(`/moim/list/installment`, {
    params: {
      page: 0,
      size: 4,
      min: minInstallment.value*10000,
      max: maxInstallment.value*10000
    }
  })
    .then((res) => {
      moimList.push(...res.data.content)
      return res.data
    })
}
const requestMoreMoim = ()=> {
  page.value = page.value + 1
  axiosInstance.springAxiosInst.get(`/moim/list/installment`, {
    params: {
      page: page.value,
      size: 4,
      min: minInstallment.value*10000,
      max: maxInstallment.value*10000
    }
  })
    .then((res) => {
      moimList.push(...res.data.content)
    })
}
const selectCity = (c) => {
  minInstallment.value = c.min
  maxInstallment.value = c.max
  return requestRecentMoim()
}
onMounted(() => {
  minInstallment.value = 0
  maxInstallment.value = 5

  requestRecentMoim()
})
</script>

<style scoped>

</style>