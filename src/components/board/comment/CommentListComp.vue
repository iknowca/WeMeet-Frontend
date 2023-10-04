<template>
  <div class="pa-4">
    <v-card class="pa-4">
      <ul role="list" class="divide-y divide-gray-100">
          <li class="flex justify-between gap-x-6 py-5" v-for="comment in commentList" :key="comment.id">
            <div class="flex min-w-0 gap-x-4">
              <toy-face :group="comment.writer.groupNumber" :toy-number="comment.writer.number" :rounded="42"></toy-face>
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ comment.writer.nickName }}</p>
              </div>
            </div>
            <div class="flex align-center">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ comment.contents }}</p>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-sm leading-6 text-gray-900 border-1 border-black rounded-xl" @click="deleteComment">삭제하기</p>
              <p class="mt-1 text-xs leading-5 text-gray-500"> <time datetime="2023-01-23T13:23Z">{{reformatDate(comment.createdTime)}}</time></p>
            </div>
          </li>
      </ul>
    </v-card>
    <CommentWriteComp></CommentWriteComp>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import {useRoute} from "vue-router";
import CommentWriteComp from "@/components/board/comment/CommentWriteComp.vue";
import {useStore} from "vuex";
import ToyFace from "@/components/user/ToyFace.vue";
import {reformatDate} from "../../../util/dateCalc";

const route = useRoute()
const boardId = route.params.boardId
const store = useStore()
const userId = computed(()=> {
  return store.state.userModule.user.id
})

const commentList = reactive([])

onMounted(()=> {
  getCommentList()
})

const getCommentList = ()=> {
  return axiosInstance.springAxiosInst.get(`/comment/list/board/${boardId}`)
    .then(res=>{
      commentList.push(...res.data)
    })
}

const deleteComment = (commentId)=> {
  console.log(commentId)
  axiosInstance.springAxiosInst.delete(`/comment/${commentId}`)
    .then(()=>{
      commentList.length = 0
      return getCommentList()
    })
}
</script>

<style scoped>

</style>