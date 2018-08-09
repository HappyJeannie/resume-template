let vm = new Vue({
  el : '#app',
  data(){
    return {
      showLogin:false,
      showRegist:false,
      showForget:false,
      showPreview:false,
      isLogin:false,
      previewURL:'',
      previewId:'',
      mode:'edit',    // 默认为 edit 编辑状态，还有 preview 预览状态
      currentUser:{},
      skin:'default',  // 默认是 default ， 其他值为 dark
      userId:''
    }
  },
  created(){
    // 页面进来根据 url 检查用户是处于预览模式还是编辑模式
    // 如果是编辑模式，需要验证用户是否登录
    // 如果是预览模式则去获取用户的简历信息 
    if(window.location.href.indexOf('user_id') > -1){
      // 预览模式
      console.log('预览模式')
      this.previewId = window.location.href.split('?')[1].split('=')[1];
      this.mode = 'preview';
      this.userId = this.previewId;
    }else{
      console.log('非预览模式')
      this.checkLogin();
      this.mode = 'edit';
    }
  },
  methods:{
    clickSaveBtn(){
      let currentUser = AV.User.current();
      if (currentUser) {
        this.save();
      }else {
        this.loginModal();
      }
    },
    save(){
      // 保存到云端
      this.$refs.childresume.save();
    },
    loginModal(){
      this.setModalStatus([true,false,false,false]);
    },
    registModal(){
      console.log('跳转至注册')
      this.setModalStatus([false,true,false,false]);
    },
    forgetModal(){
      this.setModalStatus([false,false,true,false]);
    },
    shareModal(){
      this.setModalStatus([false,false,false,true]);
      console.log(1);
      if(!this.currentUser.objectId){
        console.log(2);
        this.previewURL = '登录后方可预览简历';
      }else{
        console.log(3);
        console.log(window.location.href + '?user_id=' + this.currentUser.objectId)
        this.previewURL = window.location.href + '?user_id=' + this.currentUser.objectId
      }
      
    },
    closeModal(){
      this.setModalStatus([false,false,false,false]);
    },
    setModalStatus(arr){
      let modalArr = ['showLogin','showRegist','showForget','showPreview'];
      for(let i = 0;i<arr.length;i++){
        this[modalArr[i]] = arr[i];
      }
    },
    logout(){
      // 登出
      AV.User.logOut().then((res)=>{
        console.log('登出成功')
        this.currentUser = {};
        this.isLogin = false;
      });
    },
    checkLogin(){
      let currentUser = AV.User.current();
      if (currentUser) {
        console.log('登录啦')
        console.log(currentUser.toJSON())
        this.currentUser = currentUser.toJSON();
        this.isLogin = true;
        this.userId = currentUser.id;
      }
    },
    toggleSkin(){
      this.skin = this.skin ==='default'?'dark':'default';
    },
    login(data){
      // 登录成功后获取数据
      console.log('登录成功')
      console.log(data);
      // for(var key in data){
      //   if(key === 'isLogin'){
      //     this[key]=data[key]
      //   }else{
      //     Object.assign(this[key],data[key]);
      //   }
      // }
      this.isLogin = data.isLogin;
      this.userId = data.currentUser.objectId;
    },
    regist(data){
      // 注册成功后获取数据
      for(var key in data){
        if(key === 'isLogin'){
          this[key]=data[key]
        }else{
          Object.assign(this[key],data[key]);
        }
      }
    },
    changemode(mode){
      this.mode = mode;
      if(window.location.href.indexOf('?')> -1){
        window.location.href = window.location.href.split('?')[0];
      }
      this.checkLogin();
    }
  }
})