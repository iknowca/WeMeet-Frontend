<!--v-model imageKey s3, event -->
<template>
  <div>
    <div>
      <v-file-input v-model="file" accept="image/png, image/jpg, image/jpeg" @update:modelValue="changeFile"/>
    </div>
  </div>
</template>

<script setup>
import {computed, defineEmits, defineProps, inject, reactive, ref} from "vue";
import AWS from 'aws-sdk'
import {uuidv4} from "@/util/uuid";

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const previewImage = ref()
const imageKey = computed({

  get() {
    return props.modelValue
  },
  set(prop) {
    emit('update:modelValue', prop)
  },
})

let file = reactive({})
const awsBucketName = process.env.VUE_APP_S3_BUCKET_NAME
const awsBucketRegion = process.env.VUE_APP_S3_REGION
const awsIdentityPoolId = process.env.VUE_APP_S3_IDENTITY_POOL_ID
let s3 = null

const s3Config = () => {
  AWS.config.update({
    region: awsBucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: awsIdentityPoolId
    })
  })
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
      Bucket: awsBucketName
    }
  })
}

const s3FileUpload = () => {
  s3Config();

  if (file) {
    const fileContent = file[0];
    console.log(fileContent)
    s3.upload({
      Key: imageKey.value,
      Body: fileContent,
      ACL: 'public-read'
    }, (err) => {
      if (err) {
        alert(err);
      }
    });
  } else {
    alert("No file selected.");
  }
};
const emitter = inject("emitter")
emitter.on("upload", () => {
  s3FileUpload()
})

const changeFile = () => {
  imageKey.value = uuidv4()
  previewImage.value = URL.createObjectURL(file[0])
}
</script>

<style scoped>

</style>