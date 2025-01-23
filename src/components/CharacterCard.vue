<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from "vue-router"
const props = defineProps<{
  character: {
    [x: string]: any;
    type: Object;
    default: {};
    required: true;
  }
}>();

const router = useRouter()

const routerToCharacterPage = () => {
  router.push({
    name: 'Character',
    params: {
      id: props.character.id
    }
  })
}
</script>
<template>
  <div class="card" @click="routerToCharacterPage()">
    <img :src="character?.image" alt="character" />
    <h3>{{ character.name }}</h3>
  </div>
</template>
<style scoped>
  .card {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(8px);
    border: 2px solid #61E391;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    box-sizing: border-box;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
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
    z-index: 0;
  }

  @keyframes portalSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: #48E4EE;
    box-shadow: 0 0 15px rgba(72, 228, 238, 0.3),
                0 0 30px rgba(72, 228, 238, 0.2),
                0 0 45px rgba(72, 228, 238, 0.1);
  }

  .card img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 12px;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    border: 1px solid transparent;
    object-fit: cover;
  }

  .card:hover img {
    transform: scale(1.02);
    border-color: #48E4EE;
  }

  .card h3 {
    color: #61E391;
    margin: 0;
    font-size: clamp(0.875rem, 2.5vw, 1.25rem);
    text-align: center;
    font-weight: 600;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(97, 227, 145, 0.3);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }

  .card:hover h3 {
    color: #48E4EE;
  }

  @media (max-width: 768px) {
    .card {
      padding: 0.5rem;
    }

    .card img {
      margin-bottom: 0.5rem;
    }

    .card:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    .card {
      border-width: 1px;
    }

    .card::before {
      animation: none;
    }

    .card:hover {
      transform: none;
      box-shadow: none;
    }

    .card:hover img {
      transform: none;
    }
  }

  @media (hover: none) {
    .card:hover {
      transform: none;
      box-shadow: none;
    }

    .card:hover img {
      transform: none;
    }

    .card::before {
      animation: none;
    }
  }
</style>