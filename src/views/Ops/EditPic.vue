<template>
    <el-form ref="editFormPic" :model="editFormPic" label-width="80px" @submit.prevent="onSubmit"
             style="margin:20px;width:95%;min-width:600px;">
        <el-form-item label="分类" prop="category">
            <el-select v-model="editFormPic.category" placeholder="请选择" @change="selectChange" value-key="value">
                <el-option
                        v-for="type in types"
                        :key="type.label"
                        :label="type.label"
                        :value="type.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="infoTitle">
            <el-input v-model="editFormPic.infoTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="editFormPic.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="title">
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
        <!--<el-form-item label="内容" prop="content">-->
            <!--<UE :defaultMsg="editFormPic.content" :config=config :id=ue1 ref="ue"></UE>-->
            <!--&lt;!&ndash;<UE :defaultMsg=defaultMsg v-model="editForm.content" :config=config :id=ue1 ref="ue"></UE>&ndash;&gt;-->
        <!--</el-form-item>-->
        <el-form-item label="链接" prop="url">
            <el-input v-model="editFormPic.url" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="note">
            <el-input v-model="editFormPic.note" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
            <el-date-picker type="date" disabled placeholder="选择日期" v-model="editFormPic.updateTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="savePicture">保存</el-button>
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
                editFormPic: {},
                picId: 0,
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    zIndex: 100,
                    type: Object
                },
                ue1: "ue1", // 不同编辑器必须不同的id,
                imageUrl: '',
                fd: {},
                types: [],
                typeUrl:''
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                'getEditPic',
                'getType'
                // ...
            ])
        },
        methods: {
            selectChange(){
                let _this = this;
                this.types.forEach(function (item, index) {
                    if (_this.editFormPic.type === item.value) {
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
                this.fd.append('id', this.picId);
                const isJPG = file.type === 'image/jpeg' || 'image/gif' || 'image/png' || 'image/bmp';
                const isLt2M = file.size / 1024 < 500;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 gif / jpg / bmp / png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 500KB!');
                } else {
                    this.imageUrl = URL.createObjectURL(file.raw);
                }
                this.getPicId().then(function (res) {
                    // _this.editFormPic.coverPic = res.body.data.id;
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
                this.$router.push({path: '/picture'});
            },
            getPicId: function () {
                let _this = this;
                // console.log("_this.fd:", _this.fd);
                return new Promise((resolve, reject) => {
                    api.Pictures.modifyPic(_this.fd, function (res) {
                        console.log(res);
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            modifyPictureData: function (res) {
                let _this = this,
                    params = "";
                // this.editFormPic.coverPic = res.body.data.id;
                params = JSON.stringify(this.editFormPic);
                return new Promise((resolve, reject) => {
                    api.Pictures.updatePic(params, function (res) {
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            savePicture: function () {
                let _this = this,
                    params = "";
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    _this.$refs.upload.submit();
                    _this.editFormPic.updateTime = util.convertDateToJsonDate(new Date());
                    console.log("editFormPic", JSON.stringify(_this.editFormPic));
                    _this.modifyPictureData().then((res) => {
                        console.log("success!!!!", res);
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                    });
                    _this.$router.push({path: '/picture'});
                });
                // console.log("editFormPic:", params);
            },
            logTimeChange(val) {
                console.log(val)
            }
        },
        mounted() {
            let _this = this;
            this.picId = this.getEditPic;
            this.types = this.getType;
            // console.log("this.editFormPic.type", this.editFormPic.type);
            console.log("picId", this.picId);
            api.Pictures.selectPictureById(this.picId, function (res) {
                console.log(JSON.stringify(res));
                _this.editFormPic = res.body.data;
                if (res.body.data.url){
                    _this.imageUrl = _this.serverUrl + "\\images\\" + res.body.data.url;
                }
                console.log("editFormPic", this.editFormPic);
            });

            // this.types.forEach(function (item, index) {
            //     if (_this.editFormPic.type === item.value) {
            //         _this.typeUrl = item.url;
            //     }
            // });
            // _this.typeUrl = '/' + _this.typeUrl;
            // console.log(_this.typeUrl);
        }
    }

</script>