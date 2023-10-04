<template>
  <div class="">
    <v-card class="pa-4 grid gap-4 grid-cols-1">
      <div class="m-auto text-center">
        <div class="hover:blur w-fit h-fit m-auto" @click="()=>router.push('/user/modify-profile')">
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
            <v-text-field v-if="modifyNickname" hide-details="true" :placeholder="user.nickname" v-model="nickname"
                          class="text-7xl" variant="rounded" @keyup.enter="requestModifyNickname">
            </v-text-field>
            <strong @click="()=>modifyNickname=!modifyNickname" v-else class="text-7xl hover:blur"> {{
                user.nickname
              }}</strong><br/>
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
          <v-expansion-panel :title="item[1].title">
            <v-expansion-panel-text v-for="i in installmentList" :key="i">
              <div>
                <UserInstallmentListComp :installment=i></UserInstallmentListComp>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="item[2].title">
            <v-expansion-panel-text >
              <div class="grid grid-cols-5">
                <div>
                  <UserBadge :user="u" v-for="u in followUserInfoList" :key="u" class="col-span-1"></UserBadge>
                </div>
              </div>

            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :title="item[3].title">
            <v-expansion-panel-text v-for="u in blockUserInfoList" :key="u">
              {{ u }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, reactive, ref, watch} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import router from "@/router";
import ToyFace from "@/components/user/ToyFace.vue";
import UserMoimListComp from "@/components/user/userPage/UserMoimListComp.vue";
import UserInstallmentListComp from "@/components/user/userPage/UserInstallmentListComp.vue";
import UserBadge from "@/components/user/UserBadge.vue";

const store = useStore()
const user = computed(() => store.state.userModule.user)
const followList = computed(() => store.state.userModule.followUserList)
const blockList = computed(() => store.state.userModule.blockUserList)

const item = [
  {title: "가입한 MOIM 보기"},
  {title: "결제내역 확인하기"},
  {title: "팔로우한 유저 확인하기"},
  {title: "차단한 유저 확인하기"}
]

const openPanelIndex = ref(undefined)
watch(openPanelIndex, (nv, ov) => {
  myMoimList.length = 0
  installmentList.length = 0
  switch (nv) {
    case 0: {
      requestMyMoim()
      break
    }
    case 1: {
      requestReceipt()
      break
    }
    case 2: {
      getFollowsInfo()
      break
    }
    case 3: {
      getBlocksInfo()
      break
    }
  }
})

const myMoimList = reactive([])
const moimPage = 0
const moimSize = 4

const requestMyMoim = () => {
  axiosInstance.springAxiosInst.get("/moim/user", {params: {page: moimPage, size: moimSize}})
    .then(res => {
      myMoimList.push(...res.data.content)
    })
}

const installmentList = reactive([])
const requestReceipt = () => {
  axiosInstance.springAxiosInst.get("/payment/installment/list")
    .then(res => {
      installmentList.push(...res.data)
    })
}

const followUserInfoList = reactive([])
const getFollowsInfo = () => {
  followUserInfoList.length = 0
  axiosInstance.springAxiosInst.get("/user/follow/info/list")
    .then(res => {
      followUserInfoList.push(...res.data)
    })
}
const blockUserInfoList = reactive([])
const getBlocksInfo = () => {
  blockUserInfoList.length = 0
  axiosInstance.springAxiosInst.get("/user/block/info/list")
    .then(res => blockUserInfoList.push(...res.data))
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const modifyNickname = ref(false)
const nickname = ref("")
const requestModifyNickname = () => {
  modifyNickname.value = !modifyNickname.value
  if (confirm("닉네임을 " + nickname.value + "으로 변경합니다.")) {
    axiosInstance.springAxiosInst.put("/user/nickname", {nickname: nickname.value})
      .then(() => router.go(0))
  }
}

</script>

<style scoped>

</style>