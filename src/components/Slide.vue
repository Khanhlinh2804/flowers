<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const url2 = "http://localhost:3000/Banner";
    const banner = ref([]);
    const activeIndex = ref(0);
    let refreshInterval;

    onMounted(() => {
      fetch(url2)
        .then(response => response.json())
        .then(data => {
          banner.value = data;
          startAutoSlide();
        })
        .catch(error => console.error('Error', error));
    });

    const next = () => {
      activeIndex.value = (activeIndex.value + 1) % banner.value.length;
    };

    const prev = () => {
      activeIndex.value = (activeIndex.value - 1 + banner.value.length) % banner.value.length;
    };

    const setActive = (index) => {
      activeIndex.value = index;
    };

    const startAutoSlide = () => {
      refreshInterval = setInterval(next, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(refreshInterval);
    };

    return {
      banner,
      activeIndex,
      next,
      prev,
      setActive,
      startAutoSlide,
      stopAutoSlide
    };
  }
};
</script>

<template>
    <div class="slider">
            <!-- list Items -->
            <div class="list">
                <template v-for="(data, index) in banner" :key="data.id">
                    <div class="item" :class="{active: index  === activeIndex}">
                    <img :src="data.image">
                    <div class="content">
                        <h2>{{ data.title }}</h2>
                        <p>
                            {{ data.description }}
                        </p>
                    </div>
                </div>
                </template>
                
            </div>
            <!-- button arrows -->
            <div class="arrows">
                <button @click="prev"> < </button>
                <button @click="next"> > </button>
            </div>
            <!-- thumbnail -->
            <div class="thumbnail">
                <template v-for="(data, index) in banner">
                    <div class="item" :class="{active: index  === activeIndex}" @click="setActive(index)">
                        <img :src="data.image">
                        <div class="content">
                            {{ data.name }}
                        </div>
                    </div>
                </template>

            </div>
        </div>
</template>