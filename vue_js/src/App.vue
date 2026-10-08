<script>
export default {
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

    <hr />

    <!-- Affiche dynamiquement le composant selon l'URL active -->
    <router-view></router-view>
  </main>
</template>

<style scoped></style>