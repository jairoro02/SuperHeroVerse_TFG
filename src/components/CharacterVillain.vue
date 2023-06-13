<template>
    <router-link class="character" v-for="villain in characters" :key="villain.id" :to="'/villains/' + villain.id">
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
        }
    }
</script>

<style scoped>
</style>