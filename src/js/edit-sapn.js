Vue.component('edit-span',{
  template : `
    <span>
      <span v-if="!isediting" @click="disabled ? isediting=true : isediting=false">{{value}}</span>
      <input v-else type="text" v-model="value" @input="edit" @blur="isediting=false" v-show="disabled">
      
    </span>
  `,
  data(){
    return {
      isediting : false
    }
  },
  props : ['value','disabled'],
  methods:{
    edit(e){
      this.$emit('edit',e.target.value)
    }
  }
})