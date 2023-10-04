<template>
  <div>
    <v-card-title>옵션 정보</v-card-title>
    <div class="grid grid-cols-2 gap-4">
      <v-card v-for="o in options" :key="o">
        <div class="grid grid-cols-1 pa-4">
          <div class="relative h-[200px]">
            <div class="w-min absolute top-0 left-0">
              <v-checkbox @update:modelValue="addOption(o)" class="my-auto"></v-checkbox>
            </div>
            <img :src="'https://vue-s3-test-37373.s3.ap-northeast-2.amazonaws.com/'+o.imageKey" alt=""
                 class="rounded-xl" style="object-fit: cover; width: 100%; height: 100%">
          </div>
          <div class="pa-4">
            <div>
              <div class="my-auto">
                <v-card-title>
                  {{ o.name }}
                </v-card-title>
              </div>
              <div>
                <v-card-subtitle>
                  {{ o.price }} 원
                </v-card-subtitle>
              </div>
            </div>
            <div class="my-auto">
              <v-card-text class="line-clamp-3 hover:line-clamp-none transition-all">
                {{ o.info }}
              </v-card-text>
            </div>
          </div>
        </div>

      </v-card>
    </div>
  </div>
</template>

<script setup>
import {computed, defineEmits, defineProps, inject, reactive} from "vue";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'getOptions'])
const optionsInfo = computed({
  get() {
    return props.modelValue
  },
  set(destinationInfo) {
    emit('update:modelValue', destinationInfo)
  },
})

let options = reactive([])
const emitter = inject('emitter')
emitter.on('getOption', (o) => {
  options.length = 0
  options.push(...o)
})
emitter.on('deleteOption', () => {
  options.length = 0
})

const addOption = (option) => {
  if (optionsInfo.value.some((oldO) => oldO.id === option.id)) {
    const tmpArr = optionsInfo.value.filter((oldO) => oldO.id !== option.id)
    optionsInfo.value.length = 0
    optionsInfo.value.push(...tmpArr)
  } else {
    optionsInfo.value.push(option)
  }
}

const optionImageStyle = () => {
  bac
}
</script>

<style scoped>

</style>