<template>
  <v-app>
    <nav-bar />
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {
     NavBar
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