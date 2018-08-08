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
      },
      previewResume:{
        name : '',
        age : '',
        gender : '',
        phone : '',
        email : '',
        skills:[],
        projects:[]
      },
      displayResume:{
        name : '',
        age : '',
        gender : '',
        phone : '',
        email : '',
        skills:[],
        projects:[]
      },
      mode:'edit',    // 默认为 edit 编辑状态，还有 preview 预览状态
      forget:{
        email:''
      },
      currentUser:{},
      skin:'default'  // 默认是 default ， 其他值为 dark
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
      this.getUserInfo();
    }else{
      console.log('非预览模式')
      this.checkLogin();
      this.mode = 'edit';
    }
  },
  methods:{
    edit(key,value){
      let reg = /\[(\d+)\]/;
      key = key.replace(reg,(val,num)=>{return '.'+num});
      keys= key.split('.');
      let result = this.resume;
      for(let i = 0;i<keys.length;i++){
        if(i===keys.length-1){
          result[keys[i]] = value;
        }else{
          result = result[keys[i]];
        }
      }
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
      if(!this.currentUser.objectId){
        this.previewURL = '登录后方可预览简历';
      }else{
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
        this.displayResume = this.resume;
      });
    },
    getUserInfo(mode){
      console.log('获取用户信息')
      let userId = this.mode === 'edit' ? this.currentUser.objectId : this.previewId;
      let user = new AV.Query('User');
      user.get(userId).then((res)=> {
        //console.log(res);
      //   //mode === 'edit' ? Object.assign(this.resume,res.attributes.resume) : Object.assign(this.previewResume,res.attributes.resume)
      //   //this.resume = res.attributes.resume;
        console.log(res);
        Object.assign(this.displayResume,res.attributes.resume);
    
      }).catch(function (error) {
        // 异常处理
         console.error(error);
       });
    },
    checkLogin(){
      let currentUser = AV.User.current();
      if (currentUser) {
        console.log('登录啦')
        console.log(currentUser.toJSON())
        this.currentUser = currentUser.toJSON();
        this.isLogin = true;
        this.getUserInfo();
      }else{
        this.displayResume = this.resume;
      }
    },
    addSkills(){
      this.resume.skills.push({
        name:'请填写技能名称',
        description:'请填写技能描述'
      })
    },
    removeSkill(idx){
      console.log(idx);
      this.resume.skills.splice(idx,1);
    },
    addProject(){
      this.resume.projects.push({
        name:'项目名称',
        link:'https:xxx.xxx.com',
        keywords:'关键字',
        description:'项目描述'
      })
    },
    removeProject(idx){
      console.log(idx);
      this.resume.projects.splice(idx,1);
    },
    print(){
      window.print();
    },
    toggleSkin(){
      this.skin = this.skin ==='default'?'dark':'default';
    },
    login(data){
      // 登录成功后获取数据
      console.log('登录成功');
      console.log(data);
      for(var key in data){
        console.log(key)
        console.log(this[key])
        if(key === 'isLogin'){
          this[key]=data[key]
        }else{
          Object.assign(this[key],data[key]);
        }
      }
    },
    regist(data){
      // 注册成功后获取数据
      console.log('注册成功');
      console.log(data);
      for(var key in data){
        console.log(key)
        console.log(this[key])
        console.log(data[key])
        if(key === 'isLogin'){
          this[key]=data[key]
        }else{
          Object.assign(this[key],data[key]);
        }
      }
    }
  }
})