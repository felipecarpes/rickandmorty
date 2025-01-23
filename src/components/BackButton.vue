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
  <button @click="routerToHomePage()" class="back-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
    </svg>
    <span>Back to Portal</span>
  </button>
</template>
<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid rgba(97, 227, 145, 0.5);
  border-radius: 8px;
  color: #61E391;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.portal-effect {
  display: none;
}

.back-button svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.back-button:hover {
  background: rgba(26, 26, 26, 0.95);
  border-color: #61E391;
}

@media (max-width: 768px) {
  .back-button {
    padding: 0.6rem 0.85rem;
    font-size: 0.85rem;
  }

  .back-button svg {
    width: 16px;
    height: 16px;
  }
}

@media (hover: none) {
  .back-button:active {
    opacity: 0.8;
  }
}
</style>