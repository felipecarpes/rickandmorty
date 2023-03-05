<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useQuery } from "@vue/apollo-composable"
import { CHARACTERS_QUERY } from '../graphql/query'
import Character from '../components/CharacterCard.vue'

  const search = reactive({
    value: ''
  })

  const { result, loading, error, refetch } = useQuery(CHARACTERS_QUERY, 
    () => ({
      "page": 0,
      "filterName": search.value
    })
  )
  
  const characters = computed(() => result.value?.characters?.results)
  const next = computed(() => result.value?.characters?.info?.next)
  const prev = computed(() => result.value?.characters?.info?.prev)
  const loadingCharacters = computed(() => loading.value)
  const errorCharacters = computed(() => error.value)


  const disableButton = computed(() => {
    return prev.value === null
  })

  watch(search, (e) => {
    refetch({
      "page": 0,
      "filterName": e.value
    })
  })

  const nextPage = () => {
    refetch({
      "page": next.value,
      "filterName": search.value
    })

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const previousPage = () => {
    if (prev.value === null) return

    refetch({
      "page": prev.value,
      "filterName": search.value
    })
  }

</script>
<template>
  <div class="page-header">
    <h1>Characters</h1>
    <input placeholder="Search character" v-model="search.value"/>
  </div>
  <div class="home">
    <div v-if="loadingCharacters" class="loading">
      <h1>Loading...</h1>
    </div>
    <div v-if="errorCharacters" class="error">
      <h1>Error</h1>
    </div>
    <Character v-for="character in characters" :character="character" :key="character"/>
  </div>
  <div class="page-actions">
    <span @click="previousPage()" class="page-button" :class="{ 'page-button-disabled': disableButton }">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
      </svg>
    </span>
    <span>página {{ prev + 1 || "..." }}</span>
    <span @click="nextPage()" class="page-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M5.146 1.146a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7.5H2.5a.5.5 0 0 1 0-1h6.793L5.146 1.146z"/>
      </svg>
    </span>
  </div>
</template>
<style scoped>
  .page-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }

  input {
    width: 100%;
    max-width: 350px;
    height: 40px;
    border: none;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
  }

  .home {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 30px;
    justify-items: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .page-actions {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin-top: 30px;
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