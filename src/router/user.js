import Feature from "../pages/feature.vue";
import About from "../pages/about.vue";
import Login from "../pages/login.vue"
import Sigin from "../pages/sigin.vue"
import ResetPassword from "../pages/resetpw.vue"
import Wishlist from "../pages/wishlist.vue";
import Checkout from "../pages/checkout.vue";

const user = [
    {
        path: "/",
        component: () => import("../Client.vue"),
        children: [
            {
                path: "",
                name: "client.home",
                component: () => import('../pages/home.vue'),
            },
            {
                path: "/product",
                name: "client.product",
                component: () => import('../pages/Product.vue'),
            },
            {
                path: "/product/:category",
                name: "client.product.category",
                component: () => import('../pages/ProCategory.vue'),
            },
            {
                path: "/product/:size",
                name: "client.product.category",
                component: () => import('../pages/ProCategory.vue'),
            },
            
            {
                path: "/detail/:id",
                name: "client.product.detail",
                component: () => import('../pages/detail.vue'),
            },
            {
                path: "/cart",
                name: "client.cart",
                component: () => import('../pages/cart.vue'),
            },
            {
                path: "/checkout",
                name: "client.checkout",
                component: () => Checkout,
            },
            {
                path: "/feature",
                name: "client.feature",
                component: Feature,
            },
            {
                path: "/wishlist",
                name: "client.wishlist",
                component: Wishlist,
            },
            {
                path: "/about us",
                name: "client.about",
                component: About,
            },
            {
                path: "/login/resetpassword",
                name: "client.resetpassword",
                component: ResetPassword,
            },
            {
                path: "/login",
                name: "client.login",
                component: Login,
            },
            {
                path: "/sigin",
                name: "client.sigin",
                component: Sigin,
            }
        ]
    }
];

export default user;