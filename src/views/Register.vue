<template>
    <el-form :model="ruleForm" :rules="r_rules" ref="ruleForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">注册SYB账号</h3>
        <el-form-item>
            <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="ruleForm.passwordConfirm" auto-complete="off"
                      placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked" class="remember" label="同意注册广东工业大学创业梦工场"></el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">注册
            </el-button>
            <!--<el-button @click="handleReset2">重置</el-button>-->
        </el-form-item>
        <div style="border-top: 1px solid #ccc;">
            <div style="text-align: center;line-height: 48px;margin-bottom: 0;font-size: 12px;color: #999;">
                <span>如果您已拥有 SYB 账号，则可在此</span>
                <a href="javascript:;" class="register"
                   style="margin: 0 5px"
                   @click="toLogin">登陆</a>
            </div>
        </div>
    </el-form>
</template>

<script>
    import {requestLogin} from '../api/api';
    import util from '../common/js/util'
    import api from '../common/js/interface'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                logining: false,
                ruleForm: {
                    username: " ",
                    password: " ",
                    passwordConfirm: " "
                },
                r_rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ],
                    passwordConfirm: [
                        {required: true, message: '请重新输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ],
                    checked: [
                        {type: 'boolean', required: true, message: '请同意注册广东工业大学创业梦工场', trigger: 'change'}
                    ]
                },
                checked: false,
                user: {}
            };
        },
        methods: {
            toLogin() {
                this.$router.push({
                    path: '/login'
                })
            },
            handleSubmit2(ev) {
                var _this = this;
                this.logining = true;
                // this.$refs.ruleForm.validate((valid) => {
                //     if (valid) {
                //         //_this.$router.replace('/table');
                //         this.logining = true;
                //         //NProgress.start();
                //         var loginParams = {
                //             username: this.ruleForm.username,
                //             password: this.ruleForm.password
                //         };
                //         if (loginParams.password !== undefined && loginParams.password === this.ruleForm.passwordConfirm) {
                //             api.LoginUsers.register(JSON.stringify(loginParams), function (res) {
                //                 _this.logining = false;
                //                 console.log(res);
                //                 //NProgress.done();
                //                 if (!res.body.status) {
                //                     _this.$message({
                //                         message: res.body.message,
                //                         type: 'error'
                //                     });
                //                 } else {
                //                     console.log("login Success!!!", res);
                //                 }
                //             })
                //         } else {
                //             this.$message({
                //                 message: '输入的密码不一致',
                //                 type: 'error'
                //             });
                //             this.logining = false;
                //             return false;
                //         }
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });

                let userName = this.ruleForm.username;
                let password = this.ruleForm.password;
                let passwordConfirm = this.ruleForm.passwordConfirm;
                if (!userName || !password || !passwordConfirm) {
                    this.$message({
                        message: '账号密码不能为空!',
                        type: 'warning'
                    });
                    this.logining = false;
                    return false;
                }
                if (password !== passwordConfirm) {
                    this.$message({
                        message: '两次输入的密码不相同!',
                        type: 'warning'
                    });
                    this.logining = false;
                    return false;
                }
                if (!this.checked) {
                    this.$message({
                        message: '请同意注册广东工业大学创业梦工场',
                        type: 'warning'
                    });
                    this.logining = false;
                    return false;
                }
                var loginParams = {
                    userName: this.ruleForm.username,
                    password: this.ruleForm.password
                };
                api.LoginUsers.register(JSON.stringify(loginParams), function (res) {
                    _this.logining = false;
                    console.log(res);
                    //NProgress.done();
                    if (!res.body.status) {
                        _this.$message({
                            message: res.body.message,
                            type: 'error'
                        });
                    } else {
                        _this.$message({
                            message: '你已成功注册！',
                            type: 'success'
                        });
                        _this.$router.push({
                            path: '/login'
                        })
                    }
                })
            }
        },
        mounted() {
            let _this = this;
            this.ruleForm = {};
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

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            /*margin: 0px 0px 5px 0px;*/
        }

        .register {
            /*float: right;*/
            font-style: normal;
            text-decoration: none;
            color: #5079d9;
            cursor: pointer;
            transition: all .15s ease-out;
        }

        .register:hover {
            color: #f43838;
        }
    }
</style>