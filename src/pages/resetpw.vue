<template>
    <main class="pd-header reset">
        <div class="container">
            <div class="login-register">
                <div class="login">
                    <form action="">
                        <div class="login_text">
                            <h1>Reset password</h1>
                            <div class="group-text">
                                <label> Email or Phone </label>
                                <input type="text" placeholder="Email or Phone">
                            </div>
                            <div class="group-text">
                                <label> Code  </label>
                                <input type="text" placeholder="code">
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
.footer{
    display: none;
}

</style>