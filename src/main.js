import Vue from 'vue'
import App from './App.vue'
import fib from '@futuready/components/dist/buefy'
import '@futuready/components/dist/buefy.css'

Vue.use(fib)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
