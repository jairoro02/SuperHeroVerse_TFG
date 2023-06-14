<template>
  <main class="fondo">
    <Loader v-if="!heroe" />
    <CharacterDetails v-else :character="heroe" />
  </main>
</template>

<script>
  import axios from 'axios';
  import CharacterDetails from '../components/CharacterDetails.vue';
  import Loader from '../components/Loader.vue';
  
  export default {
    components: {
      CharacterDetails,
      Loader
    },
    data() {
      return {
        heroe: "",
        characterId: ""
      };
    },
    created(){
        this.characterId = this.$route.params.id;
        this.fetchHeroes();

    },
    methods: {
      fetchHeroes() {
        axios.get(`https://superheroverse.up.railway.app/heroes/${this.characterId}/`)
        .then(response => {
          this.heroe = response.data;
          console.log(this.heroe)
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