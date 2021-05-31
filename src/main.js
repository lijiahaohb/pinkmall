import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

import toast from "@/components/common/toast"

Vue.config.productionTip = false

// 解决移动端300ms延时
FastClick.attach(document.body)

// 事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件 调用 Vue.use() 的时候默认会去调用插件的 install() 方法
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
    loading: require("@/assets/img/common/load.gif")
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
