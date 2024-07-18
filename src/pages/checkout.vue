
<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { useAccount } from '@/stores/useAccount';

const title = ref('checkout');
const cartStore = useCartStore();
const authStore = useAccount();

const client = reactive({
  first_name : '',
  last_name : '',
  phone: ''
})


watchEffect(() => {
  document.title = title.value;
});
</script>

<template>
  <main class="pd-header">
    <hr>
    <div class="bread__detail">
            <div class="container">
                <div class="bread__crumb-text">
                    <router-link :to="{ name: 'client.home' }" class="route-link bread__crumb-link"> Cart </router-link>
                    <router-link to="" class="route-link bread__crumb-link"> Checkout </router-link>
                </div>
            </div>
    </div>
    <hr>

    <div class="container pt-4">
      <form action="" class="container-lg" method="post">

        <div class="checkout">
          <div class="checkout_contact">
            <h3 class="pb-4">Contact</h3>
            
            <div class="checkout-input check-mail">
              <div class="group-check group-mail">
                <input placeholder="Enter text" class="field-checkout" type="Email">
                <label for="input-field" class="label-checkout">Email</label>
                <span class="input-highlight"></span>
              </div>
              <div class="group-check group-mail">
                <label class="email-checkbox">
                  <input checked="" type="checkbox">
                  <span></span>
                </label>
                <label >Email me with news and offers</label>
              </div>
            </div>
  
            <h3>Delivery</h3>
            <div>
              <div class="checkout-input ">
                <div class="group-check ">
                  <input placeholder="First Name" name="first_name" class="field-checkout" type="text">
                  <label for="input-field" class="label-checkout">First Name</label>
                  <span class="input-highlight"></span>
                </div>
                <div class="group-check ">
                  <input placeholder="Last Name" name="last_name " class="field-checkout" type="text">
                  <label for="input-field" class="label-checkout">Last Name</label>
                  <span class="input-highlight"></span>
                </div>
              </div>
              <div class="checkout-input ">
                <div class="group-check">
                  <input placeholder="Phone"  class="field-checkout" type="text">
                  <label for="input-field" class="label-checkout">Phone</label>
                  <span class="input-highlight"></span>
                </div>
                
              </div>
              <div class="checkout-input ">
                <div class="group-check ">
                  <select placeholder="Enter text" name="city" class="field-checkout" >
                    <option value=""> City</option>  
                  </select>
                </div>
              </div>
              <div class="checkout-input ">
                <div class="group-check ">
                  <select placeholder="Enter text" name="district" class="field-checkout" >
                    <option value=""> District</option>  
                  </select>
                </div>
              </div>
              <div class="checkout-input ">
                <div class="group-check ">
                  <input placeholder="Address" name="address" class="field-checkout" type="text">
                  <label for="input-field" class="label-checkout">Address</label>
                  <span class="input-highlight"></span>
                </div>
              </div>
              <div class="group-check group-mail pb-5">
                  <label class="email-checkbox">
                    <input checked="" type="checkbox">
                    <span></span>
                  </label>
                  <label >Save this infomation for next time</label>
              </div>
            </div>

            <h3>Payment</h3>
            <div class="payment pb-5">
              <div class="group-check">
                
                  <label class="radio-button">
                    <input id="option2" name="payment" type="radio">
                    <span class="radio-checkmark"></span>
                    <p >Cash</p>
                  </label>
              </div>
              <div class="group-check">
                
                  <label class="radio-button">
                    <input id="option2" name="payment" type="radio">
                    <span class="radio-checkmark"></span>
                    <p class="">Visa</p>
                  </label>
              </div>
              <div class="group-check">
                
                  <label class="radio-button">
                    <input id="option2" name="payment" type="radio">
                    <span class="radio-checkmark"></span>
                    <p class="">Credit/Debit Card</p>
                  </label>
              </div>
              <div class="group-check">
                
                  <label class="radio-button">
                    <input id="option2" name="payment" type="radio">
                    <span class="radio-checkmark"></span>
                    <p class="">Bank Transfer</p>
                  </label>
              </div>
            </div>
          </div>
          <div class="checkout_product">
            <h3 class="pb-4">Product</h3>
            <div class="checkout-item">
              <div class="item_image">
                <img src="../assets/img/blog_1.webp" alt="item" width="70px" height="70px">
                
              </div>
              <div class="item_title">
                <p>Name</p>
                <p>quantity</p>
                <span>total</span>
              </div>
            </div>
            <div class="checktotal">
              <div class="total-item">
                <p>Subtotal</p>
                <strong>$120</strong>
              </div>
              <div class="total-item">
                <p>Shipping</p>
                <strong>20</strong>
              </div>
              <div class="total-item">
                <p>Payment</p>
                <strong></strong>
              </div>
              <div class="total-item total ">
                <p>Total</p>
                <strong>$20</strong>
              </div>
            </div>
            <button class="payments">payment</button>
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
.route-link:hover {
        color: var(--bg--red);
    }

    .route-link+.route-link::before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 10px solid black;
        margin-right: 8px;
        margin-left: 8px;
        vertical-align: middle;
    }

    .bread__crumb-link:last-of-type {
        color: var(--text-gray);
        pointer-events: none;
    }
</style>
