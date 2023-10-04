<template>
<div class="grid justify-center gap-6" style="width: 1280px">
  <div class="grid justify-center">
    <EventBanner category="event"></EventBanner>
  </div>
  <div class="">
    <suspense>
      <RecentMoim class="m-auto"></RecentMoim>
    </suspense>
  </div>
  <ReviewBanner></ReviewBanner>
  <div>
    <suspense>
      <CityMoim class="" ref="cityMoim"></CityMoim>
    </suspense>
  </div>
  <div class="grid justify-center">
    <EventBanner category="promotion"></EventBanner>
  </div>
  <div>
    <suspense>
      <PriceMoim></PriceMoim>
    </suspense>
  </div>
  <div>

  </div>
  <div>
    <suspense>
      <OptionMoim></OptionMoim>
    </suspense>
  </div>
</div>
</template>

<script>
import RecentMoim from "@/components/main/mainComp/RecentMoim.vue";
import EventBanner from "@/components/main/mainComp/EventBanner.vue";
import CityMoim from "@/components/main/mainComp/CityMoim.vue";
import PriceMoim from "@/components/main/mainComp/PriceMoim.vue";
import OptionMoim from "@/components/main/mainComp/OptionMoim.vue";
import ReviewBanner from "@/components/main/mainComp/ReviewBanner.vue";

export default {
  name: "MainForm",
  components: {ReviewBanner, OptionMoim, PriceMoim, CityMoim, EventBanner, RecentMoim}
}
</script>

<style scoped>

</style>