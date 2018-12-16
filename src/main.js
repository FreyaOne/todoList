import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import iview from '../node_modules/iview'
import '../node_modules/iview/dist/styles/iview.css'   //导入iview
import store from './store.js'    //导入api数据文件
/* eslint-disable no-new */
Vue.config.productionTip = false;
Vue.use(iview);
Vue.use(VueRouter);


const routes = [    //配置路由
    {
        path: '/',
        redirect: '/login'    //根页面
    },
    {
        path: '/login',
        component: (resolve)=> require(['./components/UserLogin.vue'],resolve)
    },
    {
        path:'/hello',
        component:(resolve)=> require(['./components/Hello.vue'],resolve),
        children:[
            {
                 path: '/hello/allTask',
                 component: (resolve)=> require(['./components/allTask.vue'],resolve)
            },
            {
                path: '/hello/unFinishTask',
                component: (resolve)=> require(['./components/unFinishTask.vue'],resolve)
            },
            {
                path: '/hello/finishedTask',
                component: (resolve)=> require(['./components/finishedTask.vue'],resolve)
            },
            {
                path: '/hello/newTask',
                component: (resolve)=> require(['./components/newTask.vue'],resolve)
            },
            {
                path: '/hello/change',
                component: (resolve)=> require(['./components/change.vue'],resolve)
            },
            {
                path: '/hello/today',
                component: (resolve)=> require(['./components/today.vue'],resolve)
            }
         ]
    },
    {
        path:'/register',
        component:(resolve)=> require(['./components/UserRegister.vue'],resolve)
    },
    {
        path:'/error',
        component:(resolve)=> require(['./components/error.vue'],resolve)
    },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: 'history',
    routes// (缩写) 相当于 routes: routes
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
