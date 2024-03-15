<template>
  <header class="header">
    <router-link :to="{ name: 'home' }" class="logo">
      <img src="../assets/imagesandvideos/logo-blue.jpg" alt="imagen del logo"> <p class="title">SuperHeroVerse</p>
    </router-link>
    <div class="options" v-show="windowWidth >= 1000">
      <router-link :to="{ name: 'home' }" class="option">Home</router-link>
      <router-link :to="{ name: 'heroes' }" class="option">Heroes</router-link>
      <router-link :to="{ name: 'villains' }" class="option">Villains</router-link>
      <router-link v-if="user.loggedIn" :to="{ name: 'events' }" class="option">Events</router-link>
    </div>
    <router-link v-if="user.loggedIn" v-show="windowWidth >= 1000" :to="{ name: 'profile' }" class="user" >
      <i class="fa-solid fa-user"></i>
    </router-link>
    <router-link v-show="windowWidth >= 1000" v-else to="/register" class="user register" >Register</router-link>
    <font-awesome-icon v-if="windowWidth < 1000" :icon="['fas', 'bars']" class="menu-icon"  :class="{ active: isMenuActive }" @click="toggleMenu" />
    <transition name="slide">
      <div class="menu-container" :class="{ 'active': isMenuActive }">
        <router-link :to="{ name: 'home' }" class="option">Home</router-link>
        <router-link :to="{ name: 'heroes' }" class="option">Heroes</router-link>
        <router-link :to="{ name: 'villains' }" class="option">Villains</router-link>
        <router-link v-if="user.loggedIn" :to="{ name: 'events' }" class="option">Events</router-link>
        <router-link v-if="!user.loggedIn" to="/register" class="option">Register</router-link>
        <router-link v-if="user.loggedIn"  :to="{ name: 'profile' }" class="option" >
          Profile
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '../storage/userStore.js';

export default {
  setup() {
    const user = useUserStore();
    const isMenuActive = ref(false);
    const windowWidth = ref(window.innerWidth);

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value;
    };

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      if (window.innerWidth >= 1000 && isMenuActive.value) {
        isMenuActive.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      user,
      isMenuActive,
      toggleMenu,
      windowWidth
    };
  }
};
</script>

<style scoped>
.menu-icon {
  transition: transform 0.3s ease;
  color: white;
  font-size: 50px;
  margin-right: 24px;
}

.menu-icon.active {
  transform: rotate(90deg);
}

.menu-container {
  position: absolute;
  top: 100px; /* Posición desde arriba */
  right: -205px; /* Posición fuera de la pantalla hacia la derecha */
  background-color: #C51B1B;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 0 20px;
  font-size: 16px;
  padding: 10px;
  z-index: 2;
  transition: right 0.5s ease; /* Agregar transición de movimiento */
}

.menu-container.active {
  right: 0; /* Mover el menú a la posición original cuando está activo */
}
</style>
