<template>
  <div>
    <div>
      <slot name="q"></slot>
    <h1 class="w-fit  bg-[#3f69fb] bg-opacity-70 pt-2 px-2 rounded-t-lg">{{title}}</h1>
    </div>
    <hr>
    <slot name="category"></slot>
    <slot name="city"></slot>
    <v-container>
      <v-row >
        <v-col v-for="m in moimList" :key="m.id" sm="6" md="4">
          <MoimCard :moim="m" @click="$router.push(`/moim/${m.id}`)"></MoimCard>
        </v-col>
          <slot name="moreMoim"></slot>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MoimCard from "@/components/moimComp/MoimCard.vue";
import router from "@/router";

export default {
  name: "MoimList",
  methods: {
    router() {
      return router
    }
  },
  components: {MoimCard},
  props: {
    title:String,
    moimList: Array,
  },

}
</script>

<style scoped>

</style>