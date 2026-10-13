import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../components/City.vue'
import MovieList from '../views/MovieList.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/movies'
    },
    {
      path: '/movies',
      name: 'movies-list',
      component: MovieList
    },
    {
      path: '/movies/:id',
      name: 'movie-detail',
      component: MovieDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/villes',
      name: 'cities-list',
      component: CitiesList
    },
    {
      path: '/ville',
      name: 'city',
      component: City,
      props: {
        name: 'Lyon (Démonstration)',
        weather: 'Ensoleillé',
        temperature: 21.5,
        updatedAt: new Date()
      }
    }
  ],
})

// Navigation Guard pour la protection des routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token')

  if (to.meta.requiresAuth && !token) {
    // Redirige vers /login en mémorisant la route ciblée
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && token) {
    // Si déjà connecté, redirige vers profile
    next({ name: 'profile' })
  } else {
    next()
  }
})

export default router
