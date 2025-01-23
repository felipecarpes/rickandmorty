<template>
  <div class="characters-grid">
    <div v-for="character in characters" :key="character.id" class="character-card">
      <router-link :to="'/character/' + character.id">
        <img :src="character.image" :alt="character.name">
        <div class="character-info">
          <h3>{{ character.name }}</h3>
          <p>{{ character.species }}</p>
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
    species: string
    image: string
  }>
}>()
</script>

<style scoped>
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.character-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.character-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.character-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.character-info {
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.8)
  );
}

.character-info h3 {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin: 0 0 0.5rem 0;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.character-info p {
  color: #ccc;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    padding: 0.25rem;
  }

  .character-info {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.75rem;
    padding: 0.25rem;
  }

  .character-card:hover {
    transform: none;
    box-shadow: none;
  }

  .character-info {
    padding: 0.5rem;
  }
}

@media (max-width: 360px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
}

@media (hover: none) {
  .character-card:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>
