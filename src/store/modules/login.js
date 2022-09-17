import Vuex from 'vuex'
// import axios from 'axios'

export const login = new Vuex.Store({
    state: {
        allUsers: [
            {id: 1, name: "1dnjsqja", email: "1dnjsqja@naver.com", password: "123123"},
            {id: 2, name: "2dnjsqja", email: "2dnjsqja@naver.com", password: "123123"}
        ],
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
        }
    },
	// auction:{
	// 	login({ state, commit }, signObj){
    //         console.log(signObj);
	// 	}
	// }
})




