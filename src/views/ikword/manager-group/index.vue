<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="filter-item">{{ $t('table.groupName') }}</span>
      <el-input
        v-model="listQuery.name"
        :placeholder="$t('table.groupName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <span class="filter-item">{{ $t('table.status') }}</span>
      <el-select
        v-model="listQuery.enable"
        :placeholder="$t('table.status')"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in statusOptions" :key="item" :label="item | statusNameFilter" :value="item" />
      </el-select>
      <span class="filter-item">{{ $t('table.cdt') }}</span>
      <el-date-picker
        v-model="listQuery.cdt"
        type="daterange"
        align="right"
        class="filter-item"
        unlink-panels
        range-separator="至"
        start-placeholder="开始"
        end-placeholder="结束"
        style="width: 400px"
        :picker-options="pickerOptions"
      />
      <span class="filter-item">{{ $t('table.udt') }}</span>
      <el-date-picker
        v-model="listQuery.udt"
        type="daterange"
        align="right"
        class="filter-item"
        unlink-panels
        range-separator="至"
        start-placeholder="开始"
        end-placeholder="结束"
        style="width: 400px"
        :picker-options="pickerOptions"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.groupName')" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.cdt')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cdt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.udt')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.udt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.enable | statusFilter">{{ row.enable | statusNameFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">{{ $t('table.edit') }}</el-button>
          <el-button
            v-if="row.enable!=1"
            size="mini"
            @click="handleModifyStatus(row,1)"
          >{{ $t('datastatus.enable') }}</el-button>
          <el-button
            v-if="row.enable!=2"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,2)"
          >{{ $t('datastatus.disable') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageno"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('table.groupName')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { fetchList, modifyStatus, createGroup, updateGroup } from '@/api/ikword'

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '2': 'danger'
      }
      return statusMap[status]
    },
    statusNameFilter(status) {
      const statusMap = {
        '1': '使用中',
        '2': '禁用中',
        '0': '全部'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageno: 1,
        pagesize: 10,
        name: '',
        enable: 0,
        cdt: '',
        udt: ''
      },
      statusOptions: [0, 1, 2],
      temp: {
        id: '',
        name: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('textMsg.edit'),
        create: this.$t('textMsg.create')
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        groupName: [
          {
            required: true,
            message: this.$t('rules.groupName'),
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.code === 200) {
          this.list = response.content.result
          this.total = response.content.total
        } else {
          this.$message({
            message: '获取分组列表失败',
            type: 'error'
          })
        }
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, enable) {
      this.listLoading = true
      modifyStatus({
        id: row.id
      }).then(response => {
        if (response.code === 200) {
          row.enable = enable
          this.$message({
            message: response.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      })
      this.listLoading = false
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.listLoading = true
          createGroup({
            name: this.temp.name
          }).then(response => {
            this.dialogFormVisible = false
            if (response.code === 200) {
              this.$notify({
                title: this.$t('result.success'),
                message: response.message,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('result.fail'),
                message: response.message,
                type: 'error',
                duration: 2000
              })
            }
            this.listLoading = false
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp.id = row.id
      this.temp.name = row.name
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.listLoading = true
          updateGroup({
            id: this.temp.id,
            name: this.temp.name
          }).then(response => {
            this.dialogFormVisible = false
            if (response.code === 200) {
              this.$notify({
                title: this.$t('result.success'),
                message: response.message,
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('result.fail'),
                message: response.message,
                type: 'error',
                duration: 2000
              })
            }
            this.listLoading = false
            this.getList()
          })
        }
      })
    }
  }
}
</script>
