<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  prev: {
    type: Number;
    default: 0;
  },
  next: {
    type: Number;
    default: 0;
  },
  pages: {
    type: Number;
    default: 0;
  },
  disableButton: {
    type: Boolean;
    default: false;
  }
}>();

const emit = defineEmits<{
  (event: 'previous-page'): void;
  (event: 'next-page'): void;
}>()

const previousPage = () => {
  emit('previous-page')
}

const nextPage = () => {
  emit('next-page')
}
</script>
<template>
  <div class="page-actions">
    <span @click="previousPage()" class="page-button" :class="{ 'page-button-disabled': disableButton }">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
      </svg>
    </span>
    <span>page {{ prev || "..." }} of {{ pages }}</span>
    <span @click="nextPage()" class="page-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M5.146 1.146a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7.5H2.5a.5.5 0 0 1 0-1h6.793L5.146 1.146z"/>
      </svg>
    </span>
  </div>
</template>
<style scoped>
.page-actions {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 30px 0;
}

.page-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-button svg {
  width: 30px;
  height: 30px;
  fill: #999;
}

.page-button svg:hover {
  cursor: pointer;
  fill: #3498DB
}

.page-button-disabled {
  color: #999;
  cursor: not-allowed;
}

.page-button-disabled svg:hover {
  cursor: not-allowed;
  fill: #999;
}
</style>