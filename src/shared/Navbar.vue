<template>
  <div>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'heroes' }">Heroes</router-link>
    <router-link :to="{ name: 'villains' }">Villains</router-link>
    <router-link v-if="user.loggedIn" :to="{ name: 'profile' }">Profile</router-link>
    <router-link v-else to="/register">Register</router-link>
  </div>
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