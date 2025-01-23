`<template>
  <div class="characters-grid">
    <div v-for="character in characters" :key="character.id" class="character-card">
      <router-link :to="'/character/' + character.id">
        <img :src="character.image" :alt="character.name">
        <div class="character-info">
          <h3>{{ character.name }}</h3>
          <div class="character-meta">
            <span class="status" :class="character.status.toLowerCase()">
              {{ character.status }}
            </span>
            <span class="species">{{ character.species }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  characters: Array<{
    id: string
    name: string
    status: string
    species: string
    image: string
  }>
}>()
</script>

<style scoped>
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.character-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.character-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-card:hover img {
  transform: scale(1.05);
}

.character-info {
  padding: 1.5rem;
}

.character-info h3 {
  margin: 0 0 0.5rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
}

.character-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
}

.status.alive {
  background: #55cc44;
  color: #fff;
}

.status.dead {
  background: #d63d2e;
  color: #fff;
}

.status.unknown {
  background: #9e9e9e;
  color: #fff;
}

.species {
  color: #ccc;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .character-card img {
    height: 200px;
  }

  .character-info {
    padding: 1rem;
  }

  .character-info h3 {
    font-size: 1.1rem;
  }
}
</style>`
