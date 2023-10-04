<template>
  <div class="border-4 rounded-xl pa-4">
    <div><strong>01. 상품정보</strong></div>
    <div class="grid grid-cols-5 gap-4">
      <div class=" col-span-1 rounded-xl">
        <div class="pa-1 text-white rounded-t-lg text-center" style="background-color: #3f69fb"><p>상품명</p></div>
        <div class="pa-1 text-white rounded-b-lg text-center" style="background-color: #3f69fb"><p>여행 기간</p></div>
      </div>
      <div class="col-span-4">
        <div class="pa-1">get-moim {{moim.value?.destinationInfo.country}}/{{moim.value?.destinationInfo.city}}</div>
        <div class="pa-1">{{reformatDate(moim.value?.stateInfo.departureDate)}} ~ {{reformatDate(moim.value?.stateInfo.returnDate)}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import {reformatDate} from "../../util/dateCalc";

const props = defineProps({
  moimId: Number,
})

const moim = reactive({})
onMounted(() => {
  axiosInstance.springAxiosInst.get(`/moim/${props.moimId}`)
    .then(res => moim.value=( res.data))
})
</script>

<style scoped>

</style>