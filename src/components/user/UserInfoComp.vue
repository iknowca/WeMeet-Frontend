<template>
  <div>
  {{user}}
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import axiosInstance from "@/utility/axiosInstance";

const route = useRoute()
const userId = route.params.userId
const user = reactive({})
onMounted(()=> {
  axiosInstance.springAxiosInst.get(`/user/${userId}`)
    .then((res)=>Object.assign(user, res.data))
})
</script>

<style scoped>

</style>