<template>
  <div class="">
    <v-card class="pa-4 grid gap-4 grid-cols-1">
      <div class="m-auto text-center">
        <div class="w-fit h-fit m-auto">
          <v-avatar size="14rem" class="m-auto" v-if="user && user.profile==null">
            <v-img :src="require('@/assets/defaultUserImage.png')"></v-img>
          </v-avatar>
          <toy-face v-else
                    :size="convertRemToPixels(14)"
                    rounded="42"
                    :group="user.profile?.groupNumber"
                    :toy-number="user.profile?.number"
          ></toy-face>
        </div>
        <div class="m-auto text-center">
          <div>
            <strong v class="text-7xl "> {{ user.nickname }}</strong><br/>
          </div>
          <strong class="text-xl"> {{ user.email }}</strong>
          <strong class="text-xl">{{ user.phoneNumber }}</strong>
        </div>
      </div>

      <div class="col-span-2 space-y-4">
        <v-expansion-panels v-model="openPanelIndex">
          <v-expansion-panel
              :title="item[0].title">
            <v-expansion-panel-text v-for="m in myMoimList" :key="m">
              <div @click="()=>router.push(`/moim/${m.id}`)">
                <UserMoimListComp :moim="m"></UserMoimListComp>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref, watch} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import ToyFace from "@/components/user/ToyFace.vue";
import {useRoute} from "vue-router";
import UserMoimListComp from "@/components/user/userPage/UserMoimListComp.vue";
import UserBadge from "@/components/user/UserBadge.vue";

const store = useStore()
const user = reactive({})
const followList = computed(()=>store.state.userModule.followUserList)
const userId = useRoute().params.userId

const item = [
  {title: "가입한 MOIM 보기"},
  {title: "팔로우 한 유저 확인하기"}
]
onMounted(()=>{
  axiosInstance.springAxiosInst.get(`/user/${userId}`)
    .then(res=>Object.assign(user, res.data))
})

const openPanelIndex = ref(undefined)
watch(openPanelIndex, (nv, ov) => {
  myMoimList.length = 0
  switch (nv) {
    case 0: {
      requestMyMoim()
      break
    }

    case 2: {
      getUsersInfo()
      break
    }
  }
})

const myMoimList = reactive([])
const moimPage = 0
const moimSize = 4

const requestMyMoim = () => {
  axiosInstance.springAxiosInst.get(`/moim/list/user/${user.id}`, {params: {page: moimPage, size: moimSize}})
    .then(res => {
      myMoimList.push(...res.data.content)
    })
}


const followUserInfoList = reactive([])
const getUsersInfo = ()=> {
  axiosInstance.springAxiosInst.get("/user/follow/info/list")
    .then(res=>{
      followUserInfoList.push(res.data)
    })
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const modifyNickname = ref(false)
const nickname = ref("")

</script>

<style scoped>

</style>