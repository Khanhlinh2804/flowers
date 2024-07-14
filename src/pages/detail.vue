<script setup>
    import { ref, watchEffect, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Related from '../components/Related.vue';
    import { useCartStore } from '@/stores/useCartStore';

    const data = useCartStore();
    const engo = ['In Stock', 'Free delivery available', 'Sale 30% Off Use Code: Deal30'];

    const textwidgets = [
        { icon: 'fa-regular fa-paper-plane', title: 'WORLDWIDE SHIPPING' },
        { icon: 'fa-regular fa-star', title: '24 month WARRANTY' },
        { icon: 'fa-regular fa-circle-check', title: '100% secure checkout' },
        { icon: 'fa-solid fa-rotate-left', title: 'free 60 days return' },
    ];

    const route = useRoute();
    const productId = ref(route.params.id);
    const product = ref(null);
    const title = ref('Detail');
    const quantity = ref(1);

    const handleUp = () => {
        quantity.value += 1;
    };

    const handleDown = () => {
        if (quantity.value > 1) {
            quantity.value -= 1;
        }
    };

    onMounted(() => {
        const url = `http://localhost:3000/Product/${productId.value}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                product.value = data;
            })
            .catch(error => console.error('Error:', error));
    });

    watchEffect(() => {
        document.title = title.value;
    });
</script>

<template>
    <main class="pd-header">
        <div class="bread__detail">
            <div class="container">
                <div class="bread__crumb-text">
                    <router-link :to="{ name: 'client.home' }" class="route-link bread__crumb-link"> Home </router-link>
                    <router-link :to="{ name: 'client.product'}" class="route-link bread__crumb-link"> Shop
                    </router-link>
                    <router-link to="" class="route-link bread__crumb-link"> Category </router-link>
                </div>
            </div>
        </div>
        <hr>
        <div class="container pt-3" v-if="product" :key="product.id">
            <div class="detail-product">
                <div class="detail__img">
                    <img :src="product.image.image01" :alt="product.name" class="detail__img-product">
                    <div class="detail__img-button">
                        <button type="submit" class="button_detail-prev btn-cricle">
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                        <button type="submit" class="button_detail-next btn-cricle">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="detail__info">
                    <div class="detail-name">
                        <div class="detail-name-text">
                            <h4>{{ product.name }}</h4>
                            <h4 v-if="product['sale-price'] !== 0">${{ product['sale-price'] }}</h4>
                            <h4 v-else>${{ product.price }}</h4>
                        </div>
                        <div class="detail-name-icon">
                            <div class="detail-heart" data-tooltip="Wishlist">
                                <div class="detail-heart-wrapper">
                                    <router-link to="" class="route-link detail-heart-circle">
                                        <i class="fa-regular fa-heart"> </i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <p>{{ product.description }}</p>
                    <div class="detail__info-price">
                        <div id="quantity">
                            <div class="quantity-input">
                                <input type="text" v-model="quantity" min="1" id="amount" name="amount" readonly>
                            </div>
                            <div class="quantity-button">
                                <button type="button" @click="handleUp" class="quantity-button-up">
                                    <i class="fa-solid fa-caret-up"></i>
                                </button>
                                <button type="button" @click="handleDown" class="quantity-button-down">
                                    <i class="fa-solid fa-sort-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="engo">
                        <div class="engo-full">
                            <strong>Special Office</strong>
                            <ul>
                                <li v-for="index in engo">{{ index }}</li>
                            </ul>
                        </div>
                    </div>

                    <button type="submit" @click="data.addToCart(product)" class="btn btn--danger btn_add-cart">Add to cart</button>
                </div>
            </div>
            <div class="textwidget pt-6">
                <div class="iconbox-inner" v-for="data in textwidgets" :key="data.title">
                    <div class="iconbox-inner-icon">
                        <i :class="data.icon"></i>
                        <p>{{ data.title }}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <Related />
    </main>
</template>

<style scoped>
    .detail__info-price {
        padding: 20px 0px 45px 0;
    }

    .route-link:hover {
        color: var(--bg--red);
    }

    .route-link+.route-link::before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 10px solid black;
        margin-right: 8px;
        margin-left: 8px;
        vertical-align: middle;
    }

    .bread__crumb-link:last-of-type {
        color: var(--text-gray);
        pointer-events: none;
    }

    ul {
        list-style: none;
    }

    ul li {
        position: relative;
        list-style: none;
    }

    ul li::before {
        content: '';
        display: block;
        width: 5px;
        height: 10px;
        top: 4px;
        left: -22px;
        border-radius: 0;
        opacity: 1;
        border-top-color: transparent;
        border-left-color: transparent;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        border-right: 3px solid var(--color--green);
        border-bottom: 3px solid var(--color--green);
        position: absolute;
        -webkit-transition: all .12s, border-color .08s;
        transition: all .12s, border-color .08s;
    }

    
</style>