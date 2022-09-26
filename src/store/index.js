import { createStore } from "vuex";
import { login } from "@/store/modules/login";
import { test } from "@/store/modules/test";
import { signup } from "@/store/modules/signup";
import { writeReview } from "@/store/modules/writeReview";
import axios from "axios"

export default createStore({
  modules: { 
    signup: signup,
    login: login,
    test: test,
    writeReview: writeReview
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
    review: {
      getReviewData: {}
    },
    auctionList: [],
    limit: 0,
    searchAuctionList: [],
    alertList: [],
    keywordList: [],
    popularKeywordList: [],
  },
  mutations: {
    CHECH_USER_STATE: (state, payload) => {
      console.log(payload);
      // 농가 회원이 아니면? 'farm'으로 변경
      payload.state === false ? state.checkUser = 'farm' : state.checkUser = 'consumer'
      state.id = payload.id;
      console.log(state.id);
      console.log(state.checkUser);
    },
    GET_REVIEW_DATA: (state, payload) => {
      console.log(payload);
      state.review.getReviewData = payload;
    },
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

    LOGOUT: (state) => {
      // 로컬스토리지에서 checkUser, email 가져오기
      let user = JSON.parse(localStorage.getItem('user'))
      state = null;
      console.log(user);

      let email = user.c_email;
      let check_user = null;
      if(email != undefined){
          check_user = "consumer"
      } else {
          email = user.f_email;
          check_user = "farm"
      }

      console.log(check_user + '   ' + email);

      axios.get(`/api/logout/${check_user}/${email}`,  {})
      .then(res => {
          console.log('res: ' + res);
          // 로컬스토리지 초기화
          localStorage.removeItem('user');
          localStorage.removeItem('checkUser');
          localStorage.removeItem('id');

          this.$router.push({name: 'login'});
      })
      .catch(err => {
          console.log(err);
      });
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
      console.log('!!', init_alertList);
      state.alertList = init_alertList;
    },
    PUSH_ALERT_LIST: (state, alert) => {
      // alert('데이터 받기');
      // console.log('받은 데이터', alert);
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

    INIT_SEARCH_AUCTION_LIST: (state, init_auctionList) => {
      console.log(init_auctionList);
      state.searchAuctionList = init_auctionList;
      console.log(state.searchAuctionList);
    },
    PUSH_SEARCH_AUCTION: (state, auction) => {
      console.log(auction);
      state.searchAuctionList.push(auction);
    },
    RESET_SEARCH_AUCTION_LIST: (state) => {
      state.searchAuctionList = [];
    },
    UPDATE_SEARCH_BID_PRICE: (state, response_bidding) => {
      console.log("UPDATE_BID_PRICE");
      console.log(response_bidding);

      for (let i = 0; i < state.searchAuctionList.length; i++) {
        if(response_bidding.auction_Id == state.searchAuctionList[i].auction_Id){
          state.searchAuctionList[i].bid_price = response_bidding.bid_price
          break;
        }
      }
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

