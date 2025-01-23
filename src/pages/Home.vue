<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Rick and Morty Explorer</h1>
        <p>Explore the multiverse and discover all characters, locations and episodes from the show</p>
      </div>
    </section>

    <div class="main-content">
      <aside class="tech-stack">
        <h2>Built With</h2>
        <div class="tech-icons">
          <div class="tech-item">
            <img src="/vue.svg" alt="Vue.js" />
            <span>Vue 3</span>
          </div>
          <div class="tech-item">
            <img src="/typescript.svg" alt="TypeScript" />
            <span>TypeScript</span>
          </div>
          <div class="tech-item">
            <img src="/graphql.svg" alt="GraphQL" />
            <span>GraphQL</span>
          </div>
        </div>

        <div class="about">
          <h2>About</h2>
          <p>
            A modern web application built with Vue 3's Composition API,
            TypeScript, and GraphQL to explore the Rick and Morty universe.
          </p>
          <div class="github-link">
            <a href="https://github.com/felipecarpes/rickandmorty" target="_blank" rel="noopener noreferrer">
              <img src="/github.svg" alt="GitHub" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </aside>

      <section class="character-explorer">
        <TabNavigation 
          :active-tab="activeTab"
          :tabs="[
            { id: 'characters', label: 'Characters', count: charactersCount },
            { id: 'locations', label: 'Locations', count: locationsCount },
            { id: 'episodes', label: 'Episodes', count: episodesCount }
          ]"
          @change="handleTabChange"
        />

        <!-- Characters Section -->
        <div v-if="activeTab === 'characters'" class="content-section">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search characters..." 
              @input="handleSearch"
            >
          </div>

          <CharacterList :characters="characters" />
          <Pagination 
            :currentPage="currentPage" 
            :totalPages="totalPages" 
            @page-change="handlePageChange"
          />
        </div>

        <!-- Locations Section -->
        <div v-else-if="activeTab === 'locations'" class="content-section">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="locationSearch" 
              placeholder="Search locations..." 
              @input="handleLocationSearch"
            >
          </div>

          <LocationList 
            :locations="locations"
            @show-details="openLocationModal"
          />
          <Pagination 
            :currentPage="locationPage" 
            :totalPages="locationTotalPages" 
            @page-change="handleLocationPageChange"
          />
        </div>

        <!-- Episodes Section -->
        <div v-else class="content-section">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="episodeSearch" 
              placeholder="Search episodes..." 
              @input="handleEpisodeSearch"
            >
          </div>

          <EpisodeList 
            :episodes="episodes"
            @show-details="openEpisodeModal"
          />
          <Pagination 
            :currentPage="episodePage" 
            :totalPages="episodeTotalPages" 
            @page-change="handleEpisodePageChange"
          />
        </div>

        <!-- Location Modal -->
        <div v-if="selectedLocation" class="modal" @click.self="closeLocationModal">
          <div class="modal-content">
            <button class="close-button" @click="closeLocationModal">×</button>
            
            <div class="modal-header">
              <h2>{{ selectedLocation.name }}</h2>
              <div class="location-meta">
                <span class="dimension-badge">{{ selectedLocation.dimension }}</span>
                <span class="type-badge">{{ selectedLocation.type }}</span>
              </div>
            </div>

            <div class="modal-body">
              <div class="residents-section">
                <h3>Residents</h3>
                <div v-if="locationResidents.length" class="residents-grid">
                  <div v-for="resident in locationResidents" :key="resident.id" class="resident-card">
                    <router-link :to="'/character/' + resident.id">
                      <div class="resident-image-container">
                        <img :src="resident.image" :alt="resident.name">
                        <div class="status-indicator" :class="resident?.status?.toLowerCase() || 'unknown'"></div>
                      </div>
                      <span class="resident-name">{{ resident.name }}</span>
                    </router-link>
                  </div>
                </div>
                <div v-else class="no-residents">
                  No residents found in this location
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Episode Modal -->
        <div v-if="selectedEpisode && selectedEpisode.characters" class="modal" @click.self="closeEpisodeModal">
          <div class="modal-content">
            <button class="close-button" @click="closeEpisodeModal">×</button>

            <div class="modal-header">
              <h2>{{ selectedEpisode.name }}</h2>
              <div class="episode-meta">
                <span class="episode-code">{{ selectedEpisode.episode }}</span>
                <span class="air-date">{{ selectedEpisode.air_date }}</span>
              </div>
            </div>
            
            <div class="modal-body">
              <div class="characters-section">
                <h3>Characters</h3>
                <div v-if="episodeCharacters.length" class="characters-grid">
                  <div v-for="character in episodeCharacters" :key="character.id" class="character-card">
                    <router-link :to="'/character/' + character.id">
                      <div class="character-image-container">
                        <img :src="character.image" :alt="character.name">
                        <div class="status-indicator" :class="character?.status?.toLowerCase() || 'unknown'"></div>
                      </div>
                      <span class="character-name">{{ character.name }}</span>
                    </router-link>
                  </div>
                </div>
                <div v-else class="no-characters">
                  No characters found in this episode
                </div>
              </div>
            </div>
          </div>
        </div>

        <Loader v-if="loading" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import TabNavigation from '../components/TabNavigation.vue'
