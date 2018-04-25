<template>
    <el-form ref="editFormProj" :model="editFormProj" label-width="180px" @submit.prevent="onSubmit"
             :rules="editFormRules" v-loading="listLoading"
             style="margin:20px;width:95%;min-width:600px;">
        <el-form-item label="最新场地安排" prop="field">
            <el-input v-model="editFormProj.field" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projName">
            <el-input v-model="editFormProj.projName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="projType">
            <el-select v-model="editFormProj.projType" placeholder="请选择" @change="selectChange" value-key="label">
                <el-option
                        v-for="type in types"
                        :key="type.label"
                        :label="type.label"
                        :value="type.label">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="团队logo" prop="picUrl">
            <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="123"
                    :show-file-list="false"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    list-type="picture-card"
                    :auto-upload="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">文件大小要求：500K，文件类型：gif / jpg / bmp / png</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="联系人" prop="projHead">
            <el-input v-model="editFormProj.projHead" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
            <el-input v-model="editFormProj.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实质入驻时间" prop="enterTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="editFormProj.enterTime"
                            @change="logTimeChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="简介" prop="content">
            <!--<UE :defaultMsg="editFormProj.content" :config=config :id=editproj_ue ref="ue"></UE>-->
            <wang-editor :defaultMsg="editFormProj.content" ref="wangeditor"></wang-editor>
            <!--<UE :defaultMsg=defaultMsg v-model="editForm.content" :config=config :id=editproj_ue ref="ue"></UE>-->
        </el-form-item>
        <el-form-item label="内容提要" prop="note">
            <el-input v-model="editFormProj.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="协议书编号" prop="protocol">
            <el-input v-model="editFormProj.protocol" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册公司名称" prop="companyName">
            <el-input v-model="editFormProj.companyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="editFormProj.registerTime"
                            @change="logTimeChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="注册资本（万元）" prop="registerMoney">
            <el-input v-model="editFormProj.registerMoney" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册地" prop="registerField">
            <el-input v-model="editFormProj.registerField" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="经营时间(月)" prop="operTime">
            <el-input v-model="editFormProj.operTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="团队状态" prop="status">
            <el-select v-model="editFormProj.status" placeholder="请选择" @change="selectChange">
                <el-option
                        v-for="statu in status"
                        :key="statu.label"
                        :label="statu.label"
                        :value="statu.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="团队链接" prop="projUrl">
            <el-input v-model="editFormProj.projUrl" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="访问量" prop="visit">-->
        <!--<el-input v-model="editFormProj.visit" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="更新时间">
            <el-date-picker type="date" disabled placeholder="选择日期" v-model="editFormProj.updateTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="saveInfo">保存</el-button>
            <el-button @click="close">关闭</el-button>
        </el-form-item>
    </el-form>
</template>

<style>
    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 146px;
        height: 146px;
        line-height: 146px;
        text-align: center;
    }
</style>

