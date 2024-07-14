<script setup>
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { onMounted } from 'vue';

    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    onMounted(() => {
        cartStore.fetchProducts();
    })
</script>

<template>
    <header>
        <div class="container">
            <div id="header">
                <div class="header__logo ">
                    <img width="150px" height="" src="../assets/img/logo.webp" alt="">
                    <!-- <i class="fa-solid fa-bars"></i> -->
                </div>
                <div class="header__menu">
                    <ul class="header__menu-list">
                        <li class="header__menu-item">
                            <router-link :to="{ name: 'client.home'}" class="header__item-link">Home</router-link>
                        </li>
                        <li class="header__menu-item">
                            <router-link :to="{ name: 'client.product'}" class="header__item-link">Shop</router-link>
                        </li>
                        <li class="header__menu-item">
                            <router-link :to="{name : 'client.feature' }" class="header__item-link">Feature</router-link>
                        </li>
                        <li class="header__menu-item">
                            <router-link to="" class="header__item-link">About Us</router-link>
                        </li>
                    </ul>
                </div>
                <ul class="header__icon-list">
                    <!-- <li class="header__icon-item">
                        <router-link to="" class="header__item-link">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </router-link>
                    </li> -->
                    <li class="header__icon-item">
                        <router-link to="/login" class="header__item-link">
                            <i class="fa-regular fa-user"></i>
                        </router-link>
                    </li>
                    <li class="header__icon-item icon-cart">
                        <router-link :to="{name : 'client.wishlist'}" class="icon-cart-header header__item-link">
                            <i class="fa-regular fa-heart"> </i>
                            <p>{{ wishlistStore.countWishlistItem }}</p>
                        </router-link>
                    </li>
                    <li class="header__icon-item icon-cart">
                        <router-link to="/cart" class="header__item-link icon-cart-header">
                            <i class="fa-solid fa-bag-shopping"> </i>
                            <p>{{ cartStore.countCartItem }}</p>
                        </router-link>
                    </li>
                </ul>
                <div class="header__icon" onclick=showSidebar()>
                    <i class="fa-solid fa-bars"></i>
                </div>

                <div class="header__sidebar">
                    <div onclick=hideSidebar() class="header__sidebar-close">
                        <router-link to="/" class="header__item-link fa-solid fa-x "></router-link>
                    </div>
                    <ul class="header__sidebar-list">
                        <li class="header__sidebar-item">
                            <router-link :to="{name: 'client.home' }" class="header__item-link">Home</router-link>
                        </li>
                        <li class="header__sidebar-item">
                            <router-link :to="{ name: 'client.product'}" class="header__item-link">Shop</router-link>
                        </li>
                        <li class="header__sidebar-item">
                            <router-link to="/feature" class="header__item-link">Feature</router-link>
                        </li>
                        <li class="header__sidebar-item">
                            <router-link to="" class="header__item-link">Blog</router-link>
                        </li>
                        <li class="header__sidebar-item">
                            <router-link to="" class="header__item-link">Contact</router-link>
                        </li>

                    </ul>
                </div>

            </div>
        </div>

    </header>
</template>
<style>

.icon-cart{
    position: relative;
}

.icon-cart-header p{
    position: absolute;
    background-color: red;
    width: 20px;
    font-size: 18px;
    border-radius: 50%;
    text-align: center;
    top: -6px;
    right: 8px;
    height: 20px  
}
.header__icon-item{
    color: var(--text-black);
}

.icon-cart .icon-cart-header p {
    color: black;
}

.icon-cart-header p:hover {
    color: var(--text-black);
}

</style>