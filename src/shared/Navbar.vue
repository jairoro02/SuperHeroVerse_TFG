<template>
  <header class="header">
    <router-link :to="{ name: 'home' }" class="logo"><img src="../assets/imagesandvideos/a abstract blue logo for a web app about the unive.jpg" alt="imagen del logo">SuperHeroVerse</router-link>
    <div class="options">
      <router-link :to="{ name: 'home' }" class="option">Home</router-link>
      <router-link :to="{ name: 'heroes' }" class="option">Heroes</router-link>
      <router-link :to="{ name: 'villains' }" class="option">Villains</router-link>
    </div>
    <router-link v-if="user.loggedIn" :to="{ name: 'profile' }" class="user"><i class="fa-solid fa-user"></i></router-link>
    <router-link v-else to="/register" class="user register">Register</router-link>
  </header>
</template>

<script>
import { useUserStore } from '../storage/userStore.js';

export default {
  setup() {
    const user = useUserStore();

    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>