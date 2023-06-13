<template>
    <div>
        <h1>{{ username }}</h1>
        <h1>{{ email }}</h1>
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
    }
</script>

<style lang="scss" scoped>

</style>