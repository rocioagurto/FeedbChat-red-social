import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    alert: {
      message: '',
      snackbar: false
    },
    loading: false,
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    LOADING_ON(state){
      state.loading = true
    },
    LOADING_OFF(state){state.loading = false}
    },
    
    actions: {
    // Crear usuario
    setUser({commit}, user){
      auth.createUserWithEmailAndPassword(  user.email, user.password)
      .then(res =>{
       
        console.log(res)
        const userCreado = {
          email: res.user.email,
          uid: res.user.uid
        }
        db.collection(res.user.email).add({
          email: res.user.email,
          uid: res.user.uid,

        }).then(doc => {
          console.log(doc)
          commit('SET_USER', userCreado)
          router.push('/login')
        }).catch(error => console.log(error))
      })
      .catch(error =>{
        console.log(error)
        commit('SET_ERROR', error)
      })
    },
    // Usuario logueado
    userLogin({commit}, user) {
      commit('LOADING_ON')
      auth.signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        commit('LOADING_OFF')
        console.log(res)
        const userLogin = {
          email: res.user.email,
          uid: res.user.uid
        }
        commit('SET_USER', userLogin)
        router.push('/')
      })
      .catch(error => {
        console.log(error)
        commit('SET_ERROR', error)
      })
    },
    // Cerrar sesion
    signOut(){
      auth.signOut()
      .then(()=> {
        router.push('/login')
      })
    },
    // Detectar usuario logueado
    detectUser({commit}, user){
      commit('SET_USER', user)
    },

  },
  getters: {
    userExits(state){
      if(state.user === null){
        return false
      }else{
        return true
      }
    }
  },

})
