<script>
import City from '../components/City.vue'

const API_URL =
  'https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=43b915b142affe9d52d026e229ce99e1'

export default {
  name: 'CitiesList',
  components: {
    City
  },
  data() {
    return {
      cities: [],
      loading: false,
      error: null
    }
  },
  created() {
    this.fetchCities()
  },
  methods: {
    async fetchCities() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Erreur réseau (code ${response.status})`)
        }
        const data = await response.json()
        this.cities = (data.list || []).map((item) => ({
          id: item.id,
          name: item.name,
          weather: item.weather?.[0]?.description || 'Météo inconnue',
          temperature: item.main?.temp ?? null,
          updatedAt: new Date()
        }))
      } catch (err) {
        this.error = 'Erreur : impossible de récupérer les données météo.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div class="cities-page">
    <header class="header-section">
      <h1>Météo - Liste des Villes</h1>
      <p class="subtitle">Données météorologiques en direct (région Auvergne-Rhône-Alpes)</p>
    </header>

    <!-- État Chargement -->
    <div v-if="loading" class="status-box status-loading">
      <p>Chargement des données météo en cours...</p>
    </div>

    <!-- État Erreur -->
    <div v-else-if="error" class="status-box status-error">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="fetchCities">Réessayer</button>
    </div>

    <!-- État Vide -->
    <div v-else-if="cities.length === 0" class="status-box status-empty">
      <p>Aucune donnée météo disponible actuellement.</p>
    </div>

    <!-- Grille des Villes -->
    <div v-else class="cities-grid">
      <City
        v-for="city in cities"
        :key="city.id"
        :name="city.name"
        :weather="city.weather"
        :temperature="city.temperature"
        :updated-at="city.updatedAt"
      />
    </div>
  </div>
</template>

<style scoped>
.cities-page {
  background-color: #1a202c;
  min-height: calc(100vh - 60px);
  padding: 1.5rem;
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section h1 {
  font-size: 2rem;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #a0aec0;
  font-size: 0.95rem;
  margin: 0;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.status-box {
  text-align: center;
  padding: 3rem 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.status-loading {
  color: #a0aec0;
  font-style: italic;
  background-color: #2d3748;
}

.status-error {
  color: #feb2b2;
  background-color: rgba(229, 62, 62, 0.15);
  border: 1px solid #e53e3e;
}

.status-empty {
  color: #a0aec0;
  background-color: #2d3748;
  border: 1px dashed #4a5568;
}

.retry-btn {
  margin-top: 0.75rem;
  padding: 0.5rem 1.2rem;
  background-color: #e53e3e;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background-color: #c53030;
}
</style>