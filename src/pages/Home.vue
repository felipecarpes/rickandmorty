<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import { CHARACTERS_QUERY } from '../graphql/query'
import Character from '../components/CharacterCard.vue'

  const { result, loading, error } = useQuery(CHARACTERS_QUERY)
  
  const characters = computed(() => result.value?.characters?.results)

</script>
<template>
  <h1>Personagens</h1>
  <div class="home">
    <Character v-for="character in characters" :character="character" :key="character"/>
  </div>
</template>
<style scoped>
  .home {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 20px;
  }
</style>