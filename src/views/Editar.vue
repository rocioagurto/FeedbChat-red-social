<template>
    <v-container>
        <h1>Editar</h1>
        {{id}} - {{tarea}}
        <v-form @submit.prevent="editTarea(tarea)">
            <v-text-field type="text" v-model="tarea.nombre"/>
            <v-btn type="submit">Guardar cambios</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'Editar',
    data(){
        return {
            id: this.$route.params.id
        }
    },
    created(){
        this.setTarea(this.id)
    },
    methods:{
        ...mapActions(['setTarea', 'editTarea'])
    },
    computed:{
        ...mapState(['tarea'])
    }
}
</script>