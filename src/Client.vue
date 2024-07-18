
<template>
    <Header/>
  <Router-view></Router-view>
    <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useAccount } from './stores/useAccount';
import { onMounted } from 'vue';
  export default {
    components: {
        Header,
        Footer
    },
    setup() {
        const authStore = useAccount();
        onMounted(() => {
            authStore.init();
        });
    }

  };
  
</script>
