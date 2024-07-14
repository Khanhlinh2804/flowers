<script setup>
import { useWishlistStore } from '@/stores/useWishlistStore';
import { onMounted, ref, watchEffect } from 'vue';

const data = useWishlistStore();
const title= ref('Wishlist');

onMounted(() => {
    data.fetchProducts();
});

watchEffect(() => {
    document.title= title.value;
})

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
            <div class="container_card">
                    <div class="card" >
                        <article class="cart_article" v-if="!data.wishlistItems.length">
                            <p>NO product Wishlist</p>    
                        </article>
                        <article class="card__article" v-else v-for="item in data.wishlistItems" :key="item.id">
                            <router-link :to="/detail/ + item.id">
                                
                            </router-link>
                                <template v-if="item['sale-price'] !== 0 && item['price'] && item['sale-price']">
                                    <div class="card__sale">
                                        {{ (((item['price'] - item['sale-price']) / item['price']) * 100).toFixed(0)}} %
                                    </div>  
                                </template>
                            <div class="card__data">
                                <h2 class="card__title">{{ item['name'] }}</h2>
                                <span class="card__description">{{ item['price'] }}</span>
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