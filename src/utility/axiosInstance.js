import axios from 'axios'
import router from "@/router";
const springAxiosInst = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
})
springAxiosInst.interceptors.response.use((res)=> {
    return res;
}, async (error)=> {
    if(error.response?.data.msg==="Expired Token: accessToken" || error.response?.data.msg==="Token is null or too short: accessToken") {
        return await springAxiosInst.get("/jwt/refresh", {withCredentials: true})
          .then((res) => {
            springAxiosInst.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`
            error.config.headers.Authorization = `Bearer ${res.data.accessToken}`
            return springAxiosInst(error.config)
          })
    } else if (error.response?.data.msg === "Token is null or too short: refreshToken") {
      alert("로그인이 만료되었습니다.")
      localStorage.clear()
      router.push('/')
      return Promise.reject(error)
    }
  return Promise.reject(error)
})
const flaskAxiosInst = axios.create({
    baseURL: process.env.VUE_APP_FLASK_URL,
})

export default { springAxiosInst, flaskAxiosInst }