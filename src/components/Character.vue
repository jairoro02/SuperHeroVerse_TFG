<template>
    <div class="character" v-for="hero in heroes" :key="hero.id">
        <img :src="hero.image" :alt="hero.name">
        <h1>{{ hero.name }}</h1>
    </div>
</template>

<script>
    export default {
        props: {
            heroes: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>