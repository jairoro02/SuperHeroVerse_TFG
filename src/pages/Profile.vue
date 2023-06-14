<template>
    <div>
        <h1>{{ username }}</h1>
        <h1>{{ email }}</h1>
        <button @click="logOut">Log Out</button>
    </div>
</template>

<script>
    import { useUserStore } from '../storage/userStore';
    console.log(localStorage)
    export default {
        computed: {
            username() {
            const userStore = useUserStore();
            return userStore.username;
            },
            email() {
            const userStore = useUserStore();
            return userStore.email;
            },
            favoritos() {
            const userStore = useUserStore();
            return userStore.favoritos;
            },
        },
        methods: {
            logOut(){
                localStorage.clear
                const userStore = useUserStore();
                userStore.setLoggedIn(false);
                userStore.setUsername('')
                this.$router.push("/heroes")

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>