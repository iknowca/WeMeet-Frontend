<template>
<BoardWriteComp @submit="submit">
  <template v-slot:imageInput>
  <ImageRegisterComp v-model="imageKey"></ImageRegisterComp>
  </template>
</BoardWriteComp>
  {{ imageKey }}
</template>

<script setup>
import BoardWriteComp from "@/components/board/BoardWriteComp.vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import ImageRegisterComp from "@/components/board/image/ImageRegisterComp.vue";
import {inject, ref} from "vue";
import {uuidv4} from "@/util/uuid";

const category = "event"
const imageKey = ref(uuidv4())
const emitter = inject('emitter')
const submit= (payload)=> {
  payload.category = category
  payload.additionalInfo = {imagePath: imageKey}
  axiosInstance.springAxiosInst.post(`/board/event`, payload)
    .then((res)=>{
      emitter.emit('submitBoard')
      router.go(-1)
    })
}
</script>

<style scoped>

</style>