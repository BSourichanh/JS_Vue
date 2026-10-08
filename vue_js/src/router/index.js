import { createRouter, createWebHistory } from 'vue-router'
import CitiesList from '../views/CitiesList.vue'
import City from '../components/City.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/villes'
    },
    {
      path: '/villes',
      name: 'cities-list',
      component: CitiesList
    },
    {
      path: '/ville',
      name: 'city',
      component: City
    }
  ],
})

export default router
