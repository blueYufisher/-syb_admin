<template>
    <el-form ref="addFormInfo" :model="addFormInfo" label-width="80px" @submit.prevent="onSubmit"
             style="margin:20px;width:95%;min-width:600px;">
        <el-form-item label="分类" prop="type">
            <el-select v-model="addFormInfo.type" placeholder="请选择" @change="selectChange">
                <el-option
                        v-for="type in types"
                        :key="type.label"
                        :label="type.label"
                        :value="type.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="addFormInfo.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" >
            <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="123"
                    :show-file-list="false"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    list-type="picture-card"
                    :auto-upload="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">文件大小要求：500K，文件类型：gif / jpg / bmp / png</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <UE :defaultMsg="addFormInfo.content" :config=config :id=addpic_ue ref="ue"></UE>
            <!--<UE :defaultMsg=defaultMsg v-model="editForm.content" :config=config :id=addpic_ue ref="ue"></UE>-->
        </el-form-item>
        <el-form-item label="链接" prop="url">
            <el-input v-model="addFormInfo.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
            <el-input v-model="addFormInfo.keyword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="note">
            <el-input v-model="addFormInfo.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="addFormInfo.releaseTime"
                            @change="logTimeChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间">
            <el-date-picker type="date" disabled placeholder="选择日期" v-model="addFormInfo.updateTime"></el-date-picker>
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
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import api from '../../common/js/interface'
    import util from '../../common/js/util'

    export default {
        components: {UE},
        data() {
            return {
                // serverUrl :'syb',  //本地调试时
                // serverUrl :'..',  //打包部署上线时
                serverUrl : process.env.API_ROOT,  //打包部署上线时
                addFormInfo: {
                    type: '',
                    title: '',
                    content: '',
                    url: '',
                    keyword: '',
                    note: '',
                    releaseTime:'',
                    updateTime:''
                },
                types: [],
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    zIndex:100,
                    type: Object
                },
                addpic_ue: "addpic_ue", // 不同编辑器必须不同的id,
                imageUrl: '',
                fd: {},
                typeUrl:''
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'getType'
                // ...
            ])
        },
        methods: {
            selectChange(){
                let _this = this;
                this.types.forEach(function (item, index) {
                    if (_this.addFormInfo.type === item.value) {
                        _this.typeUrl = item.url;
                    }
                });
                _this.typeUrl = '/' + _this.typeUrl;
                console.log(_this.typeUrl);
            },
            handleChange(file, fileList) {
                let _this = this;
                console.log("onChange:", file);
                this.fd = new FormData();
                this.fd.append('upfile', file.raw);
                this.fd.append('title', file.name);
                const isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png' || 'image/bmp';
                const isLt2M = file.size / 1024 < 500;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 gif / jpg / bmp / png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 500KB!');
                } else {
                    this.imageUrl = URL.createObjectURL(file.raw);
                }
                this.getPicId().then(function (res) {
                    _this.addFormInfo.coverPic = res.body.data.id;
                });
            },
            handleSuccess(res, file, fileList) {
                console.log("Success:", res);
            },
            beforeUpload(file) {
                console.log("beforeUpload:", file);
                this.fd = new FormData();
                this.fd.append('pic', file);
                this.fd.append('title', file.name);
                // console.log("fd:", this.fd.get("pic"));
                return true
            },
            onSubmit() {
                console.log('submit!');
            },
            close: function () {
                this.$router.push({path: this.typeUrl});
            },
            getPicId: function () {
                let _this = this;
                // console.log("_this.fd:", _this.fd);
                return new Promise((resolve, reject) => {
                    api.Pictures.upload(_this.fd, function (res) {
                        console.log(res);
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
                // this.addFormInfo.coverPic = res.body.data.id;
                params = JSON.stringify(this.addFormInfo);
                console.log(params);
                return new Promise((resolve, reject) => {
                    api.Infos.addInfo(params, function (res) {
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
                    content = this.$refs.ue.getUEContent();
                this.$confirm('确认提交吗？', '提示',{}).then(()=>{
                    _this.$refs.upload.submit();
                    _this.addFormInfo.content = content;
                    _this.addFormInfo.releaseTime = util.convertDateToJsonDate(_this.addFormInfo.releaseTime);
                    if (!_this.addFormInfo.note) {
                        _this.addFormInfo.note = _this.$refs.ue.getUEContentTxt();
                        _this.addFormInfo.note = _this.addFormInfo.note.substring(0,100);
                        console.log("note", _this.addFormInfo.note);
                    }
                    // this.addFormInfo.updateTime = util.convertDateToJsonDate(new Date());
                    // console.log("addFormInfo:", params);
                    _this.modifyInfoData().then(function (res) {
                        console.log("success!!!!", res);
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                    });
                    _this.$router.push({path: _this.typeUrl});
                });
            },
            logTimeChange(val) {
                console.log(val)
            }
        },
        mounted() {
            let _this = this;
            this.types = this.getType;
            this.addFormInfo.updateTime = new Date();
            this.typeUrl = sessionStorage.getItem('fromPath');
        }
    }

</script>