<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
  character: {
    [x: string]: any;
    type: Object;
    default: {};
    required: true;
  }
}>();
</script>
<template>
  <div class="card">
    <img :src="character?.image" alt="character" />
    <h3>{{ character.name }}</h3>
  </div>
</template>
<style scoped>
  .card {
    width: 350px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    color: #000;
    background-color: #3498DB;
  }

  .card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    background-color: #6C3483;
    color: #fff;
  }

  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .card h3 {
    margin: 10px 0;
  }

  .card span {
    margin: 5px 0;
  }
</style>