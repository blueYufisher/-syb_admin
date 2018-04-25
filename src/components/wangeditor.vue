<template>
    <div>
        <div ref="editor" style="text-align:left;min-height:200px;" ></div>
        <!--<button v-on:click="getContent">查看内容</button>-->
    </div>
</template>

<script>
    import E from 'wangeditor'
    import api from '../common/js/interface'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        name: 'editor',
        data() {
            return {
                editor: null,
                editorContent: '',
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                addPicId:[]
            }
        },
        props: {
            defaultMsg: {
                type: String
            }
        },
        methods: {
            ...mapActions([
                'editAddPicsId'
            ]),
            getContent: function () {
                return this.editor.txt.html();
            },
            getTXTContent: function () {
                return this.editor.txt.text ();
            },
            setContent: function (val) {
                this.editor.txt.html(val)
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters([
                     // ...
            ])
        },
        watch: {
            defaultMsg: function (val, oldVal) {
                // console.log("watch!!!!", val);
                var _this = this;
                this.editor = new E(this.$refs.editor);
                this.editor.customConfig.zIndex = 1;
                this.editor.customConfig.uploadImgMaxSize = 0.5 * 1024 * 1024;
                this.editor.customConfig.customUploadImg = function (files, insert) {
                    // files 是 input 中选中的文件列表
                    // insert 是获取图片 url 后，插入到编辑器的方法

                    // 上传代码返回结果之后，将图片插入到编辑器中
                    console.log(files);
                    let fd = new FormData();
                    fd.append('upfile', files[0]);
                    fd.append('title', files[0].name);
                    fd.append('picLocation', '文章图片');
                    api.Pictures.upload(fd, res => {
                        var imgUrl = 'http://job.gdut.edu.cn/syb/images/' + res.body.data.url;
                        insert(imgUrl);
                        _this.addPicId.push(res.body.data.id);
                        sessionStorage.setItem('PicsId', '['+_this.addPicId+']');
                    })
                    // insert(imgUrl)
                };
                this.editor.create();
                if (val !== null) {
                    this.editor.txt.html(val);
                }
            },
        },
        mounted() {
            var _this = this;
            this.$nextTick(() => {
                this.editor = new E(this.$refs.editor);
                // this.editor.customConfig.onchange = (html) => {
                //     this.editorContent = html
                // };
                this.editor.customConfig.uploadImgMaxSize = 0.5 * 1024 * 1024;
                this.editor.customConfig.zIndex = 1;
                this.editor.customConfig.customUploadImg = function (files, insert) {
                    // files 是 input 中选中的文件列表
                    // insert 是获取图片 url 后，插入到编辑器的方法

                    // 上传代码返回结果之后，将图片插入到编辑器中
                    console.log(files);
                    let fd = new FormData();
                    fd.append('upfile', files[0]);
                    fd.append('title', files[0].name);
                    fd.append('picLocation', '文章图片');
                    api.Pictures.upload(fd, res => {
                        var imgUrl = 'http://job.gdut.edu.cn/syb/images/' + res.body.data.url;
                        insert(imgUrl);
                        _this.addPicId.push(res.body.data.id);
                        sessionStorage.setItem('PicsId', '['+_this.addPicId+']');
                    })
                    // insert(imgUrl)
                };
                this.editor.create();
                if (this.defaultMsg !== null) {
                    _this.editor.txt.html(_this.defaultMsg);
                }
            });
        }
    }
</script>

<style scoped>
</style>
