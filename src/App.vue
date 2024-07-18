

<template>
<!-- <Header/> -->
  <router-view></router-view>

</template>

<script>
import { onMounted } from 'vue';
import { useAccount } from './stores/useAccount';

  const authStore = useAccount;
  onMounted(() => {
    authStore.init();
  })
</script>



