// useProductCheckout.js
import { defineStore } from "pinia";
import { auth, db } from "@/assets/js/index";
import { doc, setDoc } from 'firebase/firestore';
import { reactive, ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useCartStore } from "./useCartStore";

const toast = useToast();

export const UseProductCheckout = defineStore('checkout', () => {
    const client = reactive({
        user_name: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        note: '',
    });

    const cities = ref([]);
    const districts = ref([]);
    const wards = ref([]);
    const selectPayment = ref('');
    const router = useRouter();
    const cartStore = useCartStore();

    const fetchCity = async () => {
        try {
            const response = await axios.get("http://localhost:3000/City");
            cities.value = response.data;
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const fetchDistricts = (cityCode) => {
        const selectctCity = cities.value.find(city => city.Code === cityCode);
        if (selectctCity) {
            districts.value = selectctCity.District;
            client.district = '';
            client.ward = '';
            wards.value = [];
        }
    };

    const fetchWards = (districtCode) => {
        const selectedDistrict = districts.value.find(district => district.Code === districtCode);
        if (selectedDistrict) {
            wards.value = selectedDistrict.Ward;
            client.ward = '';
        }
    };

    const validateClientInfo = () => {
        const errors = [];

        if (client.user_name.length >= 5) {
            errors.push(" Name is required and must be at least 5 characters.");
        }
        if (!client.phone.trim() || !/^\d{10}$/.test(client.phone)) {
            errors.push("Phone number is invalid.");
        }
        if (!client.city.trim()) {
            errors.push("City is required.");
        }
        if (!client.district.trim()) {
            errors.push("District is required.");
        }
        if (!client.ward.trim()) {
            errors.push("Ward is required.");
        }
        if (!client.address.trim()) {
            errors.push("Address is required.");
        }

        return errors;
    };

    const saveCheckoutInfo = async () => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('User not logged in');

            const errors = validateClientInfo();
            if (errors.length > 0) {
                throw new Error(errors.join(' '));
            }

            // Save checkout info to Firebase
            await setDoc(doc(db, "client", user.uid), {
                ...client,
                email: user.email,
                userId: user.uid,
            });

            const saveInfoChecked = document.querySelector('#save-info-checkbox').checked;
            if (saveInfoChecked) {
                await setDoc(doc(db, "client", user.uid), {
                    ...client,
                    email: user.email,
                    userId: user.uid,
                });
            }

            return "success";

        } catch (error) {
            console.error("Error saving checkout information:", error);
            return error.message;
        }
    };

    const itemPayment = (event) => {
        selectPayment.value = event.target.value;
        console.log(selectPayment.value);
    };

    const handleSubmit = async () => {
        if (!selectPayment.value) {
            toast.error("Payment not selected");
            return;
        }
        const result = await saveCheckoutInfo();
        if (result === "success" && selectPayment.value) {
            toast.success("Checkout information saved successfully");
            cartStore.removeSelectedItems(); // Remove selected items after successful payment
            router.push({ name: 'client.cart' });
        }
    };

    fetchCity();
    return {
        client,
        saveCheckoutInfo,
        handleSubmit,
        districts,
        cities,
        fetchDistricts,
        wards,
        fetchWards,
        itemPayment,
        selectPayment
    };
});
