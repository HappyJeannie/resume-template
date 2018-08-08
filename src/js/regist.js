Vue.component('regist', {
  template: `
    <div class="regist modal">
      <div class="shadow" @click="$emit('close')"></div>
      <div class="form">
        <h4>新用户注册</h4>
        <form @submit.prevent="toRegist">
          <div class="input-group">
            <label>
              <span class="title">邮箱：</span>
              <input type="email" placeholder="请输入邮箱" name="email" v-model="regist.email" />
            </label>
          </div>
          <div class="input-group">
            <label>
              <span class="title">用户名：</span>
              <input type="text" placeholder="请输入用户名" name="username" v-model="regist.username" />
            </label>
          </div>
          <div class="input-group">
            <label>
              <span class="title">密码：</span>
              <input type="password" placeholder="请输入密码" name="password" v-model="regist.password" />
            </label>
          </div>
          <div class="input-group submit">
            <span @click="$emit('login')">已有账号，立即登录</span>
            <button type="submit">确定</button>
          </div>
        </form>
      </div>
    </div>
  `,
  data() {
    return {
      regist:{
        email:'',
        username:'',
        password:''
      },
      resume : {
        name : '姓名',
        age : '年龄',
        gender : '性别',
        phone : '电话',
        email : '邮箱',
        skills:[
          {name:'技能名称',description:'技能描述'},
          {name:'技能名称',description:'技能描述'},
          {name:'技能名称',description:'技能描述'},
          {name:'技能名称',description:'技能描述'}
        ],
        projects:[
          {name:'项目名称',link:'https:xxx.xxx.com',keywords:'关键字',description:'项目描述'},
          {name:'项目名称',link:'https:xxx.xxx.com',keywords:'关键字',description:'项目描述'},
          {name:'项目名称',link:'https:xxx.xxx.com',keywords:'关键字',description:'项目描述'},
          {name:'项目名称',link:'https:xxx.xxx.com',keywords:'关键字',description:'项目描述'}
        ]
      }
    }
  },
  methods: {
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
        user.set('resume',this.resume);
        user.signUp().then((user) => {
          console.log('注册成功')
          console.log(user);
          this.$emit('userinfo',{currentUser:user.toJSON(),displayResume:'',isLogin:true});
          this.$emit('close');
        }, function (error) {
          console.log('注册失败')
          console.log(error.code)
          console.log(error)
          alert('注册失败，请重新注册')
          
        });
      }
    }
  }
})