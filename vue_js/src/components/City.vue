<script>
export default {
    props: ['name', 'weather', 'temperature', 'updatedAt']
}
</script>
<template>
    <div class="city">
        <h2>{{ name }}</h2>
        <p>Météo : {{ weather }}</p>
        <p>Température : {{ temperature }} °C</p>
        <p>Dernière mise à jour : {{ updatedAt ? updatedAt.toLocaleString() : '' }}</p>
    </div>
</template>
