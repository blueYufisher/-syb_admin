<template>
    <div>
        <!-- nav开始 -->
        <div id="headerbg">
            <div id="header">
                <a id="logo"></a>
            </div>
        </div>
        <!--  nav  -->
        <div id="navigation">
            <!--导航菜单-->
            <el-menu :default-active="$route.path" id="lastclass" class="el-menu-vertical-demo" mode="horizontal"
                     unique-opened router>
                <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                    <el-submenu :index="index+''" v-if="!item.leaf">
                        <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                        <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">
                            {{child.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                            :class="item.iconCls"></i>{{item.children[0].name}}
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <!--  line  -->
        <div id="hr"></div>
        <!-- nav -->
        <!--  nav 结束 -->
        <!--  footer 开始  --> <!-- footer star --><!--  网站地图  -->
        <div id="footerbg">
        </div>
        <a id="returnTop" href="javascript:;">回到顶部</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }

</script>

<style>
    /*@import "../assets/css/reset.css";*/
    /*@import "../assets/css/index.css";*/
    /*@import "../assets/css/global.css";*/
</style>