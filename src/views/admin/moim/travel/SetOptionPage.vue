<template>
  <div class="grid content-center">
    <div>
      <v-card class=" pa-4">
        <p>여행지 선택</p>
        <v-select label="국가" :items="countries" v-model="travel.country"
                  @update:modelValue="getCityList(travel.country)"></v-select>
        <v-text-field type="text" v-if="addCountry" v-model="travel.country"></v-text-field>
        <p>도시 선택</p>
        <v-select label="도시" :items="cities" v-model="travel.city"
                  @update:modelValue="isAddCity(travel.city)"></v-select>
        <v-text-field type="text" v-if="addCity" v-model="travel.city"></v-text-field>
        <p>공항 선택</p>
        <v-select label="공항" :items="airports" v-model="travel.departureAirport"
                  @update:modelValue="getTravel()"></v-select>
        <ImageRegisterComp v-model="travel.imageKey"></ImageRegisterComp>
        <v-btn @click="postTravel">저장하기</v-btn>
      </v-card>
    </div>
    <div style="height: 50px"></div>
    <div>
      <!--    <div v-if="!!travel.id!==false">-->
      <v-card class="pa-4 grid align-content-center gap-4">
        <div v-for="o in travel.additionalOptions" :key="o" class="gap-4 grid">
          <div>
            <v-card class="pa-4 grid grid-cols-2 gap-4">
              <div class="">
                <v-text-field label="옵션 이름" v-model="o.name"></v-text-field>
              </div>
              <div>
                <v-text-field type="number" label="옵션 가격(원)" v-model="o.price"></v-text-field>
              </div>
              <div>
                <v-select label="카테고리" :items="categoryList" v-model="o.category"></v-select>
              </div>
              <div>
                <ImageRegisterComp v-model="o.imageKey"></ImageRegisterComp>
              </div>
              <div class="col-span-2">
                <v-textarea v-model="o.info" label="옵션 설명"></v-textarea>
              </div>
            </v-card>
          </div>
          <div class="grid">
            <div class="w-fit place-self-auto m-auto" v-if="!!o.id===false">
              <v-btn class="m-auto" @click="saveOption(o)">추가하기</v-btn>
              <v-btn class="m-auto" @click="deleteOption(o)">삭제하기</v-btn>
            </div>
            <div>
              <v-btn class="m-auto" @click="modifyOption(o)">수정하기</v-btn>
              <v-btn class="m-auto" @click="deleteOption(o)">삭제하기</v-btn>
            </div>
          </div>
        </div>

      </v-card>
    </div>
    <div class="m-auto">
      <v-btn @click="addOption">옵션 추가하기</v-btn>
    </div>
  </div>
</template>

<script setup>

import {inject, onMounted, reactive, ref} from "vue";
import axiosInstance from "@/utility/axiosInstance";
import ImageRegisterComp from "@/components/board/image/ImageRegisterComp.vue";
import axios from "axios";
import router from "@/router";

const countries = reactive(["추가하기"])
var cities = reactive(["추가하기"])
const travel = reactive({
  additionalOptions: [],
  city: "",
  country: "",
  departureAirport: "",
  imageKey: "",
})
onMounted(() => {
  axiosInstance.springAxiosInst.get("/travel/country/list")
    .then((res) => {
      console.log(res)
      countries.push(...res.data)
    })
  getAirports()
  getCategoryList()
})
const addCountry = ref(false)
const getCityList = (country) => {
  if (country === "추가하기") {
    addCountry.value = true
    travel.country = ""
  } else {
    addCountry.value = false
    cities = reactive(["추가하기"])
    axiosInstance.springAxiosInst.get("/travel/city/list", {params: {country: country}})
      .then((res) => {
        cities.push(...res.data)
      })
  }
}

const addCity = ref(false)
const isAddCity = (city) => {
  if (city == "추가하기") {
    addCity.value = true
    travel.city = ""
  }
}


const getTravel = () => {
  axiosInstance.springAxiosInst.get("/travel", {
    params: {
      country: travel.country,
      city: travel.city,
      departureAirport: travel.departureAirport
    }
  })
    .then(res => Object.assign(travel, res.data))
}

const airports = reactive([])
const getAirports = () => {
  axiosInstance.springAxiosInst.get("/travel/airport/list")
    .then((res) => {
      airports.push(...res.data)
    })
}

const emitter = inject("emitter")
const postTravel = ()=> {
  emitter.emit("upload")
  axiosInstance.springAxiosInst.post(`/travel/${travel.id}`, travel)
    .then(()=>router.go(0))
}

const addOption = () => {
  travel.additionalOptions.push({})
}
const categoryList = reactive([])
const getCategoryList = () => {
  axiosInstance.springAxiosInst.get("/travel/option/category/list")
    .then(res => categoryList.push(...res.data))
}

const saveOption = ()=> {
  emitter.emit("upload")
  axiosInstance.springAxiosInst.post(`/travel/option`, travel)
    .then((res)=>{
      Object.assign(travel, res.data)
    })
}
const modifyOption = (option)=> {
  emitter.emit("upload")
  axiosInstance.springAxiosInst.post(`/travel/option`, travel)
    .then((res)=>{
      Object.assign(travel, res.data)
    })
}

const deleteOption = (o)=> {
  if(o.id==null) {
    travel.additionalOptions = travel.additionalOptions.filter((option)=>option!==o)
  } else  {
    axiosInstance.springAxiosInst.delete(`/travel/option/${o.id}`, travel)
      .then(res=> {
        Object.assign(travel, res.data)
      })
  }
}
</script>

<style scoped>

</style>