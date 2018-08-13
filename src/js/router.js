const routes = [
  { path: '/', component: window.App },
  { path: '/login', component: window.Login },
  { path: '/regist', component: window.Regist },
  { path: '/forget', component: window.Forget }
]


const router = new VueRouter({
  routes 
})

const app = new Vue({
  router:router,
  el:'#app'
})