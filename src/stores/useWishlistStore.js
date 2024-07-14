import { defineStore } from "pinia";
import { useToast } from "vue-toastification";


const toast = useToast();

export const useWishlistStore = defineStore('wishlist', {
    state:  () => ({
        products: [],
        wishlistItems: []
    }),
    getters: {
        countWishlistItem: (state) => {
            return state.wishlistItems.length;
        },
        getProduct: (state) => {
            return state.products;
        }
    },
    actions: {
        addToWishlist(item) {
            let index = this.wishlistItems.findIndex(wishlistItem => wishlistItem.id === item.id);
            if(index === -1) {
                this.wishlistItems.push({ ...item, quantity: 1});
                toast.success(" Add item Wishlist success", {
                    timeout: 1000
                })
            }
        },
        async fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/Product');
                const data = await response.json();
                this.products = data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    }
})