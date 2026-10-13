<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Profile',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <header class="profile-header">
        <div class="avatar">👤</div>
        <h1>Espace Utilisateur</h1>
        <span class="auth-badge">Session active (Protégée par JWT)</span>
      </header>

      <section class="profile-info">
        <div class="info-row">
          <span class="label">Identifiant :</span>
          <span class="value">#{{ authStore.currentUser?.id || 'N/A' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Nom d'utilisateur :</span>
          <span class="value font-bold">{{ authStore.currentUser?.username || 'Utilisateur' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Email :</span>
          <span class="value">{{ authStore.currentUser?.email || 'N/A' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Token JWT :</span>
          <span class="value token-preview" :title="authStore.token">
            {{ authStore.token ? authStore.token.substring(0, 24) + '...' : 'Aucun' }}
          </span>
        </div>
      </section>

      <div class="profile-actions">
        <router-link to="/movies" class="btn-catalog">Accéder au catalogue</router-link>
        <button @click="handleLogout" class="btn-logout">Se déconnecter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: calc(100vh - 60px);
  background-color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.profile-card {
  width: 100%;
  max-width: 500px;
  background-color: #2d3748;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid #4a5568;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}

.profile-header h1 {
  color: #ffffff;
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
}

.auth-badge {
  display: inline-block;
  background-color: rgba(72, 187, 120, 0.15);
  color: #48bb78;
  border: 1px solid rgba(72, 187, 120, 0.4);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #1a202c;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #4a5568;
  margin-bottom: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.92rem;
  border-bottom: 1px solid #2d3748;
  padding-bottom: 0.6rem;
}

.info-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  color: #a0aec0;
}

.value {
  color: #ffffff;
}

.font-bold {
  font-weight: 600;
}

.token-preview {
  font-family: monospace;
  font-size: 0.85rem;
  color: #63b3ed;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.btn-catalog,
.btn-logout {
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.btn-catalog {
  background-color: #3182ce;
  color: #ffffff;
  border: none;
}

.btn-catalog:hover {
  background-color: #2b6cb0;
}

.btn-logout {
  background-color: transparent;
  color: #fc8181;
  border: 1px solid #e53e3e;
}

.btn-logout:hover {
  background-color: rgba(229, 62, 62, 0.1);
}
</style>
