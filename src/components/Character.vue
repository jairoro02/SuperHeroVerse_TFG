<template>
  <div :class="['character', hero.universe === 'DC' ? 'dc' : '']" v-for="hero in characters" :key="hero.id">

    <router-link  :to="'/heroes/' + hero.id" >
      <img :src="hero.image" :alt="hero.name">
    </router-link>
      <h1>{{ hero.name }}</h1>
      <a v-if="!log"></a>
      <a v-else @click="newFavorite(hero)">
        <font-awesome-icon class="heart" :class="{'active': isFavorite(hero)}" :icon="['fas', 'heart']" />
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
    if(this.log){
      axios.get(`https://superheroverse.up.railway.app/users/${userStore.username}/`)
      .then(response=>{
        this.person = response.data
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  methods: {
    newFavorite(hero) {
      const token = localStorage.getItem('token');
      const personId = this.person.id; // Obtener el ID del person en lugar del objeto completo
      const heroeId = hero.id;
      const heroeCompleto = hero;
      const personaFavoritos = this.person.favoritos;
      if(this.isFavorite(heroeCompleto)){
        const fav = this.getFavorite(heroeCompleto);
        
        axios.delete(`https://superheroverse.up.railway.app/favorites/${fav.id}/`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response=>{
          axios.get(`https://superheroverse.up.railway.app/users/${this.person.username}/`)
          .then(response => {
            this.person = response.data;
            this.$forceUpdate();
          })
          .catch(error => {
            console.error('Error al obtener los datos actualizados del usuario:', error);
          });
        }).catch(err=>{
          console.log(err)
        })
      }else{
        axios.post('https://superheroverse.up.railway.app/favorites/create/', {
          personId: personId, // Pasar el ID del person en lugar del objeto completo
          heroeId: heroeId // Pasar el ID del heroe
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          axios.get(`https://superheroverse.up.railway.app/users/${this.person.username}/`)
          .then(response => {
            this.person = response.data;
            this.$forceUpdate();
          })
          .catch(error => {
            console.error('Error al obtener los datos actualizados del usuario:', error);
          });
        })
        .catch(error => {
          console.error('Error al guardar el favorito:', error);
        });
      }

      
    },
    isFavorite(hero) {
      if (this.person && this.person.favoritos) {
        const favoriteHeroIds = this.person.favoritos.map(favorite => favorite.heroe.id);
        return favoriteHeroIds.includes(hero.id);
      }
      return false;
    },
    getFavorite(hero) {
      if (this.person && this.person.favoritos) {
        return this.person.favoritos.find(favorite => favorite.heroe.id === hero.id);
      }
      return null;
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
  .heart.active{
    color: rgb(182, 29, 182);
    transition: all 0.5s;
  }
  </style>