<template>
  <div>
    <div style="text-align: left" v-loading="loading">
      <el-input placeholder="请输入角色英文名称..."
                size="small"
                style="width: 250px"
                v-model="newRole">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        placeholder="请输入角色中文名称..."
        size="small"
        style="width: 250px"
        v-model="newRoleZh">
      </el-input>
      <el-button type="primary" size="small" style="margin-left: 5px" @click="addNewRole">添加角色</el-button>
    </div>
    <div style="margin-top: 10px;text-align: left">
      <el-collapse v-model="activeColItem" accordion style="width: 500px;" @change="collapseChange">
        <el-collapse-item v-for="(item,index) in roles" :title="item.namezh" :name="item.rid" :key="item.name">
          <el-card class="box-card">
            <div slot="header">
              <span>可访问的资源</span>
              <el-button type="text"
                         style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                         @click="deleteRole(item.id,item.namezh)"><i class="el-icon-delete"></i></el-button>
            </div>
            <div>
              <el-tree :props="props"
                       :key="item.rid"
                       :data="treeData"
                       :default-checked-keys="checkedKeys"
                       node-key="id"
                       ref="tree"
                       show-checkbox
                       highlight-current
                       @check-change="handleCheckChange">
              </el-tree>
            </div>
            <div style="display: flex;justify-content: flex-end;margin-right: 10px;margin-top: 10px;">
              <el-button size="small" @click="cancelUpdateRoleMenu">取消修改</el-button>
              <el-button type="primary" size="small" @click="updateRoleMenu(index)">确认修改</el-button>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
  import {isNotNullORBlank} from '../../../common/js/util'
  import api from '../../../common/js/interface'
  export default{
    mounted: function () {
      this.loading = true;
      this.initRoles();
    },
    methods: {
      deleteRole(rid, rname){
        var _this = this;
        this.$confirm('删除角色[' + rname + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.loading = true;
          api.Role.deleteRole(rid, res => {
              if (res && res.status == 200) {
                  var data = res.body;
                  _this.$message({type: 'success', message: data.message})
                  _this.initRoles();
              } else {
                  _this.$message({type: 'error', message: data.message})
                  _this.loading = false;
              }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addNewRole(){
        if (isNotNullORBlank(this.newRole, this.newRoleZh)) {
          this.loading = true;
          var _this = this;
          let postData = {
              name: this.newRole,
              namezh: this.newRoleZh
          }
          api.Role.addRole(JSON.stringify(postData), resp => {
              console.log("addRole:", resp);
              if (resp && resp.status == 200) {
                  var data = res.body;
                  _this.$message({type: 'success', message: data.message})
                  _this.initRoles();
                  _this.newRole = '';
                  _this.newRoleZh = '';
              } else {
                  _this.$message({type: 'error', message: data.message})
                  _this.loading = false;
              }
          })
        }
      },
      //有五个树，但是五个树用的同一个数据源
      updateRoleMenu(index){
        var checkedKeys = this.$refs.tree[index].getCheckedKeys(true);
        var _this = this;
        let postData = {
            mids:checkedKeys,
            paramObj: {
                rid: this.activeColItem
            }
        }
        api.Menu.updateMenuRole(JSON.stringify(postData), resp => {
            if (resp && resp.status == 200) {
                var data = resp.body;
                _this.$message({type: 'success', message: data.message});
                _this.activeColItem = -1;
            } else {
                _this.$message({type: 'error', message: data.message});
            }
        })
      },
      collapseChange(activeName){
        if (activeName == '') {
          return;
        }
        var _this = this;
        api.Menu.menuTree(activeName, resp => {
            if (resp && resp.status == 200) {
                var data = resp.body.data;
                _this.treeData = data.menus;
                _this.checkedKeys = data.mids;
            }
        })
      },
      handleCheckChange(data, checked, indeterminate) {
      },
      initRoles(){
        var _this = this;
        api.Role.roles(resp => {
            _this.loading = false;
            if (resp && resp.status == 200) {
                _this.roles = resp.body;
                _this.activeColItem=-1
            }
        })
      },
      cancelUpdateRoleMenu(){
        this.activeColItem = -1;
      }
    },
    data(){
      return {
        props: {
          label: 'name',
          children: 'children'
        },
        newRole: '',
        newRoleZh: '',
        roles: [],
        treeData: [],
        checkedKeys: [],
        loading: false,
        activeColItem: -1
      };
    }
  }
</script>
