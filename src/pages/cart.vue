<script>
import{ref, watchEffect} from 'vue'

const title = ref('Cart')

watchEffect(()=> {
    document.title = title.value
})
</script>

<template>
    <main class="pd-header">
        <div class="bread__crumb">
            <div class="container">
                <div class="bread__crumb-text">
                    <a href="./index.html"> Home </a>
                    <i class="fa-solid fa-chevron-right"></i>
                    <p>Your shopping card</p>
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
                            <tr class="cart__data">
                                <td class="cart-checkbox">
                                    <input type="checkbox" name="">
                                </td>
                                <td class="" data-label="Product">
                                    <img src="../assets/img/blog_1.webp" alt="" height="200px" srcset="">
                                </td>
                                <td data-label="Name">
                                    <p>name</p>
                                </td>

                                <td data-label="Price">
                                    $30.09
                                </td>
                                <td class="cart-quantity" data-label="Quantity">
                                    <div id="quantity">
                                        <div class="quantity-input">
                                            <input type="text" value="1" min="1" id="amount" name="amount">
                                        </div>
                                        <div class="quantity-button">
                                            <button type="button" onclick="handleUp()" class="quantity-button-up">
                                                <i class="fa-solid fa-caret-up"></i>
                                            </button>
                                            <button type="button" onclick="handleDown()" class="quantity-button-down">
                                                <i class="fa-solid fa-sort-down"></i>
                                            </button>
                                        </div>
                                    </div>

                                </td>
                                <td class="cart-total" data-label="Total price">30</td>
                                <td class="cart-remove">
                                    <button class="remove-button">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <!-- <hr> -->
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
                        <table class="table ">
                            <tbody>
                                <tr class="cart_check-data">
                                    <th>total</th>
                                    <td>$60.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="cart__update pt-3 ">
                            <router-link to="/product" class="cart__shop">Continue Shopping</router-link>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    </main>
</template>

<style>


</style>