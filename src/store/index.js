import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    
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
      auth.signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        console.log(res)
        const userLogin = {
          email: res.user.email,
          uid: res.user.uid
        }
        commit('SET_USER', userLogin)
        router.push('/chat')
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
    setDeleteTarea({commit, state}, id){
      db.collection(state.user.email).doc(id).delete()
      .then(() => {
        // dispatch('getTareas')
         commit('SET_DELETE_TAREA', id)
      })
      .catch(error => console.log(error))
    }
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
