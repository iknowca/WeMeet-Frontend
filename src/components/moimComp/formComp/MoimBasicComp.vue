<template>
<div class="">
    <v-card-title>기본 정보</v-card-title>
    <v-text-field v-model="basicInfo.title" label="모임 이름" placeholder="모임 이름을 입력해 주세요" variant="outlined"> </v-text-field>
    <v-textarea v-model="basicInfo.content" label="본문" placeholder="원하는 모임의 성격을 적어주세요." variant="outlined"> 내용 </v-textarea>
</div>
</template>

<script setup>
import {computed, defineEmits, defineProps} from "vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const basicInfo = computed({
  title: String,
  content: String,
  get() {
    return props.modelValue
  },
  set(basicInfo) {
    emit('update:modelValue', basicInfo)
  },

})
</script>

<style scoped>

</style>