<script>
import { onMounted, ref, watchEffect } from 'vue';
import Product8 from '@/components/Product8.vue';

export default {
    components: {
        Product8,
    },

    setup() {
        const title = ref('Feature Page');
        const url = "http://localhost:3000/category";
        const category = ref([])

        onMounted(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    category.value = data
                })
        })
        
        watchEffect(() => {
        document.title = title.value;
        });
        return {
            category
        }
    },

}



</script>

<template>
    <main class="pd-header">
        <!-- start slide -->
        <section>
            <div class="slide">
                <div class="slide-img">
                    <img src="../assets/img/feature_sl1.webp" alt="" width="100%" height="100%" srcset="" class="">
                </div>
                <div class="slide-data">
                    <h4>Tully Store </h4>
                    <h1>
                        We give soul to flowers
                    </h1>
                    <p>And if the flowers are blooming, you put them in your hai</p>
                    <router-link to=""> hihih</router-link> 
                </div>
                <button type="button" class="slide-next">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button type="button" class="slide-prev">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <ul class="slide-button">
                    <li class="slide-button-list">
                        <button type="button" ></button>
                    </li>
                    <li class="slide-button-list">
                        <button type="button"></button>
                    </li>
                </ul>
            </div>
        </section>
        <!-- end slide -->

        <!-- start brand  -->
        <div class="brand">
            <div class="container-brand">
                <ul class="brand-list">
                    <li class="brand-item" v-for="data in category">
                        <a href="" class="brand-item-a">
                            <img :src="data.image" alt="">
                        </a>
                    </li>
                    
                </ul>
            </div>
        </div>
        <!-- end brand  -->

        <!-- product start  -->
        <div class="product-v2">
            <div class="container">
                <div class="category_v2">
                    <ul class="category_v2-list">
                        <li class="category_v2-item">
                            <a href="" class="category_v2-a">NEW ARRIVALS</a>
                        </li>
                        <li class="category_v2-item">
                            <a href="" class="category_v2-a">BEST SELLERS</a>
                        </li>
                        <li class="category_v2-item">
                            <a href="" class="category_v2-a">TOP RATES</a>
                        </li>
                    </ul>
                </div>
                <Product8 />
            </div>
        </div>
        <!-- end product  -->

        <div class="newsletter">
            <div class="container">
                <div class="newsletter-text ">
                    <h1>
                        Join Our Email List.
                    </h1>
                    <p>Sign up for the latest trends, products, and inspiration.</p>
                </div>
                <div class="newsletter-input">
                    <input type="text" placeholder="Email address" required name="email">
                    <button type="submit">subscrice</button>

                </div>
            </div>
        </div>
    </main>
</template>

<style>


</style>


