<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <div class="title">
            <h4>登录官网</h4>
        </div>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="text" v-model="ruleForm2.code" auto-complete="off" placeholder="验证码"
                      class="idCode_input"></el-input>
            <img v-if="imageUrl" :src="imageUrl" class="idCode" @click="handleReset2">
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <a href="javascript:;" class="register" @click="toRegister">注册 SYB 账号</a>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<style>
    .idCode_input {
        width: 48%;
        height: 35px;
        float: left;
    }

    .idCode {
        width: 48%;
        height: 35px;
        float: right;
        display: block;
    }
</style>

<script>
    import {requestLogin} from '../api/api';
    import util from '../common/js/util'
    import api from '../common/js/interface'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    // import store from '../vuex/store'
    // import routes from '../routes'
    //import NProgress from 'nprogress'

    export default {
        data() {
            return {
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                logining: false,
                ruleForm2: {},
                rules2: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true,
                imageUrl: '',
                user: {}
            };
        },
        methods: {
            ...mapActions([
                'loginUser'
            ]),
            toRegister () {
                this.$router.push({
                    path: '/register'
                })
            },
            handleReset2() {
                let _this = this;
                _this.imageUrl = _this.serverUrl + "/getIdentifyCode?sid=" + Math.random();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = {
                            username: this.ruleForm2.username,
                            password: this.ruleForm2.password,
                            code: this.ruleForm2.code
                        };
                        api.LoginUsers.loginCheck(loginParams.username, loginParams.password, loginParams.code, function (res) {
                            _this.logining = false;
                            //NProgress.done();
                            // console.log(res);
                            if (res.body.status === "false" || !res.body.status) {
                                _this.$message({
                                    message: res.body.message,
                                    type: 'error'
                                });
                            } else {
                                // console.log("login Success!!!", res);
                                api.LoginUsers.getUserByUsername(loginParams.username, res => {
                                    // console.log("getUserByUsername:", res.body.data);
                                    _this.users = res.body.data;
                                    _this.loginUser(_this.users);
                                    sessionStorage.setItem('user', JSON.stringify(_this.users));
                                    util.initMenu(_this.$router, _this.$store);
                                    // _this.$store.commit('login', res.body.data);
                                    // sessionStorage.setItem('user', JSON.stringify(_this.users));
                                });
                            }
                        })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            let _this = this;
            this.ruleForm2 = {};
            this.imageUrl = '';
            this.imageUrl = this.serverUrl + '/getIdentifyCode';
        }
    }

</script>

<style scoped lang="scss" type="text/scss">
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        /*.title {*/
            /*margin: 0px auto 40px auto;*/
            /*text-align: center;*/
            /*color: #505458;*/
        /*}*/

        .remember {
            margin: 0px 0px 35px 0px;
        }

    }

    .title {
        background: linear-gradient(#fff, #f5f5f5);
        height: auto;
        overflow: visible;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        position: relative;
        background-image: url(../assets/logo.png);
        /*background-size: 140px;*/
        background-position: top center;
        background-repeat: no-repeat;
        /*height: 92px;*/
        margin: 23px 0 30px;
        padding: 100px 0 0;
        box-shadow: none;
    }

    .title h4 {
        padding: 0;
        text-align: center;
        color: #666;
        border-bottom: 1px solid #dcdcdc;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font-size: 17px;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 0;
        border-bottom: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        line-height: 1em;
        height: auto;
        color: #333;
        /*font-weight: 400;*/
    }

    .register{
        float: right;
        font-style: normal;
        text-decoration: none;
        color: #5079d9;
        cursor: pointer;
        transition: all .15s ease-out;
    }

    .register:hover{
        color: #f43838;
    }
</style>