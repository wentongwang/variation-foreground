<template>
  <el-main>
    <el-header class="hello" :gutter="20">
      <el-row>
        <el-col class="logo" :span="6"
          ><span>{{ $t('adminlogin.title') }}</span></el-col
        >
        <el-col class="input-contaner" :span="3">
          <el-dropdown
            trigger="click"
            class="international"
            @command="handleLogOut"
          >
            <div class="language">
              <span class="el-dropdown-link">
                {{ name }}
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                {{ $t('index.logout') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-row>
      <div class="main-container" v-loading.fullscreen.lock="loading">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="邮箱" prop="email"> </el-table-column>
          <el-table-column label="姓名" prop="card_name"> </el-table-column>
          <el-table-column label="身份证号" prop="card_no"> </el-table-column>
          <el-table-column label="主体类型" prop="principal_type">
          </el-table-column>
          <el-table-column label="账号用途" prop="application_purpose">
          </el-table-column>
          <el-table-column label="来源" prop="from1"> </el-table-column>
          <el-table-column
            label="申请时间"
            prop="registration_time"
            :formatter="formatDate"
          >
          </el-table-column>
          <el-table-column label="操作人" width="70" prop="review_name">
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="review_time"
            :formatter="formatDate"
          >
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.status === 3
                    ? 'danger'
                    : scope.row.status === 2
                    ? 'danger'
                    : scope.row.status === 1
                    ? 'success'
                    : 'info'
                "
                disable-transitions
                >{{
                  scope.row.status === 3
                    ? '禁用'
                    : scope.row.status === 2
                    ? '驳回'
                    : scope.row.status === 1
                    ? '通过'
                    : '待审核'
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="fiterData.search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.status === 0">
                <el-popconfirm
                  title="确定通过该用户的审核吗？"
                  @confirm="handleAdopt(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="success" slot="reference"
                    >通过</el-button
                  >
                </el-popconfirm>
                <el-popover style="margin-left: 10px" v-model="scope.row.visible">
                  <div style="text-align: center; margin: 0">
                    <el-form ref="formData" :model="formData" size="mini">
                      <el-form-item label="驳回原因：">
                        <el-input
                          size="mini"
                          v-model="formData.message"
                        ></el-input>
                      </el-form-item>
                      <el-form-item size="mini">
                        <el-button
                          size="mini"
                          type="text"
                          @click="scope.row.visible = false"
                          >取消</el-button
                        >
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleReject(scope.$index, scope.row)"
                          >确定</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button size="mini" type="danger" slot="reference"
                    >驳回</el-button
                  >
                </el-popover>
              </div>
              <div v-else-if="scope.row.status === 1">
                <el-popover style="margin-left: 10px" :key="scope.$index" v-model="scope.row.visible">
                  <div style="text-align: center; margin: 0">
                    <el-form ref="formData" :model="formData" size="mini">
                      <el-form-item label="封禁原因：">
                        <el-input
                          size="mini"
                          v-model="formData.message"
                        ></el-input>
                      </el-form-item>
                      <el-form-item size="mini">
                        <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleBan(scope.$index, scope.row)"
                          >确定</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button size="mini" type="danger" slot="reference"
                    >封禁</el-button
                  >
                </el-popover>
                <el-popconfirm
                  title="确定删除该用户吗？"
                  style="margin-left: 10px"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </div>
              <div v-else-if="scope.row.status === 2">
                <el-popconfirm
                  title="确定删除该用户吗？"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </div>
              <div v-else-if="scope.row.status === 3">
                <el-popconfirm
                  title="确定解禁该用户吗？"
                  @confirm="handleLift(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="success" slot="reference"
                    >解禁</el-button
                  >
                </el-popconfirm>
                <el-popconfirm
                  title="确定删除该用户吗？"
                  style="margin-left: 10px"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button size="mini" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="num"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-row>
  </el-main>
</template>

<script>
import store from '@/store'

import {
  getUserList,
  userAdopt,
  userReject,
  userBan,
  userLift,
  userDelete
} from '@/api/user'

export default {
  data() {
    return {
      name: store.getters.name,
      tableData: [],
      loading: true,
      num: 0,
      fiterData: {
        page: 0,
        size: 10,
        search: '',
        adminName: store.getters.real_name
      },
      formData: {
        adminName: '',
        userId: 0,
        message: ''
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.loading = true
      getUserList(this.fiterData).then(response => {
        if (response.code == 200) {
          this.num = response.num
          this.tableData = response.listData
          this.loading = false
        }else{
          this.handleLogOut()
        }
      })
    },
    handleAdopt(index, row) {
      this.formData.adminName = store.getters.real_name
      this.formData.userId = row.id
      this.loading = true
      userAdopt(this.formData).then(response => {
        if (response.code == 200) {
          row = response.userData
          this.$set(this.tableData, index, row)
        }else{
          this.handleLogOut()
        }
        this.loading = false
      })
    },
    handleReject(index, row) {
      this.formData.adminName = store.getters.real_name
      this.formData.userId = row.id
      this.loading = true
      userReject(this.formData).then(response => {
        if (response.code == 200) {
          this.tableData.splice(index, 1)
        }else{
          this.handleLogOut()
        }
        this.formData.message = ''
        this.rejectVisible = false
        this.loading = false
      })
    },
    handleBan(index, row) {
      this.formData.adminName = store.getters.real_name
      this.formData.userId = row.id
      this.loading = true
      userBan(this.formData).then(response => {
        if (response.code == 200) {
          row = response.userData
          this.$set(this.tableData, index, row)
        }else{
          this.handleLogOut()
        }
        this.formData.message = ''
        this.visible = false
        this.loading = false
      })
    },
    handleLift(index, row) {
      this.formData.adminName = store.getters.real_name
      this.formData.userId = row.id
      this.loading = true
      userLift(this.formData).then(response => {
        if (response.code == 200) {
          row = response.userData
          this.$set(this.tableData, index, row)
        }else{
          this.handleLogOut()
        }
        this.loading = false
      })
    },
    handleDelete(index, row) {
      this.formData.adminName = store.getters.real_name
      this.formData.userId = row.id
      this.loading = true
      userDelete(this.formData).then(response => {
        if (response.code == 200) {
          this.tableData.splice(index, 1)
        }else{
          this.handleLogOut()
        }
        this.loading = false
      })
    },
    handleLogOut() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCurrentChange(index) {
      this.fiterData.page = index - 1
      this.getUserList()
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      return (
        dt.getFullYear() +
        '-' +
        (dt.getMonth() + 1) +
        '-' +
        dt.getDate() +
        ' ' +
        dt.getHours() +
        ':' +
        dt.getMinutes() +
        ':' +
        dt.getSeconds()
      )
    },
    debounce(func, delay) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
  },
  created() {
    this.$watch(
      'fiterData.search',
      this.debounce(newQuery => {
        this.fiterData.page = 0
        this.fiterData.search = newQuery
        this.getUserList()
      }, 200)
    )
  }
}
</script>

<style scoped lang="scss">
.el-main {
  background-color: #fafafa;
  color: #333;
  text-align: center;
  padding: 0;
  .el-header {
    background-color: #141414;
    color: #ffffff;
    text-align: left;
    line-height: 60px;
    overflow: hidden;
    .logo {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      float: left;
      span {
        background-color: #141414;
      }
    }
    .input-contaner {
      text-align: center;
      float: right;
      .header-search {
        width: 100%;
      }
      a {
        color: #ffffff;
      }
    }
    span {
      display: inline-block;
      height: 100%;
    }
    .svg-container {
      font-size: 16px;
    }
    .language {
      color: #ffffff;
      cursor: pointer;
    }
  }
  .main-container {
    padding: 50px;
  }
}
</style>
