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
  <button class="previous" :class="{'previous-disabled': disableButton}" v-if="next" @click="previousPage">previous</button>
  <button class="next" v-if="next" @click="nextPage">Next</button>
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

  .next {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #3498DB;
    color: #F7DC6F;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    margin-top: 30px;
    margin-right: 20px;
    transition: all 0.3s ease-in-out;
  }
  
  .previous {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #3498DB;
    color: #F7DC6F;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    margin-top: 30px;
    margin-right: 20px;
    transition: all 0.3s ease-in-out;
  }

  .next:hover {
    background-color: #58D68D;
    transition: all 0.3s ease-in-out;
  }
  
  .previous:hover {
    background-color: #58D68D;
    transition: all 0.3s ease-in-out;
  }

  .previous-disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }

  .previous-disabled:hover {
    background-color: #ccc;
  }

</style>