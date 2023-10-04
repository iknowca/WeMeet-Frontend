<template>
  <div>
    <div class="flex min-w-0 gap-x-4">
      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="require('@/assets/comp/pay/'+installment.additionalInfo.pg+'.png')" alt="">
      <div class="min-w-0 flex-auto" @click="()=>router.push(`/moim/${installment.additionalInfo.moimId}`)">
        <p class="text-sm font-semibold leading-6 text-gray-900">{{ installment.additionalInfo.moimTitle}}도쿄가요</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">결제일자: {{reformatDate(installment.createdDate)}}</p>
      </div>
      <div>
        <p>결제금액:{{installment.additionalInfo.totalPrice}}</p>
        <v-btn v-if="!!installment.receipt_url" @click="showReceipt">카드 영수증 보기</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {reformatDate} from "../../../util/dateCalc";
import router from "@/router";

const props = defineProps({
  installment: Object
})
const showReceipt = ()=> {
 window.open(props.installment.receipt_url)
}

</script>

<style scoped>

</style>