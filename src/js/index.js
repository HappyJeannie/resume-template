let vm = new Vue({
  el : '#app',
  data(){
    return {
      isediting:false,
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
    }
  }
})