<template>
  <div class="grid pa-4 gap-4">
  <div class="grid ">
    <v-card>
      <!--    <v-card-title>{{// board.value.title}}</v-card-title>-->
      <v-card-title class="text-center">{{ board.value?.title }}</v-card-title>
      <div>
        <v-card-subtitle class="text-right">{{ board.value?.writer.nickName }}</v-card-subtitle>
      </div>
      <div class="pa-4">
      <v-card-text class="">{{ board.value?.contents.content }}</v-card-text>
      </div>
    </v-card>
  </div>
  <div v-if="user.id===board.value?.writer.id">
    <v-btn @click="router.push(`/board/modify/${board.value.id}`)"> modify</v-btn>
    <v-btn @click="deleteBoard">delete</v-btn>
  </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import axiosInstance from "@/utility/axiosInstance";
import {computed, onMounted, reactive} from "vue";
import router from "@/router";
import {useStore} from "vuex";
import ToyFace from "@/components/user/ToyFace.vue";

const route = useRoute()
const boardId = route.params.boardId

const props = defineProps({
  category: String,
});

const store = useStore()
const user = computed(() => store.state.userModule.user)

const board = reactive({})
onMounted(() => {
  console.log(props.category)
  axiosInstance.springAxiosInst.get(`/board/${boardId}`)
    .then((res) => {
      board.value = res.data
    })
})

const deleteBoard =()=> {
  if (confirm("정말 삭제하시겠습니까?")) {
    axiosInstance.springAxiosInst.delete(`/board/${boardId}`)
      .then(()=>{
        router.go(-3)
      })
  } else {
    return ;
  }
}
</script>

<style scoped>

</style>