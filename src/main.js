import Vue from 'vue'
import App from './App.vue'
import 'windi.css'

Vue.config.productionTip = false


// Vue.prototype.$numberWithCommas=function (x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }


new Vue({
  render: h => h(App),
}).$mount('#app')
