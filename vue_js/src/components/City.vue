<script>
import { format } from 'timeago.js'

export default {
    props: ['name', 'weather', 'temperature', 'updatedAt'],
    computed: {
        timeAgo() {
            return this.updatedAt ? format(this.updatedAt) : ''
        }
    }
}
</script>

<template>
    <div class="city">
        <h2>{{ name }}</h2>
        <p>Météo : {{ weather }}</p>
        <p>Température : {{ temperature }} °C</p>
        <p>Dernière mise à jour : {{ timeAgo }}</p>
    </div>
</template>