import { defineStore } from "pinia";

import { useToast } from 'vue-toastification';


const toast = useToast();
export const useProduct = defineStore('filter', {
    state: () => ({
        products: [],
        productItems: JSON.parse(localStorage.getItem('productItems')) || [],
        selectedType: '',
    }),
    getters: {
        getProduct: (state) => {
            if(state.selectedType){
                return state.products.filter(product => product.type === state.selectedType);
            }
            return state.products;
        },
    },
    actions: {
        async fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/Product');
                const data = await response.json();
                this.products = data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        setFilterType(type){
            this.selectedType = type;
        }
    }
})