<script>
    import { onMounted, ref, watchEffect,computed } from 'vue';
    import Sidebar from "../components/Sidebar.vue";

    export default {
        components: {
            Sidebar
        },

        setup() {
            const url = "http://localhost:3000/Product";

            const products = ref([]);
            const title = ref('Product');
            const selectedCategory = ref('All Product');

            onMounted(() => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        products.value = data;
                    })
                    .catch(error => console.error('Error:', error));           
            });

            const filteredProducts = computed(() => {
                if (selectedCategory.value === 'All product') {
                    return products.value;
                }
                return products.value.filter(product => product.category === selectedCategory.value);
                });

            const handleCategorySelected = (category) => {
                selectedCategory.value = category;
            };
            

            watchEffect(() => {
                document.title = title.value;
            });

            return {
                products,
                title,
                filteredProducts,
                selectedCategory,
                handleCategorySelected,
            };
        },
    };

</script>
<template>
    <main class="pd-header">
        <section class="bg-breadcrumb">
            <div class="container">
                <div class="breadcrumb ">
                    <h1 class="text-align-center">Product</h1>
                    <ul class="breadcrumb__list">
                        <li>
                            <router-link to="/" class="item-link">
                                Home
                            </router-link>
                        </li>
                        <li class="text-decoration-none">
                            dsfeg
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- product start  -->
        <div class="container pb-6 shop">
            <Sidebar @category-selected="handleCategorySelected" />
            <div class="products">
                <!-- <div class="fillter">
                    <select v-model="selectedSortOption" class="select-filter">
                        <option value="">Select</option>
                        <option value="price-low-high">Price low - high</option>
                        <option value="price-high-low">Price high - low</option>
                        <option value="name-a-z">Name A - Z</option>
                        <option value="name-z-a">Name Z - A</option>
                    </select>
                </div> -->
                <div class="team-area">
                    <div v-for="data in products" :key="data.id">
                        <figure class="box">
                            <figcaption>
                                <p class="socials">
                                    <router-link to="/" class="socials_a">
                                        <i class="fa-regular fa-heart"></i>
                                    </router-link>

                                    <router-link to="" class="socials_a">
                                        <i class="fa-regular fa-eye"></i>
                                    </router-link>
                                </p>
                            </figcaption>
                            <router-link href="'./detail/' + data.id">
                                <img :alt="data.name" :src="data.image.image01">
                            </router-link>
                        </figure>
                        <div class="box_data">
                            <p>{{ data.name }}</p>
                            <span>
                                <template v-if="data['sale-price'] === 0">
                                    <strong>${{ data.price }}</strong>
                                </template>
                                <template v-else>
                                    <strike>${{ data['price'] }}</strike>
                                    <strong>${{ data['sale-price'] }}</strong>
                                </template>
                            </span>
                        </div>
                    </div>


                </div>
                <div class="paginate">
                    <router-link to="/" class="paginate-a">
                        <i class="fa-solid fa-chevron-left"></i>

                    </router-link>
                    <router-link to="/" class="paginate-a">
                        <i class="fa-solid fa-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- product end  -->
    </main>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .bg-breadcrumb {
        background: radial-gradient(rgba(0, 0, 0, 0.081), rgba(0, 0, 0, 0.057)), url('../assets/img/bg-hiddel.webp');
        background-position: center;
        background-size: cover;
        min-height: 200px;
    }



    .breadcrumb {
        position: relative;
        top: 50px;
        max-width: 1200px;
        max-height: 700px;
    }


    .breadcrumb h1 {
        transform: translateY(50%);
    }

    .breadcrumb__list {
        display: flex;
        justify-content: center;
        list-style: none;
        display: flex;
        padding: 20px 10px;
    }

    .breadcrumb__list li+li::before {
        padding: 0 0 0 10px;
        content: "/\00a0";
    }


    /* products */
    .shop {
        display: flex;
        /* margin-inline: 24px; */
        padding-block: 80px;
    }

    .products {
        flex: 3;
        position: relative;
    }
    .fillter{
        /* position: absolute; */
        top: 0;
        right: 0;
    }

    .team-area {
        padding-left: 30px;
        display: grid;
        /* align-items: center; */
        justify-content: center;
        min-height: 10vh;
        color: #fff;
    }

    .box {
        position: relative;
        margin: 20px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(132, 132, 132, 0.105);
        max-width: 400px;
        transition: transform 0.3s ease;
    }

    .box img {
        width: 100%;
        display: block;
        border-radius: 10px;
        transition: transform 0.5s ease;
    }

    .box:hover {
        transform: scale(1.05);
    }

    .box figcaption {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 20px;
        text-align: center;
        background: rgba(217, 217, 217, 0.338);
        transform: translateY(100%);
        transition: transform 0.5s ease;
        border-radius: 30% 30% 0 0;
    }

    .box:hover figcaption {
        transform: translateY(0);
    }


    .box:hover figcaption .socials .socials_a:hover {
        color: rgb(255, 255, 255);
        background-color: var(--bg--red);
    }

    .socials a {
        align-items: center;
        font-size: 18px;
        margin: 0 10px;
        text-decoration: none;
        padding: 8px 10px;
        border-radius: 50%;
        border: none;
        background-color: #fff;
        color: black;
    }

    .socials_a i {
        font-size: 15px;
    }

    .box_data {
        color: black;
        display: grid;
        margin: 20px;
        text-align: center;
    }

    .box_data strong {
        padding-left: 20px;
        color: red;
        font-size: 20px;
        padding-top: 5px;
    }

    .box_data strike {
        font-size: 15px;
        color: var(--text-gray);
    }

    .paginate {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .paginate .paginate-a {
        text-decoration: none;
        border: 1px solid var(--icon-color);
        padding: 10px;
        margin: 10px;
        display: inline-flex;
        align-items: center;
        transition: background-color 0.3s, color 0.3s;
    }

    .paginate .paginate-a i {
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

    @media(max-width: 800px) {
        .team-area {
            flex-direction: column;
        }
    }

    @media(max-width: 600px) {
        .box h2 {
            font-size: 20px;
        }
    }

    @media (min-width: 767px) and (max-width: 1023px) {
        .team-area {
            /* flex-direction: column; */
            /* grid-template-columns: repeat(2, 1fr); */
            grid-template-columns: repeat(3, 1fr);
        }

    }

    @media screen and (min-width: 1024px) {
        .team-area {
            grid-template-columns: repeat(4, 1fr);
        }

    }

    @media (min-width: 426px) and (max-width: 768px) {
        .team-area {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 425px) {
        .team-area {
            grid-template-columns: repeat(1, 1fr);
        }

    }
</style>