import CharacterList from '../components/CharacterList.vue'
import LocationList from '../components/LocationList.vue'
import EpisodeList from '../components/EpisodeList.vue'
import Loader from '../components/Loader.vue'
import Pagination from '../components/Pagination.vue'

// State
const activeTab = ref('characters')
const searchQuery = ref('')
const locationSearch = ref('')
const episodeSearch = ref('')
const loading = ref(false)
const selectedLocation = ref(null)
const selectedEpisode = ref(null)
const locationResidents = computed(() => selectedLocation.value?.residents || [])
const episodeCharacters = computed(() => selectedEpisode.value?.characters || [])

// Pagination state
const currentPage = ref(1)
const totalPages = ref(1)
const locationPage = ref(1)
const locationTotalPages = ref(1)
const episodePage = ref(1)
const episodeTotalPages = ref(1)

// Counters for tabs
const charactersCount = ref(0)
const locationsCount = ref(0)
const episodesCount = ref(0)

// GraphQL Queries
const CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          id
          name
        }
        origin {
          id
          name
        }
      }
    }
  }
`

const LOCATIONS_QUERY = gql`
  query GetLocations($page: Int!, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
    }
  }
`

const EPISODES_QUERY = gql`
  query GetEpisodes($page: Int!, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`

// Query Results with variables
const { result: charactersResult, refetch: refetchCharacters } = useQuery(CHARACTERS_QUERY, () => ({
  page: currentPage.value,
  filter: searchQuery.value ? { name: searchQuery.value } : {}
}))

const { result: locationsResult, refetch: refetchLocations } = useQuery(LOCATIONS_QUERY, () => ({
  page: locationPage.value,
  filter: locationSearch.value ? { name: locationSearch.value } : {}
}))

const { result: episodesResult, refetch: refetchEpisodes } = useQuery(EPISODES_QUERY, () => ({
  page: episodePage.value,
  filter: episodeSearch.value ? { name: episodeSearch.value } : {}
}))

const characters = useResult(charactersResult, [], data => {
  charactersCount.value = data.characters.info.count
  return data.characters.results
})

const locations = useResult(locationsResult, [], data => {
  locationsCount.value = data.locations.info.count
  return data.locations.results
})

const episodes = useResult(episodesResult, [], data => {
  episodesCount.value = data.episodes.info.count
  return data.episodes.results
})

watch(charactersResult, (data) => {
  if (data?.characters) {
    characters.value = data.characters.results
    charactersCount.value = data.characters.info.count
    totalPages.value = data.characters.info.pages
  }
})

watch(locationsResult, (data) => {
  if (data?.locations) {
    locations.value = data.locations.results
    locationsCount.value = data.locations.info.count
    locationTotalPages.value = data.locations.info.pages
  }
})

watch(episodesResult, (data) => {
  if (data?.episodes) {
    episodes.value = data.episodes.results
    episodesCount.value = data.episodes.info.count
    episodeTotalPages.value = data.episodes.info.pages
  }
})

// Event Handlers
const handleTabChange = (tab: string) => {
  activeTab.value = tab
}

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await refetchCharacters()
}

const handleLocationPageChange = async (page: number) => {
  locationPage.value = page
  await refetchLocations()
}

const handleEpisodePageChange = async (page: number) => {
  episodePage.value = page
  await refetchEpisodes()
}

const handleSearch = async () => {
  currentPage.value = 1
  await refetchCharacters()
}

const handleLocationSearch = async () => {
  locationPage.value = 1
  await refetchLocations()
}

const handleEpisodeSearch = async () => {
  episodePage.value = 1
  await refetchEpisodes()
}

const openLocationModal = (location) => {
  selectedLocation.value = location
}

const closeLocationModal = () => {
  selectedLocation.value = null
}

const openEpisodeModal = (episode) => {
  selectedEpisode.value = episode
}

const closeEpisodeModal = () => {
  selectedEpisode.value = null
}

onMounted(() => {
  // Initial data fetch
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 100vh;
  width: 100%;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero p {
  font-size: clamp(1rem, 3vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  padding: 0 1rem;
}

.main-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.tech-stack {
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
  width: 100%;
  box-sizing: border-box;
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.tech-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tech-item img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.about {
  margin-top: 2rem;
}

.about h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
}

.about p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: clamp(0.9rem, 3vw, 1rem);
}

.github-link {
  display: flex;
  justify-content: center;
}

.github-link a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: var(--surface-color);
  transition: opacity 0.2s;
}

.github-link a:hover {
  opacity: 0.8;
}

.github-link img {
  width: 24px;
  height: 24px;
}

.character-explorer {
  width: 100%;
}

.content-section {
  margin-top: 1rem;
  width: 100%;
}

.search-bar {
  margin-bottom: 1rem;
  width: 100%;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--surface-color);
  color: var(--text-color);
  font-size: 1rem;
  box-sizing: border-box;
}

.residents-grid,
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
}

.resident-card,
.character-card {
  background: var(--surface-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  width: 100%;
}

.resident-image-container,
.character-image-container {
  position: relative;
  padding-top: 100%;
  width: 100%;
}

.resident-image-container img,
.character-image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resident-name,
.character-name {
  display: block;
  padding: 0.75rem;
  text-align: center;
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1000;
}

.modal-content {
  background: var(--surface-color);
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  background: var(--surface-color);
  z-index: 1;
}

.modal-header h2 {
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  margin-bottom: 0.5rem;
}

.location-meta,
.episode-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dimension-badge,
.type-badge,
.episode-code,
.air-date {
  background: var(--surface-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
}

.modal-body {
  padding: 1.5rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }

  .tech-stack {
    order: 2;
  }

  .character-explorer {
    order: 1;
  }

  .residents-grid,
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 0 0.5rem;
  }

  .hero {
    padding: 2rem 0.5rem;
    margin-bottom: 1rem;
  }

  .main-content {
    gap: 1rem;
    padding: 0;
  }

  .tech-stack {
    padding: 1rem;
  }

  .residents-grid,
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }

  .tech-icons {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .modal {
    padding: 0;
  }

  .modal-content {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }

  .modal-header {
    padding: 1rem 0.5rem;
  }

  .modal-body {
    padding: 0.5rem;
  }

  .location-meta,
  .episode-meta {
    gap: 0.25rem;
  }

  .dimension-badge,
  .type-badge,
  .episode-code,
  .air-date {
    padding: 0.25rem 0.75rem;
  }
}

@media (max-width: 360px) {
  .residents-grid,
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }

  .tech-icons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>