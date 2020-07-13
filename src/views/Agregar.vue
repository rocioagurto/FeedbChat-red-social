<template>
    <v-container>
        <h1>Agregar nueva tarea</h1>
        <v-form @submit.prevent="agregarTarea(nombre)">
            <v-text-field type="text" v-model="nombre"/>
            <v-btn type="submit">Agregar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    }
}
</script>