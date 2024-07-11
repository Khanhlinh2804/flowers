<script>
import { onMounted, ref, computed, watchEffect } from 'vue';
import Item from '../components/Item.vue';

const priceRanges = [
    { label: '$10 - $20', min: 10, max: 20 },
    { label: '$20 - $30', min: 20, max: 30 },
    { label: '$30 - $50', min: 30, max: 50 },
];

export default {
    components: {
        Item,
    },
    setup() {
        const url = 'http://localhost:3000/Product';
        const title = ref('Product');
        const products = ref([]);
        const selectPrice = ref([]);
        const selectSize = ref([]);
        const selectColor = ref([]);
        const selectCategory = ref('All product');

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
            const categories = products.value.map(product => product.category);
            return ['All product', ...new Set(categories)];
        });

        const uniqueColors = computed(() => {
            const colors = products.value.map(product => product.color);
            return [...new Set(colors)];
        });

        const filteredProducts = computed(() => {
            let filtered = products.value;
            if (selectCategory.value !== 'All product') {
                filtered = filtered.filter(product => product.category === selectCategory.value);
            }
            if (selectPrice.value.length > 0) {
                filtered = filtered.filter(product => {
                    return selectPrice.value.some(range => {
                        return product.price >= range.min && product.price <= range.max;
                    });
                });
            }
            if (selectSize.value.length > 0) {
                filtered = filtered.filter(product => selectSize.value.includes(product.size));
            }
            if (selectColor.value.length > 0) {
                filtered = filtered.filter(product => selectColor.value.includes(product.color));
            }
            return filtered;
        });

        const handlePriceRange = (range, checked) => {
            if (checked) {
                selectPrice.value.push(range);
            } else {
                const index = selectPrice.value.indexOf(range);
                if (index > -1) {
                    selectPrice.value.splice(index, 1);
                }
            }
        };

        const handleCategoryClick = category => {
            selectCategory.value = category;
        };

        const handleSizeClick = size => {
            if (selectSize.value.includes(size)) {
                selectSize.value = selectSize.value.filter(s => s !== size);
            } else {
                selectSize.value.push(size);
            }
        };

        const handleColorClick = color => {
            if (selectColor.value.includes(color)) {
                selectColor.value = selectColor.value.filter(c => c !== color);
            } else {
                selectColor.value.push(color);
            }
        };

        watchEffect(() => {
            document.title = title.value;
        });

        return {
            products,
            title,
            priceRanges,
            uniqueSizes,
            uniqueCategories,
            uniqueColors,
            filteredProducts,
            handlePriceRange,
            handleCategoryClick,
            handleSizeClick,
            handleColorClick,
            selectCategory,
            selectSize,
            selectColor,
        };
    },

    methods: {
        handleColorClick(color) {
            if(this.selectColor.includes(color)){
                this.selectColor = this.selectColor.filter(c => c !== color);
            }else {
                this.selectColor = [color]
            }
        }
    }
};
</script>

<template>
    <main class="pd-header">
        <section class="bg-breadcrumb">
            <div class="container">
                <div class="breadcrumb">
                    <h1 class="text-align-center">Product</h1>
                    <ul class="breadcrumb__list">
                        <li>
                            <router-link to="/" class="item-link">Home</router-link>
                        </li>
                        <li class="text-decoration-none"></li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- product start  -->
        <div class="container pb-6 shop">
            <div class="sidebar pb-7">
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
                <div class="sidebar__title">
                    <div class="sidebar__title-lable">
                        <h2>Price</h2>
                        <span></span>
                    </div>
                    <div class="sidebar__title-checkbox">
                        <div v-for="(range, index) in priceRanges" :key="index">
                            <input type="checkbox" :id="'price-range-' + index" :value="range" @change="handlePriceRange(range, $event.target.checked)">
                            <label :for="'price-range-' + index">{{ range.label }}</label>
                        </div>
                    </div>
                </div>
                <div class="sidebar__title">
                    <div class="sidebar__title-lable">
                        <h2>Size</h2>
                        <span></span>
                    </div>
                    <div class="sidebar__title-size">
                        <div class="checkbox-size" 
                            v-for="size in uniqueSizes" 
                            :key="size" :class="{'active': selectSize.includes(size)}">
                            <input 
                                type="checkbox"  
                                :value="size" 
                                @change="handleSizeClick(size)"  
                                class="title-size">
                            <label>{{ size }}</label>  
                        </div>
                    </div>
                </div>
                <div class="sidebar__title">
                    <div class="sidebar__title-lable">
                        <h2>Color</h2>
                        <span></span>
                    </div>
                    <div class="sidebar__title-color">
                        <div class="checkbox-color" 
                            :class="{'active': selectColor.includes(color), 'inactive': !selectColor.includes(color)}"  
                            v-for="color in uniqueColors" :key="color" @click="handleColorClick(color)">
                            <input type="checkbox" v-model="selectColor" :value="color">
                            <label :style="{ backgroundColor: color }" :title="color" class="title-color-item"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-component">
                <!-- search  -->
                <Item :products="filteredProducts" :selected-category="selectCategory" />
                <!-- product  -->
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
</style>
