import GoogleRedirectView from "@/views/sign/oauth/GoogleRedirectView.vue";
import KakaoRedirectView from "@/views/sign/oauth/KakaoRedirectView.vue";
import SignIn from '../../views/sign/SignIn.vue'
import SignUp from '../../views/sign/SignUp.vue'
import UserInfoPage from "@/views/user/UserInfoPage.vue";
import MyPage from "@/views/user/MyPage.vue";
import ModifyProfile from "@/views/user/ModifyProfile.vue";

const userRouter = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login/oauth2/code/google',
    name: 'GoogleRedirectView',
    component: GoogleRedirectView
  },
  {
    path: '/login/oauth2/code/kakao',
    name: 'KakaoRedirectView',
    component: KakaoRedirectView
  },
  {
    path: '/user/:userId/info',
    name: 'UserInfo',
    component: UserInfoPage
  },
  {
    path: '/user/my-page',
    name: "MyPage",
    component: MyPage
  },
  {
    path: '/user/modify-profile',
    name: "ModifyProfile",
    component: ModifyProfile
  }
]
export default userRouter