<template>
    <main class="main-register">
      <h1>Login</h1>
      <form class="form-register" @submit.prevent="submitMethod">
        <div class="form-option">
          <label for="username">Your username</label>
          <input type="text" name="username" v-model="formData.username" @input="validateUsername" @keydown.space.prevent>
          <p v-if="formErrors.username" class="error-message">{{ formErrors.username }}</p>
        </div>
        <div class="form-option">
          <label for="email">Your email address</label>
          <input type="email" name="email" v-model="formData.email" @input="validateEmail" @keydown.space.prevent>
          <p v-if="formErrors.email" class="error-message">{{ formErrors.email }}</p>
        </div>
        <div class="form-option">
          <label for="password">Your password</label>
          <input type="password" name="password" v-model="formData.password" @input="validatePassword" @keydown.space.prevent>
        </div>
  
        <div class="options">
          <p>I don´t have an <router-link :to="{ name: 'register' }" class="link-login">account</router-link></p>
  
          <button type="submit" class="button">Submit</button>
        </div>
        
        <p v-if="formErrors.error" class="error-message">{{ formErrors.error }}</p>
      </form>
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '../storage/userStore';
  export default {
    data() {
      return {
        formData: {
          username: "",
          email: "",
          password: "",
        },
        formErrors: {
          username: "",
          email: "",
          error: "",
        },
      };
    },
    methods: {
      validateUsername() {
        if (this.formData.username.trim() === "") {
          this.formErrors.username = "Username is required.";
        } else {
          this.formErrors.username = "";
        }
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (this.formData.email.trim() === "") {
          this.formErrors.email = "Email address is required.";
        } else if (!emailRegex.test(this.formData.email)) {
          this.formErrors.email = "Invalid email address.";
        } else {
          this.formErrors.email = "";
        }
      },
      submitMethod() {
        const userStore = useUserStore();
        if (!this.formErrors.username && !this.formErrors.email && this.formData.username && this.formData.password && this.formData.email) {
          axios.post("https://superheroverse.up.railway.app/token",{},{
            auth:{
              username: this.formData.username,
              password: this.formData.password
            }
          })
          .then(response=>{
            const token = response.data
            userStore.setLoggedIn(true)
            userStore.setToken(token);
            userStore.setUsername(this.formData.username);
            this.$router.push("/");
          })
          .catch(error =>{
            console.log(error)
            this.formErrors.error = "Some data are incorrect"
          })
        } else {
          this.formErrors.error = "Please fix the form errors.";
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .error-message {
    color: red;
  }
  </style>