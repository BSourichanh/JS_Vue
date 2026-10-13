<script>
import Movie from '../components/Movie.vue'
import Pagination from '../components/Pagination.vue'
import api from '../services/api'

export default {
    name: 'MovieList',
    components: {
        Movie,
        Pagination
    },
    data() {
        return {
            movies: [],
            genres: [],
            selectedGenre: '',
            loading: false,
            error: null,
            page: 1,
            itemsPerPage: 20,
            totalItems: 0,
            searchQuery: '',
            savedScrollY: 0,
            debounceTimer: null
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage) || 1
        },
        hasPrev() {
            return this.page > 1
        },
        hasNext() {
            return this.page < this.totalPages
        }
    },
    created() {
        this.fetchGenres()
        this.fetchMovies()
    },
    beforeUnmount() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
        }
    },
    activated() {
        window.scrollTo({ top: this.savedScrollY, behavior: 'instant' })
    },
    beforeRouteLeave(to, from, next) {
        this.savedScrollY = window.scrollY
        next()
    },
    methods: {
        async fetchGenres() {
            try {
                const data = await api.getGenres()
                this.genres = data.member || []
            } catch (err) {
                console.error("Impossible de récupérer la liste des genres :", err)
            }
        },
        async fetchMovies() {
            this.loading = true
            this.error = null
            try {
                const data = await api.getMovies(this.page, this.itemsPerPage, this.searchQuery.trim(), this.selectedGenre || null)
                this.movies = data.member.map(item => ({
                    id: item.id,
                    title: item.title,
                    year: item.year,
                    poster: item.poster,
                    rating: item.averageRating ?? (item.imdb?.rating ? parseFloat(item.imdb.rating) : null),
                    genres: item.genres || [],
                    votes: item.imdb?.votes ? parseInt(item.imdb.votes, 10) : 0
                }))
                this.totalItems = data.totalItems ?? 0
            } catch (error) {
                this.error = "Erreur : impossible de récupérer la liste des films."
            } finally {
                this.loading = false
            }
        },
        onSearchInput() {
            clearTimeout(this.debounceTimer)
            this.debounceTimer = setTimeout(() => {
                this.page = 1
                this.fetchMovies()
            }, 350)
        },
        onGenreChange() {
            this.page = 1
            this.fetchMovies()
        },
        onPageChange(newPage) {
            this.page = newPage
            this.fetchMovies()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>

<template>
    <div class="movie-list-page">
        <header class="header-section">
            <h1>Catalogue des Films</h1>
        </header>

        <!-- Barre de recherche et métadonnées -->
        <div class="toolbar">
            <div class="search-box">
                <input v-model="searchQuery" type="search"
                    placeholder="Rechercher par titre (ex: Batman, Matrix, Star Wars)..." class="search-input"
                    @input="onSearchInput" />
            </div>
            <div class="genre-filter">
                <select v-model="selectedGenre" class="genre-select" @change="onGenreChange">
                    <option value="">Tous les genres</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.label }}
                    </option>
                </select>
            </div>
            <div class="meta-info">
                <span v-if="!loading" class="count-badge">
                    {{ totalItems.toLocaleString() }} film{{ totalItems > 1 ? 's' : '' }} au total
                </span>
            </div>
        </div>

        <!-- Pagination supérieure -->
        <Pagination :page="page" :total-pages="totalPages" :loading="loading" @change-page="onPageChange" />

        <!-- États d'affichage -->
        <div v-if="loading" class="status-box status-loading">
            <p>Chargement des films en cours...</p>
        </div>

        <div v-else-if="error" class="status-box status-error">
            <p>{{ error }}</p>
            <button class="retry-btn" @click="fetchMovies">Réessayer</button>
        </div>

        <div v-else-if="movies.length === 0" class="status-box status-empty">
            <p>Aucun film ne correspond à votre recherche « <em>{{ searchQuery }}</em> ».</p>
        </div>

        <!-- Grille de films -->
        <div v-else class="movies-grid">
            <Movie v-for="movie in movies" :key="movie.id" :id="movie.id" :title="movie.title" :year="movie.year"
                :poster="movie.poster" :rating="movie.rating" :genres="movie.genres" />
        </div>

        <!-- Pagination inférieure -->
        <Pagination v-if="movies.length > 0" :page="page" :total-pages="totalPages" :loading="loading" @change-page="onPageChange" />
    </div>
</template>

<style scoped>
.movie-list-page {
    background-color: #1a202c;
    min-height: 100vh;
    padding: 1.5rem;
    box-sizing: border-box;
}

.header-section {
    margin-bottom: 1.5rem;
}

.header-section h1 {
    font-size: 2rem;
    margin: 0 0 0.25rem 0;
    color: white;
    text-align: center;
}

.subtitle {
    color: #718096;
    margin: 0;
}

.toolbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
}

.search-box {
    flex: 1;
    min-width: 260px;
}

.search-input {
    width: 100%;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.genre-filter {
    min-width: 180px;
}

.genre-select {
    width: 100%;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    color: #2d3748;
    background-color: #ffffff;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.genre-select:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}



.count-badge {
    font-size: 0.875rem;
    color: #4a5568;
    background: #edf2f7;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-weight: 500;
}



.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
}

.status-box {
    text-align: center;
    padding: 3rem 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
}

.status-loading {
    color: #4a5568;
    font-style: italic;
    background-color: #f7fafc;
}

.status-error {
    color: #c53030;
    background-color: #fff5f5;
    border: 1px solid #feb2b2;
}

.status-empty {
    color: #718096;
    background-color: #f7fafc;
    border: 1px dashed #cbd5e0;
}

.retry-btn {
    margin-top: 0.75rem;
    padding: 0.4rem 1rem;
    background: #e53e3e;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>