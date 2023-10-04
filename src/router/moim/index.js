import MoimInfoPage from "@/views/moim/MoimInfoPage.vue";
import MoimFormPage from "@/views/moim/MoimFormPage.vue";
import MoimJoinPage from "@/views/moim/MoimJoinPage.vue";
import MoimAdvancedSerchPage from "@/views/moim/MoimAdvancedSerchPage.vue";
import AIMoimPage from "@/views/moim/AIMoimPage.vue";

const moimRouter = [
  {
    path: "/advanced-search/moim/:keyword",
    name: "AdvancedSearch",
    component: MoimAdvancedSerchPage,
    props: true
  },
  {
    path: "/advanced-search/moim",
    name: "AdvancedSearchWithoutKeyword",
    component: MoimAdvancedSerchPage,
  },
  {
    path: "/moim/:moimId",
    name: "MoimInfoPage",
    component: MoimInfoPage,
    props: true
  },
  {
    path: "/moim/form",
    name: "MoimFormPage",
    component: MoimFormPage
  },
  {
    path: "/moim/:moimId/join",
    name: "MoimJoinPage",
    component: MoimJoinPage,
    props: true,
  },
  {
    path: "/ai/moim",
    name: "AIMOIM",
    component: AIMoimPage,
  }

]
export default moimRouter