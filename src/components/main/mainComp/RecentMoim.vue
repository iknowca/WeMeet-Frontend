<template>
  <div>
    <MoimList :title="title" :moimList="moimList">
      <template v-slot:moreMoim>
        <v-col sm="6" md="4">
          <v-card class="pa-4 text-center" @click="requestMoreMoim">
            <v-icon>
              mdi-plus-box-outline
            </v-icon>
            더보기
          </v-card>
        </v-col>
      </template>
    </MoimList>
  </div>
</template>

<script>
import axiosInstance from "@/utility/axiosInstance";
import {reactive, ref} from "vue";
import MoimList from "@/components/moimComp/MoimList.vue";

export default {
  name: "RecentMoim",
  components: {MoimList},

  async setup() {
    const title = "최근 모임?"
    const moimList = reactive([])
    const page = ref(0)
    const requestRecentMoim = async ()=> {
      return await axiosInstance.springAxiosInst.get("/moim/list", {params: {page: 0, size: 4}})
        .then((res)=> {
          return res.data
        })
    }
    const requestMoreMoim = ()=> {
      page.value = page.value + 1
      axiosInstance.springAxiosInst.get("/moim/list", {params: {page: page.value, size:4}})
        .then((res) => {
          return moimList.push(...res.data)
        })
    }
    moimList.push(...await requestRecentMoim())
    return {
      requestMoreMoim,
      moimList,
      title
    }
  }
}

</script>

<style scoped>

</style>