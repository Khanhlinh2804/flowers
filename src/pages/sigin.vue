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
                <div class="register">
                     <form action="">
                        <div class="regiest_text">
                            <h1>Register</h1>
                            <div class="group-text">
                                <label> Name  </label>
                                <input type="text" placeholder="Name">
                            </div>
                            <div class="group-text">
                                <label> Email adress  </label>
                                <input type="text" placeholder="Email">
                            </div>
                            <div class="group-text password-icon">
                                <label> Password  </label>
                                <input type="password" placeholder="Password">
                                <i class="fa-solid fa-unlock"></i>
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <button class="btn btn-login-register">Register </button>
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
.route-link + .route-link{
    padding-left: 10px;
    content: '';
}

.route-link:hover{
    color: var(--bg--red);
}


</style>