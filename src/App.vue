<template>
  <v-app class="grid">
    <chat-badge style="position: fixed; right: 20px; bottom: 20px; z-index: 20000"></chat-badge>

    <navigation-bar class="w-full"/>
    <HelloWorld v-if="!showMain"/>
    <div class="justify-center grid">
      <v-main v-if="showMain" class="pl-4 pr-4 min-w-[601px] max-w-[1280px] w-full" style="width: 1280px; font-family: Cafe24Ssurround,serif ">
        <div style=" height: 50px; font-family: Cafe24Ssurround,serif " class="rounded grid grid-cols-4 text-center w-[602px] text-white">
          <div @click="()=>router.push('/moim/form')" style="display: flex; align-items: center;" class="bg-[#3f69fb] bg-opacity-100 hover:bg-opacity-80 rounded-tl-lg"><strong class="m-auto">모임모임!</strong></div>
          <div @click="()=>router.push('/board/review/list')" style="display: flex; align-items: center;" class="bg-[#3f69fb] bg-opacity-60 hover:bg-opacity-80"><strong class="m-auto">리뷰모임?</strong></div>
          <div @click="()=>router.push('/ai/moim')" style="display: flex; align-items: center;" class="bg-[#3f69fb] bg-opacity-60 hover:bg-opacity-80 "><strong class="m-auto">AI모임?</strong></div>
          <div @click="()=>router.push('/advanced-search/moim')" style="display: flex; align-items: center;" class="bg-[#3f69fb] bg-opacity-60 hover:bg-opacity-80 rounded-tr-lg"><strong class="m-auto">진짜모임?</strong></div>

        </div>
        <v-divider class="border-opacity-100 mb-4" thickness="2" color="black"></v-divider>

        <div>
          <router-view/>
        </div>
      </v-main>
    </div>
    <navigation-foot-bar/>
  </v-app>
</template>

<script>
import NavigationBar from '@/views/navigation/NavigationBar.vue'
import NavigationFootBar from '@/views/navigation/NavigationFootBar.vue'
import {useRoute, useRouter} from "vue-router";
import HelloWorld from "@/components/main/HelloWorld.vue";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import ChatBadge from "@/components/ai/llmChat/chatBadge.vue";


export default {
  name: 'App',
  methods: {
    ref
  },
  components: {
    ChatBadge,
    HelloWorld,
    NavigationBar,
    NavigationFootBar
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const user = computed(() => store.state.userModule.user)
    const path = computed(() => {
      return route.path
    })

    const showMain = computed((() => {
      return !!(Object.prototype.hasOwnProperty.call(user.value, 'id') || path.value !== '/')
    }))

    const cityMoim = ref(null)
    const moveCityMoim = async () => {
      await router.push('/');
      await setTimeout(()=>{}, 10000)
      // cityMoim가 정의되었는지 확인하고 스크롤 이벤트
      if (cityMoim.value) {
        cityMoim.value.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return {
      route,
      user,
      path,
      showMain,
      router,
      moveCityMoim
    }
  },
  data: () => ({
    //
  }),
}
</script>
<style>
html, body {
    padding: 0;
    margin: 0;
}

@font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Cafe24Ssurround';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: '양진체';
    src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'GangwonEduPowerExtraBoldA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEduPowerExtraBoldA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
/*.app-container {*/
/*  padding: 0;*/
/*  max-width: 1200px;*/
/*  width: 100%;*/
/*  margin: auto;*/
/*}*/
</style>