import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

// 应用初始状态
const state = {
    count: 10,
    editForm: [],
    user: {
        userName: sessionStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(sessionStorage.getItem('user' || '[]')).userName,
        userface: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).userface,
        realName: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).realName,
        role: sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(sessionStorage.getItem('user' || '[]')).role
    },
    infoId: 0,
    picId: 0,
    projectId:0,
    routes: [],
    type: [
        {value: 1, label: '创业沙龙', url: 'activity'},
        {value: 2, label: '栏目新闻', url: 'news'},
        {value: 3, label: '创业知识', url: 'knowledge'},
        {value: 4, label: '团队风采', url: 'team'},
        {value: 5, label: '创业校友', url: 'alumni'},
        {value: 6, label: '创业导师', url: 'tutor'},
        {value: 7, label: '创业培训', url: 'train'},
        {value: 8, label: '创业政策', url: 'policy'},
        {value: 9, label: '创业基金', url: 'fund'},
        {value: 10, label: '团队入驻', url: 'enter'},
        {value: 11, label: '团队管理', url: 'manage'},
        {value: 12, label: '工商财税', url: 'assess'},
        {value: 13, label: '出孵追踪', url: 'hatch'},
        {value: 14, label: '协同创新平台', url: 'base'}],
    currentType:-1,
    loginUser: {},
    addPicsId:[]
};

// 定义所需的 mutations
const mutations = {
    login(state, user){
        state.user = user;
        window.sessionStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
        window.sessionStorage.removeItem('user');
        state.routes = [];
    },
    initMenu(state, menus){
        state.routes = menus;
    },
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    EDIT_INFO(state, id) {
        // state.editForm = arr;
        state.infoId = id;
    },
    EDIT_PIC(state, id) {
        state.picId = id;
    },
    EDIT_PROJ(state, id){
        state.projectId = id;
    },
    LOGINUSER(state, user){
        state.user = user;
        state.loginUser = user;
        sessionStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUTUSER(state, user){
        state.loginUser = user;
        state.user = user;
    },
    GETCURRENTTYPE(state, type){
        state.currentType = type;
    },
    GETADDPICSID(state, id){
        state.addPicsId = id;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})