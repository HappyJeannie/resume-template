let vm = new Vue({
  el : '#app',
  data(){
    return {
      showLogin:false,
      showRegist:false,
      showForget:false,
      isLogin:false,
      resume : {
        name : 'Summer',
        age : '22',
        gender : '男',
        phone : 13313313133,
        email : '111@qq.com'
      },
      login:{
        username:'',
        password:''
      },
      regist:{
        email:'',
        username:'',
        password:''
      },
      forget:{
        email:''
      },
      currentUser:{}
    }
  },
  created(){
    this.checkLogin();
  },
  methods:{
    editProfile(val,event){
      this.resume[val] = event;
    },
    clickSaveBtn(){
      let currentUser = AV.User.current();
      console.log(currentUser)
      if (currentUser) {
        this.save();
      }
      else {
        this.loginModal();
      }
    },
    save(){
      console.log('保存用户信息')
      let user = AV.Object.createWithoutData('User', this.currentUser.objectId);
      // 修改属性
      user.set('resume', this.resume);
      // 保存到云端
      user.save()
        .then(
          (res)=>{
            console.log('保存成功')
            console.log(res.toJSON());
          },
          (error) => {
            console.log('请求出错')
            console.log(error.code)
            console.log(error)
          }
        );
    },
    loginModal(){
      console.log('跳转登录');
      this.showLogin = true;
      this.showRegist = false;
      this.showForget = false;
    },
    registModal(){
      this.showLogin = false;
      this.showRegist = true;
      this.showForget = false;
    },
    forgetModal(){
      this.showLogin = false;
      this.showRegist = false;
      this.showForget = true;
    },
    closeModal(){
      this.showLogin = false;
      this.showRegist = false;
      this.showForget = false;
    },
    toLogin(){
      // 登录表单提交
      if(this.login.username === '' || this.login.password === ''){
        alert('用户名或密码不能为空');
      }else{
        AV.User.logIn(this.login.username, this.login.password).then((user) => {
          this.currentUser = user.toJSON();
          this.closeModal();
          this.isLogin = true;
        }, function (error) {
          console.log('登录出错')
          if(error.code === 211){
            alert('用户未注册')
          }
        });
      }
    },
    toRegist(){
      // 注册表单提交
      if(this.regist.username === '' || this.regist.password === '' || this.regist.email === ''){
        alert('用户名、密码和邮箱不能为空');
      }else{
         // 新建 AVUser 对象实例
        let user = new AV.User();
        // 设置用户名
        user.setUsername(this.regist.username);
        // 设置密码
        user.setPassword(this.regist.password);
        // 设置邮箱
        user.setEmail(this.regist.email);
        user.signUp().then((user) => {
          console.log('注册成功')
            console.log(user);
            this.currentUser = user.toJSON();
            this.closeModal();
            this.isLogin = true;
        }, function (error) {
          console.log('注册失败')
          console.log(error.code)
          console.log(error)
        });
      }
    },
    toForget(){
      // 忘记密码表单提交
      if(this.forget.email === ''){
        alert('邮箱不能为空');
      }else{
        AV.User.requestPasswordReset(this.forget.email).then((success)=> {
          console.log(success)
          alert('请查看邮箱');
          this.loginModal();
        }, function (error) {
          console.log('忘记密码邮箱验证失败')
          console.log(error.code)
          console.log(error)
        });
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
        this.currentUser = currentUser.toJSON();
        this.isLogin = true;
      }
    }
  }
})