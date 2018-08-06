Vue.component('edit-span',{
  template : `
    <span>
      <span v-if="!isediting" @click="isediting=true">{{value}}</span>
      <input v-else type="text" v-model="value" @input="edit" @blur="isediting=false">
      
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