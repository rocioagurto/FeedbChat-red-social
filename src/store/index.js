import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    tareas: [],
    tarea: {nombre: '', id: ''}
  },
  mutations: {
    SET_USER(state, payload){
      state.user = payload
    },
    SET_ERROR(state, payload){
      state.error = payload
    },
    SET_TAREAS(state, payload){
      state.tareas = payload
    },
    SET_TAREA(state, payload){
      state.tarea = payload
    },
    SET_DELETE_TAREA(state, payload){
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
    },

    },
      actions: {
    setTarea({commit, state}, id){
      db.collection(state.user.email).doc(id).get()
      .then(doc => {
        let tarea = doc.data()
        tarea.id = doc.id
        commit('SET_TAREA', tarea)
       })
     },
     
     agregarTarea({state}, nombreTarea){
      db.collection(state.user.email).add({
        nombre: nombreTarea
      })
      .then(doc => {
        console.log(doc.id)
        router.push({name: 'Home'})
      })
    },
    editTarea({state}, tarea){
        db.collection(state.user.email).doc(tarea.id).update({
            nombre: tarea.nombre
        })
        .then(() => {
            router.push({name: 'Home'})
        })
        .catch(error => console.log(error))
    },
    setTareas({commit, state}){
      const tareas = []
      db.collection(state.user.email).get()
      .then(res => {
        res.forEach(doc => {
          console.log(doc.id)
          console.log(doc.data())
          let tarea = doc.data()
          tarea.id = doc.id
          tareas.push(tarea)
        })
        commit('SET_TAREAS', tareas)
      })
    },
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
