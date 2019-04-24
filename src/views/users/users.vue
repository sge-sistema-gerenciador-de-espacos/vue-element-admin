<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddUser">
      {{ $t('users.addUser') }}
    </el-button>

    <el-table :data="usersList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="User Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="E-mail">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>

      <el-table-column align="header-center" label="Estado">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Cidade">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>

      <el-table-column align="header-center" label="Rua">
        <template slot-scope="scope">
          {{ scope.row.street }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Numero">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('users.editUser') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('users.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit User':'New User'">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="user.name" placeholder="User Name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="user.email" placeholder="User Email" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="user.status">
            <el-option value="1" label="Ativo" selected>Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="user.type">
            <el-option value="1" label="Admin" selected>Admin</el-option>
            <el-option value="2" label="Professor">Professor</el-option>
            <el-option value="3" label="TI">TI</el-option>
            <el-option value="4" label="Auxiliar">Auxiliar</el-option>
            <el-option value="5" label="Aluno">Aluno</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="State">
          <el-select v-model="user.state">
            <el-option
              v-for="item in stateList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="City">
          <el-input v-model="user.city" placeholder="City" />
        </el-form-item>
        <el-form-item label="Street">
          <el-input v-model="user.street" placeholder="Street" />
        </el-form-item>
        <el-form-item label="Number">
          <el-input v-model="user.number" placeholder="Number" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('users.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('users.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getUsers, addUser, deleteUser, updateUser } from '@/api/user'
import { getStates } from '@/api/state'

const defaultUser = {
  type: '',
  name: '',
  status: '',
  email: '',
  city: '',
  state: [],
  street: '',
  number: ''
}

export default {
  data() {
    return {
      user: Object.assign({}, defaultUser),
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      usersList: [],
      stateList: []
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
    this.getStates()
  },
  methods: {
    async getUsers() {
      const res = await getUsers()
      this.usersList = res.data
    },
    async getStates() {
      const sta = await getStates()
      this.stateList = sta.data
    },
    handleaddUser() {
      this.user = Object.assign({}, defaultUser)
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
        .catch(err => { console.error(err) })
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
