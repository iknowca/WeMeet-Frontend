<template>
  <v-card class="m-auto ">
    <v-table
    >
      <thead>
      <tr>
        <td class="text-center min-w-40">글 번호</td>
        <td class="text-center min-w-fit">제목</td>
        <td class="text-center min-w-fit">작성자</td>
        <td class="text-center min-w-fit">작성시간</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="b in props.boardList" :key="b.id" @click="()=>router.push(`/board/${b.id}`)">
        <td class="text-center">{{b.id}}</td>
        <td class="w-8/12 text-center min-w-fit">{{ b.title }}</td>
        <td class="text-center min-w-fit">{{ b.writer.nickName }}</td>
        <td class="text-center min-w-fit">{{ calcDiffTime(b.createdDate) }}</td>
      </tr>
      </tbody>
    </v-table>

  </v-card>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import router from "@/router";
import {calcDiffTime} from "@/util/dateCalc";

const props = defineProps({
  boardList: Array
});

const boardList = reactive([])
onMounted(()=> boardList.push(...props.boardList))

</script>

<style scoped>

</style>