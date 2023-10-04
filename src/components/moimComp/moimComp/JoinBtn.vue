<template>
<div>
  <v-btn @click="join">
    join
  </v-btn>
</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()
const moimId = route.params.moimId
const getJoinable = (async ()=> axiosInstance.springAxiosInst.get(`/moim/${moimId}/joinable`))
const join = (async ()=> getJoinable()
  .then(()=> {
    router.push(`/moim/${moimId}/join`)
  })
  .catch(()=> {
    alert("빈 자리가 없어 해당 MOIM에 참여할 수 없습니다.")
  }))

</script>

<style scoped>

</style>