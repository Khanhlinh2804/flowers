<style>
footer{
    background-color:  #fdf6f6;
    width: 100%;
    padding: 20px 0;
    overflow: hidden;
    z-index: 3;
}

.footer {
    display: flex;
    padding-top: 40px;
    z-index: 3;
}

.footer__thefirst {
    flex: 1;
}

.footer__thefirst-logo {
    width: 150px;
    height: auto;
}

.footer__thefirst-list {
    display: flex;
    justify-content: start;
    margin: 0;
    padding: 0;
}

.footer__thefirst-item {
    list-style: none;
    padding: 0 5% 0 0;

}

.item-link {
    text-decoration: none;
    color: var(--text-black);
    text-transform: capitalize;
}

.item-link:hover {
    color: #d21616;
}

.footer__text {
    flex: 1;

}

.footer-list {
    list-style: none;
    padding: 0;
    /* max-width: 50px; */
}

.footer-item:nth-child(1) {
    font-weight: bold;
    text-transform: capitalize;
    padding-bottom: 10px;
    font-size: 18px;
}

.footer-item {
    font-size: 15px;
    padding-top: 5px;

}

@media screen and (max-width:600px) {
    .footer {
        display: grid;
        text-align: center
    }
    .footer__thefirst-list{
        display: flex;
        justify-content: center;
    }
    .footer-item:nth-child(1) {
        padding-top: 30px;
}
}
@media (min-width:769px) and (max-width:1023px)  {
    
    .footer{
        max-width: 900px;

    }
}
@media screen and (min-width: 1024px) {
    .footer {
        min-width: 1024px;
        display: flex;
        justify-content: space-between;
    }
}
</style>

<template>
        <footer>
            <div class="container">
                <div class="footer">
                    <div class="footer__thefirst">
                        <img src="../assets/img/logo.webp" alt="logo" class="footer__thefirst-logo" srcset="">
                        <div class="footer__thefirst-text">
                            <p>Sophisticated simplicity for the
                                independent mind.</p>
        
                        </div>
                        <ul class="footer__thefirst-list">
                            <li class="footer__thefirst-item">
                                <router-link to="" class="item-link fa-brands fa-instagram"></router-link>
                            </li>
                            <li class="footer__thefirst-item">
                                <router-link to="" class="item-link fa-brands fa-facebook "></router-link>
                            </li>
                            <li class="footer__thefirst-item">
                                <router-link to="" class="item-link fa-brands fa-linkedin"></router-link>
                            </li>
                            <li class="footer__thefirst-item">
                                <router-link to="" class="item-link fa-brands fa-pinterest"></router-link>
                            </li>
                            <li class="footer__thefirst-item">
                                <router-link to="" class="item-link fa-brands fa-twitter"></router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__text">
                        <ul class="footer-list">
                            <li class="footer-item">
                                help & infomation
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Pagination</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Home page</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Contact</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Accessoriest</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Term of use</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__text">
                        <ul class="footer-list">
                            <li class="footer-item">
                                about us
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Help center</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">address store</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">privacy policy</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">receivers & amplifiers</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">flower store</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__text">
                        <ul class="footer-list">
                            <li class="footer-item">
                                Shop
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Abouts</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">Privacy policy</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">terms & conditions</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">product return</router-link>
                            </li>
                            <li class="footer-item">
                                <router-link to="" class="item-link">wholesale policy</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </footer>
</template>

<script>

</script>
