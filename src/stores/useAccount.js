import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, provider } from "@/assets/js/index";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const toast = useToast();

export const useAccount = defineStore('authStore', () => {
    const user = ref(null);
    const router = useRouter();

    const init = () => {
        onAuthStateChanged(auth, (userDetail) => {
            if (userDetail) {
                user.value = { email: userDetail.email, uid: userDetail.uid };
                if (router.currentRoute.value.name === 'client.login') {
                    router.push({ name: 'client.home' });
                }
            } else {
                user.value = null;
                if (router.currentRoute.value.name !== 'client.login') {
                    router.replace({ name: 'client.login' });
                }
            }
        });
    };

    const registerUser = (account) => {
        createUserWithEmailAndPassword(auth, account.email, account.password)
            .then(() => {
                router.push({ name: 'client.login' });
                toast.success("User registered successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };

    const loginUser = (account) => {
        signInWithEmailAndPassword(auth, account.email, account.password)
            .then(() => {
                router.push({ name: 'client.home' });
                toast.success("User logged in successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                user.value = null;
                router.push({ name: 'client.login' });
                toast.success('Logout successful');
            })
            .catch((error) => {
                toast.error('Logout failed');
                console.error(error.message);
            });
    };

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                router.push({ name: 'client.home' });
                toast.success("User logged in with Google successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };

    return {
        registerUser,
        loginUser,
        logoutUser,
        loginWithGoogle,
        init,
        user,
    };
});
