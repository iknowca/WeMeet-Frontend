<template>
  <Chat :chat="chatList" :onSend="requestLLM" :offline="false" :inputPlaceholder="isSending?'잠시':'메시지'"/>
</template>

<script setup>
import {Chat} from "@chat-ui/vue3"
import axiosInstance from "@/utility/axiosInstance";
import {reactive, ref, watch} from "vue";

let isSending = false
const chatList = reactive([])
chatList.push({type: 'chatbot', message: "get-moim의 상담사 M입니다. 어떤 모임을 원하세요?"})

function requestLLM(message) {
  isSending = true
  chatList.push({type: 'person', message: message})
  axiosInstance.flaskAxiosInst.post("/recommendation/gpt", {message: message}, {
    withCredentials: false,
    headers: {"Content-Type": `application/json; charset=utf-8'`}
  })
    .then(res => {
      chatList.push({type: 'chatbot', message: res.data})
      console.log(res)
      isSending = false
    })
    .catch(() => alert(JSON.stringify({message: message})))
}

const placeholder = ref('')
const placeholderWatch = watch(isSending, () => {
  if (isSending) {
  return placeholder.value="답장을 기다리는 중입니다. 잠시만 기다려주세요."
  } else {
    return placeholder.value="메시지를 입력해주세요."
  }
})
</script>

<style scoped>

</style>