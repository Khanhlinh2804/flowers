<script setup>
    import { ref, onMounted, computed } from 'vue';

    const productDetail = [
        'You show me what is deep as sea', 
        'Crew neck', 
        'Short sleeves', 
        'Large logo print to chest', 
        'Regular fit', 
        'True size'
    ]
    const url = "http://localhost:3000/Product";
    const products = ref([])

    onMounted(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                products.value = data;
            })
            .catch(error => console.error('Error:', error));
    });

    const data = computed(() => products.value);     
    
    const activeTab = ref('description');
    const limitProduct = computed(() => {
        return products.value.slice(0,8)
    })
    

    const setActiveTab = (tab) => {
        activeTab.value = tab;
    }

</script>

<template>
    <main>
        <div class="related">
            <div class="related_tab">
                <div class="container">
                    <div class="related_tab-text">
                        <ul class="related_tab-list">
                            <ol @click="setActiveTab('description')">
                                <router-link to=""  class="route-link">
                                    description
                                </router-link>
                            </ol>
                            <ol @click="setActiveTab('infomation')">
                                <router-link to=""  class="route-link">
                                    infomation
                                </router-link>
                            </ol>
                            <ol  @click="setActiveTab('review')">
                                <router-link to="" class="route-link">
                                    Review
                                </router-link>
                            </ol>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="container">
                    <div class="related_tab-content">
                        <div class="content_first">
                            <div class="container" v-if="activeTab === 'description'" id="description">
                                <p>Being able to read a novel in another language and understand it is a huge
                                    achievement. You’ll feel accomplished the moment you read that final page, close the
                                    book, and reflect on the experience. You might find yourself at the last page faster
                                    than you thought—once you begin reading these books, you won’t be able to put them
                                    down.</p>
                                <br>
                                <div class="content_first-des">
                                    <div class="first-image">
                                        <img src="../assets/img/des.avif" alt="">
                                    </div>
                                    <div class="first-des">
                                        <strong>Brand</strong>
                                        <br>
                                        <p>
                                            With eye-catching artwork, step-by-step diagrams, and illustrations that
                                            break down complicated ideas into manageable concepts, The Science Book will
                                            have readers conversant in genetic engineering, black holes, and global
                                            warming in no time. Along the way are found mini-biographies of the most
                                            well-known scientists, and a glossary of helpful scientific terms. For
                                            students, and students of the world, there is no better way to explore the
                                            fascinating, strange, and mysterious world of science than in The Science
                                            Book.
                                        </p>
                                    </div>
                                </div>
                                <br>
                                <div class="content_first-text">
                                    <div class="first-des">
                                        <strong> Detail product</strong>
                                        <br>
                                        <template v-for="data in productDetail">
                                            <p>{{ data }}</p>
                                        </template>
                                    </div>
                                    <div class="first-des">
                                        <strong> SIZE & FIT</strong>
                                        <br>
                                        <template>
                                            <p>hiih</p>
                                        </template>
                                    </div>
                                    <div class="first-des">
                                        <strong> ABOUT ME </strong>
                                        <br>
                                        <p>Soft, breathable jersey</p>
                                        <p> T-shirt fabric</p>
                                        <p>T-shirt fabric</p>
                                    </div>
                                </div>

                            </div>
                            <div id="infomation" v-if=" activeTab === 'infomation'">
                                <p>hihi</p>    
                            </div>
                            <div id="review" v-if="activeTab === 'review'" class="content-second">
                                <div class="products">
                                    <div class="team-area">
                                        <div v-for="product in limitProduct" :key="product.id">
                                            <figure class="box">
                                                <figcaption>
                                                    <p class="socials">
                                                        <router-link to="/" class="socials_a">
                                                            <i class="fa-regular fa-heart"></i>
                                                        </router-link>
                                                        <router-link :to="/detail/ + product.id" class="socials_a">
                                                            <i class="fa-regular fa-eye"></i>
                                                        </router-link>
                                                    </p>
                                                </figcaption>
                                                <router-link :to="'/detail/' + product.id">
                                                    <img :alt="product.name" :src="product.image.image01">
                                                </router-link>
                                            </figure>
                                            <div class="box_data">
                                                <p>{{ product.name }}</p>
                                                <span>
                                                    <template v-if="product['sale-price'] === 0">
                                                        <strong>${{ product.price }}</strong>
                                                    </template>
                                                    <template v-else>
                                                        <strike>${{ product.price }}</strike>
                                                        <strong>${{ product['sale-price'] }}</strong>
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </main>
</template>

<style>
* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    main{
        padding-bottom: 50px;
    }
    .related_tab-text {
        position: relative;
    }

    .related_tab-list {
        justify-content: center;
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .related_tab-list ol {
        position: relative;
        font-size: 20px;
        padding: 10px 50px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .related_tab-list ol::before {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        border-bottom: 3px solid var(--bg--red);
        bottom: 0;
        left: 0;
        transition: width .3s ease-out;
    }

    .related_tab-list ol:hover::before {
        width: 100%;
    }

    .related_tab-list .route-link {
        color: gray;
        text-decoration: none;
        transition: color .3s ease-out;
    }

    .related_tab-list ol:hover .route-link {
        color: initial;
    }

    .content_first-des {
        display: flex;
        gap: 30px;
        justify-content: center;
        align-items: center;
    }

    .first-image {
        flex: 2;
    }

    .first-image img {
        width: 100%;

    }

    .first-des {
        flex: 3;
    }

    .first-des strong {
        font-weight: 500;
        border-bottom: 1px solid black;
        padding-bottom: 8px;
        padding-left: 8px;
        padding-right: 8px;
    }

    .first-des p {
        color: var(--text-gray);
        margin: 5px 0;
    }

    .first-des p:first-of-type {
        padding-top: 20px;
    }

    .content_first-text {
        display: flex;
    }
    @media (min-width:767px) and (max-width:1024px) {
    .container{
        margin: 50px 0;
    }
    
}
</style>