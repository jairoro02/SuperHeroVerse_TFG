<template>
    <footer class="footer">
        <nav>
            <a href="#" class="footer-text">Terms of Use</a>
            <a href="#" class="footer-text">Privacy Policy</a>
            <a href="#" class="footer-text">Cookie Policy</a>
            <router-link :to="{ name: 'contactUs' }" class="footer-text">Contact us</router-link>
            <a href="#" class="footer-text">License Agreement</a>
            <span class="footer-text">@2023 SuperHeroVerse</span>
        </nav>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>