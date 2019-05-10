<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddSpace">
      {{ $t('space.addSpace') }}
    </el-button>

    <el-table :data="spaceList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Space Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status" width="100">
        <template slot-scope="scope" align="center">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Number of Chair" width="80">
        <template slot-scope="scope">
          {{ scope.row.numberChair }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Projector" width="90">
        <template slot-scope="scope">
          {{ scope.row.projector }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Type" width="100">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Smart Board" width="120">
        <template slot-scope="scope">
          {{ scope.row.smartBoard }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Lab ID" width="80">
        <template slot-scope="scope">
          {{ scope.row.labId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Board" width="80">
        <template slot-scope="scope">
          {{ scope.row.board }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Number of PCs" width="80">
        <template slot-scope="scope">
          {{ scope.row.numberPc }}
        </template>
      </el-table-column>
      <el-table-column align="center" :data="spaceList" label="Operations">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'ativo'" type="primary" size="small" @click="enableDisable(scope, 0)">
            {{ $t('space.disable') }}
          </el-button>
          <el-button v-if="scope.row.status == 'inativo'" type="primary" size="small" @click="enableDisable(scope, 1)">
            {{ $t('space.enable') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('space.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('space.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Space':'New Space'">
      <el-form :model="space" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="space.name" placeholder="Space Name" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="space.status">
            <el-option value="1" label="Ativo">Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Number of Chairs">
          <el-input v-model="space.numberChair" placeholder="Quantity of chairs" />
        </el-form-item>
        <el-form-item label="Number of PCs">
          <el-input v-model="space.numberPc" placeholder="Quantity of PCs" />
        </el-form-item>
        <el-form-item label="Projector">
          <el-select v-model="space.project">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Smart Board">
          <el-select v-model="space.smartBoard">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="space.type">
            <el-option value="1" label="Sala">Sala</el-option>
            <el-option value="2" label="Lab">Lab</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Board">
          <el-select v-model="space.board">
            <el-option value="1" label="Possui">Possui</el-option>
            <el-option value="0" label="Não Possui">Não Possui</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('space.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('space.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getSpace, addSpace, deleteSpace, updateSpace } from '@/api/space'

const defaultSpace = {
  id: '',
  name: '',
  status: '',
  type: '',
  smartBoard: '',
  labId: '',
  board: '',
  numberPc: '',
  numberChair: '',
  project: ''
}

export default {
  data() {
    return {
      space: Object.assign({}, defaultSpace),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      spaceList: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getSpace()
  },
  methods: {
    async getSpace() {
      const res = await getSpace()
      this.spaceList = res.data
    },
    handleaddSpace() {
      this.space = Object.assign({}, defaultSpace)
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
      this.space = deepClone(scope.row)
    },
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.space = deepClone(scope.row)
      this.space.status = status
      this.confirmRole()
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the space?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteSpace(row.id)
          this.spaceList.splice($index, 1)
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
        await updateSpace(this.space.id, this.space)
        for (let index = 0; index < this.spaceList.length; index++) {
          if (this.spaceList[index].id === this.space.id) {
            this.spaceList.splice(index, 1, Object.assign({}, this.space))
            break
          }
        }
      } else {
        const { data } = await addSpace(this.space)
        this.space.id = data.id
        this.spaceList.push(this.space)
      }

      const { name } = this.space
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Space: ${name}</div>
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
