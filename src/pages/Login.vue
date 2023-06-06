<template>
    <main class="main-register">
        <h1>Login</h1>
        <form class="form-register">
            <div class="form-option">
                <label for="username">Your username</label>
                <input type="text" name="username">
            </div>
            <div class="form-option">
                <label for="email">Your email addres</label>
                <input type="text" name="email">
            </div>
            <div class="form-option">
                <label for="password">Your password</label>
                <input type="password" name="password">
            </div>
            <p>I don´t have an <router-link :to="{ name: 'register' }" class="link-login">account</router-link></p>

            <a href="./profile.html" class="button">Submit</a>
        </form>
    </main>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>