<template>
  <v-footer class="footer-content mt-4" :style="footBarStyle">
    <div class="grid grid-cols-3 pa-4 text-xs text-gray-400">
      <div class="pa-4"><strong>(주)겟모임</strong><br>
        주소 서울특별시 강남구 테레란로 14길 6 남도빌딩<br>
        사업자등록번호 123-45-67890<br>
        통신판매업신고 2023-서울강남-00000<br>
        관광사업증 등록번호: 제2023-00호<br>
        호스팅서비스제공자 (주)겟모임 | 대표 김XX
      </div>
      <div class="pa-4">
        <strong>고객센터</strong>
        이용관련 1588-xxxx | 제휴문의 1588-yyyy<br>
        팩스 02-xxx-yyyy | 이메일 iknowca@gmail.com<br>
        <router-link to="/admin">관리자 페이지</router-link>

      </div>
      <div class="pa-4">
        <strong>전자금융거래 분쟁처리 담당정보</strong>
        유선 1588-xxxx<br>
        팩스 02-xxx-yyyy | 이메일 iknowca@gmail.com<br>
        개인정보보호책임자 iknowca@gmail.com<br>
      </div>
    </div>

      <div class="pa-4 col-span-3 text-xs text-gray-400">
        (주)겟모임은 항공사가 제공하는 개별 항공권 및 여행사가 제공하는 일부 여행상품에 대하여 통신판매중개자의 지위를 가지며, 해당 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.<br>
        항공권 또는 항공권이 포함된 경우, 표시되는 상품요금은 예상 유류할증료와 제세공과금이 포함된 가격이며,  발권일/환율 등에 따라 변경될 수 있습니다.<br>
        (주)겟모임은 통신판매중개자로서 통신판매의 당사자가 아니므로, 개별 판매자가 등록한 오픈마켓 상품에 대해서 (주)겟모임은 일체 책임을 지지 않습니다.<br>
      </div>
  </v-footer>
</template>

<script setup>
import {reactive} from "vue";

const footBarStyle = reactive({backgroundColor: 'rgb(var(--v-theme-gray))'})
</script>

<style lang="css" scoped>
.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  text-align: left;
  padding: 1.5rem 0;
}

.footer-name {
  margin: 0;
  left: 0;
}

.footer-item {
  margin-top: 1rem;
}
.footer-item2 {
  border-top: 1px solid #7e7e7e;
  border-bottom: 1px solid  #7e7e7e;  
  margin-top: 1rem;
  color: gray;
  padding: 1rem;
}
.github-link-mt{
  margin-top: 2rem;
}
</style>
