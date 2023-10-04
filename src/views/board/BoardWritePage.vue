<template>
<BoardWriteComp @post="handlePost">
  <template v-if="['review'].includes(props.category)" v-slot:imageInput>
    <image-register-comp v-model="imageKey"></image-register-comp>
  </template>
</BoardWriteComp>
</template>

<script setup>
import BoardWriteComp from "@/components/board/BoardWriteComp.vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import ImageRegisterComp from "@/components/board/image/ImageRegisterComp.vue";
import {inject, ref} from "vue";

const props = defineProps({
  category: String

})
const emitter = inject('emitter')
const imageKey = ref()
const handlePost = (payload) => {
  payload.category = props.category
  if (['review'].includes(props.category)) {
    payload.additionalInfo = { imageKey: imageKey}
    emitter.emit('upload')
  }
  axiosInstance.springAxiosInst.post(`/board/${props.category}`, payload)
    .then((res) => {
      router.push(`/board/${res.data.board.id}`)
    })
}
</script>

<style scoped>

</style>