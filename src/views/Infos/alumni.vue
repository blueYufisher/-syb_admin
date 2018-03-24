<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="alumnus" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--<el-table-column prop="id" label="序号" width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="type" label="分类" width="100" :formatter="formatType" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="250" sortable>
            </el-table-column>
            <el-table-column prop="picUrl" label="封面图片" width="120" sortable>
                <template scope="scope">
                    <img :src="scope.row.picUrl" class="preview" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="url" label="链接" min-width="160" sortable>
            </el-table-column>
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
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        components: {UE},
        data() {
            return {
                filters: {
                    name: ''
                },
                alumnus: [],
                users: [],
                page: 1,
                pageSize: 20,
                pageSizesList: [1, 5, 10, 15, 20, 30, 50, 100],
                totalDataNumber: 0,//数据的总数,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                types: [],
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                },
                ue1: "ue1", // 不同编辑器必须不同的id
            }
        },
        methods: {
            ...mapActions([
                'editInfo'
            ]),
            //分类显示转换
            formatType: function (row, column) {
                return '创业校友';
            },
            //JSON时间显示转换
            formatUpdateTime: function (row, column) {
                return util.formatDate(row.updateTime, "yyyy-MM-dd");
            },
            formatReleaseTime:function (row,column) {
                return util.formatDate(row.releaseTime, "yyyy-MM-dd");
            },
            //改变页码
            handleCurrentChange(val) {
                this.page = val;
                this.getAlumnus();
            },
            //改变每页显示数量
            handleSizeChange(val) {
                let _this = this,
                    pageSize = `${val}`;
                this.page = 1;
                this.pageSize = parseInt(pageSize);
                console.log('pageSize: ' + pageSize);
                this.$nextTick(() =>
                    api.Infos.limitInfosByTypeAndCurrentPageAndPageSize(5, page, pageSize, function (res) {
                        // console.log(JSON.stringify(res));
                        _this.totalDataNumber = pageSize * res.body.data.totalPage;
                        return new Promise((resolve, reject) => {
                            setTimeout()
                        })
                    })
                )
            },
            //获取活动列表
            getAlumnus() {
                let _this = this,
                    page = this.page,
                    pageSize = this.pageSize;
                this.listLoading = true;
                api.Infos.limitInfosByTypeAndCurrentPageAndPageSize(5, page, pageSize, function (res) {
                    _this.totalDataNumber = pageSize * res.body.data.totalPage;
                    _this.alumnus = res.body.data.resultList;
                    _this.alumnus.forEach(function (item, index) {
                        if (item.picUrl !== "null"){
                            item.picUrl = "syb\\images\\" + item.picUrl;
                        }else{
                            item.picUrl = "#";
                        }
                    });
                    _this.listLoading = false;
                    return new Promise((resolve, reject) => {
                        setTimeout()
                    })
                })
            },
            removeInfo:function (id) {
                let _this = this;
                return new Promise((resolve,reject) => {
                    api.Infos.deleteInfo(id, function (res) {
                        if(res.body.status) {
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
                        _this.getAlumnus();
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
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getAlumnus();
        }
    }

</script>

<style scoped lang="scss" type="text/scss">
    .el-table__row .cell {
        font-size: 13px;
    }
</style>