<template>
  <v-card class="mx-auto" max-width="344">
    <img style="width: 100%; height: 300px;" :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+moim.destinationInfo.imageKey" alt="">
<!--    <img min-width="500px"-->
<!--         :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+moim.destinationInfo.imageKey"-->
<!--         style="aspect-ratio: auto">-->

<!--    </img>-->
    <v-row>
      <v-col>
        <v-card-title>
          {{ moim.destinationInfo.country }} - {{ moim.destinationInfo.city }}
        </v-card-title>
      </v-col>

      <v-col align-self="center" class="float-right">
        <v-card-subtitle>
          현재 참여 인원 {{ moim.participantsInfo.currentParticipantsNumber }}/{{
            moim.participantsInfo.maxParticipants
          }}
        </v-card-subtitle>
      </v-col>
    </v-row>

    <div class="pa-4">
      <div>
        <v-card-text class="pa-0">{{ moim.basicInfo.title }}</v-card-text>
      </div>
      <div class="line-clamp-2">{{ moim.basicInfo.content }}</div>
      <div>
        <v-card-text class="pa-0 text-right text-gray-500">
          {{ moim.paymentInfo.amountInstallment }}원 / 월 ({{ moim.paymentInfo.numInstallments }}개월)
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import {k2eCity} from "@/util/cityUtil";

export default {
  name: "MoimCard",
  methods: {k2eCity},
  props: {
    moim: Object
  },
}
</script>

<style scoped>
/* 여기에 원하는 스타일을 추가하세요 */
</style>
