<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getSearchInfo">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="infos" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--<el-table-column prop="id" label="序号" width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="typeTitle" label="分类" width="100" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="250" sortable>
            </el-table-column>
            <el-table-column prop="picUrl" label="封面图片" width="120" sortable>
                <template scope="scope">
                    <img  v-if="scope.row.picUrl" :src="scope.row.picUrl" class="preview" alt="">
                </template>
            </el-table-column>
            <!--<el-table-column prop="url" label="链接" min-width="160" sortable>-->
            <!--</el-table-column>-->
            <el-table-column prop="visit" label="点击数" min-width="80" sortable>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" min-width="100" :formatter="formatUpdateTime" sortable>
            </el-table-column>
            <el-table-column prop="releaseTime" label="发布时间" min-width="100" :formatter="formatReleaseTime" sortable>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <!--<el-button size="small" @click="goPath">编辑</el-button>-->
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="total, sizes, prev, pager, next, jumper"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="page"
                           :page-sizes="pageSizesList"
                           :page-size="pageSize"
                           :total="totalDataNumber"
                           style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<style>
    .preview {
        width: 35px;
        height: 35px;
        display: block;
    }
</style>

<script>
    import util from '../../common/js/util'
    import api from '../../common/js/interface'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    //import NProgress from 'nprogress'
    // import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        components: {UE},
        data() {
            return {
                // serverUrl :'syb',  //本地调试时
                // serverUrl :'..',  //打包部署上线时
                serverUrl: process.env.API_ROOT,  //打包部署上线时
                filters: {
                    title: '',
                    note: ''
                },
                infos: [],
                typeValue: 0,
                users: [],
                page: 1,
                pageSize: 20,
                pageSizesList: [1, 5, 10, 15, 20, 30, 50, 100],
                totalDataNumber: 0,//数据的总数,
                listLoading: false,
                sels: [],//列表选中列

                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                ue1: "ue1", // 不同编辑器必须不同的id
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
            ...mapActions([
                'editInfo',
                'editCurrentType'
            ]),
            //分类显示转换
            formatType: function (row, column) {
                let label = '';
                // console.log("row.type:", row.type);
                this.types.forEach(function (item, index) {
                    if (row.type === item.value) {
                        label = item.label;
                    }
                });
                return label;
            },
            //JSON时间显示转换
            formatUpdateTime: function (row, column) {
                return util.formatDate(row.updateTime, "yyyy-MM-dd");
            },
            formatReleaseTime: function (row, column) {
                return util.formatDate(row.releaseTime, "yyyy-MM-dd");
            },
            //改变页码
            handleCurrentChange(val) {
                this.page = val;
                this.getInfos();
            },
            //改变每页显示数量
            handleSizeChange(val) {
                let _this = this,
                    pageSize = `${val}`;
                this.page = 1;
                this.pageSize = parseInt(pageSize);
                console.log('pageSize: ' + pageSize);
                this.$nextTick(() =>
                    api.Infos.limitInfosByTypeAndCurrentPageAndPageSize(_this.typeValue, page, pageSize, function (res) {
                        // console.log(JSON.stringify(res));
                        _this.totalDataNumber = pageSize * res.body.data.totalPage;
                        return new Promise((resolve, reject) => {
                            // setTimeout()
                        })
                    })
                )
            },
            //获取搜索列表
            getSearchInfo(){
                let para = {
                    title: this.filters.title,
                    note: this.filters.title
                };
                let _this = this,
                    page = this.page,
                    pageSize = this.pageSize;
                this.listLoading = true;
                console.log(JSON.stringify(para));
                api.Infos.searchInfosByTitleOrNote(JSON.stringify(para), _this.typeValue, page, pageSize, function (res) {
                    _this.totalDataNumber = pageSize * res.body.data.totalPage;
                    _this.infos = res.body.data.resultList;
                    _this.infos.forEach(function (item, index) {
                        if (item.picUrl) {
                            item.picUrl = _this.serverUrl + "\\images\\" + item.picUrl;
                        }
                    });
                    _this.listLoading = false;
                    return new Promise((resolve, reject) => {
                        // setTimeout()
                    })
                })
            },

            //获取活动列表
            getInfos() {
                let _this = this,
                    page = this.page,
                    pageSize = this.pageSize;
                this.listLoading = true;
                api.Infos.limitInfosByTypeAndCurrentPageAndPageSize(_this.typeValue, page, pageSize, function (res) {
                    _this.totalDataNumber = pageSize * res.body.data.totalPage;
                    _this.infos = res.body.data.resultList;
                    _this.infos.forEach(function (item, index) {
                        if (item.picUrl) {
                            item.picUrl = _this.serverUrl + "\\images\\" + item.picUrl;
                        }
                    });
                    _this.listLoading = false;
                    return new Promise((resolve, reject) => {
                        // setTimeout()
                    })
                })
            },
            removeInfo: function (id) {
                let _this = this;
                return new Promise((resolve, reject) => {
                    api.Infos.deleteInfo(id, function (res) {
                        if (res.body.status) {
                            resolve(res);
                        } else {
                            reject();
                        }
                    });
                });
            },
            //删除
            handleDel: function (index, row) {
                let _this = this;
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let infoId = row.id;
                    _this.removeInfo(infoId).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.getInfos();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                console.log("row:", row.id);
                // this.editForm = Object.assign({}, row);
                // this.editForm = Object.assign({}, row);
                let info_id = row.id;
                this.editInfo(info_id);
                this.$router.push({path: '/edit'});
            },
            //显示新增界面
            handleAdd: function () {
                this.$router.push({path: '/add'});
            },
            // //编辑
            // editSubmit: function () {
            //     this.$refs.editForm.validate((valid) => {
            //         if (valid) {
            //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //                 this.editLoading = true;
            //                 //NProgress.start();
            //                 let para = Object.assign({}, this.editForm);
            //                 para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            //                 editUser(para).then((res) => {
            //                     this.editLoading = false;
            //                     //NProgress.done();
            //                     this.$message({
            //                         message: '提交成功',
            //                         type: 'success'
            //                     });
            //                     this.$refs['editForm'].resetFields();
            //                     this.editFormVisible = false;
            //                     this.getUsers();
            //                 });
            //             });
            //         }
            //     });
            // },
            // //新增
            // addSubmit: function () {
            //     this.$refs.addForm.validate((valid) => {
            //         if (valid) {
            //             this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //                 this.addLoading = true;
            //                 //NProgress.start();
            //                 let para = Object.assign({}, this.addForm);
            //                 para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            //                 addUser(para).then((res) => {
            //                     this.addLoading = false;
            //                     //NProgress.done();
            //                     this.$message({
            //                         message: '提交成功',
            //                         type: 'success'
            //                     });
            //                     this.$refs['addForm'].resetFields();
            //                     this.addFormVisible = false;
            //                     this.getUsers();
            //                 });
            //             });
            //         }
            //     });
            // },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    // this.listLoading = true;
                    // //NProgress.start();
                    // let para = {ids: ids};
                    // batchRemoveUser(para).then((res) => {
                    //     this.listLoading = false;
                    //     //NProgress.done();
                    //     this.$message({
                    //         message: '删除成功',
                    //         type: 'success'
                    //     });
                    //     this.getUsers();
                    // });
                }).catch(() => {

                });
            }
        },
        watch: {
            "$route": function (to, from) {
                let _this = this;
                console.log(to, from);
                let hash = to.path;
                hash = hash.split('/')[1];
                //from 对象中包含当前地址
                //to 对象中包含目标地址
                //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
                this.types.forEach(function (item, index) {
                    if (hash === item.url) {
                        _this.typeValue = item.value;
                        _this.typeValue = parseInt(_this.typeValue);
                    }
                });
                this.editCurrentType(this.typeValue);
                // console.log(_this.typeValue);
                this.getInfos();
            }
        },
        mounted() {
            let _this = this;
            this.types = this.getType;

            let hash = window.location.hash;
            hash = hash.split('/')[1];
            this.types.forEach(function (item, index) {
                if (hash === item.url) {
                    _this.typeValue = item.value;
                    _this.typeValue = parseInt(_this.typeValue);
                }
            });
            // console.log(_this.typeValue);
            this.editCurrentType(this.typeValue);
            this.getInfos();
        }
    }

</script>

<style scoped lang="scss" type="text/scss">
    .el-table__row .cell {
        font-size: 13px;
    }
</style>