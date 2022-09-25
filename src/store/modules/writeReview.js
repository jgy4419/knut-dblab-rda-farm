import Vuex from 'vuex';

export const writeReview = new Vuex.Store({
    namespaced: true,
    state: {
        reviewData: [],
    },
    mutations: {
        // GET_REVIEW_DATA: (state, payload) => {}
        getReviewData: (state, payload) => {
            console.log(payload);
            state.reviewData.push(payload);
        }
    },
    actions: {
        
    }
})