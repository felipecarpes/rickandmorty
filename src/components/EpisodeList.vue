<template>
  <div class="episodes-grid">
    <div v-for="episode in episodes" :key="episode.id" class="episode-card">
      <div class="episode-content" @click="$emit('show-details', episode)">
        <div class="episode-header">
          <span class="episode-code">{{ episode.episode }}</span>
          <span class="air-date">{{ episode.air_date }}</span>
        </div>
        <h3>{{ episode.name }}</h3>
        <p class="characters-count">{{ episode.characters.length }} Characters</p>
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.episode-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  height: 100%;
  display: flex;
}

.episode-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(144, 224, 239, 0.03),
    transparent 20%,
    transparent 80%,
    rgba(144, 224, 239, 0.03)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.episode-card:hover::before {
  opacity: 1;
}

.episode-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(144, 224, 239, 0.3);
}

.episode-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.episode-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.episode-code {
  color: #90e0ef;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  background: rgba(144, 224, 239, 0.1);
  padding: 0.35rem 0.85rem;
  border-radius: 2rem;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.air-date {
  color: #ccc;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  opacity: 0.8;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.air-date::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #90e0ef;
  border-radius: 50%;
  opacity: 0.5;
}

.episode-content h3 {
  margin: 0 0 auto 0;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #fff;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 600;
}

.characters-count {
  color: #ccc;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  margin: 1rem 0 0 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.characters-count::before {
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23cccccc'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .episodes-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 0.75rem;
  }

  .episode-content {
    padding: 1rem;
  }

  .episode-header {
    margin-bottom: 0.75rem;
  }

  .episode-code {
    padding: 0.25rem 0.75rem;
  }

  .characters-count::before {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .episodes-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .episode-card:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
  }

  .episode-content {
    padding: 0.85rem;
  }

  .episode-header {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .episode-code {
    padding: 0.25rem 0.65rem;
  }
}

@media (max-width: 360px) {
  .episodes-grid {
    grid-template-columns: 1fr;
  }

  .episode-content h3 {
    -webkit-line-clamp: 2;
  }
}

@media (hover: none) {
  .episode-card:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .episode-card:active {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(144, 224, 239, 0.2);
  }

  .episode-card:hover::before,
  .episode-card:active::before {
    opacity: 0;
  }
}
</style>
