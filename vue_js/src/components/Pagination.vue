<script>
import arrowLeft from '@/assets/icons/arrow-left.svg'
import arrowRight from '@/assets/icons/arrow-right.svg'

export default {
    name: 'Pagination',
    emits: ['change-page'],
    props: {
        page: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            arrowLeft,
            arrowRight
        }
    },
    computed: {
        hasPrev() {
            return this.page > 1
        },
        hasNext() {
            return this.page < this.totalPages
        }
    },
    methods: {
        goToPage(targetPage) {
            if (targetPage >= 1 && targetPage <= this.totalPages && !this.loading) {
                this.$emit('change-page', targetPage)
            }
        }
    }
}
</script>

<template>
    <nav v-if="totalPages > 1" class="pagination-bar" aria-label="Pagination">
        <button class="pagination-btn" :disabled="!hasPrev || loading" @click="goToPage(page - 1)">
            <img :src="arrowLeft" alt="" class="btn-icon" />
            Précédent
        </button>
        <span class="pagination-info">
            Page <strong>{{ page }}</strong> sur <strong>{{ totalPages }}</strong>
        </span>
        <button class="pagination-btn" :disabled="!hasNext || loading" @click="goToPage(page + 1)">
            Suivant
            <img :src="arrowRight" alt="" class="btn-icon" />
        </button>
    </nav>
</template>

<style scoped>
.pagination-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin: 1.5rem 0;
}

.pagination-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #2d3748;
    background-color: #edf2f7;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
    background-color: #e2e8f0;
    border-color: #a0aec0;
}

.pagination-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.pagination-info {
    font-size: 0.9rem;
    color: #cbd5e0;
}

.pagination-info strong {
    color: #ffffff;
}

.btn-icon {
    width: 1.1rem;
    height: 1.1rem;
}
</style>
