<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddProgram">
      {{ $t('program.addProgram') }}
    </el-button>

    <el-table :data="programList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Program Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status">
          <template slot-scope="scope">
              {{ scope.row.status }}
          </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('program.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('program.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Program':'New Program'">
      <el-form :model="program" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="program.name" placeholder="Program Name" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="program.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('program.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('program.confirm') }}
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
  code: '',
  status: ''
}

const status = {
    1: 'Ativo',
    0: 'Inativo'
}

export default {
  data() {
    return {
        program: Object.assign({}, defaultProgram),
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false,
        programList: [],
        statusList: Object.assign({}, status)
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
      this.programList = this.changeType(res.data)
    },
    handleaddProgram() {
      this.program = Object.assign({}, defaultProgram)
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
      this.program = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the program?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteProgram(row.id)
          this.programList.splice($index, 1)
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
        await updateProgram(this.program.id, this.program)
        for (let index = 0; index < this.programList.length; index++) {
          if (this.programList[index].id === this.program.id) {
            this.programList.splice(index, 1, Object.assign({}, this.changeType(this.program)))
            break
          }
        }
      } else {
        const { data } = await addProgram(this.program)
        this.program.id = data.id
        this.programList.push(this.changeType(this.program))
      }

      const { name } = this.program
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Program: ${name}</div>
          `,
        type: 'success'
      })
    },
      changeType(programs) {
          if (Array.isArray(programs)) {
              for (let index = 0; index < programs.length; index++) {
                  programs[index].status = this.statusList[programs[index].status]
              }
              return programs
          }
          programs.status = this.statusList[programs.status]
          return programs
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
