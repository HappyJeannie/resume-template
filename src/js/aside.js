Vue.component('app-aside', {
  template: `
    <aside>
      <div class="tp" v-if="mode === 'edit'">
        <button @click="save">保存</button>
        <button @click="print">打印</button>
        <button @click="preview">预览</button>
        <button @click="share">分享</button>
        
      </div>
      <div class="tp" v-else>
        <button @click="preview">退出预览</button>
      </div>
      <div class="btm" v-if="mode === 'edit'">
        <button v-if="isLogin" @click="logout">退出</button>
        <button v-else @click="login">登录</button>
      </div>
    </aside>
  `,
  data() {
    return {
      isLogin:false,
      userid:'',
      mode : 'edit'
    }
  },
  methods: {
    logout(){
      AV.User.logOut().then((res)=>{
        console.log('登出成功')
        this.isLogin = false;
        this.userid = '';
        eventBus.$emit('logout');
      });
    },
    login(){
      this.$router.push('/login');
    },
    print(){
      window.print();
    },
    save(){
      if(this.isLogin){
        eventBus.$emit('save',{userid:this.userid});
      }else{
        this.$router.push('/login')
      }
      
    },
    preview(){
      this.mode = this.mode === 'edit' ? 'preview' : 'edit';
      eventBus.$emit('preview',{mode:this.mode});
    },
    share(){
      console.log(this.userid)
      let url = window.location.href + '?user_id=' + this.userid
      this.$router.push({
        name:'share',
        params:{
          url : url
        }
      })
    }
  },
  created(){
    eventBus.$on('loginInfo',(res) => {
      this.isLogin = res.isLogin;
      this.userid = res.userid;
    })
  }
})

/* <button @click="$emit('skin')">换肤</button> */