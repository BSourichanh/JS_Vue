<script>
import City from '../components/City.vue'
import { format, render, cancel, register } from 'timeago.js';

export default {
  components: {
    City
  },
  data() {
    return {
      cities: [
        {
          id: 1,
          name: 'Ville 1',
          weather: 'Ensoleillé',
          temperature: 22.0,
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Ville 2',
          weather: 'Peu nuageux',
          temperature: 19.5,
          updatedAt: new Date()
        }
      ]
    }
  }
}
</script>

<template>
  <div>
    <h1>Météo - Liste des villes</h1>
    <div class="cities-container">
      <strong>
        <City v-for="city in cities" :key="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updatedAt="city.updatedAt" />
      </strong>
    </div>
  </div>
</template>

<style scoped>
.cities-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>