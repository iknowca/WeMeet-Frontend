<template>
  <div class="">
    <div class="grid-cols-2 grid pa-4 gap-4 h-[500px]">
      <div class="h-3/4">
        <img class="rounded-2xl" style="height: 100%; width: 100%; object-fit: cover"
             :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+moim.destinationInfo.imageKey" alt="">
      </div>
      <div>
        <div class="grid grid-cols-2">
          <div class="px-4">
            <v-chip variant="outlined">{{ moim.destinationInfo.departureAirport }}</v-chip>
            <v-icon>mdi-airplane</v-icon>
            <v-chip variant="outlined">{{ moim.destinationInfo.city }}</v-chip>
          </div>
          <div>

          </div>
        </div>
        <div class="flex align-center">
          <v-card-title>moim.basicInfo.title
            <v-chip>{{ moim.stateInfo.state }}</v-chip>
          </v-card-title>
        </div>
        <div>
          <v-card-subtitle>참여 인원: {{ moim.participantsInfo.currentParticipantsNumber }}</v-card-subtitle>
        </div>
        <div>
          <v-card-subtitle>출발 일자: {{ reformatDate(moim.stateInfo.departureDate) }}</v-card-subtitle>
        </div>
        <div>
          <div class="w-fit flex align-center">
            <v-card-subtitle class="w-fit" style="display: inline-block;">포함 옵션:</v-card-subtitle>
            <v-chip v-for="o in moim.destinationInfo.optionsInfo" class="mt-0" size="x-small" :key="o" variant="outlined" style="display: inline-block; margin-left: 8px;">{{o.category}}</v-chip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reformatDate} from "../../../util/dateCalc";

const props = defineProps({
  moim: Object
})
</script>

<style scoped>

</style>