<script>
import { useProduct } from '@/stores/filterProduct';
import { computed, onMounted, ref } from 'vue';

    export default {
        setup() {
           
           const productStore = useProduct();

            const limitProduct = computed(() => {
                return productStore.getProduct.slice(0,8)
            })

            return {
                limitProduct
            }

        }
    }
</script>

<template>
    <div class="container_card">
                <div class="card" >
                    <article class="card__article" v-for="data in limitProduct">
                        <router-link :to="/detail/ + data.id">
                            <img :src="data.image.image01" alt="image"
                            class="card__img">
                        </router-link>
                            <template v-if="data['sale-price'] !== 0 && data['price'] && data['sale-price']">
                                <div class="card__sale">
                                    {{ (((data['price'] - data['sale-price']) / data['price']) * 100).toFixed(0)}} %
                                </div>  
                            </template>
                        <div class="card__data">
                            <h2 class="card__title">{{ data['name'] }}</h2>
                            <span class="card__description">{{ data['price'] }}</span>
                        </div>
                    </article>

                </div>
    </div>
</template>