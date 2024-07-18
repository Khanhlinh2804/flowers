import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        products: [],
        wishlistItems:  [],
        // wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || [],
    }),
    getters: {
        countWishlistItem: (state) => {
            return state.wishlistItems.length;
        },
        getWishlist: (state) => {
            return state.products;
        }
    },
    actions: {
        
        addToWishlist(item) {
            let index = this.wishlistItems.findIndex(product => product.id === item.id);
            if (index === -1) {
                this.wishlistItems.push({ ...item, quantity: 1 });
                toast.success("Add item success", {
                    timeout: 1000
                });
            } else {
                toast.error("This item is already in the wishlist", {
                    timeout: 1000
                });
            }
            // this.saveWishlist();
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
        saveWishlist() {
            localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        },

    }
});
