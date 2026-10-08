<script>
export default {
    // L'objet data retourne les données du composant en Options API
    data() {
        return {
            name: 'Ma ville',
            weather: 'Peu nuageux',
            temperature: 20.55,
            updatedAt: new Date()
        }
    }
}
</script>
<template>
    <div class="city">
        <h2>{{ name }}</h2>
        <p>Météo : {{ weather }}</p>
        <p>Température : {{ temperature }} °C</p>
        <!-- toLocaleString() formate la date pour l'affichage -->
        <p>Dernière mise à jour : {{ updatedAt.toLocaleString() }}</p>
    </div>
</template>