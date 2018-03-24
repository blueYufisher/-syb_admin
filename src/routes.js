import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import UserInfo from './views/user/information'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'

/*Ops*/
import Edit from './views/Ops/Edit'
import EditPic from './views/Ops/EditPic'
import EditProj from './views/Ops/EditProj'
import Add from './views/Ops/Add'
import AddPic from './views/Ops/AddPic'
import AddProj from './views/Ops/AddProj'
import Editor from './views/editor'

// /*Infos*/
// import activity from './views/Infos/activity'
// import alumni from './views/Infos/alumni'
// import fund from './views/Infos/fund'
// import knowledge from './views/Infos/knowledge'
// import news from './views/Infos/new'
// import policy from './views/Infos/policy'
// import train from './views/Infos/train'
// import tutor from './views/Infos/tutor'
// import info from './views/Infos/info'
// import picture from './views/Infos/picture'
//
// /*Service*/
// import guide from './views/Service/guide'
//
// /*Project*/
// import project from './views/Project/project'
//
// import echarts from './views/charts/echarts.vue'
//
//
// import Index from './views/Index'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '操作',
        iconCls: 'el-icon-message',//图标样式class
        hidden: true,
        children: [
            { path: '/edit', component: Edit, name: '编辑' },
            { path: '/editPic', component: EditPic, name: '编辑图片' },
            { path: '/editProj', component: EditProj, name: '编辑团队' },
            { path: '/add', component: Add, name: '添加' },
            { path: '/addPic', component: AddPic, name: '添加图片' },
            { path: '/addProj', component: AddProj, name: '添加团队' },
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/editor', component: Editor, name: '编辑器' },
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '首页',
        iconCls: 'el-icon-message',//图标样式class
        // leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '主页'  },
            { path: '/editor', component: Editor, name: '编辑器'  },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/userInfo', component: UserInfo, name: '个人中心' },
            { path: '/form', component: Form, name: 'Form' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '成员信息管理',
    //     iconCls: 'fa fa-id-card-o',
    //     hidden: true,
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '服务管理',
    //     iconCls: 'fa fa-address-card',
    //     // leaf: true,//只有一个节点
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/enter', component: info, name: '团队入驻' },
    //             { path: '/assess', component: info, name: '工商财税' },
    //         { path: '/manage', component: info, name: '团队管理' },
    //         { path: '/hatch', component: info, name: '出孵追踪' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '团队管理',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/project', component: project, name: '团队管理' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '网站内容管理',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/activity', component: info, name: '创业沙龙' },
    //         { path: '/alumni', component: info, name: '创业校友' },
    //         { path: '/fund', component: info, name: '创业基金' },
    //         { path: '/knowledge', component: info, name: '创业知识' },
    //         { path: '/news', component: info, name: '栏目新闻' },
    //         { path: '/policy', component: info, name: '创业政策' },
    //         { path: '/train', component: info, name: '创业培训' },
    //         { path: '/tutor', component: info, name: '创业导师' },
    //         { path: '/base', component: info, name: '协同创新平台' },
    //         { path: '/picture', component: picture, name: '图片管理' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;