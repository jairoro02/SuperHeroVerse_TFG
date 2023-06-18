<template>
    <div :class="['character', fav.heroe.universe === 'DC' ? 'dc' : '']" v-for="fav in favoritos" :key="fav.heroe.id">
        <router-link :to="'/heroes/' + fav.heroe.id">
            <img :src="fav.heroe.image" :alt="fav.heroe.name" />
        </router-link>
        <h1>{{ fav.heroe.name }}</h1>
        <a @click="deleteFavorite(fav)">
            <font-awesome-icon class="heart active" :icon="['fas', 'heart']" />
        </a>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    props: {
      favoritos: {
        type: Array,
        required: true
      }
    },
    emits: ['favorito-eliminado'],
    methods: {
        deleteFavorite(fav) {
            const favId = fav.id;
            const token = localStorage.getItem('token');
            axios.delete(`https://superheroverse.up.railway.app/favorites/${favId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(response => {
            this.$emit('favorito-eliminado', fav);
            })
            .catch(err => {
            console.log(err);
            });
        }
    }
  };
</script>

<style lang="scss" scoped>
.heart.active{
    color: rgb(182, 29, 182);
    transition: all 0.5s;

    font-size: 35px;
    &:hover{
        color: white;
        cursor: pointer;
        transition: all 0.5s;
    }
  }
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