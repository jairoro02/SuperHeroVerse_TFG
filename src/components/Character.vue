<template>
    <router-link :class="['character', hero.universe === 'DC' ? 'dc' : '']" v-for="hero in characters" :key="hero.id" :to="'/heroes/' + hero.id" >
      <img :src="hero.image" :alt="hero.name">
      <h1>{{ hero.name }}</h1>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      characters: {
        type: Array,
        required: true
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .character {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("/marvel-fondo.jpg");
  }
  .character.dc{
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("/dc-fondo.jpg");
  }
  </style>