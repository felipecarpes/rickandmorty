<template>
  <div class="tab-navigation">
    <div class="tabs-container">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="$emit('change', tab.id)"
      >
        <div class="tab-content">
          <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <template v-if="tab.id === 'characters'">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
              <path d="M16 3.13a4 4 0 010 7.75"></path>
            </template>
            <template v-else-if="tab.id === 'locations'">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </template>
            <template v-else>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"></path>
            </template>
          </svg>
          <span class="tab-label">{{ tab.label }}</span>
          <span class="tab-count" v-if="tab.count !== undefined">({{ tab.count }})</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  activeTab: string
  tabs: Array<{
    id: string
    label: string
    count?: number
  }>
}>()

defineEmits<{
  (e: 'change', tab: string): void
}>()
</script>

<style scoped>
.tab-navigation {
  background: rgba(26, 26, 26, 0.95);
  padding: 0 1rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.tabs-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  padding: 0.5rem 0;
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tab-button {
  background: none;
  border: none;
  color: #ccc;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  scroll-snap-align: start;
  min-width: max-content;
  border-radius: 8px;
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #00b4d8;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tab-button:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.tab-button.active {
  color: #00b4d8;
  background: rgba(0, 180, 216, 0.1);
}

.tab-button.active::after {
  transform: scaleX(1);
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.tab-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.tab-count {
  font-size: 0.8rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .tab-navigation {
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
  }

  .tabs-container {
    gap: 0.25rem;
  }

  .tab-button {
    padding: 0.5rem 0.75rem;
  }

  .tab-content {
    gap: 0.35rem;
  }

  .tab-icon {
    width: 16px;
    height: 16px;
  }

  .tab-label {
    font-size: 0.85rem;
  }

  .tab-count {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .tab-navigation {
    margin: 0.25rem 0;
  }

  .tab-button {
    padding: 0.5rem;
  }

  .tab-content {
    gap: 0.25rem;
  }

  .tab-icon {
    width: 14px;
    height: 14px;
  }

  .tab-label {
    font-size: 0.8rem;
  }

  .tab-count {
    font-size: 0.7rem;
  }
}

@media (hover: none) {
  .tab-button:hover {
    background: none;
  }

  .tab-button:active {
    background: rgba(255, 255, 255, 0.05);
  }
}
</style>
