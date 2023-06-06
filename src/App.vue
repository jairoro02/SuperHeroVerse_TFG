<script setup>
import Navbar from './shared/Navbar.vue';
import Footer from './shared/Footer.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<style scoped>

</style>
