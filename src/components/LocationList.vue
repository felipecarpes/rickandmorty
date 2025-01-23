<template>
  <div class="locations-grid">
    <div v-for="location in locations" :key="location.id" class="location-card">
      <div class="location-content" @click="$emit('show-details', location)">
        <h3>{{ location.name }}</h3>
        <div class="location-meta">
          <span class="type">{{ location.type }}</span>
          <span class="dimension">{{ location.dimension }}</span>
        </div>
        <p class="residents-count">{{ location.residents.length }} Residents</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Character {
  id: string
  name: string
  status?: string
  species: string
  image: string
}

interface Location {
  id: string
  name: string
  type: string
  dimension: string
  residents: Readonly<Character[]>
}

defineProps<{
  locations: Location[]
}>()

defineEmits<{
  (e: 'show-details', location: Location): void
}>()
</script>

<style scoped>
.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.location-card {
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

.location-card::before {
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

.location-card:hover::before {
  opacity: 1;
}

.location-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(144, 224, 239, 0.3);
}

.location-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.location-content h3 {
  margin: 0 0 1rem 0;
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

.location-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 auto 0;
}

.type, .dimension {
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  color: #90e0ef;
  background: rgba(144, 224, 239, 0.1);
  padding: 0.35rem 0.85rem;
  border-radius: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  box-sizing: border-box;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.type {
  background: rgba(144, 224, 239, 0.1);
}

.dimension {
  background: rgba(97, 227, 145, 0.1);
  color: #61E391;
}

.residents-count {
  color: #ccc;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  margin: 1rem 0 0 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.residents-count::before {
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
  .locations-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 0.75rem;
  }

  .location-content {
    padding: 1rem;
  }

  .location-content h3 {
    margin: 0 0 0.75rem 0;
  }

  .type, .dimension {
    padding: 0.25rem 0.75rem;
  }

  .residents-count::before {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .locations-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .location-card:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
  }

  .location-content {
    padding: 0.85rem;
  }

  .location-content h3 {
    margin: 0 0 0.75rem 0;
  }

  .type, .dimension {
    padding: 0.25rem 0.65rem;
  }
}

@media (max-width: 360px) {
  .locations-grid {
    grid-template-columns: 1fr;
  }

  .location-content h3 {
    -webkit-line-clamp: 2;
  }
}

@media (hover: none) {
  .location-card:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .location-card:active {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(144, 224, 239, 0.2);
  }

  .location-card:hover::before,
  .location-card:active::before {
    opacity: 0;
  }
}
</style>
