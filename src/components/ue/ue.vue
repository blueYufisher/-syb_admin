<template>
    <div>
        <script :id=id type="text/plain"></script>
    </div>
</template>
<script>
    export default {
        name: 'UE',
        data() {
            return {
                editor: null,
                serverUrl: process.env.API_ROOT,  //打包部署上线时
            }
        },
        props: {
            defaultMsg: {
                type: String
            },
            config: {
                type: Object
            },
            id: {
                type: String
            },
        },
        watch: {
            defaultMsg: function(val, oldVal) {
                // console.log("watch!!!!",val);
                this.editor = UE.getEditor(this.id, this.config);
                if (val !== null) {
                    this.editor.setContent(val);
                }
            },
        },
        mounted(){
            var _this = this;
            let _bkGetActionUrl;
            this.$nextTick(() => {
                // self.$refs.editor.id = self.id;
                _this.editor = UE.getEditor(_this.id, _this.config);
                _bkGetActionUrl = UE.Editor.prototype.getActionUrl;
                UE.Editor.prototype.getActionUrl = function (action) {
                    if (action == 'uploadimage') {
                        // var id = $('#carInfoId').val();
                        console.log("ueditor URL:", _this.serverUrl + '/upload');
                        return _this.serverUrl + '/upload';
                    } else if (action == 'uploadfile') {
                        console.log("ueditor URL:", _this.serverUrl + '/uploadFile');
                        return _this.serverUrl + '/uploadFile';
                    } else {
                        return _bkGetActionUrl.call(this, action);
                    }
                };
                _this.editor.ready(() => {
                    _this.editor.setContent(""); // 确保UE加载完成后，放入内容。
                    _this.editor.execCommand('inserthtml', _this.defaultMsg);// 确保UE加载完成后，放入内容。
                    // self.init();
                    // self.bindContentChange();
                    // self.bindSelectionChange();
                    // self.bindFocus_Blur();
                });
            });
        },
        // mounted() {
        //     const _this = this;
        //     let _bkGetActionUrl;
        //     UE.delEditor(this.id);
        //     this.editor = UE.getEditor(this.id, this.config); // 初始化UE
        //
        //     _bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        //     UE.Editor.prototype.getActionUrl = function (action) {
        //         if (action == 'uploadimage') {
        //             // var id = $('#carInfoId').val();
        //             console.log("ueditor URL:", _this.serverUrl + '/upload');
        //             return _this.serverUrl + '/upload';
        //         } else if (action == 'uploadfile') {
        //             console.log("ueditor URL:", _this.serverUrl + '/uploadFile');
        //             return _this.serverUrl + '/uploadFile';
        //         } else {
        //             return _bkGetActionUrl.call(this, action);
        //         }
        //     };
        //     //异步回调
        //     // this.editor.ready(function() {
        //     //     _this.editor.execCommand('inserthtml', _this.defaultMsg);// 确保UE加载完成后，放入内容。
        //     // });
        //     let me = this;
        //     this.editor.addListener("ready", function () {
        //         // UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        //         me.editor.setContent(""); // 确保UE加载完成后，放入内容。
        //         me.editor.execCommand('inserthtml', _this.defaultMsg);// 确保UE加载完成后，放入内容。
        //     });
        // },
        methods: {
            getUEContent() { // 获取内容方法
                return this.editor.getContent()
            },
            getUEContentTxt() {// 获取编辑器中的纯文本内容,没有段落格式
                return this.editor.getContentTxt();
            }

        },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>