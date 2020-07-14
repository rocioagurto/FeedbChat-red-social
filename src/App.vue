<template>
  <v-app>
    <nav-bar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
     NavBar,
     Footer
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

#title{
  font-family: 'Lobster', cursive;
  font-size: 30px;
}
</style>