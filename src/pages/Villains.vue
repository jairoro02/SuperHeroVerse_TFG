<template>
    <section class="filters">
        <div class="search-container">
            <div class="search-wrapper">
            <input type="text" class="search-input" placeholder="Search your hero">
            <button class="search-button">Search</button>
            </div>
        </div>
        <div class="all-filters">
            <div class="all-options">
                <h1 class="filter-text">Universes</h1>
                <div class="filter-options">
                    <div class="filter-option">
                        <img class="marvel" src="../assets/imagesandvideos/marvel-logo-1.png" alt="Marvel logo">
                        <h1>Marvel</h1>
                    </div>
                    <div class="filter-option">
                        <img class="dc" src="../assets/imagesandvideos/dc-logo.png" alt="logo DC">
                        <h1>Dc Comics</h1>
                    </div>
                </div>
            </div>
            <div class="all-options">
                <h1 class="filter-text">Gender</h1>
                <div class="filter-options">
                    <div class="filter-option">
                        <img src="../assets/imagesandvideos/male-hero.png" alt="Male option">
                        <h1>Male</h1>
                    </div>
                    <div class="filter-option">
                        <img src="../assets/imagesandvideos/female-hero.png" alt="Female option">
                        <h1>Female</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>