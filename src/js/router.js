const routes = [
  { path: '/', component: window.App ,props:true},
  { path: '/login', component: window.Login },
  { path: '/regist', component: window.Regist },
  { path: '/forget', component: window.Forget },
  { path: '/share', component: window.Share,name:'share' }
]


const router = new VueRouter({
  routes 
})

const app = new Vue({
  router:router,
  el:'#app'
})

