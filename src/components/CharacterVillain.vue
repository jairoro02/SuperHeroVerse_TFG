<template>
    <router-link :class="['character', villain.universe === 'DC' ? 'dc' : '']" v-for="villain in characters" :key="villain.id" :to="'/villains/' + villain.id" >
        <img :src="villain.image" :alt="villain.name">
        <h1>{{ villain.name }}</h1>
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
    }
</script>

<style scoped>
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