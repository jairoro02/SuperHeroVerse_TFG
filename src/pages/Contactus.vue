<template>
    <section class="background-contact">
    </section>
    <main class="main-contact">
        <h1>Get in touch with our support</h1>
        <div class="form-div">
            <form class="form-contact">
                <div class="form-option">
                    <label for="email">Your email addres</label>
                    <input type="text" name="email" v-model="email" @input="validateEmail" @keydown.space.prevent>
                    <p v-if="emailErr" class="error-message">{{ emailErr }}</p>
                </div>
                <div class="form-option">
                    <label for="name">Please provide us with your first and last name</label>
                    <input type="text" name="name" @keydown.space.prevent>
                </div>
                <div class="form-option">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10" @keydown.space.prevent></textarea>
                </div>
                <a href="#">Submit</a>
            </form>
        </div>
    </main>
</template>

<script>
    export default {
        data(){
            return{
                email:"",
                emailErr:""
            }
        },
        methods:{
            validateEmail(){
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.email.trim() === "") {
                    this.emailErr = "Email address is required.";
                } else if (!emailRegex.test(this.email)) {
                    this.emailErr = "Invalid email address.";
                } else {
                    this.emailErr = "";
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .error-message {
        color: red;
    }
</style>