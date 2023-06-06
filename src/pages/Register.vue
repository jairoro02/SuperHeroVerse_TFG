<template>
    <main class="main-register">
      <h1>Register</h1>
      <form class="form-register">
        <div class="form-option">
          <label for="username">Your username</label>
          <input type="text" name="username" v-model="username" @input="validateUsername" @keydown.space.prevent>
          <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
        </div>
        <div class="form-option">
          <label for="email">Your email address</label>
          <input type="email" name="email" v-model="email" @input="validateEmail" @keydown.space.prevent>
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>
        <div class="form-option">
          <label for="password">Your password</label>
          <input type="password" name="password" v-model="password" @input="validatePassword" @keydown.space.prevent>
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>
        <div class="form-option">
          <label for="rpassword">Repeat password</label>
          <input type="password" name="rpassword" v-model="rpassword" @input="validateRepeatPassword" @keydown.space.prevent>
          <p v-if="rpasswordError" class="error-message">{{ rpasswordError }}</p>
        </div>
  
        <p>I have an <router-link :to="{ name: 'login' }" class="link-login">account</router-link></p>
  
        <button type="submit" class="button">Submit</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        email: "",
        password: "",
        rpassword: "",
        usernameError: "",
        emailError: "",
        passwordError: "",
        rpasswordError: "",
        error: "",
      };
    },
    methods: {
      validateUsername() {
        if (this.username.trim() === "") {
          this.usernameError = "Username is required.";
        } else {
          this.usernameError = "";
        }
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (this.email.trim() === "") {
          this.emailError = "Email address is required.";
        } else if (!emailRegex.test(this.email)) {
          this.emailError = "Invalid email address.";
        } else {
          this.emailError = "";
        }
      },
      validatePassword() {
        if (this.password.trim() === "") {
          this.passwordError = "Password is required.";
        } else {
          this.passwordError = "";
        }
      },
      validateRepeatPassword() {
        if (this.rpassword.trim() === "") {
          this.rpasswordError = "Repeat password is required.";
        } else if (this.rpassword !== this.password) {
          this.rpasswordError = "Passwords do not match.";
        } else {
          this.rpasswordError = "";
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