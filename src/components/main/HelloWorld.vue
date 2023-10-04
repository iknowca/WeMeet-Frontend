<template>
  <div class="w-full">
    <div class="img-container hello-top-img" id="heroImage">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
           aria-hidden="true">
        <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"/>
      </div>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center pa-4 rounded-xl" style="background-color: rgba(0,0,0,0.3); backdrop-filter: blur(5px)">
          <div class="grid justify-center">
            <img :src="require('@/assets/logo.svg')" style="height: 70px">
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Get - Moim</h1>
          <p class=" text-lg leading-8 text-white">여행을 부담없이!</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <v-btn color="primary" class="" @click="moveToLogin">시작하기</v-btn>
            <v-btn color="transparent" class="text-white" @click="moveToLearn">이용 방법 확인하기<span
                aria-hidden="true">→</span>
            </v-btn>
          </div>
        </div>
      </div>

    </div>
    <div class="img-container learning-view-image" id="learningView" ref="learningViewRef">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center pa-4 rounded-xl"
             style="background-color: rgba(255,255,255,0.3); backdrop-filter: blur(5px)">
          <div class="grid justify-center">
            <img :src="require('@/assets/logo.svg')" style="height: 40px">
          </div>
          <div class="mt-10 items-center justify-center">
            <v-timeline align="start" side="end">
              <v-timeline-item v-for="(item, i) in timelineItemList" :key="item" :dot-color="item.color" :size="item.size" class="" @click="show(i)">
                <template v-slot:opposite>

                </template>
                <div class="d-flex w-[250px]" v-if="item.show">
                  <div>
                    <strong>{{ item.title }}</strong>
                    <div class="text-caption">
                      {{ item.content }}
                    </div>
                  </div>
                </div>
              </v-timeline-item>

            </v-timeline>
          </div>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <v-btn color="primary" class="" @click="moveToLogin">시작하기</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="img-container login-image" id="" ref="loginViewRef">
      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
           style="background-color: rgba(0,0,0,0.3); backdrop-filter: blur(5px)">
        <div style="background-color: rgba(255, 255, 255, 0.7)" class="rounded-xl px-10 py-6 w-fit m-auto">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img :src="require('@/assets/logo.svg')" style="height: 70px" class="mx-auto">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
            account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


          <div>
            <div class="grid grid-cols-1 gap-6 text-gray-700">
              <div class=" text-center">
                <p>SNS 계정으로 로그인하기</p>
              </div>
              <div class="grid grid-cols-3">
                <div class="flex justify-center">
                  <button @click="onGoogleLogin" class=""><img :src="require('@/assets/ico_sns_google@2x.png')"
                                                               style="height: 50px"></button>
                </div>
                <div class="flex justify-center">
                  <button @click="onKakaoLogin" class=""><img :src="require('@/assets/ico_sns_kakao@2x.png')"
                                                              style="height: 50px"></button>
                </div>
                <div class="flex justify-center">
                  <button @click="onKakaoLogin" class=""><img :src="require('@/assets/ico_sns_naver@2x.png')"
                                                              style="height: 50px"></button>
                </div>
              </div>
              <div class="text-center ">
                <p> 개인 정보 보호를 위해 공용 PC에서 사용 시<br> SNS계정의 로그아웃 상태를 꼭 확인해 주세요</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";

const timelineItemList = reactive([
  {title: "Taxxing", content: "모임을 모집하고, 첫번째 정기결제를 하는 기간이에요.", color: "#E64040", size: "", show:true},
  {title: "Runway", content: "모집이 끝나고, Runway기간동안 매월 남은 금액을 정기결제를 진행해요", color: "#E6A022", size: "", show: false},
  {title: "Take Off", content: "모든 결제가 끝났어요, 여행을 기다려요.", color: "#25B22D", size: "", show: false},
  {title: "Flight", content: "이륙합니다. 모든 준비를 마치고 여행을 떠나요.", color: "blue", size: "", show: false},
  {title: "Landing", content: "여행을 마치고 집으로 돌아갈 시간입니다.", color: "blue", size: "", show:false}
])
const show = (i) => {
  timelineItemList.forEach((item)=>item.show=false)
  timelineItemList[i].show=true
}
const loginViewRef = ref()
function moveToLogin() {
  if (loginViewRef.value) {
    loginViewRef.value.scrollIntoView({behavior: "smooth"});
  }
}

const learningViewRef = ref(null)

function moveToLearn() {
  if (learningViewRef.value) {
    learningViewRef.value.scrollIntoView({behavior: "smooth"})
  }

}

const store = useStore()
const onGoogleLogin = () =>
  store.dispatch("userModule/requestGoogleOauthRedirectUrlToSpring")
const onKakaoLogin = () =>
  store.dispatch("userModule/requestKakaoOauthRedirectUrlToSpring")
</script>

<style scoped>
.img-container {
    height: 100vh;
    min-width: 320px;

}

.hello-top-img {
    background-image: url("@/assets/background/helloworld_top_img.jpg");
    background-size: cover;
    background-position: 50% 100%;
    /*opacity: 10%;*/
}

.learning-view-image {
    background-image: url("@/assets/background/andrew-palmer-_1REcmACJaQ-unsplash.jpg");
    background-size: cover;
    background-position: 50% 100%;
    /*opacity: 10%;*/
}
.login-image {
    background-image: url("@/assets/background/gerrie-van-der-walt-uOc3ldMSAiY-unsplash.jpg");
    background-size: cover;
    background-position: 50% 100%;
}
</style>