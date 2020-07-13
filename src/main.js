import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import vuelidate from 'vuelidate'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(vuelidate)
Vue.use(VueChatScroll)
Vue.config.productionTip = false

import {auth} from './firebase'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'



auth.onAuthStateChanged(user =>{
  if(user){
    console.log(user)
    const userDetected = {
      nombre: user.name,
      email: user.email,
      uid: user.uid,
      foto: user.photoURL
    }
    store.dispatch('detectUser', userDetected)
  }else{
    console.log(user)
    store.dispatch('detectUser', user)
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

