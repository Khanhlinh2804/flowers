import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, provider } from "@/assets/js/index";
import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const toast = useToast();

export const useAccount = defineStore('authStore', () => {
    const user = ref({});
    const router = useRouter();
    const init = () => {
        onAuthStateChanged(auth, (userDetail) => {
            if (userDetail) {
                const uid = userDetail.uid;
                user.value = { email: userDetail.email, uid}
                router.push({ name: 'client.home' })
                // ...
            } else {
                user.value = {};
                router.replace({ name: 'auth'})
            }
        });
    }
    
    
    const registerUser = (account) => {
        createUserWithEmailAndPassword(auth, account.email, account.password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push({ name: 'client.login' })
                toast.success("User registered successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };

    const loginUser = (account) => {
        signInWithEmailAndPassword(auth, account.email, account.password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push({ name: 'client.home' })
                toast.success("User logged in successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    };

    const logoutUser = ( ) => {
        signOut(auth).then(() => {
            toast.success('logout success');
        }).catch((error) => {
            // An error happened.
        });
    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                router.push({ name: 'home' })
                toast.success("User logged in with Google successfully!");
            }).catch((error) => {
                toast.error(error.message);
                console.log(error.message);
            });
    }
    
    return {
        registerUser,
        loginUser,
        logoutUser,
        loginWithGoogle,
        init,
        user,
    };
});
