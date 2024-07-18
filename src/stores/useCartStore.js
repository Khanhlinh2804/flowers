import axios from 'axios';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { useRouter } from "vue-router";

const toast = useToast();

export const useCartStore = defineStore('cart', {
    state: () => ({
        products: [],
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || [],
    }),
    getters: {
        countCartItem: (state) => {
            return state.cartItems.length;
        },
        getProduct: (state) => {
            return state.products;
        },
        totalSelectPrice: (state) => {
            return state.cartItems.reduce((total, item) => {
                if (state.selectedItems.includes(item.id)) {
                    const price = item['sale-price'] > 0 ? item['sale-price'] : item['price'];
                    return total + price * item.quantity;
                }
                return total;
            }, 0)
        },
        selectedCartItems: (state) => {
            return state.cartItems.filter(item => state.selectedItems.includes(item.id));
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
                toast.success("Your item quantity has been updated", {
                    timeout: 1000
                });
            }
            this.saveCart();
        },
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/Product');
                const data = response.data;
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
            this.saveCart();
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
            this.saveCart();
        },
        checkItem(item) {
            const index = this.selectedItems.findIndex(id => id === item.id);
            if (index === -1) {
                this.selectedItems.push(item.id)
            } else {
                this.selectedItems.splice(index, 1);
            }
            this.saveCart();
        },
        removeItem(item) {
            this.cartItems = this.cartItems.filter(product => product.id !== item.id);
            this.selectedItems = this.selectedItems.filter(id => id !== item.id);
            toast.error("Remove item", {
                timeout: 1000
            });
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
        },
        async submitCart() {
            const router = useRouter();  // Đưa dòng này vào bên trong phương thức submitCart
            this.saveCart();
            router.push({ name: 'client.checkout' });
        }
    }
});
