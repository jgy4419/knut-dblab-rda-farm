import Vuex from 'vuex'
// import axios from 'axios'

export const login = new Vuex.Store({
    state: {
        userInfo: null,
        isLogin: false,
        isLoginError: false
    },
    mutations:{
        //로그인이 성공했을 때
        loginSuccess(state, payload){
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        //로그인이 실패했을 때
        loginError(state){
            state.isLogin = false
            state.isLoginError = true
        },
        logout(state) {
            state.isLogin = false
            state.isLoginError = false
            state.userInfo = null
        },
        TOKEN_SAVE: (state, token) => {
            console.log("TOKEN_SAVE: "+ token);
            state.userInfo = token;
            console.log(state.userInfo);
        },
    },
	actions:{
		// login({ state, commit }, signObj){
        //     console.log(signObj);
		// }
        
	}
})




