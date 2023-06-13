import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    favoritos: JSON.parse(localStorage.getItem('favoritos')) || [],
  }),
  actions: {
    setLoggedIn(bool) {
      this.loggedIn = bool;
      localStorage.setItem('loggedIn', bool.toString());
    },
    setFavoritos(fav) {
      this.favoritos = fav;
      localStorage.setItem('favoritos', JSON.stringify(fav));
    },
    setUsername(name) {
      this.username = name;
      localStorage.setItem('username', name);
    },
    setEmail(em) {
      this.email = em;
      localStorage.setItem('email', em);
    }
  }
});