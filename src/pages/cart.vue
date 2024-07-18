<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useCartStore } from '@/stores/useCartStore';

const title = ref('Cart');
const cartStore = useCartStore();

const getProductQuantity = (id) => {
  const product = cartStore.products.find(product => product.id === id);
  return product ? product.quantity : 0;
}

watchEffect(() => {
  document.title = title.value;
});

onMounted(() => {
  cartStore.fetchProducts();
});
</script>

<template>
  <main class="pd-header">
    <div class="bread__crumb">
      <div class="container">
        <div class="bread__crumb-text">
          <router-link to="/"> Home </router-link>
          <i class="fa-solid fa-chevron-right"></i>
          <p>Your shopping cart</p>
        </div>
      </div>
    </div>
    <div class="container">
      <form @submit.prevent="cartStore.submitCart">
        <div class="cart">
          <table class="table cart_table">
            <thead>
              <tr class="cart_title">
                <th></th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="cartStore.cartItems && !cartStore.cartItems.length">
                <td colspan="7">Your cart is empty</td>
              </tr>
              <tr v-else v-for="item in cartStore.cartItems" :key="item.id" class="cart__data">
                <td class="cart-checkbox">
                  <input type="checkbox" :checked="cartStore.selectedItems.includes(item.id)" @change="cartStore.checkItem(item)">
                </td>
               <td data-label="Product">
                  <img :src="item.image.image01" alt="" height="150px" width="150px">
                </td>
                <td data-label="Name">
                  <p>{{ item.name }}</p>
                </td>
                <td data-label="Price" v-if="item['sale-price'] > 0">
                  ${{ item['sale-price'] }}
                </td>
                <td data-label="Price" v-else>
                  ${{ item.price }}
                </td> 
                <td class="cart-quantity" data-label="Quantity">
                  <div id="quantity">
                    <div class="quantity-input">
                      <input type="text" :value="item.quantity" min="1" :max="getProductQuantity(item.id)" id="amount" name="amount">
                    </div>
                    <div class="quantity-button">
                      <div @click="cartStore.incrementQ(item)" class="quantity-button-up">
                        <i class="fa-solid fa-caret-up"></i>
                      </div>
                      <div @click="cartStore.decrementQ(item)" class="quantity-button-down">
                        <i class="fa-solid fa-sort-down"></i>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="cart-total" data-label="Total price" v-if="item['sale-price'] > 0">
                  ${{ item['sale-price'] * item.quantity }}
                </td>
                <td class="cart-total" data-label="Total price" v-else>
                  ${{ item.price * item.quantity }}
                </td>
                <td class="cart-remove">
                  <div @click="cartStore.removeItem(item)" class="remove-button">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="total">
          <div class="cart__update">
            <router-link to="/product" class="cart__shop bg-black">Continue Shopping</router-link>
          </div>
          <div class="cart__check">
            <div class="cart_check-total">
              <th>Cart totals</th>
            </div>
            <table class="table">
              <tbody>
                <tr class="cart_check-data">
                  <th>Total</th>
                  <td>${{ cartStore.totalSelectPrice }}</td>
                </tr>
              </tbody>
            </table>
            <div class="cart__update pt-3">
              <button type="submit" class="cart__shop">Checkout</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
