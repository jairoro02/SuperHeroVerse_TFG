<template>
    <main class="fondo">
        <section class="fondo-heroe"></section>
        <div class="one-character">
            <img :src="character.image">
            <div class="description">
                <h1>{{ character.name}}</h1>
                <p>{{character.descripcion}}</p>
            </div>
        </div>
    </main>
    
</template>

<script>
    export default {
        props: {
            character:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>