<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useProduct} from '@/stores/filterProduct';
import Slide from '@/components/Slide.vue';
import Product8 from '@/components/Product8.vue';

export default {
    components: {
        Slide,
        Product8,
    },
    setup() {
        
        const banner = "Wedding Flower Sale 30% Off";
        const title = ref('Home');
        const productStore = useProduct();
        const {fetchProducts, setFilterType} = productStore;
        
        onMounted(() => {
              fetchProducts();  
        });


        const UniqueType = computed(()=> {
            if(productStore.value && Array.isArray(productStore.value)){
                const types = productStore.value.map(product => product.type);
                return [... new Set(types)]
            }
            return [];
        })
        
        watchEffect(() => {
            document.title = title.value;
        });
        const filterProducts = (type) => {
            setFilterType(type);
        }

        return {
            banner,
            title,
            productStore,
            UniqueType,
            filterProducts
        };
    }
};
</script>


<template>
    <main>
        <!-- start slide  -->
        <Slide />
        <!-- end slide  -->


        <!-- start banner  -->
        <div class="container">
            <div class="pt-6 banner">
                <div class=" banner__content">
                    <p class="text-uppercase">A LITTLE ABOUT US</p>
                    <h3> WHY CHOOSE US </h3>
                    <p>Tully shop knows that clients’ fulfillment is of real noteworthiness to any business. Indeed
                        disappointed clients will
                        in general offer their sentiment more than the satisfied ones without being inquired. This
                        happens on the grounds that
                        they’re irritated and exasperated. That is the reason client benefit must be the essential
                        center when you begin an
                        organization. The accentuation must be on you, generally. Yet, how might we achieve an abnormal
                        state of consumer
                        loyalty? By giving brilliant flower conveyance administrations, obviously. Furthermore, our
                        flower game plans are
                        constantly made after we get a request and not previously.</p>
                    <div class="row">
                        <ul class="banner__banner-list">
                            <li class="banner__banner-item">
                                <img src="../assets/img/banner_home_icon1.png" alt="" srcset="">
                                <p>EXPRESS SHIPPING</p>
                            </li>
                            <li class="banner__banner-item">
                                <img src="../assets/img/banner_home_icon2.png" alt="" srcset="">
                                <p>QUICK INSTALLATIO</p>
                            </li>
                            <li class="banner__banner-item">
                                <img src="../assets/img/banner_home_icon3.png" alt="" srcset="">
                                <p>30 DAY RETURN POLICY</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class=" banner__image">
                    <img src="../assets/img/blog_1.webp" alt="" width="100%">
                </div>
            </div>

        </div>
        <!-- end start banner  -->



        <!-- background hidden start  -->
        <div class="pt-6">
            <div class="bg_hiddent">
                <div class="bg__content">
                    <p>Hot deal of the day</p>
                    <h1 > {{ banner }} </h1>
                    <div class="bg_ pt-1">
                        <router-link :to="{ name: 'client.product' }" class="btn bg_button" >
                            Shop now
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- background hidden end  -->

        <!-- product start  -->

        <div class="container pb-6">
            <h1 class="pt-6 font-size">new product</h1>
            <div class="filter">
                <ul class="filter__category">
                    <template v-for=" type in UniqueType " :key="type">
                        <li class="filter__category-item" @click="filterProducts(type)">
                            {{ type }}
                        </li>
                    </template> 
                </ul>
            </div>
            <!-- <div class=" banner__content"> -->
            <Product8 />

        </div>
        <!-- product end  -->

        <!-- start blog  -->
        <div class="bg-blog pt-6">
            <div class="container">
                <h1> OUR BLOGS </h1>
                <div id="formBlog">
                    <div id="blog">
                        <div class="blog__item">
                            <img src="../assets/img/blog6_1024x1024.webp" class="blog__img">
                            <div class="card__content">
                                <h2>
                                    Flowers to Hackney
                                </h2>
                                <p>September 15, 2022</p>
                                <p>A fresh and effective approach There’s been lots of talk about ‘mindfulness’ in recent
                                    years, in relation to our mental
                                    health, and it’s a subject...</p>
                            </div>
                        </div>
                        <div class="blog__item">
                            <img src="../assetss/img/blog6_1024x1024.webp" class="blog__img">
                            <div class="card__content">
                                <h2>
                                    Flowers to Hackney
                                </h2>
                                <p>September 15, 2022</p>
                                <p>A fresh and effective approach There’s been lots of talk about ‘mindfulness’ in recent
                                    years, in relation to our mental
                                    health, and it’s a subject...</p>
                            </div>
                        </div>
                        <div class="blog__item">
                            <img src="../assets/img/blog6_1024x1024.webp" class="blog__img">
                            <div class="card__content">
                                <h2>
                                    Flowers to Hackney
                                </h2>
                                <p>September 15, 2022</p>
                                <p>A fresh and effective approach There’s been lots of talk about ‘mindfulness’ in recent
                                    years, in relation to our mental
                                    health, and it’s a subject...</p>
                            </div>
                        </div>
                        <div class="blog__item">
                            <img src="../assetss/img/blog6_1024x1024.webp" class="blog__img">
                            <div class="card__content">
                                <h2>
                                    Flowers to Hackney
                                </h2>
                                <p>September 15, 2022</p>
                                <p>A fresh and effective approach There’s been lots of talk about ‘mindfulness’ in recent
                                    years, in relation to our mental
                                    health, and it’s a subject...</p>
                            </div>
                        </div>
                
                    </div>
                </div>

                <div class="blog__direction">
                    <button onclick="blogPrev()" id="blog_prev">
                        <i class="fa-solid fa-angle-left"></i>
                    </button>
                    <button onclick="blogNext()" id="blog-next">
                        <i class="fa-solid fa-angle-right"></i>
                    </button>
                </div>
                <br>
                

            </div>
        </div>

    </main>

</template>


<style>

</style>

