<script setup>
import { useAccount } from '@/stores/useAccount';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { onMounted, ref } from 'vue';

    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const authStore = useAccount();
    const dropdownVisible = ref(false);


    const toggleDropdown = () => {
        dropdownVisible.value = !dropdownVisible.value;
    }
    const onLogout = () => {
        authStore.logoutUser();
    }

    onMounted(() => {
        cartStore.fetchProducts();
    });
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
                <ul class="header__icon-list ">
                    <li class="header__icon-item dropdown">
                        <button @click="toggleDropdown" class="icon-cart-header header__item-link">
                            <i class="fa-regular fa-user"></i>
                        </button>
                        <div v-if="dropdownVisible" class="dropdown-menu">
                            <div >
                                <router-link to="/login"  class="dropdown-item">
                                    <i class="fa-regular fa-user"></i> Login
                                </router-link>
                            </div>

                            <button @click.prevent="onLogout" 
                                v-if="authStore.user.uid"
                                class="dropdown-button dropdown-item">
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                    logout
                            </button>
                        </div>
                    </li>
                    <li class="header__icon-item icon-cart">
                        <router-link :to="{name : 'client.wishlist'}" class="icon-cart-header header__item-link">
                            <i class="fa-regular fa-heart"> </i>
                            <p>{{ wishlistStore.countWishlistItem }}</p>
                        </router-link>
                    </li>
                    <li class="header__icon-item icon-cart" >
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
button{
    border: none;
    font-size: 20px;
    background: none

}
.dropdown{
    position: relative;
}

.dropdown-button{
    font-size: 12px
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  right:20% ;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 10px;
  border-radius: 4px;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

</style>