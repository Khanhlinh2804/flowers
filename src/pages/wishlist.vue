<script setup>

import { useWishlistStore } from '@/stores/useWishlistStore';
import { onMounted, ref, watchEffect } from 'vue';


const title= ref('Wishlist');
const wishlistStore = useWishlistStore();

onMounted(() => {
    wishlistStore.fetchProducts();
});

watchEffect(() => {
    document.title= title.value;
});

</script>


<template>
    <main class="pd-header">
       <section class="bg-breadcrumb">
        <div class="container">
            <div class="breadcrumb">
                <h1 class="text-align-center">Wishlist</h1>
                <ul class="breadcrumb__list">
                    <li>
                        <router-link to="/" class="item-link">Home</router-link>
                    </li>
                    <li class="text-decoration-none"></li>
                    <p>Wishlist</p>
                </ul>
            </div>
        </div>
        </section>
        <div class="container pt-6">
            <div class="container_card pb-6 pt-6">
                <div class="card" >
                    <article class="card__article" v-for="index in wishlistStore.wishlistItems" :key="index.id" >
                        <router-link :to="'/detail/' + index.id">
                            <img :src="index.image.image01" alt="image"
                            class="card__img">
                        </router-link>
                                <div class="card__sale" v-if="index['sale-price'] !== 0">
                                    {{ ((index['price'] - index['sale-price'] ) / index['price'] * 100) .toFixed(0) }} %
                                </div>
                                
                                
                                
                        <div class="card__data">
                            <h2 class="card__title">{{ index.name }}</h2>
                            <span class="card__description">50$</span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        
    </main>
</template>

<style>
    .bg-breadcrumb {
        background: radial-gradient(rgba(0, 0, 0, 0.081), rgba(0, 0, 0, 0.057)), url('../assets/img/bg-hiddel.webp');
        background-position: center;
        background-size: cover;
        min-height: 200px;
    }
</style>