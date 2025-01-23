<template>
  <div class="search-bar">
    <input 
      type="text" 
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('search')"
    >
    <button class="search-button" @click="$emit('search')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()
</script>

<style scoped>
.search-bar {
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
}

input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  transition: all 0.3s ease;
  box-sizing: border-box;
  -webkit-appearance: none;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(144, 224, 239, 0.3);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-button {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #90e0ef;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.search-button:hover {
  color: #fff;
  background: rgba(144, 224, 239, 0.1);
}

.search-button svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.search-button:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .search-bar {
    margin: 0 auto 1rem;
  }

  input {
    padding: 0.6rem 2.75rem 0.6rem 0.75rem;
  }

  .search-button {
    right: 1.25rem;
    padding: 0.4rem;
  }

  .search-button svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    padding: 0 0.5rem;
  }

  input {
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  }

  .search-button {
    right: 1rem;
  }

  .search-button svg {
    width: 16px;
    height: 16px;
  }
}

@media (hover: none) {
  .search-button:hover {
    color: #90e0ef;
    background: none;
  }

  .search-button:active {
    color: #fff;
    background: rgba(144, 224, 239, 0.1);
  }

  .search-button:hover svg {
    transform: none;
  }
}
</style>
