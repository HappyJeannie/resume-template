window.Share = {
  template: `
    <div class="share modal">
      <div class="shadow" @click="toHome"></div>
      <div class="form">
        <h4>请将以下链接复制到浏览器中即可预览：</h4>
        <textarea readonly>{{url}}</textarea>
      </div>
    </div>
  `,
  name:'share',
  data(){
    return{
      url:''
    }
  },
  created(){
    console.log('输出用户信息')
    console.log(this.$route)
    console.log(this.$route.params)
    this.url = this.$route.params.url;
  },
  methods:{
    toHome(){
      this.$router.push('/')
    }
  }
}
Vue.component('share', window.Share)