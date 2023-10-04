<template>
<BoardWriteComp @post="post">
  <template v-slot:imageInput>
  <ImageRegisterComp v-model="imageKey"></ImageRegisterComp>
  </template>
  <template v-slot:eventCategory>
    <div>
      <v-select :items="eventCategoryList" v-model="eventCategory"></v-select>
    </div>
  </template>
</BoardWriteComp>
  {{ imageKey }}
</template>

<script setup>
import BoardWriteComp from "@/components/board/BoardWriteComp.vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import ImageRegisterComp from "@/components/board/image/ImageRegisterComp.vue";
import {inject, onMounted, reactive, ref} from "vue";
import {uuidv4} from "@/util/uuid";

const category = "event"
const imageKey = ref()
const emitter = inject('emitter')
const eventCategory = ref()
const eventCategoryList = reactive([])
const post= (payload)=> {
  payload.category = category
  payload.additionalInfo = {imageKey: imageKey}
  payload.additionalInfo.eventCategory = eventCategory
  axiosInstance.springAxiosInst.post(`/board/event`, payload)
    .then((res)=>{
      emitter.emit('upload')
      router.go(-1)
    })
}

onMounted(()=> {
  axiosInstance.springAxiosInst.get(`/board/event/category/list`)
    .then(res=>eventCategoryList.push(...res.data))
})
</script>

<style scoped>

</style>