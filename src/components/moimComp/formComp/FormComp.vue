<template>
  <v-card class="pa-4 pl-10 pr-10 " style="min-width: 601px">
    <div style="max-width: 800px" class="m-auto">
      <MoimBasicComp v-model="basicInfo"></MoimBasicComp>
      <v-divider class="border-opacity-50 border-black my-4"></v-divider>

      <ParticipantsComp v-model="participantsInfo"></ParticipantsComp>
      <v-divider class="border-opacity-50 border-black my-4"></v-divider>

      <DestinationComp v-model="destinationInfo"></DestinationComp>
      <v-divider class="border-opacity-50 border-black my-4"></v-divider>

      <StateComp v-model="stateInfo"></StateComp>
      <v-divider class="border-opacity-50 border-black my-4"></v-divider>

      <OptionComp v-model="destinationInfo.optionsInfo"></OptionComp>
      <v-divider class="border-opacity-50 border-black my-4"></v-divider>
      <div>
        <strong>가격 합계: </strong>
        {{ paymentInfo.totalPrice }}원 ->{{ Math.floor(paymentInfo.totalPrice / stateInfo.runwayPeriod) }} 원 / 월
      </div>

      <v-divider class="border-opacity-50 border-black my-4"></v-divider>

      <v-btn @click="submit">submit</v-btn>
    </div>
  </v-card>
</template>

<script setup>
import MoimBasicComp from "@/components/moimComp/formComp/MoimBasicComp.vue";
import {reactive, ref, watch} from "vue";
import ParticipantsComp from "@/components/moimComp/formComp/ParticipantsComp.vue";
import DestinationComp from "@/components/moimComp/formComp/DestinationComp.vue";
import axiosInstance from "@/utility/axiosInstance";
import OptionComp from "@/components/moimComp/formComp/OptionComp.vue";
import StateComp from "@/components/moimComp/formComp/StateComp.vue";
import {addDay, addMonth} from "@/util/dateUtil"
import router from "@/router";

const basicInfo = reactive({
  title: "",
  content: "",
})
const participantsInfo = reactive({
  maxParticipants: 10,
  minParticipants: 2
})
const destinationInfo = reactive({
  country: "",
  city: "",
  departureAirport: "",
  imageKey:"",
  optionsInfo: reactive([])
})

const stateInfo = reactive({
  startDate: new Date(),
  taxxingPeriod: 7,
  runwayPeriod: 3,
  takeoffPeriod: 7,
  runwayStartDate: addDay(new Date(), 7),
  takeoffStartDate: addMonth(addDay(new Date(), 7), 3),
  departureDate: ref(addDay(addMonth(addDay(new Date(), 7), 3), 7)),
  returnDate: ref(addDay(addMonth(addDay(new Date(), 7), 3), 9))
})

const paymentInfo = reactive({
  totalPrice: 0,
})
watch(destinationInfo.optionsInfo, ()=> {
  paymentInfo.totalPrice = destinationInfo.optionsInfo.reduce((acc, option)=>{return acc += option.price}, 0)
})

const submit = () => {
  const payload = {basicInfo, participantsInfo, destinationInfo, stateInfo, paymentInfo}
  console.log(payload)
  axiosInstance.springAxiosInst.post("/moim", payload)
    .then((res) => {
      router.push(`/moim/${res.data.moimId}/join/payment`)
    })
}
</script>

<style scoped>

</style>