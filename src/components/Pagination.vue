<template>
  <div class="pagination">
    <button 
      :disabled="currentPage === 1" 
      @click="$emit('page-change', currentPage - 1)"
      class="page-button"
    >
      <div class="portal-effect"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
      </svg>
    </button>
    <div class="page-info">
      <span>Page</span>
      <span class="page-number">{{ currentPage }}</span>
      <span>of</span>
      <span class="page-number">{{ totalPages }}</span>
    </div>
    <button 
      :disabled="currentPage === totalPages" 
      @click="$emit('page-change', currentPage + 1)"
      class="page-button"
    >
      <div class="portal-effect"></div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M5.146 1.146a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7.5H2.5a.5.5 0 0 1 0-1h6.793L5.146 1.146z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'page-change', page: number): void
}>()
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
  position: relative;
}

.page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid #61E391;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;
}

.portal-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, 
    rgba(97, 227, 145, 0.1) 0%,
    rgba(72, 228, 238, 0.1) 30%,
    transparent 70%
  );
  animation: portalSpin 10s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.page-button:hover .portal-effect {
  opacity: 1;
}

.page-button svg {
  width: 24px;
  height: 24px;
  fill: #61E391;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.page-button:hover:not(:disabled) {
  border-color: #48E4EE;
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(72, 228, 238, 0.3),
              0 0 30px rgba(72, 228, 238, 0.2);
}

.page-button:hover:not(:disabled) svg {
  fill: #48E4EE;
}

.page-button:disabled {
  border-color: rgba(97, 227, 145, 0.3);
  cursor: not-allowed;
  opacity: 0.5;
}

.page-button:disabled:hover {
  transform: none;
  border-color: rgba(97, 227, 145, 0.3);
  box-shadow: none;
}

.page-button:disabled svg {
  fill: rgba(97, 227, 145, 0.3);
}

.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #61E391;
  background: rgba(26, 26, 26, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 2px solid #61E391;
  position: relative;
  overflow: hidden;
}

.page-info::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, 
    rgba(97, 227, 145, 0.05) 0%,
    rgba(72, 228, 238, 0.05) 30%,
    transparent 70%
  );
  animation: portalSpin 15s linear infinite reverse;
  z-index: 0;
}

.page-number {
  color: #48E4EE;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(72, 228, 238, 0.5);
}

@keyframes portalSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .pagination {
    gap: 1rem;
  }

  .page-button {
    width: 40px;
    height: 40px;
  }

  .page-button svg {
    width: 20px;
    height: 20px;
  }

  .page-info {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>