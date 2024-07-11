<script>
import { ref, watchEffect } from 'vue';

export default {
    setup(){
        const title = ref('Login');






        watchEffect(() => {
            document.title = title.value;
        })



        return{
            title
        }
    }


}
</script>

<template>
    <main class="pd-header reset">
        <div class="container">
            <div class="login-register">
                <div class="login">
                    <form action="">
                        <div class="login_text">
                            <h1>Login</h1>
                            <div class="group-text">
                                <label> Email adress  </label>
                                <input type="text" placeholder="Email">
                            </div>
                            <div class="group-text password-icon">
                                <label> Password  </label>
                                <input type="text" placeholder="Password">
                                <i class="fa-solid fa-unlock"></i>
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <button class="btn btn-login-register">Login </button>
                        </div>
                    </form>
                    <router-link :to="{ name: 'client.resetpassword'}" class="route-link">
                        Forgot password
                    </router-link>
                    <router-link :to="{ name: 'client.sigin'}" class="route-link">
                        You not a account? 
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>


<style>
.route-link + .route-link{
    padding-left: 10px;
    content: '';
}

.route-link:hover{
    color: var(--bg--red);
}
.password-icon{
    position: relative;
}
.password-icon i{
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
</style>