<template>
    <div v-if="moim">
      {{moim}}
      <suspense>
        <template v-if="moim.moimParticipantsInfo">
          <UserBadge v-bind:id="user.id" v-bind:nick-name="user.nickname"></UserBadge>
        </template>
      </suspense>
      <!--  <JoinBtn v-if="!(user.id in moim.participants.map((participant)=>participant.id))"></JoinBtn>-->
      <JoinBtn></JoinBtn>
      <WithdrawBtn></WithdrawBtn>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, reactive} from "vue";
import JoinBtn from "@/components/moimComp/moimComp/JoinBtn.vue";
import WithdrawBtn from "@/components/moimComp/moimComp/WithdrawBtn.vue";
import {useRoute} from "vue-router";
import axiosInstance from "@/utility/axiosInstance";
import UserBadge from "@/components/user/UserBadge.vue";
import router from "@/router";

const store = useStore()
const user = computed(() => store.state.userModule.user)

const route = useRoute()
const moimId = route.params.moimId
const moim = reactive({})
onMounted(() => {
  requestMoimInfo()
})

const requestMoimInfo = () => {
  axiosInstance.springAxiosInst.get(`/moim/${moimId}`)
    .then(res => {
      Object.assign(moim, res.data)
    })
}

const items = (userId) => computed(() => [
  {title: "정보보기", action: "showInfo", show: true},
  {title: "팔로우 취소", action: "cancelFollow", show: isUserFollowed(userId)},
  {title: "회원 팔로우", action: "follow", show: !isUserFollowed(userId)},
  {title: "차단 해제", action: "cancelBlock", show: isUserBlocked(userId)},
  {title: "회원 차단", action: "block", show: !isUserBlocked(userId)},
])

const isUserBlocked = (userId) => {
  const blockedUsers = user.value.blockedUsers;
  return blockedUsers && blockedUsers.includes(userId);
}
const isUserFollowed = (userId) => {
  const followUsers = user.value.followUsers;
  return followUsers && followUsers.includes(userId);
}

const userActionClick = (userId, action) => {
  if (action === "showInfo") {
    router.push(`/user/${userId}/info`)
  } else if (action === "follow") {
    axiosInstance.springAxiosInst.post(`/user/${userId}/follow`)
  } else if (action === "block") {
    axiosInstance.springAxiosInst.post(`/user/${userId}/block`)
  } else if (action === "cancelFollow") {
    axiosInstance.springAxiosInst.delete(`/user/${userId}/follow`)
  } else if (action === "cancelBlock") {
    axiosInstance.springAxiosInst.delete(`/user/${userId}/block`)
  }
  store.dispatch("userModule/requestUserInfoToSpring")
}
</script>

<style scoped>

</style>