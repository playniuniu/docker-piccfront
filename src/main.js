//  CSS here
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

//  Vue here
import Vue from 'vue'
import VueRouter from 'vue-router'

// UI here
import Element from 'element-ui'

// router here
import App from './App.vue'
import AppVm from './components/AppVm.vue'
import AppMap from './components/AppMap.vue'
import AppNewtask from './components/AppNewtask.vue'
import AppNewserver from './components/AppNewserver.vue'
import AppTasks from './components/AppTasks.vue'
import CommingSoon from './components/CommingSoon.vue'

Vue.use(VueRouter)
Vue.use(Element)

// router settings
const routes = [
    { path: '/', component: AppMap },
    { path: '/vm', component: AppVm },
    { path: '/sources', component: CommingSoon },
    { path: '/newtask', component: AppNewtask },
    { path: '/newserver', component: AppNewserver },
    { path: '/tasks', component: AppTasks },
    { path: '/settinguser', component: CommingSoon },
    { path: '/settingssh', component: CommingSoon }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
})
