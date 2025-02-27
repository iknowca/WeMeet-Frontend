// import {
//     REQUEST_USER_LIST_TO_SPRING,
//     REQUEST_USER_TO_SPRING
// } from './mutation-types'

import axiosInst from '@/utility/axiosInstance'
import router from "@/router";

export default {
    requestSignUpToSpring(_, payload) {
        const { nickname, name, email, password, roleType } = payload
        return axiosInst.springAxiosInst.post('/user/sign-up', { nickname, name, email, password, roleType })
            .then((res) => {
                if (res.data == true) {
                    alert('회원가입에 성공하였습니다.')
                    return res.data
                } else {
                    alert('회원가입에 실패하였습니다.')
                    return res.data
                }
            })
            .catch(() => {
                alert('회원가입 도중 문제가 생겼습니다.')
                console.error();
            })
    },
    requestCheckNicknameToSpring(_, payload) {
        const { nickname } = payload
        return axiosInst.springAxiosInst.get(`/user/check-nickname/${nickname}`)
            .then((res) => {
                if (res) {
                    console.log(res.data)
                    return res.data
                }
            })
            .catch(() => {
                console.error
            })
    },
    requestCheckEmailToSpring(_, payload) {
        const { email } = payload
        return axiosInst.springAxiosInst.get(`/user/check-email/${email}`)
            .then((res) => {
                if (res) {
                    console.log(res.data)
                    return res.data
                }
            })
            .catch(() => {
                console.error
            })
    },
    requestSignInToSpring(context, payload) {
        const { email, password } = payload;
        return axiosInst.springAxiosInst.post('/user/sign-in', { email, password }, { withCredentials: true })
            .then(async (res) => {
                if (res.data.accessToken) {
                    context.commit("SET_SIGNIN", res.data.accessToken)
                    return await context.dispatch("requestUserInfoToSpring")
                } else {
                    alert('이메일과 비밀번호를 다시 확인해주세요!');
                }
            })
            .catch((error) => {
                alert('로그인 도중 문제가 생겼습니다.');
                console.error(error);
            });
    },
    async requestGoogleOauthRedirectUrlToSpring() {
        return axiosInst.springAxiosInst.get('/oauth/google')
            .then(res => {
                window.location.href = res.data
            })
    },
    async requestJwtOauthGoogleToSpring(context, code) {
        return axiosInst.springAxiosInst.get("/oauth/google-login", { params: { code: code }, withCredentials: true })
            .then(async (res) => {
              context.commit("SET_SIGNIN", res.data)
              axiosInst.springAxiosInst.defaults.headers.common.Authorization = `Bearer ${res.data}`
              return await context.dispatch("requestUserInfoToSpring")
            })
    },
    async requestKakaoOauthRedirectUrlToSpring() {
        return axiosInst.springAxiosInst.get('/oauth/kakao')
            .then(res => {
                window.location.href = res.data
            })
    },
    async requestJwtOauthKakaoToSpring(context, code) {
        return axiosInst.springAxiosInst.get("/oauth/kakao-login", { params: { code: code }, withCredentials: true })
            .then(async (res) => {
              context.commit("SET_SIGNIN", res.data)
              axiosInst.springAxiosInst.defaults.headers.common.Authorization = `Bearer ${res.data}`
              return await context.dispatch("requestUserInfoToSpring")
            })
    },
    async requestUserInfoToSpring(context) {
        return axiosInst.springAxiosInst.get("/user")
            .then((res) => {
              context.commit("SET_USER", res.data)
                return res
            })
    },
    async requestSignOut(context) {
        return axiosInst.springAxiosInst.delete("/user/sign-out", { withCredentials: true })
            .then(() => {
              router.push('/')
              context.commit("SET_USER", {})
              context.commit("SET_SIGNIN", false)
              delete axiosInst.springAxiosInst.defaults.headers.common.Authorization
            })
    },
  requestFollowList(context) {
      return axiosInst.springAxiosInst.get("/user/follow/list")
        .then((res)=>context.commit("SET_FOLLOW_USERS", res.data))
  },
  requestBlockList(context) {
    return axiosInst.springAxiosInst.get("/user/block/list")
      .then(res=>context.commit("SET_BLOCK_USERS", res.data))
  }
}