<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddSoftware">
      {{ $t('software.addSoftware') }}
    </el-button>

    <el-table :data="softwareList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Software Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column :data="softwareList" align="center" label="Operations">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'ativo'" type="primary" size="small" @click="enableDisable(scope, 0)">
            {{ $t('software.disable') }}
          </el-button>
          <el-button v-if="scope.row.status == 'inativo'" type="primary" size="small" @click="enableDisable(scope, 1)">
            {{ $t('software.enable') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('software.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('software.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Software':'New Software'">
      <el-form :model="software" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="software.name" placeholder="Software Name" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="software.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('software.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('software.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getSoftware, addSoftware, deleteSoftware, updateSoftware } from '@/api/software'

const defaultSoftware = {
  id: '',
  name: '',
  status: ''
}

export default {
  data() {
    return {
      software: Object.assign({}, defaultSoftware),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      softwareList: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getSoftware()
  },
  methods: {
    async getSoftware() {
      const res = await getSoftware()
      this.softwareList = res.data
    },
    handleaddSoftware() {
      this.software = Object.assign({}, defaultSoftware)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.software = deepClone(scope.row)
    },
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.software = deepClone(scope.row)
      this.software.status = status
      this.confirmRole()
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the software?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteSoftware(row.id)
          this.softwareList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateSoftware(this.software.id, this.software)
        for (let index = 0; index < this.softwareList.length; index++) {
          if (this.softwareList[index].id === this.software.id) {
            this.softwareList.splice(index, 1, Object.assign({}, this.software))
            break
          }
        }
      } else {
        const { data } = await addSoftware(this.software)
        this.software.id = data.id
        this.softwareList.push(this.software)
      }

      const { name } = this.software
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Software: ${name}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .app-container {
        .roles-table {
            margin-top: 30px;
        }
        .permission-tree {
            margin-bottom: 30px;
        }
    }
</style>
