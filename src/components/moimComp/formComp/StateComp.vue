<template>
  <div class="grid gap-4">
      <v-card-title>계획 설정</v-card-title>
    <div class="grid-cols-2 grid gap-4">
      <v-text-field type="number" label="taxxing 기간(일)" v-model="stateInfo.taxxingPeriod"
                    :rules="[rules.taxxingRules.minRule, rules.taxxingRules.maxRule]" variant="outlined"></v-text-field>
      <v-text-field type="number" label="runway 기간(월)" v-model="stateInfo.runwayPeriod"
                    :rules="[rules.runwayRules.minRule, rules.runwayRules.maxRule]" variant="outlined"></v-text-field>
    </div>
    <div class="grid justify-center">
    <v-card-subtitle>여행 일자 선택(여행 출발일자/여행 복귀일자)</v-card-subtitle>
    </div>
    <div class="m-auto w-fit">
      <VDatePicker v-model="travelDate" range multi-calendars inline auto-apply></VDatePicker>
  </div></div>
</template>

<script setup>
import {computed, defineEmits, defineProps, ref, watch} from "vue";
import VDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {addDay} from "@/util/dateUtil";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'getOptions'])

const stateInfo = computed({
  startDate: Date,
  runwayStartDate: Date,
  takeoffStartDate: Date,
  departureDate: Date,
  returnDate: Date,
  taxxingPeriod: Number,
  runwayPeriod: Number,
  takeoffPeriod: Number,
  get() {
    return props.modelValue
  },
  set(destinationInfo) {
    emit('update:modelValue', destinationInfo)
  },
})
const travelDate = ref()
travelDate.value = [new Date(), addDay(new Date(), 3)]
watch(travelDate, (newDates)=> {
  stateInfo.value.departureDate = newDates[0]
  stateInfo.value.returnDate = newDates[1]
})

const rules = {
  taxxingRules: {
    minRule: (period) => period >= 7 || "taxxing기간은 최소 7일이어야 합니다.",
    maxRule: (period) => period <= 31 || "taxxing기간은 최대 31일까지 입니다."
  },
  runwayRules: {
    minRule: (period) => period >= 3 || "runway기간은 최소 3개월이어야 합니다.",
    maxRule: (period) => period <= 18 || "runway기간은 최대 18개월까지 입니다."
  },
  takeoffRules: {
    minRule: (period) => period >= 7 || "takeoff기간은 최소 7일이어야 합니다.",
    maxRule: (period) => period <= 31 || "takeoff기간은 최대 31일까지 입니다.",
    taxxingRelativeRule: (period) => period >= stateInfo.value.taxxingPeriod || "takeoff기간은 taxxing기간보다 길어야 합니다."
  }
}
</script>

<style scoped>

</style>