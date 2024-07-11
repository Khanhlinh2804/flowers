<script setup>


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