<script>
import { useAuthStore } from './stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  mounted() {
    window.addEventListener('auth:unauthorized', this.handleUnauthorized)
  },
  beforeUnmount() {
    window.removeEventListener('auth:unauthorized', this.handleUnauthorized)
  },
  methods: {
    handleUnauthorized() {
      this.authStore.logout()
      if (this.$route.meta?.requiresAuth) {
        this.$router.push('/login')
      }
    },
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <div class="app-layout">
    <header class="app-navbar">
      <div class="navbar-container">
        <router-link to="/movies" class="nav-brand">🎬 Cinéma App</router-link>

        <nav class="nav-links">
          <router-link to="/movies" class="nav-item">Films</router-link>
          <router-link to="/villes" class="nav-item">Météo</router-link>

          <template v-if="authStore.isAuthenticated">
            <router-link to="/profile" class="nav-item nav-profile">
              Mon Profil ({{ authStore.currentUser?.username || 'Utilisateur' }})
            </router-link>
            <button @click="handleLogout" class="nav-btn-logout">Déconnexion</button>
          </template>

          <template v-else>
            <router-link to="/login" class="nav-btn-login">Connexion</router-link>
          </template>
        </nav>
      </div>
    </header>

    <main>
      <!-- Affiche dynamiquement le composant avec mise en cache de MovieList -->
      <router-view v-slot="{ Component }">
        <keep-alive include="MovieList">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Reset global */
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
</style>

<style scoped>
.app-navbar {
  background-color: #141923;
  border-bottom: 1px solid #2d3748;
  padding: 0.85rem 1.5rem;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-item {
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #ffffff;
}

.nav-profile {
  color: #63b3ed;
}

.nav-btn-login {
  background-color: #3182ce;
  color: #ffffff;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.nav-btn-login:hover {
  background-color: #2b6cb0;
}

.nav-btn-logout {
  background-color: transparent;
  color: #fc8181;
  border: 1px solid #e53e3e;
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn-logout:hover {
  background-color: rgba(229, 62, 62, 0.15);
}
</style>