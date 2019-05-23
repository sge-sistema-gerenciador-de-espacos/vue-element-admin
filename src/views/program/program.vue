<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddProgram">
      {{ $t('software.addProgram') }}
    </el-button>

    <el-table :data="softwareList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Program Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('software.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('software.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Program':'New Program'">
      <el-form :model="software" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="software.name" placeholder="Program Name" />
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
import { getProgram, addProgram, deleteProgram, updateProgram } from '@/api/program'

const defaultProgram = {
  id: '',
  name: '',
  code: ''
}

export default {
  data() {
    return {
      software: Object.assign({}, defaultProgram),
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
    this.getProgram()
  },
  methods: {
    async getProgram() {
      const res = await getProgram()
      this.softwareList = res.data
    },
    handleaddProgram() {
      this.software = Object.assign({}, defaultProgram)
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
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the software?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteProgram(row.id)
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
        await updateProgram(this.software.id, this.software)
        for (let index = 0; index < this.softwareList.length; index++) {
          if (this.softwareList[index].id === this.software.id) {
            this.softwareList.splice(index, 1, Object.assign({}, this.software))
            break
          }
        }
      } else {
        const { data } = await addProgram(this.software)
        this.software.id = data.id
        this.softwareList.push(this.software)
      }

      const { name } = this.software
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Program: ${name}</div>
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
