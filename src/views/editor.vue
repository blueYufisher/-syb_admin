<template>
    <div class="components-container">
        <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。支持页面内多次调用。</div>
        <button @click="getUEContent()">获取内容</button>
        <div class="editor-container">
            <UE :defaultMsg=defaultMsg :config=config :id=ue_default ref="ue"></UE>
            <!--<UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE>-->
        </div>
        <button @click="getContent()">获取内容</button>
        <wang-editor :defaultMsg=defaultMsg ref="wangeditor"></wang-editor>
    </div>
</template>
<style>
    .info{
        border-radius: 10px;
        line-height: 20px;
        padding: 10px;
        margin: 10px;
        background-color: #ffffff;
    }
</style>
<script>
    import UE from '../components/ue/ue';
    import WangEditor from '../components/wangeditor'
    export default {
        components: {
            UE,
            WangEditor
        },
        data() {
            return {
                defaultMsg: '<p>sadasfagdsagkjhdsfkj hkjsdah iuewh </p>',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350,
                    zIndex:100,
                    type: Object
                },
                ue_default: "ue_default", // 不同编辑器必须不同的id
                ue2: "ue2"
            }
        },
        methods: {
            getContent (){
                console.log(this.$refs.wangeditor.getTXTContent());
                // this.$refs.wangeditor.setContent('asdafasdfasgf');

            },
            getUEContent() {
                let content = this.$refs.ue.getUEContent(); // 调用子组件方法
                this.$notify({
                    title: '获取成功，可在控制台查看！',
                    message: content,
                    type: 'success'
                });
                console.log(content)
            }
        }
    };
</script>


