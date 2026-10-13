<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  data() {
    return {
      email: 'test1@test.com',
      password: 'password',
      error: null,
      loading: false
    }
  },
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    async handleLogin() {
      this.error = null
      this.loading = true
      try {
        await this.authStore.login(this.email.trim(), this.password)
        const redirectPath = this.$route.query.redirect || '/profile'
        this.$router.push(redirectPath)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.error = 'Identifiants invalides (email ou mot de passe incorrect).'
        } else {
          this.error = "Erreur de connexion avec l'API. Veuillez réessayer."
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <header class="login-header">
        <h1>Connexion</h1>
        <p class="login-subtitle">Connectez-vous pour accéder à votre espace</p>
      </header>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="error" class="error-banner">
          {{ error }}
        </div>

        <div class="form-group">
          <label for="email">Adresse email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="nom@exemple.com"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="form-input"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>

        <div class="demo-credentials">
          <small>Compte de test pré-rempli : <strong>test1@test.com</strong> / <strong>password</strong></small>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 60px);
  background-color: #1a202c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: #2d3748;
  border-radius: 12px;
  padding: 2.2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid #4a5568;
}

.login-header {
  text-align: center;
  margin-bottom: 1.8rem;
}

.login-header h1 {
  color: #ffffff;
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  color: #a0aec0;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.error-banner {
  background-color: #fed7d7;
  color: #9b2c2c;
  border: 1px solid #feb2b2;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  color: #e2e8f0;
  font-size: 0.88rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  color: #ffffff;
  background-color: #1a202c;
  border: 1px solid #4a5568;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.25);
}

.submit-btn {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #3182ce;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2b6cb0;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.demo-credentials {
  text-align: center;
  color: #a0aec0;
  font-size: 0.82rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #4a5568;
}

.demo-credentials strong {
  color: #e2e8f0;
}
</style>
