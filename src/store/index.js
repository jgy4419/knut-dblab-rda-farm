import { createStore } from "vuex";
import { login } from "@/store/modules/login";
import { test } from "@/store/modules/test";
import { signup } from "@/store/modules/signup";
import axios from "axios"

export default createStore({
  modules: { 
    signup: signup,
    login: login,
    test: test,
  },
  state: {
    existEmail: true,
    kindOfFarm: null,
    user: {
        name: null,
        email: null,
        passwd: null,
        phonenum: null,
    },
    config: {
      headers: {
          TOKEN: null,
      }
    },
    auctionList: [],
    limit: 2,
    alertList: [],
    keywordList: [],
    popularKeywordList: [],
  },
  mutations: {
    // 농가 회원가입 시 개인회원과 사업자 회원을 구분하는 변수(개인회원: 1, 사업자 회원: 2)
    KIND_OF_FARM: (state, payload) => {
      console.log(payload);
      state.kindOfFarm = payload
    },

    // 농가 정보를 저장하기 위한 Mutaion, 농가 회원가입 시 개인회원과 사업자 회원이 나눠지기 때문에 저장함.  
    FARM_INFO: (state, payload) => {
      console.log(payload);
      state.user = payload
    },

    // 이메일 존재 여부 변수 Mutation
    EXIST_EMAIL: (state, existEmail) => {
      state.existEmail = existEmail
      console.log(state.existEmai);
    },

    // Store에 토큰 저장
    TOKEN_SAVE: (state, token) => {
      console.log("TOKEN_SAVE: "+ token);
      state.config.headers.TOKEN = token;
      console.log(state.config);
    },

    // Auction 관련 Mutation
    INIT_AUCTION_LIST: (state, init_auctionList) => {
      console.log(init_auctionList);
      state.auctionList = init_auctionList;
      console.log(state.auctionList);
    },
    PUSH_AUCTION: (state, auction) => {
      console.log(auction);
      state.auctionList.push(auction);
    },
    RESET_AUCTION_LIST: (state) => {
      state.auctionList = [];
    },
    UP_LIMIT: (state, addNum) => {
      console.log(addNum);
      state.limit += addNum;
    },
    RESET_LIMIT: (state) => {
      state.limit = 0;
    },
    UPDATE_BID_PRICE: (state, response_bidding) => {
      console.log("UPDATE_BID_PRICE");
      console.log(response_bidding);

      for (let i = 0; i < state.auctionList.length; i++) {
        if(response_bidding.auction_Id == state.auctionList[i].auction_Id){
          console.log(state.auctionList[i].auction_Id);
          console.log(response_bidding.auction_Id);

          state.auctionList[i].bid_price = response_bidding.bid_price
          break;
        }
      }
    },
    
    // Alert 관련 Mutation
    INIT_ALERT_LIST: (state, init_alertList) => {
      console.log(init_alertList);
      state.alertList = init_alertList;
    },
    PUSH_ALERT_LIST: (state, alert) => {
      console.log(alert);
      state.alertList.push(alert);
    },
    CHECKED_ALERT: (state, alertList_index) => {
      console.log("alertList_index: " + alertList_index);
      state.alertList[alertList_index].checked = 1;
    },

    // Search 관련 Mutation
    PUSH_KEYWORD_LIST: (state, keyword) => {
      console.log(keyword);
      let notExist = true;

      for (let i = 0; i < state.keywordList.length; i++)
        if (state.keywordList[i] == keyword) notExist = false

      if (notExist) state.keywordList.push(keyword);
    },
    INIT_POPULAR_KEYWORD_LIST: (state, init_popularKeywordList) => {
      console.log(init_popularKeywordList);
      state.popularKeywordList = init_popularKeywordList;
    },

  },
  actions: {
      existEmail: ({commit}, email) => {
          console.log(email);
          axios.get('/api/existEmail', {params: { email: email} })
          .then(res => {
            console.log(res);
            commit('EXIST_EMAIL', res.data == 1)
            if ( res.data == 1){
              alert("이미 존재하는 아이디입니다!")
            } else { 
              alert("사용 가능한 아이디입니다!")
            }
          })
          .catch(err => {
          console.log(err);
        });
      },
  }
});

