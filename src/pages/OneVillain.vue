<template>
    <main class="fondo">
        <Loader v-if="!villain" />
        <CharacterDetails v-else :character="villain"/>
    </main>
    
</template>

<script>
    import axios from 'axios';
    import Loader from '../components/Loader.vue';
    import CharacterDetails from '../components/CharacterDetails.vue';

    export default {
    components: {
        CharacterDetails,
        Loader
    },
    data() {
        return {
        villain: "",
        characterId: ""
        };
    },
    created(){
        this.characterId = this.$route.params.id;
        this.fetchHeroes();

    },
    methods: {
        fetchHeroes() {
        axios.get(`https://superheroverse.up.railway.app/villanos/${this.characterId}/`)
        .then(response => {
            this.villain = response.data;
        })
        .catch(error => {
            console.error(error);
        });
        },
    }
    }
</script>

<style lang="scss" scoped>

</style>