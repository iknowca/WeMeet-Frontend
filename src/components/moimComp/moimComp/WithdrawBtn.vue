<template>
  <div class="m-auto">
    <v-btn @click="withdraw" class="m-auto">
      모임 탈퇴하기
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

const store = useStore()
const getJoinable = (async () => axiosInstance.springAxiosInst.delete(`/moim/${moimId}/user`))
const withdraw = (async () => getJoinable()
    .then(() => {
      router.push(`/`)
    })
)
</script>

<style scoped>

</style>