import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Récupération initiale depuis le localStorage pour persister après F5
    token: localStorage.getItem('jwt_token') || null,
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
    loading: false,
    error: null
  }),

  getters: {
    /**
     * Retourne true si un jeton est présent
     */
    isAuthenticated: (state) => !!state.token,

    /**
     * Retourne le nom d'utilisateur connecté ou une chaîne vide
     */
    currentUsername: (state) => state.user?.username || '',

    /**
     * Retourne l'objet utilisateur complet
     */
    currentUser: (state) => state.user
  },

  actions: {
    /**
     * Authentifie l'utilisateur via l'API Symfony (/api/auth)
     */
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const data = await api.login(email, password)
        
        this.token = data.token
        this.user = data.user || null

        // Sauvegarde locale
        localStorage.setItem('jwt_token', data.token)
        if (data.user) {
          localStorage.setItem('auth_user', JSON.stringify(data.user))
        }

        return true
      } catch (err) {
        this.error = err.response?.data?.message || 'Identifiants invalides (email ou mot de passe incorrect).'
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Déconnecte l'utilisateur et nettoie le stockage local
     */
    logout() {
      this.token = null
      this.user = null
      this.error = null
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('auth_user')
    }
  }
})
