<template>
    <div>
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'heroes' }">Heroes</router-link>
        <router-link :to="{ name: 'villains' }">Villains</router-link>
        <router-link v-if="userStore.loggedIn" :to="{ name: 'profile' }">Profile</router-link>
        <router-link v-else :to="{ name: 'register' }">Register</router-link>
    </div>
</template>

<script>
import { useUserStore } from '../storage/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>