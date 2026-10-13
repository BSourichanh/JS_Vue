<script>
import { format } from 'timeago.js'

export default {
  name: 'City',
  props: {
    name: {
      type: String,
      default: 'Lyon'
    },
    weather: {
      type: String,
      default: 'Ensoleillé'
    },
    temperature: {
      type: Number,
      default: 20
    },
    updatedAt: {
      type: [Date, String, Number],
      default: () => new Date()
    }
  },
  computed: {
    timeAgo() {
      return this.updatedAt ? format(this.updatedAt) : 'Récemment'
    }
  }
}
</script>

<template>
  <article class="city-card">
    <div class="city-header">
      <h2 class="city-name">{{ name }}</h2>
      <span class="city-weather-badge">{{ weather }}</span>
    </div>

    <div class="city-body">
      <div class="city-temp">
        <span class="temp-val">{{ temperature !== null ? temperature.toFixed(1) : '--' }}</span>
        <span class="temp-unit">°C</span>
      </div>
    </div>

    <footer class="city-footer">
      <small class="city-time">Mis à jour {{ timeAgo }}</small>
    </footer>
  </article>
</template>

<style scoped>
.city-card {
  background-color: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.city-card:hover {
  transform: translateY(-2px);
  border-color: #63b3ed;
}

.city-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.city-name {
  margin: 0;
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 600;
}

.city-weather-badge {
  background-color: #1a202c;
  color: #63b3ed;
  border: 1px solid #4a5568;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.city-body {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.city-temp {
  display: flex;
  align-items: baseline;
}

.temp-val {
  font-size: 2.2rem;
  font-weight: 700;
  color: #edf2f7;
}

.temp-unit {
  font-size: 1.1rem;
  color: #a0aec0;
  margin-left: 0.2rem;
}

.city-footer {
  border-top: 1px solid #374151;
  padding-top: 0.5rem;
  margin-top: auto;
}

.city-time {
  color: #a0aec0;
  font-size: 0.8rem;
}
</style>