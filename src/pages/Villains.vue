<template>
    <main class="fondito">
        <section class="filters">
            <div class="search-container">
                <div class="search-wrapper">
                <input type="text" class="search-input" placeholder="Search your hero" v-model="searchText">
                <button class="search-button">Search</button>
                </div>
            </div>
            <div class="all-filters">
                <div class="all-options">
                    <h1 class="filter-text">Universes</h1>
                    <div class="filter-options">
                        <div class="filter-option">
                            <img class="marvel" src="../assets/imagesandvideos/marvel-logo-1.png" alt="Marvel logo" :class=" { 'activo': selectedUniverse === 'Marvel' }" @click="universeFilter('Marvel')">
                            <h1>Marvel</h1>
                        </div>
                        <div class="filter-option">
                            <img class="dc" src="../assets/imagesandvideos/dc-logo.png" alt="logo DC" :class=" { 'activo': selectedUniverse === 'DC' }" @click="universeFilter('DC')">
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
              <Loader v-if="villains.length === 0" />
                <CharacterVillain v-else :characters="filterVillains()" />
            </div>
        </section>
    </main>
</template>

<script>
  import axios from 'axios';
  import CharacterVillain from '../components/CharacterVillain.vue';
  import Loader from '../components/Loader.vue';
  export default {
    components: {
      CharacterVillain,
      Loader,
    },
    data() {
      return {
        villains: [],
        selectedUniverse: '',
        selectedGender: '',
        searchText: ''
      };
    },
    mounted() {
      this.fetchVillains();
    },
    methods: {
      fetchVillains() {
        axios.get('https://superheroverse.up.railway.app/villanos/')
          .then(response => {
            this.villains = response.data;
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
      filterVillains() {
        let filteredVillains = this.villains;
  
        if (this.selectedUniverse) {
          filteredVillains = filteredVillains.filter(hero => hero.universe === this.selectedUniverse);
        }
  
        if (this.selectedGender) {
          filteredVillains = filteredVillains.filter(hero => hero.sexo === this.selectedGender);
        }

        if (this.searchText) {
          const searchLowerCase = this.searchText.toLowerCase();
          filteredVillains = filteredVillains.filter(hero => hero.name.toLowerCase().includes(searchLowerCase));
        }
        return filteredVillains;
      }
    }
  }
  </script>
