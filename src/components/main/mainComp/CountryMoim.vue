<template>

  <div>
    <MoimList :title="title" :moimList="moimList">
      <template v-slot:city>
        <div>
          <v-chip-group mandatory v-model="country" selected-class="text-primary">
            <v-chip v-for="c in CountryList" :key="c.country" :variant="c.variant" :color="c.color"
                    @click="selectCountry(c)">{{ c.country }}</v-chip>
          </v-chip-group>
        </div>
      </template>
    </MoimList>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import MoimList from "@/components/moimComp/MoimList.vue";

const countryList = reactive([
  {country: "일본", variant: "outlined", color: "default"},
  {country: "대만", variant: "outlined", color: "default"},
  {country: "중국", variant: "outlined", color: "default"},
  {country: "필리핀", variant: "outlined", color: "default"},
  {country: "미국", variant: "outlined", color: "default"},
  {country: "영국", variant: "outlined", color: "default"},
  {country: "오스트리아", variant: "outlined", color: "default"}])
const title = "COUNTRY MOIM"
const moimList = reactive([])
const country = reactive(countryList[0])
const requestRecentMoim = async () => {
  moimList.length=0
  return await axiosInstance.springAxiosInst.get(`/moim/list/country/${country.country}`, {params: {page: 0, size: 4}})
    .then((res) => {
      moimList.push(...res.data.content)
      return res.data
    })
}
const selectCountry = (c)=> {
  Object.assign(country, c)
  return requestRecentMoim()
}
onMounted(()=> {
  requestRecentMoim()
})
</script>

<style scoped>

</style>