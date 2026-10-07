<script>
import CitiesList from './views/CitiesList.vue';

export default {
  components: {
    CitiesList
  },
  methods: {
    onListClick() {
      alert("Clic sur la liste des données météo !")
    }
  }
}
</script>

<template>
  <main>
    <h1>Application Météo</h1>
    <a href="#" @click.prevent="onListClick">
      Voir les données météo des villes
    </a>
    <hr/>
    <CitiesList/>
  </main>
</template>
<style scoped></style>