<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { useAccount } from '@/stores/useAccount';
import { UseProductCheckout } from '@/stores/useProductCheckout';


const title = ref('checkout');
const cartStore = useCartStore();
const authStore = useAccount();
const checkStore = UseProductCheckout();

const errors = reactive({
    user_name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: ''
});




const total = computed(() => {
    return cartStore.totalSelectPrice;
});

const onCityChange = () => {
    checkStore.fetchDistricts(checkStore.client.city);
};

const onDistrictChange = () => {
    checkStore.fetchWards(checkStore.client.district);
};

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
                <router-link :to="{ name: 'client.home' }" class="route-link bread__crumb-link">Cart</router-link>
                <router-link to="" class="route-link bread__crumb-link">Checkout</router-link>
            </div>
        </div>
    </div>
    <hr>
    <div class="container pt-4">
        <form @submit.prevent="checkStore.handleSubmit" class="container-lg" method="post">
            <div class="checkout">
                <div class="checkout_contact">
                    <h3 class="pb-4">Contact</h3>
                    <div class="checkout-input check-mail">
                        <div class="group-check group-mail">
                            <input placeholder="Enter text" :value="authStore.user ? authStore.user.email : ''" readonly class="field-checkout" type="Email">
                            <label for="input-field" class="label-checkout">Email</label>
                            <span class="input-highlight"></span>
                        </div>
                        <div class="group-check group-mail">
                            <label class="email-checkbox">
                                <input checked="" type="checkbox">
                                <span></span>
                            </label>
                            <label>Email me with news and offers</label>
                        </div>
                    </div>
                    <h3>Delivery</h3>
                    <div>
                        <div class="checkout-input ">
                            <div class="group-check ">
                                <input placeholder="First Name" required v-model="checkStore.client.first_name" name="first_name" class="field-checkout" type="text">
                                <label for="input-field" class="label-checkout">First Name</label>
                                <span class="input-highlight"></span>
                            </div>
                        </div>
                        <div class="alter" v-if="errors">
                            <p class="alter-danger">{{ errors.user_name }}</p>
                        </div>
                        <div class="checkout-input ">
                            <div class="group-check">
                                <input placeholder="Phone" required v-model="checkStore.client.phone" class="field-checkout" type="text">
                                <label for="input-field" class="label-checkout">Phone</label>
                                <span class="input-highlight"></span>
                            </div>
                        </div>
                        <div class="alter" v-if="errors">
                            <p class="alter-danger">{{ errors.phone }}</p>
                        </div>
                        <div class="checkout-input ">
                            <div class="group-check checkout-alter">
                                <select placeholder="Enter text" required v-model="checkStore.client.city" name="city" @change="onCityChange()" class="field-checkout">
                                    <option value="">City</option>
                                    <option v-for="city in checkStore.cities" :key="city.Code" :value="city.Code">{{ city.FullName }}</option>
                                </select>
                                <div class="alter" v-if="errors">
                                    <p class="alter-danger">{{ errors.city }}</p>
                                </div>
                            </div>
                            <div class="group-check checkout-alter">
                                <select placeholder="Enter text" required v-model="checkStore.client.district" name="district" class="field-checkout" @change="onDistrictChange">
                                    <option value="">District</option>
                                    <option v-for="district in checkStore.districts" :key="district.Code" :value="district.Code">{{ district.FullName }}</option>
                                </select>
                                <div class="alter" v-if="errors">
                                    <p class="alter-danger">{{ errors.district }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="checkout-input ">
                            <div class="group-check checkout-alter">
                                <select placeholder="Enter text" v-model="checkStore.client.ward" name="ward" class="field-checkout">
                                    <option value="">Ward</option>
                                    <option v-for="ward in checkStore.wards" :key="ward.Code" :value="ward.Code">{{ ward.FullName }}</option>
                                </select>
                                <div class="alter" v-if="errors">
                                    <p class="alter-danger">{{ errors.ward }}</p>
                                </div>
                            </div>
                        </div>

                             <div class="checkout-input">
                                <div class="group-check">
                                    <input placeholder="Address" v-model="checkStore.client.address" name="address"
                                        class="field-checkout" type="text">
                                    <label for="input-field" class="label-checkout">Address</label>
                                    <span class="input-highlight"></span>
                                    
                                </div>
                            </div>
                            <div class="alter" v-if="errors">
                                        <p class="alter-danger">{{ errors.address }}</p>
                                    </div>
                            <div class="checkout-input ">
                                <div class="group-check">
                                    <input placeholder="Note" v-model="checkStore.client.note" class="field-checkout"
                                        type="text">
                                    <label for="input-field" class="label-checkout">Note</label>
                                    <span class="input-highlight"></span>
                                </div>
                            </div>
                            
                           
                            <div class="group-check group-mail pb-5">
                                <label class="email-checkbox">
                                    <input id="save-info-checkbox"  type="checkbox">
                                    <span></span>
                                </label>
                                <label>Save this infomation for next time</label>
                            </div>
                        </div>
                        <button type="submit"> Infomation client</button>

                        <h3>Payment</h3>
                        <div class="payment pb-5">
                            <div class="group-check">

                                <label class="radio-button">
                                    <input id="option2" name="payment" type="radio" @change="checkStore.itemPayment">
                                    <span class="radio-checkmark"></span>
                                    <p>Cash</p>
                                </label>
                            </div>
                            <div class="group-check">

                                <label class="radio-button">
                                    <input id="option2" name="payment" value="Visa" type="radio" @change="checkStore.itemPayment">
                                    <span class="radio-checkmark"></span>
                                    <p class="">Visa</p>
                                </label>
                            </div>
                            <div class="group-check">

                                <label class="radio-button">
                                    <input id="option2" name="payment" value="Debit_cart" type="radio"
                                        @change="checkStore.itemPayment">
                                    <span class="radio-checkmark"></span>
                                    <p class="">Credit/Debit Card</p>
                                </label>
                            </div>
                            <div class="group-check">

                                <label class="radio-button">
                                    <input id="option2" name="payment" value="Bank_transfer" type="radio"
                                        @change="checkStore.itemPayment">
                                    <span class="radio-checkmark"></span>
                                    <p class="">Bank Transfer</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="checkout_product">
                        <h3 class="pb-4">Product</h3>
                        <div class="checkout-item" v-for="item in cartStore.selectedCartItems" :key="item.id">
                            <div class="item_image">
                                <img :src="item.image.image01" alt="item" width="70px" height="70px">

                            </div>
                            <div class="item_title">
                                <p>{{ item.name }}</p>
                                <p>{{ item.quantity }}</p>
                                <span v-if="item['sale-price'] === 0"> ${{ item.price * item.quantity }}</span>
                                <span v-else> ${{ item['sale-price'] * item.quantity }}</span>

                            </div>
                        </div>
                        <div class="checktotal">
                            <div class="total-item">
                                <p>Subtotal</p>
                                <strong>${{ total }}</strong>
                            </div>
                            <div class="total-item">
                                <p>Shipping</p>
                                <strong>$20</strong>
                            </div>
                            <div class="total-item">
                                <p>Payment</p>
                                <strong>{{ checkStore.selectPayment }}</strong>
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
    * {
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