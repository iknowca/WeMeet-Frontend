<template>
    <div
        :id="`menu-activator${props.user.id}`"
        class="pa-4 rounded  border-2 m-auto grid align-content-center place-content-center h-full"
    >
      <div class="grid align-content-center place-content-center h-3/4">

        <toy-face v-if="!!props.user.profile" :group="props.user.profile.groupNumber" :rounded="42" :toy-number="props.user.profile.number" :size="convertRemToPixels(3.5)" class="m-auto"></toy-face>
        <v-avatar v-else :size="convertRemToPixels(4)">
          <v-icon icon="mdi-account-circle" :size="convertRemToPixels(4)"></v-icon>
        </v-avatar>
      </div>
      <div class="justify-center">
        {{ props.user.nickname }}
      </div>
    </div>

  <v-menu :activator="`#menu-activator${props.user.id}`">
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
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import router from "@/router";
import axiosInstance from "@/utility/axiosInstance";
import ToyFace from "@/components/user/ToyFace.vue";
import {convertRemToPixels} from "@/util/remConvert";

const props = defineProps({
  user:{}
})

const store = useStore()
const user = computed(() => store.state.userModule.user)
const followList = computed(() => store.state.userModule.followUserList)
const blockList = computed(() => store.state.userModule.blockUserList)

let isFollowing = !!followList.value.includes(props.user.id)
let isBlocking = !!blockList.value.includes(props.user.id)


const items = computed(() => [
  {title: '정보 보기', action: 'info', show: true},
  {title: '팔로우', action: 'follow', show: !isFollowing},
  {title: '팔로우 취소', action: 'cancelFollow', show: isFollowing},
  {title: '유저 차단', action: 'block', show: !isBlocking},
  {title: '차단 해제', action: 'cancelBlock', show: isBlocking},
]);



const listAction = (action) => {
  if (action === "info") {
    router.push(`/user/${props.user.id}/info`)
    return ;
  } else if (action === 'follow') {
    axiosInstance.springAxiosInst.post(`/user/${props.user.id}/follow`)
  } else if (action === 'cancelFollow') {
    axiosInstance.springAxiosInst.delete(`/user/${props.user.id}/follow`)
  } else if (action === 'block') {
    axiosInstance.springAxiosInst.post(`/user/${props.user.id}/block`)
  } else if (action === 'cancelBlock') {
    axiosInstance.springAxiosInst.delete(`/user/${props.user.id}/block`)
  }
  router.go(0)
}
</script>

<style scoped>

</style>