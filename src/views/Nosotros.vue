<template>
  <v-container  >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        class="pr-sm-4 pb-4"
      >
        <v-card
         class=" card pa-10 text-center rounded"
         color="deep-purple lighten-5"
         til
        >
        <v-card-text class="text text-center">
         <h1 class="mb-4"> Mensajería simple</h1>
        <p>Envía mensajes gratis* a tus amigos y familiares. FeedbChat usa la conexión a Internet de tu teléfono móvil para enviar mensajes y así evitar cargos de SMS.</p>
        </v-card-text>
          <img class="pa-5 pa-sm-0 ma-sm-10 img_uno" src="/assets/img/nosotros3.svg" alt="">
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pr-sm-4 pb-4"
      >
        <v-card
         class=" card pa-10 text-center rounded"
         color="deep-purple lighten-4"
         til
        >
        <v-card-text class="text text-center">
         <h1 class="mb-4"> Mensajería en Grupo</h1>
        <p>Tambien puedes chatear con una o mas personas, no impota cuantos sean, solo difruta de una buena conversación.</p>
        </v-card-text>
          <img class="pa-5 pa-sm-0 ma-sm-10 img_uno " src="/assets/img/nosotros4.svg" alt="">
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,400&display=swap');

.text {
font-family: 'Raleway', sans-serif;
}
.img_uno {
width: 280px;
overflow:hidden
}
.card {
 height: 35rem;
}

</style>