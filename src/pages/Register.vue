<template>
  <main class="main-register">
    <h1>Register</h1>
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
        <p v-if="formErrors.password" class="error-message">{{ formErrors.password }}</p>
      </div>
      <div class="form-option">
        <label for="rpassword">Repeat password</label>
        <input type="password" name="rpassword" v-model="rpassword" @input="validateRepeatPassword" @keydown.space.prevent>
        <p v-if="formErrors.rpassword" class="error-message">{{ formErrors.rpassword }}</p>
      </div>

      <div class="options">
        <p>I have an <router-link :to="{ name: 'login' }" class="link-login">account</router-link></p>
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
      users: [],
      rpassword: "",
      formData: {
        username: "",
        email: "",
        password: "",
      },
      formErrors: {
        username: "",
        email: "",
        password: "",
        rpassword: "",
        error: "",
      },
    };
  },
  methods: {
    validateUsername() {
      axios.get('https://superheroverse.up.railway.app/users/')
        .then(response => {
          this.users = response.data;
          if (this.formData.username.trim() === "") {
            this.formErrors.username = "Username is required.";
          } else {
            this.formErrors.username = "";
          }
          const usernameExists = this.users.some(user => {
            return this.formData.username === user.username;
          });
          if (usernameExists) {
            this.formErrors.username = "This username is already taken";
          } else {
            this.formErrors.username = "";
          }
        })
        .catch(error => {
          console.error(error);
        });
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
    validatePassword() {
      if (this.formData.password.trim() === "") {
        this.formErrors.password = "Password is required.";
      } else if(this.formData.password.length <= 5){
        this.formErrors.password = "Password must to have at least 6 letters";
      }else{
        this.formErrors.password = ""
      }
    },
    validateRepeatPassword() {
      if (this.rpassword.trim() === "") {
        this.formErrors.rpassword = "Repeat password is required.";
      } else if (this.rpassword !== this.formData.password) {
        this.formErrors.rpassword = "Passwords do not match.";
      } else {
        this.formErrors.rpassword = "";
      }
    },
    submitMethod(){
      this.formErrors.error = "";
      const userStore = useUserStore();
      if(!this.formErrors.username && !this.formErrors.email && !this.formErrors.password && 
        !this.formErrors.error && !this.formErrors.rpassword && this.formData.username && this.formData.email && this.formData.password ){
          axios.post("https://superheroverse.up.railway.app/users/create/",this.formData)
          .then(response => {
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
              
            }).catch(err=>{
              console.log(err)
            })
            this.$router.push("/");
          })
          .catch(error => {
            console.error(error)
          })
          
      }else{
        this.formErrors.error = "Todos los campos tienen que estar llenos"
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
}
</style>