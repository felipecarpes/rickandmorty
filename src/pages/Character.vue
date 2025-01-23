<template>
  <div class="character-page">
    <!-- Hero Section -->
    <section class="hero">
      <BackButton class="back-button" />
      <div class="hero-content" v-if="character">
        <div class="character-header">
          <div class="image-container">
            <img :src="character.image" :alt="character.name" class="character-image">
            <div class="status-badge" :class="character.status.toLowerCase()">
              {{ character.status }}
            </div>
          </div>
          <div class="character-title">
            <h1>{{ character.name }}</h1>
            <p class="character-subtitle">{{ character.species }} • {{ character.gender }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="main-content" v-if="character">
      <!-- Character Info -->
      <aside class="info-sidebar">
        <div class="info-card">
          <div class="info-row">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M2 12h20"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="info-label">Origin</span>
              <span class="info-value">{{ character.origin.name }}</span>
              <span class="info-detail" v-if="character.origin.dimension">{{ character.origin.dimension }}</span>
            </div>
          </div>

          <div class="info-divider"></div>

          <div class="info-row">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="info-label">Last Known Location</span>
              <span class="info-value">{{ character.location.name }}</span>
              <span class="info-detail" v-if="character.location.dimension">{{ character.location.dimension }}</span>
            </div>
          </div>

          <div class="info-divider"></div>

          <div class="info-row">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="info-content">
              <span class="info-label">Appears In</span>
              <span class="info-value">{{ character.episode.length }} Episodes</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Episodes Section -->
      <section class="episodes-section">
        <h2>Episodes</h2>
        <div class="episodes-grid">
          <div v-for="episode in character.episode" :key="episode.id" class="episode-card">
            <div class="episode-header">
              <span class="episode-code">{{ episode.episode }}</span>
              <span class="episode-date">{{ episode.air_date }}</span>
            </div>
            <h3>{{ episode.name }}</h3>
          </div>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div v-if="loadingCharacter" class="loading-container">
      <Loader />
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useQuery } from "@vue/apollo-composable"
  import { CHARACTER_QUERY } from '../graphql/query'
  import { useRoute } from "vue-router"
  import BackButton from '../components/BackButton.vue'
  import Loader from '../components/Loader.vue'

  const route = useRoute()

  const { result, loading, error } = useQuery(CHARACTER_QUERY, 
    () => ({
      "id": Number(route.params.id)
    })
  )

  const character = computed(() => result.value?.character)
  const loadingCharacter = computed(() => loading.value)
</script>

<style scoped>
  .character-page {
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
  }

  .hero {
    position: relative;
    padding: 1.5rem 1rem;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }

  .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 2;
  }

  .character-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 3rem 0 1rem;
  }

  .image-container {
    position: relative;
    width: clamp(150px, 30vw, 200px);
    height: clamp(150px, 30vw, 200px);
  }

  .character-image {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .status-badge {
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    font-weight: 500;
    text-transform: capitalize;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
  }

  .status-badge.alive {
    background: #55cc44;
    color: #fff;
  }

  .status-badge.dead {
    background: #d63d2e;
    color: #fff;
  }

  .status-badge.unknown {
    background: #9e9e9e;
    color: #fff;
  }

  .character-title {
    text-align: center;
    padding: 0 1rem;
  }

  .character-title h1 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    background: linear-gradient(45deg, #00b4d8, #90e0ef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .character-subtitle {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
    color: #ccc;
  }

  .main-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .info-sidebar {
    position: sticky;
    top: 1rem;
  }

  .info-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    padding: 1.25rem;
  }

  .info-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem 0;
  }

  .info-icon {
    flex-shrink: 0;
    width: clamp(20px, 4vw, 24px);
    height: clamp(20px, 4vw, 24px);
    color: #90e0ef;
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .info-label {
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    color: #90e0ef;
  }

  .info-value {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: #fff;
    font-weight: 500;
    word-break: break-word;
  }

  .info-detail {
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    color: #ccc;
    word-break: break-word;
  }

  .info-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0.5rem 0;
  }

  .episodes-section {
    padding: 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
  }

  .episodes-section h2 {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    margin-bottom: 1.25rem;
    color: #fff;
  }

  .episodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .episode-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.75rem;
    padding: 1rem;
    transition: all 0.3s ease;
  }

  .episode-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }

  .episode-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .episode-code {
    font-size: clamp(0.8rem, 2.5vw, 0.9rem);
    color: #90e0ef;
    font-weight: 500;
  }

  .episode-date {
    font-size: clamp(0.75rem, 2.5vw, 0.85rem);
    color: #ccc;
  }

  .episode-card h3 {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    color: #fff;
    line-height: 1.4;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }

  .error-container {
    text-align: center;
    color: #d63d2e;
    padding: 1.5rem;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }

  @media (max-width: 1024px) {
    .main-content {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .info-sidebar {
      position: static;
    }

    .episodes-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .character-page {
      padding: 0.5rem;
    }

    .hero {
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.75rem;
    }

    .character-header {
      padding: 2.5rem 0 1rem;
      gap: 1.25rem;
    }

    .main-content {
      padding: 0 0.5rem;
    }

    .info-card {
      padding: 1rem;
    }

    .episodes-section {
      padding: 1rem;
    }

    .episodes-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.75rem;
    }

    .episode-card {
      padding: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .character-page {
      padding: 0;
    }

    .hero {
      margin-bottom: 0.5rem;
      border-radius: 0;
    }

    .character-header {
      padding: 2rem 0 0.75rem;
    }

    .main-content {
      padding: 0;
      gap: 0.5rem;
    }

    .info-card,
    .episodes-section {
      border-radius: 0;
    }

    .episodes-grid {
      grid-template-columns: 1fr;
    }

    .episode-card:hover {
      transform: none;
    }
  }

  @media (hover: none) {
    .episode-card:hover {
      transform: none;
      background: rgba(255, 255, 255, 0.05);
    }

    .episode-card:active {
      background: rgba(255, 255, 255, 0.08);
    }
  }
</style>