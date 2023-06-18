<template>
    <div class="evento" v-for="event in arrayEvents" :key="event.id">
        <h1>Creador: {{event.creador}}</h1>
        <h1>{{event.nombreEvento}}</h1>
        <h1><font-awesome-icon :icon="['fas', 'person']" />{{event.participantes.length}}</h1>
        <font-awesome-icon @click="deleteEvent(event.id)" v-if="lookCreator(event)" class="can" :icon="['fas', 'trash-can']" />
        <font-awesome-icon v-else-if="lookPeople(event)" @click="deletePerson(event.id)" class="delete" :icon="['fas', 'x']" />
        <font-awesome-icon v-else class="check" @click="addPerson(event.id)" :icon="['fas', 'check']" />
        
    </div>
</template>

<script>
import { useUserStore } from '../storage/userStore';
import axios from 'axios';
    export default {
        props: {
            arrayEvents: {
            type: Array,
            required: true
            }
        },
        data(){
            return{
            }
        },
        emits: ['event-deleted'],
        methods:{
            lookCreator(event){
                const userStore = useUserStore();
                const eventname = event.creador;
                
                if(userStore.username === eventname){
                    return true
                }
                else{
                    return false
                }
            },
            lookPeople(event){
                const userStore = useUserStore();
                const participantes = event.participantes
                for(const participante of participantes){
                    if(participante.username === userStore.username){
                        return true
                    }
                }
                return false
            },
            deleteEvent(id){
                const token = localStorage.getItem("token");
                axios.delete(`https://superheroverse.up.railway.app/eventos/${id}/`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response =>{
                    this.$emit("event-deleted");
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            addPerson(id) {
                const userStore = useUserStore();
                const name = userStore.username;
                const token = localStorage.getItem("token");
                const data = { personUsername: name };

                axios.post(`https://superheroverse.up.railway.app/eventos/${id}/add-participant/`, data, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    this.$emit("event-deleted");
                })
                .catch(error => {
                    console.error(error);
                });
            },
            deletePerson(id){
                const userStore = useUserStore();
                const name = userStore.username;
                const token = localStorage.getItem("token");
                const data = { personUsername: name };

                axios.post(`https://superheroverse.up.railway.app/eventos/${id}/remove-participant/`, data, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    this.$emit("event-deleted");
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.evento{
    display: flex;
    flex-direction: row;
    font-size: 12px;
    width: 60%;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 2%;
    color: white;
    background-color:#C51B1B ;
    padding: 2%;
    border-radius: 25px;
    transition: all 0.5s;
    .can{
        font-size: 25px;
        transition: all 0.5s;
        &:hover{
            cursor: pointer;
            color: purple;
            transition: all 0.5s;
        }
    }
    .check{
        font-size: 25px;
        transition: all 0.5s;
        &:hover{
            cursor: pointer;
            color: green;
            transition: all 0.5s;
        }
    }
    .delete{
        font-size: 25px;
        transition: all 0.5s;
        &:hover{
            cursor: pointer;
            color: purple;
            transition: all 0.5s;
        }
    }

}

    @media (max-width: 840px) {
    
        .evento{
            display: flex;
            flex-direction: row;
            font-size: 10px;
            width: 90%;
            margin: 0 auto;
            justify-content: space-between;
            margin-top: 2%;
            color: white;
            background-color:#C51B1B ;
            padding: 2%;
            border-radius: 25px;
            transition: all 0.5s;
            margin-bottom: 5%;
            .can{
                font-size: 25px;
                transition: all 0.5s;
            }
            .check{
                font-size: 25px;
                transition: all 0.5s;

            }
            .delete{
                font-size: 25px;
                transition: all 0.5s;
            }
        
        }
       
    }

    @media (max-width: 840px) {
    
        .evento{
            display: flex;
            flex-direction: row;
            font-size: 8px;
            width: 98%;
            margin: 0 auto;
            justify-content: space-between;
            margin-top: 2%;
            color: white;
            background-color:#C51B1B ;
            padding: 2%;
            border-radius: 25px;
            transition: all 0.5s;
            margin-bottom: 5%;
            .can{
                font-size: 25px;
                transition: all 0.5s;
            }
            .check{
                font-size: 25px;
                transition: all 0.5s;

            }
            .delete{
                font-size: 25px;
                transition: all 0.5s;
            }
        
        }
       
    }
</style>