<template>
<div>
  <v-card class="grid pa-4 grid-cols-1">
    <v-text-field v-model="contents"></v-text-field>
    <div class="justify-center">
    <v-btn @click="submit">댓글 달기</v-btn>
    </div>
  </v-card>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";

const route = useRoute()
const boardId = route.params.boardId

const contents = ref()

const submit = ()=> {
  const payload = {contents: contents.value}
  axiosInstance.springAxiosInst.post(`/comment/board/${boardId}`, payload)
    .then(()=> {
      router.go(0)
    })
}
</script>

<style scoped>

</style>