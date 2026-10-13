<script>
export default {
    name: 'Movie',
    props: {
        id: {
            type: [Number, String],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            default: null
        },
        poster: {
            type: String,
            default: ''
        },
        rating: {
            type: Number,
            default: null
        },
        genres: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            imageError: false
        }
    }
}
</script>

<template>
    <router-link :to="'/movies/' + id" class="movie-card">
        <div class="poster-wrapper">
            <img v-if="poster && !imageError" :src="poster" :alt="title" class="poster-img"
                @error="imageError = true" loading="lazy" />
            <div v-else class="poster-fallback">
                <span>🎬</span>
                <small class="poster-text">Pas d'image</small>
            </div>
        </div>

        <div class="movie-content">
            <h3 class="movie-title" :title="title">{{ title }}</h3>

            <div v-if="genres.length" class="movie-genres">
                <span v-for="g in genres" :key="g.id" class="genre-pill">
                    {{ g.label }}
                </span>
            </div>

            <div class="movie-meta">
                <span v-if="year" class="year">{{ year }}</span>
                <span v-if="rating !== null" class="rating">★ {{ rating.toFixed(1) }}</span>
                <span v-else class="rating-none">Non noté</span>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.movie-card {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.movie-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.poster-wrapper {
    width: 100%;
    height: 280px;
    background-color: #5f5f5f;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.poster-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #8c9ba5;
    font-size: 2rem;
    gap: 0.25rem;
}

.poster-fallback small {
    font-size: 0.85rem;
}

.poster-text {
    color: white;
}

.movie-content {
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
}

.movie-title {
    margin: 0;
    font-size: 1.05rem;
    color: #24292e;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.movie-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #586069;
}

.rating {
    color: #e3a21a;
    font-weight: 600;
}

.rating-none {
    color: #999;
}

.detail-link {
    margin-top: auto;
    padding-top: 0.5rem;
    text-decoration: none;
    color: #0366d6;
    font-size: 0.9rem;
    font-weight: 500;
}

.detail-link:hover {
    text-decoration: underline;
}

.movie-genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
}

.genre-pill {
    font-size: 0.72rem;
    background-color: #edf2f7;
    color: #4a5568;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
    font-weight: 500;
}
</style>