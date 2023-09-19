import AdminMainPage from "@/views/admin/AdminMainPage.vue";
import SetOptionPage from "@/views/admin/moim/travel/SetOptionPage.vue";
import EventBannerBoardWritePage from "@/views/admin/EventBannerBoardWritePage.vue";

const adminRouter = [
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminMainPage
  },
  {
    path: "/admin/moim/travel/setOption",
    name: "SetOptionPage",
    component: SetOptionPage
  },
  {
    path: "/admin/board/form/event-banner",
    name: "FormEventBanner",
    component: EventBannerBoardWritePage
  }
]
export default adminRouter