<template>
  <div>
    <v-card class="pa-4 m-auto">
      <v-card-title class="text-center">프로필 사진 수정하기</v-card-title>
      <div class="grid grid-cols-6">
        <div v-for="i in 18" :key="i">
          <toy-face
              size="150"
              rounded="42"
              :group="currentGroup"
              :toy-number="i"
              @click="()=>{number=i
              group=currentGroup
              }"
          ></toy-face>
        </div>
      </div>
      <div class="grid place-content-center grid grid-cols-2">
        <div class="grid place-content-end">
          <v-icon size="50" v-if="(currentGroup===1)">mdi-numeric-1-circle</v-icon>
          <v-icon size="50" v-else @click="()=>currentGroup=1">mdi-numeric-1-circle-outline</v-icon>
        </div>
        <div>
          <v-icon size="50" v-if="(currentGroup===2)">mdi-numeric-2-circle</v-icon>
          <v-icon size="50" v-else @click="()=>currentGroup=2">mdi-numeric-2-circle-outline</v-icon>
        </div>
      </div>
      <div class="m-auto grid place-content-center">
        <toy-face
            size="200"
            rounded="42"
            :group="group"
            :toy-number="number"
            class="m-auto"
        ></toy-face>
      </div>
      <div class="grid place-content-center">
        <v-btn class="m-auto" @click="postProfile" >선택</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import ToyFace from "@/components/user/ToyFace.vue";
import {defineComponent, ref} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import {useStore} from "vuex";

defineComponent({
  components: {ToyFace}
})

const store = useStore()

const currentNumber = ref(1)
const currentGroup = ref(1)

const number = ref(1)
const group = ref(1)

const postProfile = ()=> {
  console.log(number.value)
  console.log(group.value)
  axiosInstance.springAxiosInst.post("/user/profile", {}, {params: {group: group.value, number: number.value}})
    .then((res)=> {
      store.commit("userModule/SET_USER", res.data.user)
      router.go(-1)
    })
}

</script>

<style scoped>

</style>