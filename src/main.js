import Vue from 'vue'
import App from './App.vue'
import VueMotion from 'vue-motion'

Vue.use(VueMotion)

new Vue({
  el: '#app',
  render: h => h(App)
})
