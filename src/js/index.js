Vue.component('edit-span',{
  template : `
    <span>
      <span v-if="!isediting">{{value}}</span>
      <input v-else type="text" v-model="value" @input="x">
      <button @click="isediting = !isediting">编辑</button>
    </span>
  `,
  data(){
    return {
      isediting : false
    }
  },
  props : ['value'],
  methods:{
    x(e){
      this.$emit('edit',e.target.value)
    }
  }
})
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
    y(val){
      console.log(val)
      this.resume.name = val;
    }
  }
})