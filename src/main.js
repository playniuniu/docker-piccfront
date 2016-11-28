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
import AppMachine from './components/AppMachine.vue'
import AppMap from './components/AppMap.vue'
import AppNewtask from './components/AppNewtask.vue'
import AppNewserver from './components/AppNewserver.vue'
import AppTasks from './components/AppTasks.vue'

Vue.use(VueRouter)
Vue.use(Element)

// router settings
const routes = [
    { path: '/', component: AppMap },
    { path: '/machine', component: AppMachine },
    { path: '/newtask', component: AppNewtask },
    { path: '/newserver', component: AppNewserver },
    { path: '/tasks', component: AppTasks }
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
})
