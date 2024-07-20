// userCartStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [],
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || [],
    }),
    getters: {
        countCartItem: (state) => state.cartItems.length,
        getProduct: (state) => state.products,
        totalSelectPrice: (state) => {
            return state.cartItems.reduce((total, item) => {
                if (state.selectedItems.includes(item.id)) {
                    const price = item['sale-price'] > 0 ? item['sale-price'] : item['price'];
                    return total + price * item.quantity;
                }
                return total;
            }, 0);
        },
        selectedCartItems: (state) => state.cartItems.filter(item => state.selectedItems.includes(item.id)),
    },
    actions: {
        addToCart(item) {
            const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (index === -1) {
                this.cartItems.push({ ...item, quantity: 1 });
                toast.success("Your item has been added", { timeout: 1000 });
            } else {
                this.cartItems[index].quantity += 1;
                toast.success("Your item quantity has been updated", { timeout: 1000 });
            }
            this.saveCart();
        },
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/Product');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        incrementQ(item) {
            const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            const product = this.products.find(product => product.id === item.id);

            if (product && this.cartItems[index].quantity < product.stock) {
                this.cartItems[index].quantity += 1;
                toast.success("Item quantity has been increased", { timeout: 1000 });
                this.saveCart();
            } else {
                toast.error("No more stock available", { timeout: 1000 });
            }
        },
        decrementQ(item) {
            const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity -= 1;
                toast.success("Item quantity has been decreased", { timeout: 1000 });
                this.saveCart();
            } else {
                this.removeItem(item);
            }
        },
        removeItem(item) {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
            toast.success("Item removed from cart", { timeout: 1000 });
            this.saveCart();
        },
        removeSelectedItems() {
            this.cartItems = this.cartItems.filter(cartItem => !this.selectedItems.includes(cartItem.id));
            this.selectedItems = [];
            toast.success("Selected items removed from cart", { timeout: 1000 });
            this.saveCart();
        },
        
        clearCart() {
            this.cartItems = [];
            this.selectedItems = [];
            localStorage.removeItem('cartItems');
            localStorage.removeItem('selectedItems');
            toast.success("Cart has been cleared", { timeout: 1000 });
        },
        checkItem(item) {
            const index = this.selectedItems.indexOf(item.id);
            if (index > -1) {
                this.selectedItems.splice(index, 1);
            } else {
                this.selectedItems.push(item.id);
            }
            localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
    }
});
