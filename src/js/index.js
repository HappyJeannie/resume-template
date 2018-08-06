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
      }
    }
  },
  methods:{
    editProfile(val,event){
      this.resume[val] = event;
    },
    clickSaveBtn(){
      var currentUser = AV.User.current();
      if (currentUser) {
        this.save();
      }
      else {
        this.toLogin();
      }
    },
    save(){
      console.log('保存用户信息')
      let User = AV.Object.extend('User');
      let user = new User();
      user.set('resume',this.resume);
      user.save().then(function (user) {
        console.log(user);
      }, function (error) {
        console.error(error);
      });
    },
    toLogin(){
      console.log('跳转登录');
      this.showLogin = true;
      this.showRegist = false;
      this.showForget = false;
    },
    toRegist(){
      this.showLogin = false;
      this.showRegist = true;
      this.showForget = false;
    },
    toForget(){
      this.showLogin = false;
      this.showRegist = false;
      this.showForget = true;
    },
    closeModal(){
      this.showLogin = false;
      this.showRegist = false;
      this.showForget = false;
    }
  }
})