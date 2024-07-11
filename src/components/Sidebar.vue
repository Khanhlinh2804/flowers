<script>
    import { onMounted, ref, computed } from 'vue';

    const priceRanges = [
        { label: '$10 - $20', min: 10, max: 20 },
        { label: '$20 - $30', min: 20, max: 30 },
        { label: '$30 - $50', min: 30, max: 50 },
    ]
    export default {
            props: {
               onCategorySelected: {
                   type: Function,
                   required: true
               },
           },

        setup() {
            const url = "http://localhost:3000/Product";

            const products = ref([]);
            const selectedCategory = ref('All product');

            onMounted(() => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        products.value = data;
                    })
                    .catch(error => console.error('Error:', error));
            });
            const uniqueSizes = computed(() => {
            const sizes = products.value.map(product => product.size);
                return [...new Set(sizes)];
            });

            const uniqueCategories = computed(() => {
                const categories = products.value.map( products => products.category);
                return ['All product',...new Set(categories)];
            })

            const uniqueColors = computed(() => {
                const colors = products.value.map(products => products.color);
                return [...new Set(colors)]
            })

            const handleCategoryClick = (category) => {
                selectedCategory.value = category;
                props.onCategorySelected(category);
            };

            console.log(handleCategoryClick)

            return {
                products,
                priceRanges,
                uniqueSizes,
                uniqueCategories,
                uniqueColors,
                handleCategoryClick,
                selectedCategory,
            };
        }
    }

</script>

<template>
    <div class="sidebar">
        <div class="sidebar__title">
            <div class="sidebar__title-lable">
                <h2>Category</h2>
                <span></span>
            </div>
            <ul class="sidebar__title-list">
                <li class="sidebar__title-item" v-for="category in uniqueCategories" :key="category">
                    <router-link :to="'/product/' + category" @click.prevent="handleCategoryClick(category)">{{ category }}</router-link>
                </li>
            </ul>
        </div>
        <div class="sidebar__title ">
            <div class="sidebar__title-lable">
                <h2>Price</h2>
                <span></span>
            </div>
            <div class="sidebar__title-checkbox">
                <div v-for="(range , index) in priceRanges" :key="index">
                    <input type="checkbox" :id="'price-range-' + index" 
                    :value="range">
                    <label for="">{{ range.label }}</label>
                </div>

            </div>
        </div>
        <div class="sidebar__title ">
            <div class="sidebar__title-lable">
                <h2>Size</h2>
                <span></span>
            </div>
            <div class="sidebar__title-size">
                <template v-for="size in uniqueSizes" :key="size">
                    <router-link :to="'/size/' + size" class="title-size">
                        <span>{{ size }}</span>
                    </router-link>
                </template>
               
            </div>
        </div>

        <div class="sidebar__title ">
            <div class="sidebar__title-lable">
                <h2>Color</h2>
                <span> </span>
            </div>
            <div class="sidebar__title-color">
                <template v-for="color in uniqueColors" :key="color">
                    <router-link to="#" class="title-color-item">
                        <samp :style="{ backgroundColor: color }" :title="color"></samp>
                    </router-link>
                </template>
                
            </div>
        </div>

    </div>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .sidebar {
        flex: 1;
        min-width: 200px;
        grid-row: 20px;
    }

    .sidebar__title-lable {
        display: flex;
        align-items: center;
    }

    .sidebar__title-lable span {
        width: 100%;
        max-height: 1px;
        border: .2px solid var(--text-gray);
    }

    .sidebar__title-lable h2 {
        margin: 0;
        border-left: 8px solid var(--icon-color);
        padding: 10px 15px;
    }

    .sidebar__title-list {
        list-style: none;
        padding-left: 0;
        margin: 30px 8%;
    }

    .sidebar__title-item {
        position: relative;
        padding-left: 20px;
    }

    .sidebar__title-item a {
        text-decoration: none;
        font-size: 15px;
        color: var(--icon-color);
        transition: color 0.3s;
    }

    .sidebar__title-item:hover::before {
        content: '\f105';
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        position: absolute;
        left: 0;
        color: var(--icon-color);
        transition: color 0.3s;
    }

    .sidebar__title-item:hover::before,
    .sidebar__title-item:hover a {
        color: var(--bg--red);
    }

    .sidebar__title-checkbox {
        margin: 30px 8%;
    }

    .sidebar__title-checkbox label {
        padding: 10px 5px;

    }

    .sidebar__title-checkbox div {
        padding: 4px 0;
    }

    .sidebar__title-checkbox div:hover {
        color: var(--bg--red);
    }

    .sidebar__title-checkbox div:hover input,
    .sidebar__title-checkbox div:hover label {
        color: var(--bg--red);
    }

    .sidebar__title-size {
        margin: 30px 8%;
        display: flex;
        flex-wrap: wrap;
        /* align-content: space-around ; */
    }

    .title-size {
        text-decoration: none;
        font-size: 20px;
        margin: 5px 5px;
        display: inline-block;
        height: 50px;
        /* padding: 5px 0; */
    }

    .sidebar__title-size .title-size span {
        border: 1px solid black;
        display: inline-block;
        color: var(--text-black);
        width: 50px;
        line-height: 50px;
        text-align: center;
    }

    .title-size span:hover {
        border: #fff;
        color: #fff;
        background-color: var(--bg--red);
    }


    .sidebar__title-color {
        margin: 30px 8%;
        display: flex;
        flex-wrap: wrap;
    }

    .title-color-item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title-color-item samp {

        border: 1px solid rgb(168, 167, 167);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        /* box-shadow: 5px 5px 5px 0px rgba(3, 3, 3, 0.955); */
    }

    .title-color-item:active {
        border: 1px solid rgb(0, 0, 0);

    }
</style>