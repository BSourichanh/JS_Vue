import axios from 'axios'

// 1. Instance configurée avec l'URL de base du backend
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 2. Intercepteurs : gestion du token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('user')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      }
    }
    return Promise.reject(error)
  }
)

// 3. Méthodes métier exportées
export const api = {
  /**
   * Récupère la liste des films avec pagination, filtre par titre et filtre optionnel par genre
   */
  async getMovies(page = 1, itemsPerPage = 12, title = '', genreId = null) {
    const params = { page, itemsPerPage }
    if (title) {
      params.title = title
    }
    const endpoint = genreId ? `/genres/${genreId}/movies` : '/movies'
    const response = await apiClient.get(endpoint, { params })
    return response.data // Renvoie { member: [...], totalItems: ... }
  },

  /**
   * Récupère la liste des genres de films
   */
  async getGenres() {
    const response = await apiClient.get('/genres')
    return response.data
  },

  /**
   * Récupère la fiche détaillée d'un film
   */
  async getMovie(id) {
    const response = await apiClient.get(`/movies/${id}`)
    return response.data
  },

  /**
   * Récupère les critiques d'un film
   */
  async getMovieReviews(id) {
    const response = await apiClient.get(`/movies/${id}/reviews`)
    return response.data
  },

  /**
   * Authentifie un utilisateur (JWT)
   */
  async login(email, password) {
    const response = await apiClient.post('/auth', { email, password })
    return response.data // Renvoie { token: "..." }
  },

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(email, username, plainPassword) {
    const response = await apiClient.post('/users', { email, username, plainPassword })
    return response.data
  }
}

export default api
