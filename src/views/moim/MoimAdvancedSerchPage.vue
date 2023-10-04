<template>
  <div class="w-full min-w-[601px] max-w-[1280px] grid-cols-1 gap-4 grid">
    <div>
      <DestinationSerch v-model="filter"></DestinationSerch>
    </div>
    <div>
      <PriceSearch v-model="filter"></PriceSearch>
      <!--        <v-row>-->
      <!--          <DateSearch v-model="filter"></DateSearch>-->
      <!--        </v-row>-->
    </div>
    <moim-list :moim-list="moimList"></moim-list>
  </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import DestinationSerch from "@/components/moimComp/serchComp/advancedSerch/DestinationSerch.vue";
import axiosInstance from "@/utility/axiosInstance";
import PriceSearch from "@/components/moimComp/serchComp/advancedSerch/PriceSearch.vue";
import {addDay, addMonth} from "@/util/dateUtil";
import {useRoute} from "vue-router";
import MoimList from "@/components/moimComp/MoimList.vue";

const route = useRoute()
const keyword = route.params.keyword
onMounted(() => {
  axiosInstance.springAxiosInst.get('/moim/list', {params: {size: 10, page: 0}})
    .then((res)=>{
      moimList.length = 0
      moimList.push(...res.data)
    })

})
const filter = reactive({
  country: ref(),
  city: ref(),
  departureAirport: ref(),

  rangeTotalPrice: reactive([0, 1500]),
  rangeNumOfInstallment: reactive([3, 18]),
  rangeInstallment: reactive([0, 200]),
})

const page = ref(0)
const size = ref(10)
const moimList = reactive([])

const emitter = inject("emitter")
emitter.on('requestSearch', () => {
  const payload = {...filter, page: page.value, size: size.value}
  payload.rangeTotalPrice = [filter.rangeTotalPrice[0]*10000, filter.rangeTotalPrice[1]*10000]
  payload.rangeInstallment = [filter.rangeInstallment[0]*10000, filter.rangeInstallment[1]*10000]

  payload.rangeTotalPrice = payload.rangeTotalPrice.join(",")
  payload.rangeNumOfInstallment = payload.rangeNumOfInstallment.join(",")
  payload.rangeInstallment = payload.rangeInstallment.join(",")

  axiosInstance.springAxiosInst.get("/moim/list/advanced-search", {params: payload})
    .then((res) => {
      moimList.length = 0
      moimList.push(...res.data.content)
    })
})
</script>

<style scoped>

</style>