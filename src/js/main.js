window.App = {
  template:`
    <div>
      <app-aside :mode="mode" :islogin="isLogin" @save="clickSaveBtn" @share="shareModal" @changemode="changemode" @skin="toggleSkin" @login="loginModal" @logout="logout"></app-aside>
      <main>
        <resume ref="childresume" :islogin="isLogin" :userid="userId" :mode="mode"></resume>
      </main>
    </div>
    
  `,
  data(){
    return {
      mode :'edit',
      isLogin:false,
      userId:''
    }
  },
  methods:{
    clickSaveBtn(){
      console.log(111);
      if(!this.isLogin){
        this.$router.push('/login')
      }
    },
    shareModal(){

    },
    changemode(){

    },
    toggleSkin(){

    },
    loginModal(){
      console.log(111);
      this.$route.push('/login')
    },
    logout(){

    }
  }
}

Vue.component('app', App);