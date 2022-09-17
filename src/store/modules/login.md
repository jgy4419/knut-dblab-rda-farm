import Vuex from 'vuex'
import axios from 'axios'

export const login = new Vuex.Store({
    state: {
        allUsers: [
            {id: 1, name: "dnjsqja", email: "dnjsqja@naver.com", password: "123123"},
            {id: 1, name: "dnjsqja", email: "dnjsqja@naver.com", password: "123123"}
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
	auction:{
		login({ commit }, loginObj){
			axios
				.post("http://https://reqres.in/api/login", loginObj)
				.then(res =>{
					console.log(res)

					let token = res.data.token
					let config = {
						headers: {
							"access-token": token
						}
					}
					//eve.holt@reqres.in
					//cityslicka
					axios
						.get("https://reqres.in/api/login", config)
						.then(response =>{
							let userInfo = {
								id: response.data.data.id,
								
							}
							commit("loginSuccess", userInfo)
						})
						.catch(() => {
							alert("이메일과 비밀번호를 확인하세요")
						})
					console.log(res);
				})
				.catch(() => {
					alert("이메일과 비밀번호를 확인하세요")
				})
		}
	}

})




