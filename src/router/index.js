import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect : localStorage.getItem('user') ? '/main' : '/login',
  },

  // 로그인 회원가입
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/login/searchId',
    name: 'searchId',
    component: () => import('../views/login/searchIdOrPw.vue')
  },
  {
    path: '/login/searchPw',
    name: 'searchPw',
    component: () => import('../views/login/searchIdOrPw.vue')
  },
  {
    path: '/clause',
    name: 'clause',
    component: () => import('../views/login/clause.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/login/signup.vue')
  },
  {
    path: '/signupFarm',
    name: 'signupFarm',
    component: () => import('../views/login/signup.vue')
  },
  {
    path: '/check_user',
    name: 'check_user',
    component: () => import('../views/login/check_user.vue')
  },
  {
    path: '/check_farm',
    name: 'check_farm',
    component: () => import('../views/login/check_farm.vue')
  },
  {
    path: '/farm_user_info',
    name: 'farm_user_info',
    component: () => import('../views/login/farm_user_info.vue')
  },
  {
    path: '/farm_biz_info',
    name: 'farm_biz_info',
    component: () => import('../views/login/farm_biz_info.vue')
  },


  //메인
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/auction',
    name: 'auction',
    component: () => import('../views/main/auction.vue')
  },
  {
    path: '/auction_reg',
    name: 'auction_reg',
    component: () => import('../views/main/auction_reg.vue')
  },
  {
    path: '/auction_reg/:id',
    name: 'auction_reg_patch',
    component: () => import('../views/main/auction_reg.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/main/search.vue')
  },
  {
    path: '/trand',
    name: 'trand',
    component: () => import('../views/main/trand.vue')
  },
  { 
    path: '/farm_mypage',
    name: 'farm_mypage',
    component: () => import('../views/main/farm_mypage.vue')
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import('../views/main/alert.vue')
  },
  {
    path: '/webSocketTest',
    name: 'webSocketTest',
    component: () => import('../views/main/webSocketTest.vue')
  },
  
  //경매
  {
    path: '/farm_calculate/:id',
    name: 'farm_calculate',
    component: () => import('../views/auction/farm_calculate.vue')
  },
  // // 결제
  // {
  //   path: '/payment',
  //   name: 'payment',
  //   component: () => import('../components/payment.vue')
  // },
  {
    path: '/farm_calculate_clear/:id',
    name: 'farm_calculate_clear',
    component: () => import('../views/auction/farm_calculate_clear.vue')
  },
  {
    path: '/auction_detail/:id',
    name: 'auction_detail',
    // props: true,
    component: () => import('../views/auction/auction_detail.vue')
  },
  {
    path: '/auction_detail/farm_intro/:id',
    name: 'farm_intro',
    component: () => import('../views/auction/farm_intro')
  },
  //마이페이지
  {
    path: '/farm_mypage_auction',
    name: 'farm_mypage_auction',
    component: () => import('../views/myPage/farm_mypage_auction.vue')
  },
  // 리뷰 작성 / 수정 페이지
  {
    path: '/farm_mypage_auction/writeReview/:id',
    name: 'writeReview',
    component: () => import('../views/review/writeReview.vue')
  },
  {
    path: '/farm_mypage_auction/writeReview/edit/:id',
    name: 'editReview',
    component: () => import('../views/review/writeReview.vue')
  },
  {
    path: '/farm_mypage_get_review',
    name: 'farm_mypage_get_review',
    // component: () => import('../views/myPage/farm_mypage_get_review.vue')
    component: () => import('../views/review/review.vue')
  },
  {
    path: '/farm_mypage_keep',
    name: 'farm_mypage_keep',
    component: () => import('../views/myPage/farm_mypage_keep.vue')
  },
  {
    path: '/farm_profile',
    name: 'farm_profile',
    component: () => import('../views/myPage/farm_profile.vue')
  },
  {
    path: '/ServiceCenter',
    name: 'ServiceCenter',
    component: () => import('../views/myPage/ServiceCenter.vue')
  },
  {
    path: '/farm_loc',
    name: 'farm_loc',
    component: () => import('../views/myPage/farm_loc.vue')
  },

  // 리뷰 페이지
  {
    path: '/review',
    name: 'review',
    component: () => import('../views/review/review.vue')
  },


  //////////////////////////////////컴포넌트/////////////////////////////////
  {
    path: '/bottomNav',
    name: 'bottomNav',
    component: () => import('../components/bottomNav.vue')
  },
  {
    path: '/add_profile',
    name: 'add_profile',
    component: () => import('../components/add_profile.vue')
  },
  {
    path: '/slide',
    name: 'slide',
    component: () => import('../components/slide.vue')
  },


  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////소비자//////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  {
    path: '/consumer_mypage',
    name: 'consumer_mypage',
    component: () => import('../views/consumer/consumer_mypage.vue')
  },
  {
    path: '/consumer_profile',
    name: 'consumer_profile',
    component: () => import('../views/consumer/consumer_profile.vue')
  },
  {
    path: '/consumer_loc',
    name: 'consumer_loc',
    component: () => import('../views/consumer/consumer_loc.vue')
  },
  // 404 페이지
  {
    path: '/:pathMatch(.*)*',
    name: '404page',
    component: () => import('../404.vue')
  }

  
  
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => { 
  next()
})

export default router
