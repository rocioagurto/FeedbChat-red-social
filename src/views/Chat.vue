<template>
  <v-layout>
      <v-flex>
          <v-card class="deep-purple lighten-4" >
              <v-card-text>
                <!-- <h3>Bienvenid@ {{user.email}} !!!</h3> -->
              </v-card-text>
              <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>

               <div v-for="(msj, index) in mensajes" :key="index" :class="msj.nombre === user.email ? 'text-start' : 'text-end' " 
               >
                 <v-chip>
                  <v-avatar class="mr-3">
                    <img :src="msj.foto" alt="">
                  </v-avatar> {{msj.mensaje}}
                 </v-chip>
                <p class="caption mr-2 mt-2"> {{msj.fecha}}</p>
               </div>

             </v-card-text>
             <v-card-text>
             <v-form @submit.prevent="enviarMensaje" v-model="valido">
                <v-text-field v-model="mensaje" label="Escribe tu mensaje aquí"
                required 
                :rules="reglas">
                </v-text-field>
             </v-form>
             </v-card-text>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import {mapState, mapActions} from 'vuex'
import {db} from '@/firebase'
export default {
  data(){
    return {
      mensaje: '',
      valido: false,
      reglas: [
      v => !!v || 'Tienes que escribir un mensaje'
      ],
      mensajes: []
    }
  },
  computed: {
  ...mapState(['user'])
  },
 methods:{
     ...mapActions(['setUser']),
  enviarMensaje(){
    if(this.valido){
        db.collection('chats').add({
            mensaje: this.mensaje,
            nombre: this.user.email,
            foto: this.user.foto,
            fecha: Date.now()
        }).catch(error => console.log(error))
        this.mensaje = ''
    } 
  }
},
created(){
    moment.locale('es');
    let ref = db.collection('chats').orderBy('fecha', 'desc').limit(20)
    ref.onSnapshot(querySnapshot =>{
        this.mensajes = []
        querySnapshot.forEach(doc =>{
            this.mensajes.unshift({
                mensaje: doc.data().mensaje,
                foto: doc.data().foto,
                nombre: doc.data().nombre,
                fecha: moment(doc.data().fecha).format('D MMMM  YYYY, h:mm:ss a')
        });
      })
        console.log(this.mensajes)
    })
}

}
</script>

<style>

</style>