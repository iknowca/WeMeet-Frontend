<template>
  <div class="grid grid-cols-1 gap-4">
    <div>
      <v-btn @click="()=> router.push(`/board/${category}/write`)">글 쓰기</v-btn>
    </div>
    <BoardListComp :board-list="boardList" class="w-full"></BoardListComp>
  </div>
</template>

<script setup>
import BoardListComp from "@/components/board/BoardListComp.vue";
import {computed, onMounted, onUpdated, reactive} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import {useRoute} from "vue-router";
import router from "@/router";
import {useStore} from "vuex";

const route = useRoute()
const category = computed(()=>route.params.category)

const boardList = reactive([])

const getBoardList = ()=> {
  axiosInstance.springAxiosInst.get(`/board/list/${category.value}`, {params: {page: 0, size: 20}})
    .then((res)=> {
      boardList.length=0
      boardList.push(...res.data.content)
    })
}
onMounted(() => {
  getBoardList()
})
onUpdated(()=>{
  getBoardList()
})

const store = useStore()
const userRole = computed(()=> {
  return store.state.userModule.user.roleType
})
const checkAdmin = computed(()=> {
  console.log(category.value)
  console.log(userRole.value)
  if(category.value === "faq") {
    if(userRole.value ==="ADMIN") {
      return true
    }
  }
  return false
})
</script>

<style scoped>

</style>