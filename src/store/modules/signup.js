import Vuex from 'vuex'

export const signup = new Vuex.Store({
    state: {
        user :{
            kindOfUser: '45',
            name: null,
            email: null,
            passwd: null,
            phonenum: null
        }
    },
    // mutations: {
    //     KIND_OF_USER: (state, payload) => {
    //         console.log(payload);
    //         state.user.kindOfUser = payload
    //     },
    // },
    // actions: {
    //     kindOfUser: ({commit}, payload) => {
    //         console.log(payload);
    //         commit('KIND_OF_USER', payload)
    //     },
    // }

})