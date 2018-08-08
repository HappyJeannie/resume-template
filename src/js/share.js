Vue.component('share', {
  props:['url'],
  template: `
    <div class="share modal">
      <div class="shadow" @click="$emit('close')"></div>
      <div class="form">
        <h4>请将以下链接复制到浏览器中即可预览：</h4>
        <textarea readonly>{{url}}</textarea>
      </div>
    </div>
  `
})