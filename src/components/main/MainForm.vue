<template>
<div>
  <v-col>
    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-row>
          <EventBanner></EventBanner>
        </v-row>
        <v-row>
          <suspense>
            <RecentMoim></RecentMoim>
          </suspense>
        </v-row>
      </v-col>

      <v-spacer></v-spacer>
    </v-row>
  </v-col>
</div>
</template>

<script>
import RecentMoim from "@/components/main/mainComp/RecentMoim.vue";
import EventBanner from "@/components/main/mainComp/EventBanner.vue";

export default {
  name: "MainForm",
  components: {EventBanner, RecentMoim}
}
</script>

<style scoped>

</style>