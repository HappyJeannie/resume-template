Vue.component('app-aside', {
  props:['mode','islogin'],
  template: `
    <aside>
      <div class="tp" v-if="mode === 'edit'">
        <button @click="$emit('save')">保存</button>
        <button @click="print">打印</button>
        <button @click="$emit('changemode','preview')">预览</button>
        <button @click="$emit('share')">分享</button>
        <button @click="$emit('skin')">换肤</button>
      </div>
      <div class="tp" v-else>
        <button @click="$emit('changemode','edit')">退出预览</button>
      </div>
      <div class="btm" v-if="mode === 'edit'">
        <button v-if="islogin" @click="$emit('logout')">退出</button>
        <button v-else @click="$emit('login')">登录</button>
      </div>
    </aside>
  `,
  data() {
    return {
      
    }
  },
  methods: {
    logout(){

    },
    print(){
      window.print();
    }
  }
})