<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
                <!--</el-form-item>-->
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="pictures" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 200%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--<el-table-column prop="id" label="序号" width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="category" label="所属文章分类" width="200" sortable>
            </el-table-column>
            <el-table-column prop="location" label="类别" width="100" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="350" sortable>
            </el-table-column>
            <el-table-column prop="url" label="图片" width="150" sortable>
                <template scope="scope">
                    <img v-if="scope.row.url" :src="scope.row.url" class="preview" alt="">
                </template>
            </el-table-column>
            <!--<el-table-column prop="url" label="链接" min-width="160" sortable>-->
            <!--</el-table-column>-->
            <el-table-column prop="updateTime" label="更新时间" min-width="150" :formatter="formatUpdateTime" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <!--<el-button size="small" @click="goPath">编辑</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
        width: 50px;
        height: 50px;
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
                pictures: [],
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
                'editPic'
            ]),
            //JSON时间显示转换
            formatUpdateTime: function (row, column) {
                return util.formatDate(row.updateTime, "yyyy-MM-dd hh:mm:ss");
            },
            //改变页码
            handleCurrentChange(val) {
                this.page = val;
                this.getPictures();
            },
            //改变每页显示数量
            handleSizeChange(val) {
                let _this = this,
                    pageSize = `${val}`;
                this.page = 1;
                this.pageSize = parseInt(pageSize);
                console.log('pageSize: ' + pageSize);
                this.$nextTick(() =>
                    api.Pictures.getLimitPics(page, pageSize, function (res) {
                        // console.log(JSON.stringify(res));
                        _this.totalDataNumber = pageSize * res.body.data.totalPage;
                        return new Promise((resolve, reject) => {
                            // setTimeout()
                        })
                    })
                )
            },
            //获取列表
            getPictures() {
                let _this = this,
                    page = this.page,
                    pageSize = this.pageSize;
                this.listLoading = true;
                api.Pictures.getLimitPics(page, pageSize, function (res) {
                    _this.totalDataNumber = pageSize * res.body.data.totalPage;
                    _this.pictures = res.body.data.resultList;
                    _this.pictures.forEach(function (item, index) {
                        if (item.url) {
                            item.url = _this.serverUrl + "\\images\\" + item.url;
                        }
                    });
                    _this.listLoading = false;
                    return new Promise((resolve, reject) => {
                        // setTimeout()
                    })
                })
            },
            removePicture: function (id) {
                let _this = this;
                return new Promise((resolve, reject) => {
                    api.Pictures.deletePic(id, function (res) {
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
                    let picId = row.id;
                    _this.removePicture(picId).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.getPictures();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                console.log("row:", row.id);
                // this.editForm = Object.assign({}, row);
                // this.editForm = Object.assign({}, row);
                let pic_id = row.id;
                this.editPic(pic_id);
                this.$router.push({path: '/editPic'});
            },
            //显示新增界面
            handleAdd: function () {
                this.$router.push({path: '/addPic'});
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
        mounted() {
            let _this = this;
            this.types = this.getType;
            this.getPictures();
        }
    }

</script>

<style scoped lang="scss" type="text/scss">
    .el-table__row .cell {
        font-size: 13px;
    }
</style>