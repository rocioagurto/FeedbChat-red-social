<template>
  <v-container class="container row">
    <v-row class="col ">
     <v-col>
      <img class="mt-6" src="https://icons8.com/vue-static/landings/animated-icons/icons/neutral/neutral.gif" alt="">
      <p class="titulo  mt-3">404</p>
      <p > Not found</p>
      <p >The requested URL was not found on this server.</p>
      <v-btn color="deep-purple lighten-1"><router-link class="text-decoration-none white--text" to="/">Volver al Chat</router-link></v-btn> 
      </v-col>
    </v-row>
  </v-container>
</template>


<style  scoped>
.container{
  text-align: center;
  height: 30rem;
  margin: 0 auto;
}
img {
  width: 80px;
}
.titulo {
    font-size: 50px;
}
</style>