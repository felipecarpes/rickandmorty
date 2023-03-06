<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useQuery } from "@vue/apollo-composable"
import { CHARACTERS_QUERY } from '../graphql/query'
import Character from '../components/CharacterCard.vue'
import Pagination from '../components/Pagination.vue'

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
  const pages = computed(() => result.value?.characters?.info?.pages)
  const loadingCharacters = computed(() => loading.value)
  const errorCharacters = computed(() => error.value)


  const disableButton = computed((): Boolean => {
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

  const hasNotFoundCharacters = computed(() => {
    return characters.value?.length === 0
  })

</script>
<template>
  <div class="page-header">
    <h1>Characters</h1>
    <input placeholder="Search character" v-model="search.value"/>
  </div>
  <div v-if="loadingCharacters" class="loading">
    <img src="/rickandmortyportalload.png" class="loader" />
  </div>
  <div v-else-if="errorCharacters" class="error">
    <h1>Error</h1>
  </div>
  <template v-else>
    <span v-if="hasNotFoundCharacters"> No characters named "{{ search.value }}" were found 😔 </span>
    <template v-else>
      <Pagination :prev="prev + 1" :next="next" :pages="pages" @next-page="nextPage" @previous-page="previousPage"/>
      <div class="home">
        <Character v-for="character in characters" :character="character" :key="character"/>
      </div>
      <Pagination :prev="prev + 1" :next="next" :pages="pages" @next-page="nextPage" @previous-page="previousPage"/>
    </template>
  </template>
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

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .loader {
    margin: 0 auto;
    margin-top: 50px;
    display: block;
    width: 300px;
    box-shadow: 0 0 12px 3px #93f373;
    border-radius: 50%;
    transform: scale(1);
    animation: pulse 1s linear infinite;
  }

  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>