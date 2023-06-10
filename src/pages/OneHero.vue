<template>
    <CharacterDetails :character="heroe" />
</template>

<script>
    import axios from 'axios';
  import CharacterDetails from '../components/CharacterDetails.vue';
  
  export default {
    components: {
      CharacterDetails
    },
    data() {
      return {
        heroe: null,
        characterId: null
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