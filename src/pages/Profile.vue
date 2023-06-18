<template>
    <main class="fondo">
      <div class="vacio"></div>
      <div class="datos">
        <h1>{{ username }}</h1>
        <button @click="logOut">Log Out</button>
      </div>
      <h1>Your favorites:</h1>
      <section class="all-characters">
        <div class="characters">
          <h1 v-if="!favoritosData || favoritosData.length === 0">
            You don´t have favorites
          </h1>
          <CharacterFav v-else :favoritos="favoritosData" @favorito-eliminado="handleFavoritoEliminado"/>
        </div>
      </section>
    </main>
</template>
  
<script>
  import axios from 'axios';
  import { useUserStore } from '../storage/userStore';
  import CharacterFav from '../components/CharacterFav.vue';
  
  
  export default {
    components: {
      CharacterFav
    },
    data() {
      return {
        favoritosData: []
      };
    },
    computed: {
      username() {
        const userStore = useUserStore();
        return userStore.username;
      }
    },
    mounted() {
      this.fetchFavoritos();
    },
    methods: {
        fetchFavoritos() {
            const userStore = useUserStore();
            const username = userStore.username
            axios
            .get(`https://superheroverse.up.railway.app/users/${username}/`)
            .then(response => {
                this.favoritosData = response.data.favoritos;
            })
            .catch(err => {
                console.log(err);
            });
        },
        logOut() {
            const userStore = useUserStore();
            userStore.setLogOut();
            this.$router.push('/heroes');
        },
        handleFavoritoEliminado(fav) {
            this.favoritosData = this.favoritosData.filter(f => f.id !== fav.id);
        }
    }
  };
</script>
  

<style lang="scss" scoped>
  .datos{
    display: flex;
    flex-direction: column;
    font-family: 'Noto Serif', serif;;
    margin-bottom: 1%;
    background-color: #C51B1B;
    color: white;
    padding: 2%;
    align-items: center;
    border-radius: 25px 0 25px 0;
    transition: all 600ms;
    width: 40%;
    margin: 0 auto;

  }
  .vacio{
    height: 20px;
  }

  @media (max-width: 517px) {
    .datos{
      display: flex;
      flex-direction: column;
      font-family: 'Noto Serif', serif;;
      margin-bottom: 1%;
      background-color: #C51B1B;
      color: white;
      padding: 2%;
      align-items: center;
      border-radius: 25px 0 25px 0;
      transition: all 600ms;
      width: 70%;
      margin: 0 auto;
  
    }
    .vacio{
      height: 20px;
    }
    
  }
</style>