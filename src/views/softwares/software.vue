<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddUser">
      {{ $t('software.addSoftware') }}
    </el-button>

    <el-table :data="softwareList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="User Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="E-mail">
        <template slot-scope="scope">
          {{ scope.row.status }}
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
import { getUsers, addUser, deleteUser, updateUser } from '@/api/user'

const defaultSoftware = {
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
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const res = await getUsers()
      this.softwareList = res.data
    },
    handleaddUser() {
      this.user = Object.assign({}, defaultSoftware)
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
      this.user = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the user?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser(row.id)
          this.usersList.splice($index, 1)
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
        await updateUser(this.user.id, this.user)
        for (let index = 0; index < this.usersList.length; index++) {
          if (this.usersList[index].id === this.user.id) {
            this.usersList.splice(index, 1, Object.assign({}, this.user))
            break
          }
        }
      } else {
        const { data } = await addUser(this.user)
        this.user.id = data.id
        this.usersList.push(this.user)
      }

      const { name } = this.user
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>User: ${name}</div>
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
