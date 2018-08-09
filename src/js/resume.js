Vue.component('resume', {
  props:['islogin','userid','mode'],
  template: `
    <div class="resume">
      <section class="profile">
        <h1>
          <edit-span :disabled="mode==='edit'" :value="displayResume.name" @edit="edit('name',$event)"></edit-span>
        </h1>
        <edit-span :disabled="mode==='edit'" :value="displayResume.age" @edit="edit('age',$event)"></edit-span> |
        <edit-span :disabled="mode==='edit'" :value="displayResume.gender" @edit="edit('gender',$event)"></edit-span> |
        <edit-span :disabled="mode==='edit'" :value="displayResume.phone" @edit="edit('phone',$event)"></edit-span> |
        <edit-span :disabled="mode==='edit'" :value="displayResume.email" @edit="edit('email',$event)"></edit-span>
      </section>
      <section class="career">
        <h2>工作经历</h2>
        <div class="list">
          <ul>
            <li>
              <div class="top">
                <div class="lt">
                  <span class="company">公司一</span>
                  <span class="title">职位</span>
                </div>
                <div class="rt">
                  <span class="time">2011-2012</span>
                </div>
              </div>
              <div class="btm">
                <p class="desc">工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介</p>
              </div>
            </li>
            <li>
              <div class="top">
                <div class="lt">
                  <span class="company">公司一</span>
                  <span class="title">职位</span>
                </div>
                <div class="rt">
                  <span class="time">2011-2012</span>
                </div>
              </div>
              <div class="btm">
                <p class="desc">工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介</p>
              </div>
            </li>
            <li>
              <div class="top">
                <div class="lt">
                  <span class="company">公司一</span>
                  <span class="title">职位</span>
                </div>
                <div class="rt">
                  <span class="time">2011-2012</span>
                </div>
              </div>
              <div class="btm">
                <p class="desc">工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介工作简介</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="edu">
        <h2>教育经历</h2>
        <div class="list">
          <ul>
            <li>
              <div class="lt">
                <span class="school">学校</span>
                <span class="major">专业</span>
              </div>
              <div class="rt">
                <span class="time">2011-2012</span>
              </div>
            </li>
            <li>
              <div class="lt">
                <span class="school">学校</span>
                <span class="major">专业</span>
              </div>
              <div class="rt">
                <span class="time">2011-2012</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="project">
        <h2>项目经历</h2>
        <div class="list">
          <ul>
            <li v-for="project,index in displayResume.projects" v-key="index">
              <div class="top">
                <div class="lt">
                  <edit-span :disabled="mode==='edit'" :value="project.name" @edit="edit('projects['+index+'].name',$event)"></edit-span>
                  <edit-span :disabled="mode==='edit'" :value="project.link" @edit="edit('projects['+index+'].link',$event)"></edit-span>
                </div>
                <div class="rt">
                  <edit-span :disabled="mode==='edit'" :value="project.keywords" @edit="edit('projects['+index+'].keywords',$event)"></edit-span>
                </div>
              </div>
              <div class="btm">
                <div class="desc">
                  <edit-span :disabled="mode==='edit'" :value="project.description" @edit="edit('projects['+index+'].description',$event)"></edit-span>
                </div>
              </div>
              <span v-if="index>2 && mode === 'edit'" class="close" @click="removeProject(index)">x</span>
            </li>
            <li v-if="mode==='edit'"><span @click="addProject">添加</span></li>
          </ul>
        </div>
      </section>
      <section class="skill">
        <h2>技能</h2>
        <div class="list">
          <ul>
            <li v-for="skill,index in displayResume.skills" v-key="index">
              <span class="name">
                <edit-span :disabled="mode==='edit'" :value="skill.name" @edit="edit('+skills['+index+'].name',$event)"></edit-span>
              </span>
              ：
              <span class="desc">
                <edit-span :disabled="mode==='edit'" :value="skill.description" @edit="edit('skills['+index+'].description',$event)"></edit-span>
              </span>
              <span class="close" v-if="index>3 && mode == 'edit'" @click="removeSkill(index)">x</span>
            </li>
            <li v-if="mode==='edit'">
              <span @click="addSkills">添加</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      mode : 'edit',
      displayResume:{
        name : '',
        age : '',
        gender : '',
        phone : '',
        email : '',
        skills:[],
        projects:[]
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
      },
      defaultResume:{
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
      }
      
    }
  },
  methods: {
    getUserInfo(){
      console.log('获取用户信息')
      console.log(this.userid);
      if(this.userid === ''){
        this.displayResume = this.resume
      }else{
        let user = new AV.Query('User');
        user.get(this.userid).then((res)=> {
          console.log(this)
          Object.assign(this.resume,res.attributes.resume);
          Object.assign(this.displayResume,this.resume);
        }).catch(function (error) {
          // 异常处理
           console.error(error);
         });
      }
      
    },
    save(){
      console.log('保存数据啦')
      let user = AV.Object.createWithoutData('User', this.userid);
      // 修改属性
      user.set('resume', this.resume);
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
    addSkills(){
      console.log('添加技能')
      this.displayResume.skills.push({
        name:'请填写技能名称',
        description:'请填写技能描述'
      })
    },
    addProject(){
      this.displayResume.projects.push({
        name:'项目名称',
        link:'https:xxx.xxx.com',
        keywords:'关键字',
        description:'项目描述'
      })
    },
    removeSkill(idx){
      console.log(idx);
      this.displayResume.skills.splice(idx,1);
    },
    removeProject(idx){
      console.log(idx);
      this.displayResume.projects.splice(idx,1);
    }
  },
  created(){
    console.log(this.userid);
    this.getUserInfo();
  },
  watch:{
    islogin:function(newStatus,oldStatus){
      if(newStatus){
        this.getUserInfo()
      }else{
        this.displayResume = this.defaultResume;
      }
    }
  }
})