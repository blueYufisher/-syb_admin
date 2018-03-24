import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'

/*UE编辑器*/
import '../static/UE/ueditor.config'
import '../static/UE/ueditor.all'
import '../static/UE/lang/zh-cn/zh-cn'
// import '../static/UE/ueditor.parse.min'

// import './assets/theme/theme-darkblue/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import util from './common/js/util.js'

// import api from '/common/js/interface'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // var userName = store.state.user.userName;
    var _userName = sessionStorage.getItem('user') !== null ?
        JSON.parse(sessionStorage.getItem('user')).userName :
       '未登录';
    // console.log(_userName);
    if (_userName === '未登录') {
        if (to.path === '/login' || to.path === '/register') {
            next();
            sessionStorage .removeItem('user');
            store.state.user = {
                userName: '未登录',
                userface: '',
                realName: '',
                role: '',
            };
            return;
        } else {
            next({path: '/login'});
        }
    } else {

        if (to.path === '/') {
            next({path: '/project'});
        }
            next();
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')

