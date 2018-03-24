<template>
    <div style="width: 70%">
        <y-shelf title="账户资料">
            <div slot="content" class="panel-body">
                <!--<div class="avatar-box">-->
                <!--<div class=img-box><img :src="userInfo.info.file" alt=""></div>-->
                <!--<div class="r-box">-->
                <!--<h3 style="margin-left: 13px;">修改头像</h3>-->
                <!--<y-button text="上传头像" classStyle="main-btn" style="margin: 0;"-->
                <!--@btnClick="editAvatar()"></y-button>-->
                <!--</div>-->
                <!--</div>-->
                <div class="profile__base" style="padding-bottom: 15px;overflow: hidden;">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="mb5"><span class="profile__mod-inner-heading">真人头像</span><span
                                    data-toggle="tooltip" data-placement="top" title="" class="" data-icon="lock"
                                    data-original-title="不对外公开"></span>
                            </div>
                            <div class="avatar avatar-square-128" @click="editAvatar"><img class="avatar-square-128 "
                                                                       :src="userface">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">真实姓名</span><span data-toggle="tooltip"
                                                                                               data-placement="top"
                                                                                               title="" class=""
                                                                                               data-icon="lock"
                                                                                               data-original-title="不对外公开">
                                                                                               </span></div>
                                <div><span>{{userInfo.realName !== null ? userInfo.realName: '暂无'}}</span></div>
                            </div>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">登录账号</span><span data-toggle="tooltip"
                                                                                               data-placement="top"
                                                                                               title="" class=""
                                                                                               data-icon="lock"
                                                                                               data-original-title="不对外公开"></span>
                                </div>
                                <div><span>{{userInfo.userName !== null ? userInfo.userName: '暂无'}}</span></div>
                            </div>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">手机号码</span><span data-toggle="tooltip"
                                                                                               data-placement="top"
                                                                                               title="" class=""
                                                                                               data-icon="lock"
                                                                                               data-original-title="不对外公开"></span>
                                </div>
                                <div><span>{{userInfo.phone !== null ? userInfo.phone: '暂无'}}</span></div>
                            </div>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">邮箱</span></div>
                                <div><span>{{userInfo.mail !== null ? userInfo.mail: '暂无'}}</span></div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <span class="profile__heading-edit pull-right  btn btn-xs"
                                  data-type="base" @click="editUser"><i class="fa fa-pencil"
                                                                        aria-hidden="true"></i>编辑</span>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">性别</span></div>
                                <div><span>{{userInfo.sex !== null ? userInfo.sex: '暂无'}}</span></div>
                            </div>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">QQ</span></div>
                                <div><span>{{userInfo.qq !== null ? userInfo.qq: '暂无'}}</span></div>
                            </div>
                            <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">微信</span><span data-toggle="tooltip"
                                                                                             data-placement="top"
                                                                                             title="" class=""
                                                                                             data-icon="lock"
                                                                                             data-original-title="不对外公开"></span>
                                </div>
                                <div><span>{{userInfo.weichat !== null ? userInfo.weichat: '暂无'}}</span></div>
                            </div>
                            <!-- <div class="profile__mod-inner-item">
                                <div><span class="profile__mod-inner-heading">通讯地址</span><span data-toggle="tooltip"
                                                                                               data-placement="top"
                                                                                               title="" class=""
                                                                                               data-icon="lock"
                                                                                               data-original-title="不对外公开"></span></div>
                                <div class="ellipsis"><span>暂无</span></div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="edit-avatar" v-if="editAvatarShow">
                    <y-shelf title="设置头像">
                        <span slot="right">
                            <span class="close" @click="editAvatarShow=false">
                                <svg t="1501234940517" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="3014"
                                     xmlns:xlink="http://www.w3.org/1999/xlink"
                                     width="20" height="20">
                                    <path d="M941.576 184.248l-101.824-101.824L512 410.176 184.248 82.424 82.424 184.248 410.168 512l-327.744 327.752 101.824 101.824L512 613.824l327.752 327.752 101.824-101.824L613.832 512z"
                                          fill="#cdcdcd" p-id="3015"></path>
                                </svg>
                            </span>
                        </span>
                        <div slot="content" class="content">
                            <div class="edit-l">
                                <div style="width: 100px;height: 100px;border: 1px solid #ccc;margin-bottom: 20px;overflow: hidden;">
                                    <div class="show-preview"
                                         :style="{'width': previews.w + 'px','height': previews.h + 'px','overflow': 'hidden','zoom':option.zoom}">
                                        <div :style="previews.div">
                                            <img :src="option.img"
                                                 :style="previews.img"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div style="padding: 10px 0 ">头像预览</div>
                                <div class="btn">
                                    <a href="javascript:;">重新选择</a>
                                    <input type="file" value="上传头像" @change="upimg($event)"></div>
                            </div>
                            <div class="edit-r">
                                <div>
                                    <div class="big" id="cropper-target" v-if="option.img">
                                        <vueCropper
                                                :img="option.img"
                                                @realTime="realTime"
                                                ref="cropper"
                                                :outputSize="example2.size"
                                                :info="example2.info"
                                                :canScale="example2.canScale"
                                                :autoCrop="example2.autoCrop"
                                                :autoCropWidth="example2.width"
                                                :autoCropHeight="example2.height"
                                                :fixed="example2.fixed"
                                        ></vueCropper>
                                    </div>
                                </div>

                            </div>
                            <div class="bootom-btn pa">
                                <y-button style="width: 140px;height: 40px;line-height: 40px"
                                          text="取消"
                                          @btnClick="editAvatarShow=false">
                                </y-button>
                                <y-button style="width: 140px;height: 40px;line-height: 40px"
                                          text="确定"
                                          classStyle="main-btn"
                                          @btnClick="cropper">
                                </y-button>
                            </div>
                        </div>
                    </y-shelf>
                </div>
            </div>
        </y-shelf>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="userEditInfo" label-width="80px">
                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="userInfo.realName" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="userInfo.sex">
                        <el-radio class="radio" :label="男" :key="男">男</el-radio>
                        <el-radio class="radio" :label="女" :key="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="登录账号" prop="userName">
                    <el-input v-model="userInfo.userName" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="userInfo.phone" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="userInfo.mail" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="userInfo.qq" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="weichat">
                    <el-input v-model="userInfo.weichat" auto-complete="off" class="info-input"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import YButton from "../../components/YButton";
    import api from '../../common/js/interface'
    import YShelf from "../../components/shelf";
    import vueCropper from "vue-cropper";
    import {mapGetters} from "vuex";
    import {mapActions} from "vuex";
    import userAvatar from '../../assets/user-256.png'
    // import {mapState, mapMutations} from 'vuex'
    // import {getStore} from '/utils/storage'

    export default {
        data() {
            return {
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                userInfo: {},
                userEditInfo: {},
                userface:"",
                avatarImg: "",
                imgSrc: "",
                editAvatarShow: false,
                cropContext: "",
                cropperImg: "",
                previews: {},
                file: {},
                option: {
                    img: "",
                    zoom: 0
                },
                fixedNumber: [1, 1],
                example2: {
                    info: true,
                    size: 1,
                    canScale: false,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 300,
                    autoCropHeight: 250,
                    // 开启宽度和高度比例
                    fixed: true
                },
                userId: "",
                token: "",
                editVisible: false
            };
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                "getLoginUser"
                // ...
            ])
        },
        methods: {
            ...mapActions(["loginUser"]),
            editSubmit() {
                api.User.updateUser(JSON.stringify(this.userEditInfo), res => {
                    console.log("updateUser:",res);
                    if (res.status){
                        this.userInfo = this.userEditInfo;
                        this.editVisible = false;
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '更新失败',
                            type: 'error'
                        })
                    }
                })
            },
            editUser() {
                this.editVisible = true;
                this.userEditInfo = this.userInfo;
            },
            message(m) {
                this.$message(m);
            },
            messageSuccess(m) {
                this.$message({
                    message: m,
                    type: "success"
                });
            },
            messageFail(m) {
                this.$message.error({
                    message: m
                });
            },
            upimg(e) {
                this.file = e.target.files[0];
                if (this.file.size > 1048576) {
                    this.messageFail("图片大小不得超过1Mb");
                    return false;
                }
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.messageFail("图片类型仅支持.gif,jpeg,jpg,png,bmp");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = e => {
                    this.option.img = e.target.result;
                };
            },
            cropper() {
                let fd = new FormData();
                this.message("上传中...");
                if (this.option.img) {
                    this.$refs.cropper.getCropData(data => {
                        this.imgSrc = data;
                        fd.append('upfile', this.file);
                        fd.append('title', this.userInfo.userName);
                        api.Pictures.uploadAvatar(fd, res => {
                            console.log("uploadAvatar:",res);
                                if (res.body.status) {
                                    this.avatarImg = res.body.data.url;
                                    this.editAvatarShow = false
                                    this.messageSuccess('上传成功')
                                }
                        }).then(res => {
                            this.userInfo.userface = this.avatarImg;
                            api.User.updateUser(JSON.stringify(this.userInfo), res => {
                                console.log("updateUser:",res);
                            })
                        });
                        // upload({userId: this.userId, token: this.token, imgData: data}).then(res => {
                        //     if (res.success === true) {
                        //         let path = res.result
                        //         let info = this.userInfo
                        //         info.file = path
                        //         this.RECORD_USERINFO({info: info})
                        //         this.editAvatarShow = false
                        //         this.messageSuccess('上传成功')
                        //     }
                        // })
                    });
                } else {
                    this.messageFail("别玩我啊 先选照骗");
                }
            },
            editAvatar() {
                this.editAvatarShow = true;
            },
            realTime(data) {
                this.previews = data;
                let w = 100 / data.w;
                this.option.zoom = w;
            }
        },
        mounted() {
            this.userInfo = this.getLoginUser;
            console.log(this.userInfo);
            this.userface = this.userInfo.userface !== null ?
                this.serverUrl + "\\avatar\\" + this.userInfo.userface
                : userAvatar;
        },
        created() {
            // this.userId = getStore('userId')
            // this.token = getStore('token')
        },
        components: {
            YButton,
            YShelf,
            vueCropper
        }
    };
