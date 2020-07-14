<template>
 <v-container class="text-center" >
   <v-snackbar class="mt-16" color="deep-purple lighten-1" v-model="alert.snackbar" top vertical >
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
   <v-row class=" row container">
   <v-col cols="12" sm="12" md="6" class="pt-md-10">
    <v-form
     @submit.prevent="userLogin({email: input.email, password: input.password })"
      ref="form"
      v-model="valid"
      lazy-validation
      class="mb-10 mx-md-14 px-md-10"
      >
      <h1 class="text-center" id="title" style="font-size: 40px">FeedbChat</h1>
      <v-container>
       <v-btn block color="deep-purple lighten-2 white--text" @click="google">
        <v-icon class="pl-3 mr-6" left dark>fab fa-google </v-icon>
            inicia sesion con Google 
       </v-btn>
      <v-btn class="mt-1 mb-4" block  color="deep-purple darken-3 white--text" @click="facebook">
        <v-icon left dark>fab fa-facebook </v-icon>
           inicia sesion con Facebook
        </v-btn>
        </v-container>
      <v-text-field
        v-model="input.email"
        placeholder="chao@mail.com"
        label="Email"
        prepend-icon="mdi-account"
        required
        >
      </v-text-field>
      <v-text-field
        v-model="input.password"
        label="Contraseña"
        placeholder="*************"
        :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
        require
      >
      </v-text-field>
      <v-container class="text-center grey--text text--darken-1" style="font-size: 14px">
        <p> ¿No estás registrado? <router-link href="" class="text-decoration-none" link to="/register"> Registrarme </router-link>
          </p>
      </v-container>
    <v-container class="d-sm-flex justify-sm-space-between mt-10">
      <v-btn
        :disabled="!valid"
        color="deep-purple lighten-1 white--text"
        class=" boton ml-8 mb-3 rounded-pill "
        type="submit"
        >
        Ingresar
      </v-btn>
      <v-btn
        color="deep-purple darken-3 white--text"
        class=" boton ml-8 mb-3 rounded-pill"
        @click="reset"
        >
        Reset form
       </v-btn>
      </v-container>
     </v-form>
    </v-col>
     <v-col cols="12" sm="12" md="6" >
      <div class="mx-md-8 px-md-4 ">
        <v-img class="d-none d-sm-flex" src="/assets/img/login.svg" aspect-ratio="0.9"  contain>
        </v-img>
      </div>
    </v-col>
   </v-row>
  </v-container>
</template>

<script>
import { firebase} from "@/firebase"
import {mapActions, mapState} from 'vuex'
export default {
  data: () => ({
    valid: true,
    input: {
      email: '',
      password: '',
    },
    alert: {
      message: '',
      snackbar: false,   
    },
    showPassword: false,
    
  }),
  methods: {
    ...mapActions(['userLogin']),
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
      // guardar en firestor
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
    ...mapState(['error'])
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

#title{
  font-family: 'Lobster', cursive;
  font-size: 30px;
}
.row {
  margin: 0 auto;
}

</style>