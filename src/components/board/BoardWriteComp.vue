<template>
  <v-card class="p-4">
    <v-text-field label="제목" v-model="board.title" placeholder="제목을 입력하세요." variant="outlined"></v-text-field>
    <v-textarea label="본문" v-model="board.contents.content" placeholder="본문을 작성하세요." variant="outlined"></v-textarea>
    <slot name="imageInput"></slot>
    <slot name="eventCategory"></slot>
    <v-btn @click="post">submit</v-btn>
  </v-card>
</template>

<script setup>
import {reactive, ref} from "vue";

const board = reactive({
  title: ref(),
  contents: reactive({
    content: ref()
  }),
  isPublic: ref(true)
})

const emit = defineEmits(["post"])
const post = () => {
  emit("post", board)
}
</script>

<style scoped>

</style>