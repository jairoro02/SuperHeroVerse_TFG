import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../storage/userStore'; 
import Home from '../pages/Home.vue';
import Heroes from '../pages/Heroes.vue';
import Villains from '../pages/Villains.vue';
import Profile from '../pages/Profile.vue';
import NoPageFound from '../shared/NoPageFound.vue';
import Register from '../pages/Register.vue';
import Contactus from '../pages/Contactus.vue';
import Login from '../pages/Login.vue';
import OneHero from '../pages/OneHero.vue';
import Events from '../pages/Events.vue';
import OneVillain from '../pages/OneVillain.vue';

const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/heroes', name: 'heroes', component: Heroes },
    { path: '/villains', name: 'villains', component: Villains },
    { 
        path: '/profile', 
        name: 'profile', 
        component: Profile,
        meta: { requiresAuth: true } 
    },
    { path: '/register', name: 'register', component: Register},
    { path: '/contact-us', name: 'contactUs', component: Contactus },
    { path: '/login', name: 'login', component: Login},
    { path: '/heroes/:id', name: 'heroeDetails', component: OneHero },
    { path: '/villains/:id', name: 'villainDetails', component: OneVillain },
    { 
        path: '/events', 
        name: 'events', 
        component: Events,
        meta: { requiresAuth: true } 
    },
    { path: '/:catchAll(.*)', name: 'notFound', component: NoPageFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (userStore.loggedIn && (to.name === 'login' || to.name === 'register')) {
        next('/profile');
    } 
    else if (to.meta.requiresAuth && !userStore.loggedIn) {
        next('/login');
    } 
    else {
        next();
    }
});

export default router;
