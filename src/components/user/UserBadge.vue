<template>
  <v-card
      id="menu-activator"
      style="width: 100px;"
      class="pa-4"
  >
    <v-row class="justify-center">
      <v-avatar size="x-large">
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-row>
    <v-row class="justify-center">
      {{ props.nickName }}
    </v-row>
  </v-card>

  <v-menu activator="#menu-activator">
    <v-list>
      <v-list-item
          v-for="(item, index) in items.filter((i)=>i.show)"
          :key="index"
          :value="index"
          @click="listAction(item.action)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  {{user}}
  {{isFollowing}}
</template>

<script setup>
import {useStore} from "vuex";
import {computed, reactive, ref, watch, watchEffect} from "vue";
import router from "@/router";
import axiosInstance from "@/utility/axiosInstance";

const props = defineProps({
  id: Number,
  nickName: String,
})

const store = useStore()
const user = computed(() => store.state.userModule.user)

let isFollowing =!!user.value.followUsers.includes(props.id)
let isBlocking = !!user.value.blockedUsers.includes(props.id)


const items = computed(() => [
  { title: '정보 보기', action: 'info', show: true },
  { title: '팔로우', action: 'follow', show: !isFollowing },
  { title: '팔로우 취소', action: 'cancelFollow', show: isFollowing },
  { title: '유저 차단', action: 'block', show: !isBlocking },
  { title: '차단 해제', action: 'cancelBlock', show: isBlocking },
]);



const listAction = (action) => {
  if (action === "info") {
    router.push(`/user/${props.id}/info`)
    return ;
  } else if (action === 'follow') {
    axiosInstance.springAxiosInst.post(`/user/${props.id}/follow`)
  } else if (action === 'cancelFollow') {
    axiosInstance.springAxiosInst.delete(`/user/${props.id}/follow`)
  } else if (action === 'block') {
    axiosInstance.springAxiosInst.post(`/user/${props.id}/block`)
  } else if (action === 'cancelBlock') {
    axiosInstance.springAxiosInst.delete(`/user/${props.id}/block`)
  }
  router.go(0)
}
</script>

<style scoped>

</style>