<script>
    import UE from '../../components/ue/ue';
    import WangEditor from '../../components/wangeditor'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import api from '../../common/js/interface'
    import util from '../../common/js/util'

    export default {
        components: {
            UE,
            WangEditor
        },
        data() {
            return {
                // serverUrl :'syb',  //本地调试时
                // serverUrl :'..',  //打包部署上线时
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                editFormProj: {},
                editFormRules: {
                    field: [
                        {required: true, message: '请填写场地安排', trigger: 'blur'}
                    ],
                    projName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    projType: [
                        {required: true, message: '请选择项目类型', trigger: 'blur'}
                    ],
                    projHead: [
                        {required: true, message: '请输入联系人', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, trigger: 'blur', validator: this.validPhone}
                    ],
                    enterTime: [
                        {type: 'date', required: true, message: '请选择入驻时间', trigger: 'change'}
                    ],
                    status: [
                        {type: 'integer', required: true, message: '请选择团队状态', trigger: 'blur'}
                    ]
                },
                projId: 0,
                picId: '',
                projPicId: '',
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    zIndex: 100,
                    autoFloatEnabled: true,
                    type: Object
                },
                editproj_ue: "editproj_ue", // 不同编辑器必须不同的id,
                imageUrl: '',
                fd: {},
                types: [
                    {value: 1, label: '智能制造、智能硬件及技术产业化项目'},
                    {value: 2, label: '互联网、物联网项目'},
                    {value: 3, label: '文化创意类项目'},
                    {value: 4, label: '商贸及传统项目'}],
                status: [
                    {value: 0, label: '入驻'},
                    {value: 1, label: '孵化'}],
                typeUrl: '',
                listLoading: false,
                addPicId:[]
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'getEditProj'
                // ...
            ])
        },
        methods: {
            validPhone(rule, value, callback) {
                if (!value) {
                    callback(new Error('请输入电话号码'))
                } else if (!util.isvalidPhone(value)) {
                    callback(new Error('请输入正确的11位手机号码'))
                } else {
                    callback()
                }
            },
            selectChange() {
                let _this = this;
                // console.log(this.editFormProj.projType);
            },
            handleChange(file, fileList) {
                let _this = this;
                this.fd = util.uploadPicture(file, this);
                api.Pictures.upload(this.fd, res => {
                    _this.editFormProj.logo = res.body.data.id;
                    _this.picId = _this.editFormProj.logo;
                    _this.addPicId.push(_this.picId);
                }).then(res => {
                    _this.getProjectPicId().then(res => {
                        _this.projPicId = res.body.data;
                    });
                });
            },
            handleSuccess(res, file, fileList) {
                // console.log("Success:", res);
            },
            onSubmit() {
                console.log('submit!');
            },
            close: function () {
                this.$router.push({path: '/project'});
            },
            getProjectPicId: function () {
                let _this = this,
                    obj = {};
                obj.projid = 1;
                obj.picid = this.picId;
                obj = JSON.stringify(obj);
                return new Promise((resolve, reject) => {
                    api.ProjectPicture.insertPictureIdReturnProjectID(obj, function (res) {
                        console.log("insertPictureIdReturnProjectID:", res);
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyProjectPic: function (proj_id) {
                let _this = this,
                    obj = {};
                obj.id = this.projPicId;
                obj.projid = proj_id;
                obj.picid = this.picId;
                obj = JSON.stringify(obj);

                return new Promise((resolve, reject) => {
                    api.ProjectPicture.updateProjectId(obj, function (res) {
                        console.log("updateProjectId:", res);
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyProjectData: function (res) {
                let _this = this,
                    params = "";
                // this.editFormProj.coverPic = res.body.data.id;
                params = JSON.stringify(this.editFormProj);
                // console.log("this.editFormProj:", params);
                return new Promise((resolve, reject) => {
                    api.Project.modifyProject(params, function (res) {
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            saveInfo: function () {
                let _this = this,
                    params = "",
                    content = this.$refs.wangeditor.getContent(),
                    note = this.$refs.wangeditor.getTXTContent();
                this.$refs.editFormProj.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.listLoading = true;
                            _this.$refs.upload.submit();
                            _this.editFormProj.content = content;
                            _this.editFormProj.note = note.substring(0, 100);
                            _this.editFormProj.enterTime = util.convertDateToJsonDate(this.editFormProj.enterTime);
                            _this.editFormProj.registerTime = util.convertDateToJsonDate(this.editFormProj.registerTime);
                            _this.editFormProj.updateTime = util.convertDateToJsonDate(new Date());
                            // console.log("editFormProj", JSON.stringify(_this.editFormProj));
                            _this.modifyProjectData().then((res) => {
                                _this.modifyProjectPic(_this.projId).then(res => {
                                    _this.listLoading = false;
                                    // console.log("success!!!!", res);
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    })
                                });
                                _this.$router.push({path: '/project'});
                            });
                            var addPicsId = sessionStorage.getItem('PicsId');
                            var picsId;
                            addPicsId = JSON.parse(addPicsId);
                            console.log(addPicsId);
                            if (addPicsId !== null){
                                picsId = _this.addPicId.concat( addPicsId );
                            } else {
                                picsId = _this.addPicId;
                            }
                            params = {
                                title: _this.editFormProj.projName,
                                typeId: 4,
                                id: picsId
                            }
                            api.Pictures.modifyPicturesByInfo(JSON.stringify(params), res => {
                                // console.log('success!!');
                            })
                        });
                    } else {
                        util.validateError(_this.editFormRules, _this.editFormProj, errs => {
                            let firs_errs = errs[0];
                            _this.$message({
                                message: firs_errs.message,
                                type: 'warning'
                            });
                        })
                    }
                });
                // console.log("editFormProj:", params);
            },
            logTimeChange(val) {
                // console.log(val)
            }
        },
        mounted() {
            let _this = this;
            this.projId = this.getEditProj;
            // console.log("projId", this.projId);
            this.listLoading = true;
            api.Project.selectProjectById(this.projId, function (res) {
                // console.log(JSON.stringify(res));
                _this.editFormProj = res.body.data;
                _this.editFormProj.enterTime = new Date(_this.editFormProj.enterTime);
                // console.log("enterTime:", _this.editFormProj.enterTime);
                if (res.body.data.picUrl) {
                    _this.imageUrl = _this.serverUrl + "\\images\\" + res.body.data.picUrl;
                }
                _this.listLoading = false;
                // console.log("editFormProj", _this.editFormProj);
            });
        }
    }

</script>