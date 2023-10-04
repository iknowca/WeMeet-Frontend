<template>
<div>
  <v-card-title>참여자 설정</v-card-title>
  <div class="grid grid-cols-2 gap-4">

  <v-text-field type="number" v-model="participantsInfo.maxParticipants" label="최대 참여 가능 인원" variant="outlined"></v-text-field>
  <v-text-field type="number" v-model="participantsInfo.minParticipants" label="최소 참여 필요 인원" variant="outlined"></v-text-field>
  </div>
</div>

</template>

<script setup>
import {computed, defineEmits, defineProps} from "vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const participantsInfo = computed({
  get() {
    return props.modelValue
  },
  set(participantsInfo) {
    emit('update:modelValue', participantsInfo)
  },

})
</script>

<style scoped>

</style>