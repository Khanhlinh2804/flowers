<template>
    <main class="pd-header reset">
        <div class="container">
            <div class="login-register">
                <div class="login">
                    <h1>Login</h1>
                    
                    <form @submit.prevent="handleLogin">
                        <div class="login_text">
                            <div>
                                <div class="group-text">
                                    <label>Email address</label>
                                    <input type="text" v-model="account.email" placeholder="Email">
                                </div>
                                <p>LInh nef</p>

                            </div>
                            <div class="group-text password-icon">
                                <label>Password</label>
                                <input type="password" v-model="account.password" placeholder="Password">
                                <i class="fa-solid fa-unlock"></i>
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <button class="btn btn-login-register">Login</button>
                        </div>
                    </form>
                    <div>
                        <hr>
                        <div class="with">
                            <form @submit.prevent="loginWithGoogle">
                                <div class="google">
                                <button type="submit" class="btl submit-login login-google"> 
                                    <i class="fa-brands fa-google"></i>
                                    <p class="">Login with Google </p>  
                                </button>
                            </div>
                            </form>
                            <form action="" method="post">
                                <div class="facebook">
                                <button type="submit" class="btl submit-login"> 
                                    <i class="fa-brands fa-facebook"></i>
                                    <p>Login with facebook</p> 
                                </button>
                            </div>
                            </form>
                    </div>
                    

                        
                        <router-link :to="{ name: 'client.resetpassword'}" class="route-link">
                            Forgot password
                        </router-link>
                        <router-link :to="{ name: 'client.sigin'}" class="route-link">
                            Don't have an account?
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useAccount } from '@/stores/useAccount';
import { ref, reactive, watchEffect } from 'vue';

const title = ref('Login');
const authStore = useAccount();

const account = reactive({
    name: '',
    email: '',
    password: '',
    phone: ''
});

const handleLogin = () => {
    if (!account.email || !account.password) {
        alert('Please enter email and password');
        return;
    }
    authStore.loginUser(account);
};

const loginWithGoogle = () => {
    authStore.loginWithGoogle()
}
watchEffect(() => {
    document.title = title.value;
});
</script>

<style>
.route-link + .route-link {
    padding-left: 10px;
    content: '';
}

.route-link:hover {
    color: var(--bg--red);
}

.password-icon {
    position: relative;
}

.password-icon i {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
</style>
