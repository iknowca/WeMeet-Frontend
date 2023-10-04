<template>
  <v-app-bar :style="appBarStyle" scroll-behavior="elevate" class="mb-4">
    <div class="grid grid-cols-3 w-full min-w-[601px] max-w-[1280px]  align-self-center m-auto">
        <div class=" grid grid-cols-2">
          <div class="align-self-center justify-self-start">
            <v-btn variant="plain" :ripple="false" to="/">
              <div class="grid grid-cols-2">
                <div>
                <img :src="require('@/assets/logo.svg')" class="nav-logo">
                </div>
                <div class="grid align-center ">
                GET MOIM
                </div>
              </div>
            </v-btn>
          </div>
          <div v-if="user.hasOwnProperty('id')" class="align-content-center grid">
            <div>
              <!--            <v-autocomplete hide-details variant="outlined" :items="keywordList" @keyup.enter="goAdvancedSearch"-->
              <!--                            @click:append="goAdvancedSearch" v-model="keyword"></v-autocomplete>-->
            </div>
          </div>
        </div>
        <div></div>

        <div class="align-self-center flex justify-end">
          <v-btn>
            <v-icon v-if="user.hasOwnProperty('id')">mdi-dots-vertical</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="item in menu" :key="item" :title="item.title" @click="handleMenu(item.action)">
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import {useStore} from "vuex";
import router from "@/router";

const store = useStore()
const user = computed(() => store.state.userModule.user)
const appBarStyle = ref({backgroundColor: 'transparent'});

const setSignIn = () => {
  router.push('/sign-in');
};
const setTestOne = () => {
  router.push('/test');
};
const signOut = () => {
  store.dispatch("userModule/requestSignOut")
}

onMounted(() => {
  // getKeyword()
  // 스크롤 이벤트를 추가하여 스크롤을 감지하고 배경을 변경합니다.
  window.addEventListener('scroll', handleScroll);
  if (localStorage.getItem("isLogin") === "true") {
    store.dispatch("userModule/requestUserInfoToSpring")
    store.dispatch("userModule/requestBlockList")
    store.dispatch("userModule/requestFollowList")
  }
});


const handleScroll = () => {
  // 스크롤 위치를 확인하여 배경 색상을 조절합니다.
  if (window.scrollY > 0) {
    appBarStyle.value.backgroundColor = 'rgb(var(--v-theme-surface))';
  } else {
    appBarStyle.value.backgroundColor = 'transparent';
  }
};

const menu = [
  {title: "내 정보 보기", action: "info"},
  {title: "모임 만들기", action: "create"},
  {title: "로그아웃", action: "logout"}
]

function handleMenu(action) {
  switch (action) {
    case "info":
      router.push('/user/my-page')
      break
    case "moim":
      router.push(`/user/my-info/moim`)
      break
    case "create":
      router.push(`/moim/form`)
      break
    case "review":
      router.push(`/board/review/list`)
      break
    case "faq" :
      router.push(`/board/faq/list`)
      break
    case "qna" :
      router.push(`/board/qna/list`)
      break
    case "logout":
      store.dispatch("userModule/requestSignOut")
  }
}

const keywordList = reactive([])
const keyword = ref("")
// const getKeyword = () => {
//   keywordList.length = 0
//   axiosInstance.springAxiosInst.get("/moim/keyword")
//     .then(res => {
//       keywordList.push(...res.data)
//     })
// }
// const goAdvancedSearch = () => {
//   if(keyword.value==="") {
//     return
//   }
//   router.push("/advanced-search/moim/"+keyword.value)
// }
</script>

<style scoped>
.nav-logo{
    width: 63px;
}
</style>