<script setup>
import { ref, computed } from 'vue';
import Search from './search.vue';

// Props
    const props = defineProps({
        products: {
            type: Array,
            required: true,
        },
        selectedCategory: {
            type: String,
            required: true,
        },
    });

    const searchQuery = ref('');
    const itemsPerPage = 12;
    const currentPage = ref(1);

    const filteredProducts = computed(() => {
    let filtered = props.products;
    if (props.selectedCategory !== 'All product') {
        filtered = filtered.filter(product => product.category === props.selectedCategory);
    }
    if (searchQuery.value) {
        filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    return filtered;
    });

    const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
    });

    const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / itemsPerPage);
    });

    const handleSearch = search => {
    searchQuery.value = search;
    currentPage.value = 1;
    };

    const goToPage = page => {
    currentPage.value = page;
    };
</script>

<template>
    <div>
        <div class="item-search">
            <Search @search="handleSearch" />
        </div>
        <div class="products">
            <div class="team-area">
                <div v-for="product in paginatedProducts" :key="product.id">
                    <figure class="box">
                        <figcaption>
                            <div class="socials">
                                <div class="socials-product" data-tooltip="Add Wishlist" >
                                    <div class="socials-product-wrapper">
                                        <button type="add-wishlist" class="socials_a">
                                            <i class="fa-solid fa-heart-circle-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="socials-product" data-tooltip="Add to Cart" >
                                    <div class="socials-product-wrapper">
                                        <button type="add-product" class="socials_a">
                                            <i class="fa-solid fa-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </figcaption>
                        <router-link :to="'/detail/' + product.id">
                            <img :alt="product.name" :src="product.image.image01">
                        </router-link>
                    </figure>
                    <div class="box_data">
                        <p>{{ product.name }}</p>
                        <span>
                            <template v-if="product['sale-price'] === 0">
                                <strong>${{ product['price'] }}</strong>
                            </template>
                            <template v-else>
                                <strike>${{ product['price'] }}</strike>
                                <strong>${{ product['sale-price'] }}</strong>
                            </template>
                        </span>
                    </div>
                </div>
            </div>
            <div class="pagination">
                <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="paginate-a">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }} </span>
                <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="paginate-a">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.pagination .paginate-a {
            text-decoration: none;
            border: 1px solid var(--icon-color);
            padding: 10px;
            margin: 10px;
            display: inline-flex;
            align-items: center;
            transition: background-color 0.3s, color 0.3s;
            cursor: pointer;
        }
    
        .pagination .paginate-a i {
            color: var(--text-black);
            transition: color 0.3s;
    
        }
    
        .paginate .paginate-a:hover {
            background-color: var(--bg--red);
            border: none;
        }
    
        .paginate .paginate-a:hover i {
            color: white;
        }


.pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}


</style>
