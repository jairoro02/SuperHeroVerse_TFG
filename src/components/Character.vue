<template>
  <div :class="['character', hero.universe === 'DC' ? 'dc' : '']" v-for="hero in characters" :key="hero.id">

    <router-link  :to="'/heroes/' + hero.id" >
      <img :src="hero.image" :alt="hero.name">
    </router-link>
      <h1>{{ hero.name }}</h1>
      <a v-if="!log"></a>
      <a v-else @click="newFavorite(hero)">
        <font-awesome-icon class="heart" :icon="['fas', 'heart']" />
      </a>
  </div>
    
    
  </template>
  
  <script>
import axios from 'axios';
import { useUserStore } from '../storage/userStore'

export default {
  data(){
    return{
      log: false,
      person: '',
      actualHero: ''
    }    
  },
  props: {
    characters: {
      type: Array,
      required: true
    }
  },
  mounted(){
    const userStore = useUserStore();
    this.log = userStore.loggedIn
    console.log(userStore.loggedIn)
    if(this.log){
      axios.get(`https://superheroverse.up.railway.app/users/${userStore.username}/`)
      .then(response=>{
        this.person = response.data,
        console.log(this.person)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  methods: {
    newFavorite(hero) {
      const token = localStorage.getItem('token');
      const person = this.person;
      let character = hero;

      axios.get(`https://superheroverse.up.railway.app/heroes/${character.id}/`)
      .then(response=>{
        this.actualHero = response.data;
        axios.post('https://superheroverse.up.railway.app/favorites/create/', { person, hero }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log('Favorito guardado correctamente:', response.data);
        })
        .catch(error => {
          console.error('Error al guardar el favorito:', error);
        });
      })
      .catch(err=>{
        console.log("Error al obtener el héroe:", err);
      });
    }
  }
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
  .heart{
    color: white;
    font-size: 35px;
    transition: all 0.5s;
    &:hover{
      color: rgb(182, 29, 182);
      cursor: pointer;
      transition: all 0.5s;
    }
  }
  </style>