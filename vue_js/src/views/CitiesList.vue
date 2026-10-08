<script>
// 1. On importe le composant enfant
import City from '../components/City.vue'
export default {
  // 2. On déclare le composant
  components: {
    City
  },
  // 3. On stocke les données ici dans le parent
  data() {
    return {
      name: 'Ma ville',
      weather: 'Peu nuageux',
      temperature: 20.55,
      updatedAt: new Date()
    }
  }
}
</script>
<template>
  <div>
    <h1>Météo - Liste des villes</h1>
    <!-- 4. On appelle City et on lui passe les props grâce à ":" (v-bind) -->
    <City :name="name" :weather="weather" :temperature="temperature" :updatedAt="updatedAt" />
  </div>
</template>