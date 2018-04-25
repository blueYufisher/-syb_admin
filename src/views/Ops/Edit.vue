<template>
    <el-form ref="editFormInfo" :model="editFormInfo" label-width="80px" @submit.prevent="onSubmit"
             :rules="editFormRules" v-loading="listLoading"
             style="margin:20px;width:95%;min-width:600px;">
        <el-form-item label="分类" prop="type">
            <el-select v-model="editFormInfo.type" placeholder="请选择" @change="selectChange">
                <el-option
                        v-for="type in types"
                        :key="type.label"
                        :label="type.label"
                        :value="type.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="editFormInfo.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
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
        <el-form-item label="附件">
            <!--<el-input v-model="fileUrl"><a href=""></a></el-input>-->
            <a :href="fileUrl" :download="fileUrl">{{fileTitle}}</a>
            <el-upload
                    ref="uploadFile"
                    class="upload-demo"
                    action="1234"
                    :on-change="handleChange2"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :before-remove="beforeRemove"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传一个文件</div>-->
            </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <!--<UE :defaultMsg="editFormInfo.content" :config=config :id=edit_ue ref="ue"></UE>-->
            <wang-editor :defaultMsg="editFormInfo.content" ref="wangeditor"></wang-editor>
            <!--<UE :defaultMsg=defaultMsg v-model="editForm.content" :config=config :id=edit_ue ref="ue"></UE>-->
        </el-form-item>
        <el-form-item label="链接" prop="url">
            <el-input v-model="editFormInfo.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
            <el-input v-model="editFormInfo.keyword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="note">
            <el-input v-model="editFormInfo.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="editFormInfo.releaseTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
            <el-date-picker type="date" disabled placeholder="选择日期" v-model="editFormInfo.updateTime"></el-date-picker>
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
    import WangEditor from '../../components/wangeditor'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import api from '../../common/js/interface'
    import util from '../../common/js/util'

    export default {
        components: {
            WangEditor
        },
        data() {
            return {
                // serverUrl :'syb',  //本地调试时
                // serverUrl :'..',  //打包部署上线时
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                editFormInfo: {},
                editFormRules: {
                    type: [
                        {type: 'integer', required: true, message: '请选择分类', trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    releaseTime: [
                        {type: 'date', required: true, message: '请选择发布时间', trigger: 'change'}
                    ]
                },
                infoId: 0,
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    zIndex: 100,
                    autoFloatEnabled: true,
                    type: Object
                },
                edit_ue: "edit_ue", // 不同编辑器必须不同的id,
                imageUrl: '',
                fileUrl: '',
                fileTitle: '',
                fd: {},
                types: [],
                typeValue:0,
                typeUrl: '',
                picId: '',
                fileId: '',
                infoPicId: '',
                infoFileId: '',
                listLoading: false,
                addPicId:[]
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'getEditInfo',
                'getType'
                // ...
            ])
        },
        methods: {
            selectChange() {
                let _this = this;
                api.Type.selectTypeById(this.editFormInfo.type, function (res) {
                    if (res.body.status) {
                        // console.log(res);
                        _this.typeUrl = res.body.data.url;
                        _this.typeUrl = '/' + _this.typeUrl;
                        // console.log(_this.typeUrl);
                    }
                })
            },      //选择不同的分类是触发
            handleChange(file, fileList) {
                let _this = this;
                this.fd = util.uploadPicture(file, this);
                api.Pictures.upload(this.fd, res => {
                    _this.editFormInfo.coverPic = res.body.data.id;
                    _this.picId = _this.editFormInfo.coverPic;
                    _this.addPicId.push(_this.picId);
                }).then(res => {
                    _this.getInfoPicId().then(res => {
                        _this.infoPicId = res.body.data;
                    });
                })
            },      //上传图片并预览图片
            handleChange2(file, fileList) {
                let _this = this;
                this.fd = util.uploadFile(file, this);
                api.Files.uploadFile(this.fd, res => {
                    // console.log(res);
                    _this.fileId = res.body.data.fileId
                }).then(res => {
                    _this.getInfoFileId().then(res => {
                        _this.infoFileId = res.body.data;
                    });
                })
            },      //上传文件
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                api.Files.deleteFile(this.fileId, res => {
                    if (res.status){
                        this.$message({
                            message: '移除成功',
                            type: 'success'
                        });
                    }
                })
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSuccess(res, file, fileList) {
                // console.log("Success:", res);
            },
            onSubmit() {
                // console.log('submit!');
            },
            close: function () {
                this.$router.push({path: this.typeUrl});
            },
            getInfoPicId: function () {
                let _this = this,
                    obj = {};
                obj.infoid = 1;
                obj.picid = this.picId;
                obj = JSON.stringify(obj);
                // console.log("insertPictureIdReturnID:", obj);
                return new Promise((resolve, reject) => {
                    api.InfoPicture.insertPictureIdReturnInfoID(obj, function (res) {
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            getInfoFileId: function () {
                let _this = this,
                    obj = {};
                obj.infoid = 1;
                obj.fileid = this.fileId;
                obj = JSON.stringify(obj);
                // console.log("insertFileIdReturnInfoID:", obj);
                return new Promise((resolve, reject) => {
                    api.InfoFile.insertFileIdReturnInfoID(obj, function (res) {
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyInfoPic: function (info_id) {
                let _this = this,
                    obj = {};
                obj.id = this.infoPicId;
                obj.infoid = info_id;
                obj.picid = this.picId;
                obj = JSON.stringify(obj);
                // console.log("updateInfoPic:", obj);
                return new Promise((resolve, reject) => {
                    api.InfoPicture.updateInfoId(obj, function (res) {
                        // console.log("updateInfoPic:", res);
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyInfoFile: function (info_id) {
                let _this = this,
                    obj = {};
                obj.infoFileId = this.infoFileId;
                obj.infoid = info_id;
                obj.fileid = this.fileId;
                obj = JSON.stringify(obj);
                // console.log("updateInfoFileByInfoId:", obj);
                return new Promise((resolve, reject) => {
                    api.InfoFile.updateInfoFileByInfoId(obj, function (res) {
                        // console.log("updateInfoPic:", res);
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyInfoData: function (res) {
                let _this = this,
                    params = "";
                // this.editFormInfo.coverPic = res.body.data.id;
                params = JSON.stringify(this.editFormInfo);
                return new Promise((resolve, reject) => {
                    api.Infos.modifyInfo(params, function (res) {
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
                this.$refs.editFormInfo.validate((valid) => {
                    if (valid) {
                        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.listLoading = true;
                            _this.$refs.upload.submit();
                            _this.editFormInfo.content = content;
                            _this.editFormInfo.releaseTime = util.convertDateToJsonDate(this.editFormInfo.releaseTime);
                            _this.editFormInfo.updateTime = util.convertDateToJsonDate(new Date());
                            // if (!_this.editFormInfo.coverPic){
                            //     delete _this.editFormInfo.coverPic;
                            // }
                            _this.editFormInfo.note = util.filterHTMLTag(note);
                            _this.editFormInfo.note = _this.editFormInfo.note.substring(0, 100);
                            // console.log("note", _this.editFormInfo.note);
                            // console.log("editFormInfo", JSON.stringify(_this.editFormInfo));
                            _this.modifyInfoData().then(function (res) {
                                // let info_id = res.body.data;
                                _this.modifyInfoPic(_this.infoId).then(() => {
                                    _this.modifyInfoFile(_this.infoId).then(res => {
                                        _this.listLoading = false;
                                        // console.log("success!!!!", res);
                                        _this.$message({
                                            message: '提交成功',
                                            type: 'success'
                                        });
                                    })
                                });
                            });
                            var addPicsId = sessionStorage.getItem('PicsId');
                            addPicsId = JSON.parse(addPicsId);
                            // console.log(addPicsId);
                            if (addPicsId !== null){
                                var picsId = _this.addPicId.concat( addPicsId );
                            }
                            params = {
                                title: _this.addFormInfo.title,
                                typeId: _this.addFormInfo.type,
                                id: picsId
                            }
                            api.Pictures.modifyPicturesByInfo(JSON.stringify(params), res => {
                                // console.log('success!!');
                            })

                            _this.$router.push({path: _this.typeUrl});
                        });
                    } else {
                        util.validateError(_this.editFormRules, _this.editFormInfo, errs => {
                            let firs_errs = errs[0];
                            _this.$message({
                                message: firs_errs.message,
                                type: 'warning'
                            });
                        })
                    }
                });

                // console.log("editFormInfo:", params);
            }
        },
        mounted() {
            let _this = this;
            this.types = this.getType;
            // console.log("currentType:",this.typeValue);
            sessionStorage.setItem('PicsId', []);
            this.listLoading = true;
            this.infoId = this.getEditInfo;
            // console.log("infoId", this.infoId);
            api.Infos.selectInfoById(this.infoId, res => {
                // console.log(JSON.stringify(res));
                _this.editFormInfo = res.body.data;
                var picList = res.body.data.picList;
                var fileList = res.body.data.fileList;

                _this.editFormInfo.releaseTime = new Date(_this.editFormInfo.releaseTime);
                if (picList.length !== 0) {
                    _this.imageUrl = _this.serverUrl + "\\images\\" + picList[0].picUrl;
                }
                if (fileList.length !== 0) {
                    _this.fileUrl = _this.serverUrl + "\\files\\" + fileList[0].fileUrl;
                    _this.fileTitle = fileList[0].fileTitle
                }
                // console.log("editFormInfo", this.editFormInfo);
            })
                .then(res => {
                    api.Type.selectTypeById(_this.editFormInfo.type, res => {
                        if (res.body.status) {
                            // console.log("selectTypeById:", res);
                            _this.typeUrl = res.body.data.typeUrl;
                            _this.typeUrl = '/' + _this.typeUrl;
                            // console.log("typeUrl:", _this.typeUrl);
                        }
                    });
                    this.listLoading = false;
                })
        }
    }

</script>