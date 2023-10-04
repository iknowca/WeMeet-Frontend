<template>
<PaymentTravelInfoComp :moim-id="moimId"></PaymentTravelInfoComp>
  <div style="height: 50px" class="grid grid-cols-2 divide-x-2">
    <div class="col-span-1"></div>
    <div class=""></div>
  </div>
  <PaymentAgreement></PaymentAgreement>
  <div style="height: 50px" class="grid grid-cols-2 divide-x-2">
    <div class="col-span-1"></div>
    <div class=""></div>
  </div>
<PaymentOptionComp :moim-id="moimId"></PaymentOptionComp>
  <div style="height: 50px" class="grid grid-cols-2 divide-x-2">
    <div class="col-span-1"></div>
    <div class=""></div>
  </div>
<PaymentComp v-model="paymentInfo"></PaymentComp>
</template>

<script setup>
/* global IMP */
import PaymentComp from "@/components/payment/PaymentComp.vue";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import axiosInstance from "@/utility/axiosInstance";
import PaymentOptionComp from "@/components/payment/PaymentOptionComp.vue";
import PaymentTravelInfoComp from "@/components/payment/PaymentTravelInfoComp.vue";
import PaymentAgreement from "@/components/payment/PaymentAgreement.vue";

IMP.init("imp82167178")
const route = useRoute()
const moimId = route.params.moimId
const paymentInfo = reactive({
  totalPrice: ref(),
  amountInstallment: ref(),
  numInstallments: ref()
})
onMounted(()=> {
  axiosInstance.springAxiosInst.get(`/payment/moim/${moimId}`)
    .then((res)=> {
      paymentInfo.totalPrice = res.data.totalPrice
      paymentInfo.amountInstallment = res.data.amountInstallment
      paymentInfo.numInstallments = res.data.numInstallments
    })
})

</script>

<style scoped>

</style>