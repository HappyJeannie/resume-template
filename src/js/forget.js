Vue.component('forget', {
  template: `
    <div class="forget modal">
      <div class="shadow" @click="$emit('close')"></div>
      <div class="form">
        <h4>忘记密码</h4>
        <form @submit.prevent="toForget">
          <div class="input-group">
            <label>
              <span class="title">邮箱：</span>
              <input type="text" placeholder="请输入注册邮箱" name="email" v-model="forget.email" />
            </label>
          </div>
          <div class="input-group submit">
            <span @click="$emit('login')">登录</span>
            <button type="submit">确定</button>
          </div>
        </form>
      </div>
    </div>
  `,
  data() {
    return {
      forget:{
        email:''
      }
    }
  },
  methods: {
    toForget(){
      // 忘记密码表单提交
      if(this.forget.email === ''){
        alert('邮箱不能为空');
      }else{
        AV.User.requestPasswordReset(this.forget.email).then((success)=> {
          console.log(success)
          alert('请查看邮箱');
          this.$emit('openlogin');
        }, function (error) {
          console.log('忘记密码邮箱验证失败')
          console.log(error.code)
          console.log(error)
          if(error.code === 205){
            alert('未找到用户')
          }
        });
      }
    }
  }
})