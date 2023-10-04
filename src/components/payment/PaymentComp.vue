<template>
  <div class="border-4 rounded-xl pa-4 grid gap-4">
    <div><strong>04. 결제 정보</strong></div>
    <div class="text-center">
      <span class="text-gray-500">총 결제 금액:</span>{{paymentInfo.totalPrice}}원 -> <span class="text-h3 font-weight-bold">{{paymentInfo.amountInstallment}}원/월</span> <span class="text-gray-700">({{paymentInfo.numInstallments}} 개월)</span>
    </div>
      <div class="justify-center grid grid-cols-3">
        <v-btn @click="requestPay('danal_tpay')" variant="plain" > <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="require('@/assets/comp/pay/danal_tpay.png')" alt="">카드 결제하기</v-btn>
        <v-btn @click="requestPay('tosspay')" variant="plain"><img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="require('@/assets/comp/pay/tosspay.png')" alt=""> 토스페이로 결제하기</v-btn>
        <v-btn @click="requestPay('kakaopay')" variant="plain"><img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="require('@/assets/comp/pay/kakaopay.png')" alt="">카카오페이로 결제하기</v-btn>
      </div>
  </div>

</template>

<script setup>
/* global IMP */
import axiosInstance from "@/utility/axiosInstance";
import {useRoute} from "vue-router";
import {computed, defineEmits, defineProps, reactive} from "vue";
import router from "@/router";

const route = useRoute()
const moimId = route.params.moimId

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'getOptions'])
const paymentInfo = computed({
  totalPrice: Number,
  amountInstallment: Number,
  numInstallments: Number,

  get() {
    return props.modelValue
  },
  set(paymentInfo) {
    emit('update:modelValue', paymentInfo)
  },
})

const optionList = reactive([])
const getOptionList = () => {
  axiosInstance.springAxiosInst.get(`/moim/${moimId}/destination/option/list`)
    .then(res => {
      optionList.length = 0
      optionList.push(...res.data)
    })
}
const requestPay = (pg) => {
  const customer_uid = self.crypto.randomUUID()
  const merchant_uid = self.crypto.randomUUID()
  const pgProvider = pg
  const payMethod = "card"
  const name = "get-moim"

  const springPayload = {
    customer_uid,
    pgProvider,
    payMethod,
    merchant_uid
  }

      IMP.request_pay({
        customer_uid: customer_uid,
        pg: pgProvider,
        pay_method: payMethod,
        merchant_uid: merchant_uid,
        name: name,
        // amount: paymentInfo.value.totalPrice,
        amount: paymentInfo.value.amountInstallment
      }, (rsp) => {
        if (rsp.success) {
          axiosInstance.springAxiosInst.post(`/payment/moim/${moimId}`, springPayload)
            .then(() => router.push(`/moim/${moimId}`))
          alert("결제가 정상적으로 요청 되었습니다.")
        } else {
          alert(rsp.error_msg)
        }
      })


}
</script>

<style scoped>

</style>