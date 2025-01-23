`<template>
  <div class="episodes-grid">
    <div v-for="episode in episodes" :key="episode.id" class="episode-card" @click="$emit('show-details', episode)">
      <div class="episode-info">
        <h3>{{ episode.name }}</h3>
        <div class="episode-meta">
          <span class="episode-code">{{ episode.episode }}</span>
          <span class="air-date">{{ episode.air_date }}</span>
        </div>
        <div class="characters-count">
          {{ episode.characters.length }} Characters
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  episodes: Array<{
    id: string
    name: string
    episode: string
    air_date: string
    characters: any[]
  }>
}>()

defineEmits<{
  (e: 'show-details', episode: any): void
}>()
</script>

<style scoped>
.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.episode-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.episode-info h3 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
}

.episode-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.episode-code {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background: rgba(144, 224, 239, 0.1);
  color: #90e0ef;
}

.air-date {
  color: #ccc;
  font-size: 0.9rem;
  padding: 0.25rem 0;
}

.characters-count {
  color: #ccc;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .episodes-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .episode-card {
    padding: 1rem;
  }

  .episode-info h3 {
    font-size: 1.1rem;
  }
}
</style>`
