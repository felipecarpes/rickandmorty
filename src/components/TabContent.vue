`<template>
  <div class="tab-content">
    <!-- Characters Section -->
    <div v-if="activeTab === 'characters'" class="content-section">
      <SearchBar 
        v-model="searchQuery" 
        placeholder="Search characters..." 
        @search="handleSearch"
      />
      <CharacterGrid :characters="characters" />
    </div>

    <!-- Locations Section -->
    <div v-else-if="activeTab === 'locations'" class="content-section">
      <SearchBar 
        v-model="locationSearch" 
        placeholder="Search locations..." 
        @search="handleLocationSearch"
      />
      <LocationGrid 
        :locations="locations" 
        @show-details="showLocationDetails"
      />
    </div>

    <!-- Episodes Section -->
    <div v-else class="content-section">
      <SearchBar 
        v-model="episodeSearch" 
        placeholder="Search episodes..." 
        @search="handleEpisodeSearch"
      />
      <EpisodeGrid 
        :episodes="episodes" 
        @show-details="showEpisodeDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'
import CharacterGrid from './CharacterGrid.vue'
import LocationGrid from './LocationGrid.vue'
import EpisodeGrid from './EpisodeGrid.vue'

const props = defineProps<{
  activeTab: string
  characters: any[]
  locations: any[]
  episodes: any[]
}>()

const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'location-search', query: string): void
  (e: 'episode-search', query: string): void
  (e: 'show-location', location: any): void
  (e: 'show-episode', episode: any): void
}>()

const searchQuery = ref('')
const locationSearch = ref('')
const episodeSearch = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleLocationSearch = () => {
  emit('location-search', locationSearch.value)
}

const handleEpisodeSearch = () => {
  emit('episode-search', episodeSearch.value)
}

const showLocationDetails = (location: any) => {
  emit('show-location', location)
}

const showEpisodeDetails = (episode: any) => {
  emit('show-episode', episode)
}
</script>

<style scoped>
.tab-content {
  margin-top: 2rem;
}

.content-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>`
