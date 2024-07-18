<script setup>
import { useAccount } from '@/stores/useAccount';
import { reactive, ref, watchEffect } from 'vue';



const title = ref('Register');
const authStore = useAccount();

const account = reactive({
    name: '',
    email: '',
    password: '',
    phone: ''
})

watchEffect(() => {
    document.title = title.value;
});

const handleRegister = () => {
    if(!account.email || !account.name || !account.password){
        alert("Please enter email, password and name")
    }
    authStore.registerUser(account);
};
</script>

<template>
    <main class="pd-header reset">
        <div class="container">
            <div class="login-register">
                <div class="register">
                     <form @submit.prevent="handleRegister">
                        <div class="regiest_text">
                            <h1>Register</h1>
                            <div class="group-text">
                                <label> Name  </label>
                                <input type="text" v-model="account.name">
                            </div>
                            <div class="group-text">
                                <label> Phone  </label>
                                <input type="text" v-model="account.phone">
                            </div>
                            <div class="group-text">
                                <label> Email address  </label>
                                <input type="text" v-model="account.email">
                            </div>
                            <div class="group-text password-icon">
                                <label> Password  </label>
                                <input type="password" v-model="account.password">
                                <i class="fa-solid fa-unlock"></i>
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <button class="btn btn-login-register">Register</button>
                        </div>
                    </form>
                    <div>
                        <router-link :to="{name: 'client.product'}" class="route-link">
                            Return to store
                        </router-link>
                        <router-link to="" class="route-link">
                            Forgot your password?
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.route-link + .route-link {
    padding-left: 10px;
    content: '';
}

.route-link:hover {
    color: var(--bg--red);
}
</style>
