<template>

    <section :style="{ backgroundImage: `url(${character.background_image})` }" class="fondo-heroe"></section>
    <div class="one-character">
        <img :src="character.image">
        <div class="description">
            <h1>{{ character.name}}</h1>
            <p>{{character.descripcion}}</p>
            <img :src="character.universe === 'Marvel' ? '/marvel-logo-1.png' : (character.universe === 'DC' ? '/dc-logo.png' : '')">
        </div>
    </div>

    
</template>

<script>
    export default {
        mounted(){
            window.scrollTo(0, 0);
        },
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