<template>
 <v-container class="text-center" >
   <v-snackbar @submit.prevent="setUser" class="mt-16" color="deep-purple lighten-1" v-model="alert.snackbar" top vertical timeout="3000">
    {{ alert.message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="alert.snackbar = false"
        >
        Cerrar
      </v-btn>
    </template>
   </v-snackbar>
   <v-row class="container mx-auto">
     <v-col cols="12" sm="12" md="6" >
      <div>
        <v-img class="d-none d-sm-flex" src="/assets/img/registro.svg" aspect-ratio="0.9"  contain>
        </v-img>
       </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="pt-md-10 mt-md-1">
        <v-form
        @submit.prevent="setUser({email: input.email, password: input.pass1, name: input.name})"
        ref="form"
        v-model="valid"
        lazy-validation
        class="mx-md-14 px-md-10 mt-4 "
        >
        <h1 class="text-center">Registro de Usuario</h1>
         <v-container class="text-center grey--text text--darken-1 mb-0" style="font-size: 13px">
           <p> Es muy fácil! Sólo necesitas tu <br/>correo electrónico  para poder registrarte!!!</p>
         </v-container>
         <v-container>
          <v-btn block color="deep-purple darken-3 white--text" @click="google">
            <v-icon class="pl-3 mr-6" left dark>fab fa-google </v-icon>
              Regístrate con Google
          </v-btn>
          <v-btn class="mt-1" block color="deep-purple lighten-2 white--text" @click="facebook">
          <v-icon left dark>fab fa-facebook </v-icon>
            Regístrate con Facebook
          </v-btn>
        </v-container>
        <v-text-field
          v-model="input.email"
          :rules="emailRules"
          label="Email"
          prepend-icon="mdi-email-outline"
          required
          >
        </v-text-field>
       
        <v-text-field
          v-model="input.pass1"
          :rules="passwordRules"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
          require
        >
        </v-text-field>
        <v-text-field
          v-model="input.pass2"
          :rules="passwordRules"
          label="Repita contraseña"
          :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
          require
        >
        </v-text-field>
        <v-container class="text-center grey--text text--darken-1" style="font-size: 13px">
          <p> Al hacer click! en Crear cuenta, estás  aceptando los <a class="text-decoration-none" href="/terms" target="_blank">Terminos de uso</a> y <a class="text-decoration-none" href="/privacy" target="_blank">Politica de privacidad</a> de FeedbApp. <br/> ¿Ya tienes una cuenta? <router-link class="text-decoration-none" href="" link to="/login">Ingresar</router-link>
            </p>
        </v-container>
      <v-container class=" d-sm-flex justify-sm-space-between ">
        <v-btn
          :disabled="!desactivar"
          color="deep-purple lighten-1 white--text"
          class="ml-8 mt-6 rounded-pill "
          type="submit"
          >
          Crear cuenta
        </v-btn>
        <v-btn
          color="deep-purple darken-3 white--text"
          class="ml-8 mt-6 rounded-pill"
          @click="reset"
          >
          Reset Form
        </v-btn>
      </v-container>
     </v-form>
    </v-col>
   </v-row>
  </v-container>
</template>

<script>
import { firebase, db} from "@/firebase"
import {mapActions, mapState} from 'vuex'

export default {
  data: () => ({
    input: {
      name: '',
      email: '',
      pass1: '',
      pass2: '',
    },
    alert: {
      message: '',
      snackbar: false,   
    },
    emailRules: [
      v => !!v || 'Email es requerido',
      v => /.+@.+\..+/.test(v) || 'Ingresar un email valido',
    ],
    showPassword: false,
    passwordRules: [
      v => !!v || 'Contraseña es requerida',
      v => (v && v.length >= 5) || 'La contraseña debe tener 5 caracteres como minimo',
    ],
  }),
  methods: {
    ...mapActions(['setUser']),
    facebook(){
     const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider)
    },
    google(){
    console.log('google')
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider)
    },
    async ingresar(provider){
       firebase.auth().languageCode = 'es';
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        this.$router.push('/')
        console.log(user)
        
        const usuario = {
          email: user.email,
          uid: user.uid,
        }
      // guardar en firestore
      await db.collection(user.email).doc(user.uid).set(usuario)
              console.log('usuario guardado en db');
      } catch(error){
        console.log(error);
      }
    },
    reset(e) {
    e.preventDefault()
    this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
   computed: {
    ...mapState(['error', 'user']),
      desactivar(){
      return this.input.pass1 === this.input.pass2 && this.input.pass1.trim() != ''
    }
  },
}
</script>