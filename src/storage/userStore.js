import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({

    loggedIn: localStorage.getItem('loggedIn') === 'true',
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',

  }),
  actions: {
    setLoggedIn(bool) {
      this.loggedIn = bool;
      localStorage.setItem('loggedIn', bool.toString());
    },
    setUsername(name) {
      this.username = name;
      localStorage.setItem('username', name);
    },
    setLogOut(){
      this.username = "";
      this.loggedIn = false;
      localStorage.clear()
    },
    setToken(token){
      this.token = token;
      localStorage.setItem('token', token);
    }
  }
});