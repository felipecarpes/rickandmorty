<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from "@vue/apollo-composable"
import { CHARACTER_QUERY } from '../graphql/query'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const { result, loading, error, refetch } = useQuery(CHARACTER_QUERY, 
  () => ({
    "id": Number(route.params.id)
  })
)

const character = computed(() => result.value?.character)

const loadingCharacter = computed(() => loading.value)

const routerToHomePage = () => {
  router.push({
    name: 'Home'
  })
}

</script>
<template>
  <span @click="routerToHomePage()" class="back-button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
    </svg>
    back 
  </span>
  <h1 v-if="loadingCharacter">Loading...</h1>
  <div class="character-page" v-else>
    <span @click="routerToHomePage()" class="back-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.854 1.146a.5.5 0 0 1 0 .708L6.707 6H13.5a.5.5 0 0 1 0 1H6.707l4.147 4.146a.5.5 0 1 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"/>
      </svg>
      back 
    </span>
    <div class="page-header">
      <h1>{{ character?.name }}</h1>
    </div>
    <div class="character-principal-info">
      <img :src="character?.image" alt="character" />
      <div class="character-info">
        <h3>Character informations</h3>
        <span class="character-general-info-key">status: <span>{{ character?.status }}</span></span>
        <span class="character-general-info-key">species: <span>{{ character?.species }}</span></span>
        <span class="character-general-info-key">gender: <span>{{ character?.gender }}</span></span>
        <span class="character-general-info-key">origin: <span>{{ character?.origin?.dimension || "unknown" }}</span></span>
      </div>
      <div class="episodes-content">
        <h2 class="episodes-title">Episodes</h2>
        <ul class="episodes-list">
          <li v-for="episode in character?.episode" :key="episode.id">
            {{ episode.name }} - {{ episode.episode }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .character-page {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "page-header"
      "character-principal-info";
    grid-gap: 1rem;
  }

  .page-header {
    grid-area: page-header;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .character-principal-info {
    grid-area: character-principal-info;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "character-image character-info"
      "episodes episodes";
    grid-gap: 1rem;
  }

  .character-info {
    grid-area: character-info;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .character-general-info-key {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    border-bottom: 1px solid #58D68D;
    padding-bottom: 2px;
  }

  .character-general-info-key span {
    font-weight: 600;
  }

  .episodes-content {
    grid-area: episodes;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .episodes-title {
    margin-bottom: 1rem;
  }

  .episodes-list {
    list-style: none;
    padding: 0;
  }

  .episodes-list li {
    margin-bottom: 1rem;
    color: #58D68D;
  }

  .episodes-list li:hover {
    color: #3498DB;
    cursor: pointer;
  }

  img {
    grid-area: character-image;
    width: 100%;
    max-width: 350px;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
    border-radius: 10px;
  }

  span {
    cursor: pointer;
  }

  span:hover {
    color: #3498DB;
  }

  .back-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    line-height: 1;
    padding-bottom: 1rem;
  }

  .back-button svg {
    margin-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
  }

  @media (max-width: 768px) {
    .character-page {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: 
        "page-header"
        "character-principal-info";
        height: auto;
        max-height: 100px;
    }

    .character-principal-info {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: 
        "character-image"
        "character-info"
        "episodes";
    }
    
    .page-header {
      grid-area: page-header;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      max-height: 300px;
    }

    .episodes-content {
      margin-top: 1rem;
    }

    .episodes-title {
      margin-bottom: 0;
    }

    .episodes-list {
      margin-top: 1rem;
    }

    .episodes-list li {
      margin-bottom: 0;
    }
    
    .episodes-list li:hover {
      color: #3498DB;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }

    .character-info {
      margin-top: 1rem;
    }

    .character-general-info-key {
      margin-bottom: 0;
    }

    .character-general-info-key span {
      font-weight: 400;
    }
  }
</style>