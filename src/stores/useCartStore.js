import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [],
        cartItems: [],
    }),
    getters: {
        countCartItem: (state) => {
            return state.cartItems.length;
        },
        getProduct: (state) => {
            return state.products;
        }
    },

    actions: {
        addToCart(item) {
            let index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (index === -1) {
                this.cartItems.push({ ...item, quantity: 1 });
                toast.success("Your item has been added", { timeout: 1000 });
            } else {
                this.cartItems[index].quantity += 1;
                toast.success("Your item quantity has been updated", { timeout: 1000 });
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
        incrementQ(item) {
            let index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            let product = this.products.find(product => product.id === item.id);

            if (!product) {
                toast.error("Product not found", { timeout: 1000 });
                return;
            }

            if (index !== -1) {
                if (this.cartItems[index].quantity < product.quantity) {
                    this.cartItems[index].quantity += 1;
                    toast.success("Your item quantity has been increased", { timeout: 1000 });
                } else {
                    toast.error("Not enough stock", { timeout: 1000 });
                }
            }
        },
        decrementQ(item) {
            let index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);

            if (index !== -1) {
                if (this.cartItems[index].quantity > 1) {
                    this.cartItems[index].quantity -= 1;
                    toast.success("Your item quantity has been decreased", { timeout: 1000 });
                } else {
                    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
                    toast.success("Your item has been removed from the cart", { timeout: 1000 });
                }
            }
        },
        removeItem(item) {
            this.cartItems = this.cartItems.filter(product => product.id !== item.id);
            toast.error("Remove item", {
                timeout:1000
            })
        }
    }
});
