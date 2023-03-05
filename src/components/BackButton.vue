<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const routerToHomePage = () => {
  router.push({
    name: 'Home'
  })
}
</script>
<template>
  <span @click="routerToHomePage()" class="back-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
    </svg>
    back 
  </span>
</template>
<style scoped>
  .back-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    line-height: 1;
    padding-bottom: 1rem;
  }

  .back-button svg {
    margin-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
  }
</style>