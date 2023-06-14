import Home from '../pages/Home.vue';
import Heroes from '../pages/Heroes.vue';
import Villains from '../pages/Villains.vue';
import Profile from '../pages/Profile.vue'
import NoPageFound from '../shared/NoPageFound.vue';
import Register from '../pages/Register.vue';
import Contactus from '../pages/Contactus.vue';
import Login from '../pages/Login.vue';
import OneHero from '../pages/OneHero.vue';
import OneVillain from '../pages/OneVillain.vue';
import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/heroes', name: 'heroes', component: Heroes},
    { path: '/villains', name: 'villains', component: Villains},
    { path: '/profile', name: 'profile', component: Profile},
    { path: '/register', name: 'register', component: Register},
    { path: '/contact-us', name: 'contactUs', component: Contactus},
    { path: '/login', name: 'login', component: Login},
    { path: '/heroes/:id', name: 'heroeDetails', component: OneHero},
    { path: '/villains/:id', name: 'villainDetails', component: OneVillain},
    { path: '/:catchAll(.*)', name: 'notFound', component: NoPageFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router