<script setup lang="ts">
</script>

<template>
  <div class="app">
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #00b4d8;
  --text-color: #ffffff;
  --background-color: #1a1a1a;
  --card-background: rgba(255, 255, 255, 0.05);
  --hover-background: rgba(255, 255, 255, 0.08);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

.main-content {
  padding-top: 72px; /* Height of the navbar */
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 1rem;
    padding-bottom: 72px; /* Height of the mobile navbar */
  }
}
</style>
