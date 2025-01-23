`<template>
  <div class="locations-grid">
    <div v-for="location in locations" :key="location.id" class="location-card" @click="$emit('show-details', location)">
      <div class="location-info">
        <h3>{{ location.name }}</h3>
        <div class="location-meta">
          <span class="type">{{ location.type }}</span>
          <span class="dimension">{{ location.dimension }}</span>
        </div>
        <div class="residents-count">
          {{ location.residents.length }} Residents
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  locations: Array<{
    id: string
    name: string
    type: string
    dimension: string
    residents: any[]
  }>
}>()

defineEmits<{
  (e: 'show-details', location: any): void
}>()
</script>

<style scoped>
.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.location-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.location-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.location-info h3 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
}

.location-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.type, .dimension {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background: rgba(144, 224, 239, 0.1);
  color: #90e0ef;
}

.residents-count {
  color: #ccc;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .locations-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .location-card {
    padding: 1rem;
  }

  .location-info h3 {
    font-size: 1.1rem;
  }
}
</style>`
