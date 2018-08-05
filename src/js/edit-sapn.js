Vue.component('edit-span',{
  template : `
    <span>
      <span v-if="!isediting">{{value}}</span>
      <input v-else type="text" v-model="value" @input="edit">
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
    edit(e){
      this.$emit('edit',e.target.value)
    }
  }
})