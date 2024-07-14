<script setup>
import { ref, watchEffect } from 'vue';
import { useCartStore } from '@/stores/useCartStore';

const title = ref('Cart');
const data = useCartStore();

const getProductQuantity = (id) => {
    const product = data.products.find(product => product.id === id);
    return product ? product.quantity : 0;
}

watchEffect(() => {
  document.title = title.value;
});
</script>

<template>
  <main class="pd-header">
    <div class="bread__crumb">
      <div class="container">
        <div class="bread__crumb-text">
          <router-link to=""> Home </router-link>
          <i class="fa-solid fa-chevron-right"></i>
          <p>Your shopping cart</p>
        </div>
      </div>
    </div>
    <div class="container">
      <form action="" method="post">
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
              <tr v-if="!data.cartItems.length">
                <td colspan="7">Your cart is empty</td>
              </tr>
              <tr class="cart__data" v-else v-for="item in data.cartItems" :key="item.id">
                <td class="cart-checkbox">
                  <input type="checkbox" name="">
                </td>
                <td class="" data-label="Product">
                  <img :src="item.image.image01" alt="" height="150px" width="150px" srcset="">
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
                      <div @click="data.incrementQ(item)" class="quantity-button-up">
                        <i class="fa-solid fa-caret-up"></i>
                      </div>
                      <div @click="data.decrementQ(item)" class="quantity-button-down">
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
                  <div @click="data.removeItem(item)" class="remove-button">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="total">
          <div class="cart__update">
            <button type="submit">Update Cart</button>
            <router-link to="/product" class="cart__shop">Continue Shopping</router-link>
          </div>
          <div class="cart__check">
            <div class="cart_check-total">
              <th>Cart totals</th>
            </div>
            <table class="table">
              <tbody>
                <tr class="cart_check-data">
                  <th>total</th>
                  <td>$60.00</td>
                </tr>
              </tbody>
            </table>
            <div class="cart__update pt-3">
              <router-link to="/product" class="cart__shop">Continue Shopping</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }
</style>
