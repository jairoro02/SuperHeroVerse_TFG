<template>
    <main class="fondo">
        <form class="creador" @submit.prevent="submitEvent">
            <input  type="text" v-model="eventname">
            <button type="submit">Create</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
        <Event v-if="events.length>0" :arrayEvents="events" @event-deleted="fetchEvents"/>
    </main>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../storage/userStore';
import Event from '../components/Event.vue';

    export default {
        data(){
            return{
                eventname: '',
                error: '',
                events: []
            }
        },
        components:{
            Event
        },
        mounted(){
            this.fetchEvents();
        },
        methods:{
            submitEvent(){
                if(this.eventname.length >= 5){
                    const userStore = useUserStore();
                    const name = userStore.username;
                    const token = localStorage.getItem('token');
                    this.error="";
                    const evento = {
                        nombreEvento: this.eventname,
                        creador:  name
                    };
                    axios.post('https://superheroverse.up.railway.app/eventos/create/', evento,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        // Manejar la respuesta si es necesaria
                        this.eventname = ''
                        this.fetchEvents();
                    })
                    .catch(error => {
                        // Manejar el error si es necesario
                        console.error(error);
                    });

                }else{
                    this.error="It has to have at least 5 letters"
                }
            },
            fetchEvents(){
                axios.get('https://superheroverse.up.railway.app/eventos/')
                .then(response=>{
                    this.events=response.data
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.creador{
    display: flex;
    justify-content: center;
    padding-top: 3%;
    transition: all ease 600ms;
    button{
        width: 90px;
        font-size: 18px;
        padding: 5px;
        background-color: #ce1e1e;
        color: white;
        border-radius: 0 15px 15px 0;
        transition: all ease 600ms;
    }
    button:hover{
        cursor: pointer;
        background-color: #a10000;
        transition: all ease 600ms;
    }
    input{
        padding: 0.2%;
        width: 50%;
        height: 45px;
        border-radius: 15px 0 0 0;
        font-size: 18px;

    }
}
.error-message{
    margin: 0 auto;
    color: red;
    width: 13%;


}

@media (max-width: 440px) {
    
    .creador{
        display: flex;
        justify-content: center;
        padding-top: 3%;
        margin: 0 auto;

        transition: all ease 600ms;
        input{
            padding: 0.2%;
            
    
        }
    }
    .error-message{
        margin: 0 auto;
        color: red;
        width: 80%;
    
    
    }
    
   
}
</style>