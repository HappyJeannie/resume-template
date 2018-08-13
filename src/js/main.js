window.App = {
  template:`
    <div>
      <app-aside></app-aside>
      <main>
        <resume ref="childresume"></resume>
      </main>
    </div>
    
  `,
  data(){
    return {
      mode :'edit',
      resume:{},
      currentUser:{

      }
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
  },
  created(){
    
  }
}

Vue.component('app', App);