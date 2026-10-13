<script>
import api from '../services/api'

export default {
    name: 'MovieDetail',
    data() {
        return {
            movie: null,
            reviews: [],
            loading: true,
            error: null,
            imageError: false
        }
    },
    created() {
        this.fetchMovieDetails()
    },
    watch: {
        '$route.params.id'() {
            this.fetchMovieDetails()
        }
    },
    methods: {
        async fetchMovieDetails() {
            const movieId = this.$route.params.id
            if (!movieId) return

            this.loading = true
            this.error = null
            this.imageError = false

            try {
                // Chargement en parallèle du film et de ses critiques
                const [movieData, reviewsData] = await Promise.all([
                    api.getMovie(movieId),
                    api.getMovieReviews(movieId).catch(() => ({ member: [] }))
                ])

                this.movie = movieData
                this.reviews = reviewsData.member || []
            } catch (err) {
                console.error("Erreur chargement détails film :", err)
                this.error = "Impossible de récupérer les détails de ce film."
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<template>
    <div class="movie-detail-page">
        <!-- Navigation retour -->
        <div class="nav-back">
            <router-link to="/movies" class="back-btn">&larr; Retour au catalogue</router-link>
        </div>

        <!-- Chargement -->
        <div v-if="loading" class="status-box">
            <p>Chargement des détails du film...</p>
        </div>

        <!-- Erreur -->
        <div v-else-if="error" class="status-box status-error">
            <p>{{ error }}</p>
            <button class="retry-btn" @click="fetchMovieDetails">Réessayer</button>
        </div>

        <!-- Fiche du film -->
        <article v-else-if="movie" class="movie-sheet">
            <header class="sheet-header">
                <div class="poster-column">
                    <img v-if="movie.poster && !imageError" :src="movie.poster" :alt="movie.title" class="detail-poster"
                        @error="imageError = true" />
                    <div v-else class="poster-placeholder">
                        <span>🎬</span>
                        <small>Aucune affiche</small>
                    </div>
                </div>

                <div class="info-column">
                    <div class="title-row">
                        <h1>{{ movie.title }}</h1>
                        <span v-if="movie.year" class="year-badge">{{ movie.year }}</span>
                    </div>

                    <!-- Note moyenne & IMDb sécurisées -->
                    <div class="ratings-row">
                        <div v-if="typeof movie.averageRating === 'number'" class="rating-box">
                            <span class="rating-val">★ {{ movie.averageRating.toFixed(1) }}</span>
                            <small class="rating-label">Note communauté</small>
                        </div>
                        <div v-if="movie.imdb && movie.imdb.rating" class="rating-box imdb-box">
                            <span class="rating-val">{{ movie.imdb.rating }} / 10</span>
                            <small class="rating-label">IMDb ({{ movie.imdb.votes || 0 }} votes)</small>
                        </div>
                    </div>

                    <!-- Genres -->
                    <div v-if="movie.genres && movie.genres.length > 0" class="meta-section">
                        <strong>Genres :</strong>
                        <div class="tag-list">
                            <span v-for="g in movie.genres" :key="g.id" class="genre-tag">
                                {{ g.label }}
                            </span>
                        </div>
                    </div>

                    <!-- Réalisateurs -->
                    <div v-if="movie.directors && movie.directors.length > 0" class="meta-section">
                        <strong>Réalisation :</strong>
                        <span>{{movie.directors.map(d => d.fullName || d.name || 'Inconnu').join(', ')}}</span>
                    </div>

                    <!-- Acteurs principaux -->
                    <div v-if="movie.castMembers && movie.castMembers.length > 0" class="meta-section">
                        <strong>Distribution :</strong>
                        <span>{{movie.castMembers.map(c => c.fullName || c.name || 'Inconnu').join(', ')}}</span>
                    </div>

                    <!-- Synopsis -->
                    <div class="synopsis-section">
                        <h2>Synopsis</h2>
                        <p>{{ movie.fullPlot || movie.plot || 'Aucun synopsis disponible.' }}</p>
                    </div>
                </div>
            </header>

            <!-- Section Critiques & Avis -->
            <section class="reviews-section">
                <h2>Avis des spectateurs ({{ reviews.length }})</h2>

                <div v-if="reviews.length === 0" class="no-reviews">
                    <p>Aucune critique n'a encore été déposée pour ce film.</p>
                </div>

                <div v-else class="reviews-grid">
                    <div v-for="review in reviews" :key="review.id" class="review-card">
                        <div class="review-author">
                            <strong>{{ review.user?.username || 'Anonyme' }}</strong>
                            <small v-if="review.createdAt">{{ new Date(review.createdAt).toLocaleDateString() }}</small>
                        </div>
                        <p class="review-text">« {{ review.content }} »</p>
                    </div>
                </div>
            </section>
        </article>
    </div>
</template>

<style scoped>
.movie-detail-page {
    margin: 0 auto;
    padding: 1.5rem;
    background-color: #1a202c;
}

.nav-back {
    margin-bottom: 1.5rem;
}

.back-btn {
    display: inline-block;
    color: #3182ce;
    text-decoration: none;
    font-weight: 500;
}

.back-btn:hover {
    text-decoration: underline;
}

.movie-sheet {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.sheet-header {
    display: flex;
    gap: 2.5rem;
    flex-wrap: wrap;
}

.poster-column {
    flex: 0 0 320px;
}

.detail-poster {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.poster-placeholder {
    width: 100%;
    height: 440px;
    background: #f7fafc;
    border: 2px dashed #cbd5e0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #a0aec0;
}

.info-column {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.title-row {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
}

.title-row h1 {
    font-size: 2.2rem;
    margin: 0;
    color: #1a202c;
}

.year-badge {
    font-size: 1.1rem;
    color: #718096;
    font-weight: 500;
}

.ratings-row {
    display: flex;
    gap: 1rem;
}

.rating-box {
    background: #fffaf0;
    border: 1px solid #feebc8;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.rating-val {
    font-size: 1.25rem;
    font-weight: bold;
    color: #dd6b20;
}

.rating-label {
    font-size: 0.75rem;
    color: #744210;
}

.imdb-box {
    background: #f7fafc;
    border-color: #e2e8f0;
}

.imdb-box .rating-val {
    color: #2b6cb0;
}

.imdb-box .rating-label {
    color: #4a5568;
}

.meta-section {
    font-size: 0.95rem;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tag-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.genre-tag {
    background: #edf2f7;
    color: #2d3748;
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 500;
}

.synopsis-section h2 {
    font-size: 1.3rem;
    margin: 0 0 0.5rem 0;
    color: #2d3748;
}

.synopsis-section p {
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
}

.reviews-section {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.reviews-section h2 {
    font-size: 1.4rem;
    color: #1a202c;
    margin-bottom: 1rem;
}

.reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

.review-card {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
}

.review-author {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #2d3748;
}

.review-author small {
    color: #718096;
}

.review-text {
    margin: 0;
    font-style: italic;
    color: #4a5568;
    line-height: 1.4;
}

.no-reviews {
    color: #718096;
    font-style: italic;
}

.status-box {
    text-align: center;
    padding: 3rem;
    background: #f7fafc;
    border-radius: 8px;
}

.status-error {
    background: #fff5f5;
    border: 1px solid #feb2b2;
    color: #c53030;
}

.retry-btn {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #e53e3e;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>