</script>
<style scoped lang="scss" type="text/scss">
    @import "../../assets/style/mixin";

    .avatar-box {
        height: 124px;
        display: flex;
        margin: 0 30px 30px;
        border-bottom: #dadada solid 1px;
        line-height: 30px;
        display: flex;
        align-items: center;
        .img-box {
            @include wh(80px);
            border-radius: 5px;
            overflow: hidden;
        }
        img {
            display: block;
            @include wh(100%);
        }
        .r-box {
            margin-left: 20px;
            h3 {
                font-size: 18px;
                font-weight: 400;
                color: #333;
            }
        }
    }

    // 修改头像
    .edit-avatar {
        z-index: 9999;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        @include wh(100%);
        background-color: rgba(0, 0, 0, 0.5);
        @extend %block-center;
        .content {
            display: flex;
            padding: 45px 100px 0;
        }
        > div {
            box-sizing: content-box;
            @include wh(700px, 500px);
            margin: 0;
        }
        .btn {
            width: 80px;
            height: 30px;
            margin-left: 10px;
            position: relative;
            text-align: center;
            line-height: 30px;
            text-shadow: rgba(255, 255, 255, 0.496094) 0 1px 0;
            border: 1px solid #e6e6e6;
            border-radius: 10px;
            &:hover {
            }
            a {
                color: #666;
                display: block;
                @include wh(100%);
            }
        }
        input[type="file"] {
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            opacity: 0;
            width: 80px;
            height: 30px;
            cursor: pointer;
            box-sizing: border-box;
            border: 15px solid #000;
            overflow: hidden;
        }
        .edit-l {
            width: 100px;
            text-align: center;
            a{
                text-decoration: none;
            }
        }
        .edit-r {
            margin-left: 20px;
            flex: 1;
            > div {
                border: 1px solid #ccc;
                width: 320px;
                height: 320px;
            }
        }
    }

    .image-container {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
    }

    .close {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        padding: 0 10px;
        @extend %block-center;
        &:hover {
            svg {
                transition: all 1s;
                transform: rotate(360deg);
                transform-origin: 50% 50%;
            }
            path {
                fill: #8a8a8a;
            }
        }
    }

    .big {
        display: block;
        width: 320px;
        height: 320px;
    }

    .bootom-btn {
        padding: 0 15px;
        border-top: 1px solid #e6e6e6;
        bottom: 0;
        height: 60px;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .pa{
        position: absolute;
    }
    .panel-body {
        padding: 15px;
    }

    .row {
        width: 100%;
        margin-left: -15px;
        margin-right: -15px;
        overflow: hidden;
    }

    .row:before,
    .row:after {
        content: " ";
        display: table;
    }

    .col-md-3,
    .col-md-4,
    .col-md-5 {
        float: left;
        position: relative;
        min-height: 1px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .col-md-3 {
        width: 25%;
    }

    .col-md-4 {
        width: 33.33333%;
    }

    .col-md-5 {
        width: 26.66667%;
    }

    .mb5,
    .mb-5 {
        margin-bottom: 5px !important;
    }

    .profile__mod-inner-heading {
        font-size: 14px;
        color: #999999;
    }

    .row [data-icon="lock"] {
        margin-left: 5px;
        color: #ccc;
    }

    .avatar-square-128 {
        width: 128px;
        height: 128px;
    }

    [class*="avatar-"] {
        border-radius: 2px;
    }

    img {
        vertical-align: middle;
    }

    .profile__mod-inner-item {
        margin-bottom: 10px;
    }

    .profile__mod-inner-item div:first-child {
        margin-bottom: 2px;
    }

    .profile__heading-edit,
    .profile__data-list-edit--style {
        border: none;
        box-shadow: none;
        margin-left: 8px;
        color: #999;
        font-size: 12px;
        font-weight: normal;
    }

    /*.btn {*/
        /*-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);*/
        /*box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);*/
        /*display: inline-block;*/
        /*margin-bottom: 0;*/
        /*font-weight: normal;*/
        /*text-align: center;*/
        /*vertical-align: middle;*/
        /*cursor: pointer;*/
        /*background-image: none;*/
        /*border: 1px solid transparent;*/
        /*white-space: nowrap;*/
        /*padding: 6px 12px;*/
        /*font-size: 14px;*/
        /*line-height: 1.42858;*/
        /*border-radius: 4px;*/
        /*-webkit-user-select: none;*/
        /*-moz-user-select: none;*/
        /*-ms-user-select: none;*/
        /*user-select: none;*/
    /*}*/

    .pull-right {
        float: right !important;
    }

    .btn-xs,
    .btn-group-xs > .btn {
        cursor: pointer;
        padding: 1px 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .info-input{

    }
</style>