import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue} from "bootstrap-vue";
import suncalc from "suncalc";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.prototype.$suncalc = suncalc
Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

const eventBus = new Vue()
export default eventBus
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
