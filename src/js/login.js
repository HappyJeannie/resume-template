Vue.component('login', {
  template: `
    <div class="login modal">
      <div class="shadow" @click="$emit('close')"></div>
      <div class="form">
        <h4>登录</h4>
        <form @submit.prevent="toLogin">
          <div class="input-group">
            <label>
              <span class="title">用户名：</span>
              <input type="text" placeholder="请输入用户名" name="username" v-model="login.username" />
            </label>
          </div>
          <div class="input-group">
            <label>
              <span class="title">密码：</span>
              <input type="password" placeholder="请输入密码" name="password" v-model="login.password" />
            </label>
          </div>
          <div class="input-group submit">
            <span @click="$emit('regist')">没有账号？立即注册</span>
            <span @click="$emit('forget')">忘记密码</span>
            <button type="submit">确定</button>
          </div>
        </form>
      </div>
    </div>
  `,
  data() {
    return {
      login:{
        username:'',  
        password:''
      }
    }
  },
  methods: {
    toLogin(){
      // 登录表单提交
      if(this.login.username === '' || this.login.password === ''){
        alert('用户名或密码不能为空');
      }else{
        AV.User.logIn(this.login.username, this.login.password).then((user) => {
          this.$emit('userinfo',{currentUser:user.toJSON(),displayResume:user.attributes.resume,isLogin:true});
          this.$emit('close');
        }, function (error) {
          console.log('登录出错')
          console.log(error.code);
          console.dir(error);
          if(error.code === 211){
            alert('用户未注册')
          }else if(error.code === 210){
            alert('账号或密码不正确')
          }
        });
      }
    }
  }
})