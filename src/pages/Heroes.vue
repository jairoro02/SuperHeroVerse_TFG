<template>
    <main class="fondo">
      <section class="filters">
        <div class="search-container">
          <div class="search-wrapper">
            <input type="text" class="search-input" placeholder="Search your hero" v-model="searchText" >
            <button class="search-button">Search</button>
          </div>
        </div>
        <div class="all-filters">
          <div class="all-options">
            <h1 class="filter-text">Universes</h1>
            <div class="filter-options">
              <div class="filter-option" >
                <img :class="{ 'activo': selectedUniverse === 'Marvel' }" @click="universeFilter('Marvel')" src="../assets/imagesandvideos/marvel-logo-1.png" alt="Marvel logo">
                <h1>Marvel</h1>
              </div>
              <div class="filter-option">
                <img :class="{ 'activo': selectedUniverse === 'DC' }" @click="universeFilter('DC')" src="../assets/imagesandvideos/dc-logo.png" alt="logo DC">
                <h1>Dc Comics</h1>
              </div>
            </div>
          </div>
          <div class="all-options">
            <h1 class="filter-text">Gender</h1>
            <div class="filter-options">
              <div class="filter-option">
                <img src="../assets/imagesandvideos/male-hero.png" alt="Male option" :class=" { 'activo': selectedGender === 'Male' }" @click="genderFilter('Male')">
                <h1>Male</h1>
              </div>
              <div class="filter-option">
                <img src="../assets/imagesandvideos/female-hero.png" alt="Female option" :class=" { 'activo': selectedGender === 'Female' }" @click="genderFilter('Female')">
                <h1>Female</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="all-characters">
        <div class="characters">
          <Loader v-if="heroes.length === 0" />
          <Character :characters="filterHeroes()" />
        </div>
      </section>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import Character from '../components/Character.vue';
  import Loader from '../components/Loader.vue';
  
  export default {
    components: {
      Character,
      Loader
    },
    data() {
      return {
        heroes: [],
        selectedUniverse: '',
        selectedGender: '',
        searchText:''
      };
    },
    mounted() {
      this.fetchHeroes();
    },
    methods: {
      fetchHeroes() {
        axios.get('https://superheroverse.up.railway.app/heroes/')
          .then(response => {
            this.heroes = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      universeFilter(universe) {
        if (this.selectedUniverse === universe) {
          this.selectedUniverse = '';
        } else {
          this.selectedUniverse = universe; 
        }
      },
      genderFilter(gender) {
        if (this.selectedGender === gender) {
          this.selectedGender = ''; 
        } else {
          this.selectedGender = gender; 
        }
      },
      filterHeroes() {
        let filteredHeroes = this.heroes;
  
        if (this.selectedUniverse) {
          filteredHeroes = filteredHeroes.filter(hero => hero.universe === this.selectedUniverse);
        }
  
        if (this.selectedGender) {
          filteredHeroes = filteredHeroes.filter(hero => hero.sexo === this.selectedGender);
        }
        if (this.searchText) {
          const searchLowerCase = this.searchText.toLowerCase();
          filteredHeroes = filteredHeroes.filter(hero => hero.name.toLowerCase().startsWith(searchLowerCase));
        }
  
        return filteredHeroes;
      }
    }
  }
  </script>

