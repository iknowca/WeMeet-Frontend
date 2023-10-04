<template>
    <div v-if="moim" class="mb-4">
      <suspense>
        <template v-if="moim.basicInfo?.id">
          <v-card class="pa-4">
            <div class="rounded border-2 pa-4">
              <v-card-title class="text-center">{{ moim.basicInfo.title }}</v-card-title>
              <v-card-subtitle class="text-right">{{ moim.paymentInfo.amountInstallment }}원 /
                {{ moim.stateInfo.runwayPeriod }} 개월
              </v-card-subtitle>
            </div>
            <div style="height: 50px" class="grid grid-cols-2 divide-x-2">
              <div class="col-span-1"></div>
              <div class=""></div>
            </div>
            <div class="rounded border-2 pa-4">
              <v-card-text>{{ moim.basicInfo.content }}</v-card-text>
            </div>

            <v-timeline align="start" side="end">
              <v-timeline-item size="0">
                <strong class="me-4"> 일정 정보</strong>
              </v-timeline-item>
              <v-timeline-item v-for="item in timelineItemList" :key="item" :dot-color="item.color" :size="item.size">
                <template v-slot:opposite>

                </template>

                <strong class="me-4">{{ item.date }}
                  <span class="relative h-3 w-3" v-if="item.title.toUpperCase()===moim.stateInfo.state">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span>
                </strong>

                <div class="d-flex">
                  <div>
                    <strong>{{ item.title }}</strong>
                    <div class="text-caption">
                      {{ item.content }}
                    </div>
                  </div>
                </div>
              </v-timeline-item>

            </v-timeline>

            <div class="rounded border-2 pa-4">
              <div class="text-center">
                <strong>여행 정보</strong>
              </div>
              <div class="h-10px"></div>
              <div class="grid grid-cols-2 gap-4">
                <v-card v-for="o in moim.destinationInfo.optionsInfo" :key="o">
                  <div class="grid grid-cols-1 pa-4">
                    <div class="relative h-[200px]">
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
                        <v-card-text class="line-clamp-3 hover:line-clamp-none">
                          {{ o.info }}
                        </v-card-text>
                      </div>
                    </div>
                  </div>

                </v-card>
              </div>
            </div>
            <div style="height: 50px" class="grid grid-cols-2 divide-x-2">
              <div class="col-span-1"></div>
              <div class=""></div>
            </div>
            <div class="rounded border-2 pa-4">
              <div class="text-center"><strong>참여자 정보</strong></div>

              <div class="grid grid-cols-5 gap-4 ">
                <div v-for="u in moim.participantsInfo.participants" :key="u.user.id">
                  <UserBadge v-bind:user="u.user"></UserBadge>
                </div>
                <div
                    v-for="nu in new Array(moim.participantsInfo.maxParticipants-moim.participantsInfo.participants.length)"
                    :key="nu">
                  <UserBadgeNull></UserBadgeNull>
                </div>
              </div>
            </div>
            <div class="pa-4 m-auto">
              <JoinBtn v-if="!isJoin"
                       class="m-auto"></JoinBtn>
              <WithdrawBtn v-else class="m-auto" :moimId="moim.moimId"></WithdrawBtn>
            </div>
          </v-card>

        </template>
      </suspense>

    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref} from "vue";
import JoinBtn from "@/components/moimComp/moimComp/JoinBtn.vue";
import WithdrawBtn from "@/components/moimComp/moimComp/WithdrawBtn.vue";
import {useRoute} from "vue-router";
import axiosInstance from "@/utility/axiosInstance";
import UserBadge from "@/components/user/UserBadge.vue";
import UserBadgeNull from "@/components/user/UserBadgeNull.vue";

const store = useStore()
const user = computed(() => store.state.userModule.user)

const route = useRoute()
const moimId = route.params.moimId
const moim = reactive({})
onMounted(() => {
  requestMoimInfo()
})

const isJoin = ref(true)

const requestMoimInfo = () => {
  axiosInstance.springAxiosInst.get(`/moim/${moimId}`)
    .then(res => {
      Object.assign(moim, res.data)
      isJoin.value = moim.participantsInfo.participants.map((p) => p.user.id).includes(user.value.id)
      timelineItemList[0].date = moim.createdDate.substr(0, 10)
      timelineItemList[1].date = moim.stateInfo.runwayStartDate.substr(0, 7)
      timelineItemList[2].date = moim.stateInfo.takeoffStartDate.substr(0, 7)
      timelineItemList[3].date = moim.stateInfo.departureDate.substr(0, 10)
      timelineItemList[4].date = moim.stateInfo.returnDate.substr(0, 10)
      timelineItemList.filter((item) => item.title.toUpperCase() === moim.stateInfo.state)[0].size = "small"
    })
}
const timelineItemList = reactive([
  {title: "Taxxing", content: "모임을 모집하고, 첫번째 정기결제를 하는 기간이에요.", color: "#E64040", size: ""},
  {title: "Runway", content: "모집이 끝나고, Runway기간동안 매월 남은 금액을 정기결제를 진행해요", color: "#E6A022", size: ""},
  {title: "Take Off", content: "모든 결제가 끝났어요, 여행을 기다려요.", color: "#25B22D", size: ""},
  {title: "Flight", content: "이륙합니다. 모든 준비를 마치고 여행을 떠나요.", color: "blue", size: ""},
  {title: "Landing", content: "여행을 마치고 집으로 돌아갈 시간입니다.", color: "blue", size: ""}
])

// const imgPath = computed(()=>require(`@/assets/city/${k2eCity(moim.moimDestination.city)}.jpg`))

</script>

<style scoped>
</style>