<template>
  <div class="app-container">
    <el-button type="primary" @click="handleaddUser">
      {{ $t('users.addUser') }}
    </el-button>

    <el-table
      :data="usersList"
      style="
        width: 100%;margin-top:30px;"
      border
    >
      <el-table-column align="center" label="User Name" width="250">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="E-mail" width="250">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status" width="150">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Type" width="150">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="400">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 'ativo'"
            type="primary"
            size="small"
            @click="enableDisable(scope, 0)"
          >
            {{ $t('software.disable') }}
          </el-button>
          <el-button
            v-if="scope.row.status == 'inativo'"
            type="primary"
            size="small"
            @click="enableDisable(scope, 1)"
          >
            {{ $t('software.enable') }}
          </el-button>
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
          <el-input v-model="user.email" placeholder="User Email" required type="e-mail" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="user.status" required>
            <el-option value="1" label="Ativo" selected>Ativo</el-option>
            <el-option value="0" label="Inativo">Inativo</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="user.type" required>
            <el-option value="ADMINISTRATOR" label="Admin" selected>Admin</el-option>
            <el-option value="PROFESSOR" label="Professor">Professor</el-option>
            <el-option value="TI_SUPPORT" label="TI">TI</el-option>
            <el-option value="ASSISTANT" label="Auxiliar">Auxiliar</el-option>
            <el-option value="STUDENT" label="Aluno">Aluno</el-option>
            <el-option value="MANAGER" label="Gerenciador">Gerenciador</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="State">
          <el-select v-model="user.state" required>
            <el-option
              v-for="item in stateList"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="City">
          <el-input v-model="user.city" placeholder="City" required />
        </el-form-item>
        <el-form-item label="Street">
          <el-input v-model="user.street" placeholder="Street" required />
        </el-form-item>
        <el-form-item label="Number">
          <el-input-number v-model="user.number" :min="0" placeholder="Number" required />
        </el-form-item>
        <el-form-item label="Telephone Number">
          <el-input v-model="user.telephones" type="telephone" placeholder="Telephone Number" required />
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
  id: '',
  type: '',
  email: '',
  status: '',
  name: '',
  city: '',
  state: '',
  number: '',
  telephones: ''
}

const types = {
  ADMINISTRATOR: 'Admin',
  PROFESSOR: 'Professor',
  TI_SUPPORT: 'TI',
  ASSISTANT: 'Auxiliar',
  STUDENT: 'Aluno',
  MANAGER: 'Gerenciador'
}

const sendTypes = {
    'Admin': 'ADMINISTRATOR',
    'Professor': 'PROFESSOR',
    'TI': 'TI_SUPPORT',
    'Auxiliar': 'ASSISTANT',
    'Aluno': 'STUDENT',
    'Gerenciador': 'MANAGER'
}

const status = {
  1: 'Ativo',
  0: 'Inativo'
}

const status = {
    'Ativo': 1,
    'Inativo': 0
}
export default {
  data() {
    return {
      user: Object.assign({}, defaultUser),
      dialogVisible: false,
      dialogTelephone: false,
      dialogType: 'new',
      checkStrictly: false,
      usersList: [],
      stateList: [],
      typesList: Object.assign({}, types),
      statusList: Object.assign({}, status),
      sendTypesList: Object.assign({}, sendTypes),
      sendStatusList: Object.assign({}, sendStatus),
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
      this.usersList = this.changeType(res.data)
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

    handleTelephone(scope) {
      this.dialogType = 'edit'
      this.dialogTelephone = true
      this.checkStrictly = true
      this.user = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the user?', 'Aviso', {
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
    enableDisable(scope, status) {
      this.dialogType = 'edit'
      this.user = deepClone(scope.row)
      this.user.status = status
      this.confirmRole()
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateUser(this.user.id, this.changeSendType(this.user))
        for (let index = 0; index < this.usersList.length; index++) {
          if (this.usersList[index].id === this.user.id) {
            this.usersList.splice(index, 1, Object.assign({}, this.changeType(this.user)))
            break
          }
        }
      } else {
        const { data } = await addUser(this.changeSendType(this.user))
        this.user.id = data.key
        this.usersList.push(this.changeType(this.user))
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
    },
    changeType(users) {
      if (Array.isArray(users)) {
        for (let index = 0; index < users.length; index++) {
          users[index].type = this.typesList[users[index].type]
          users[index].status = this.statusList[users[index].status]
        }
        return users
      }
      users.type = this.typesList[users.type]
      users.status = this.statusList[users.status]
      return users
    },
    changeSendType(user) {
        user.type = this.sendTypesList[user.type]
        user.status = this.sendStatusList[user.status]
        return user
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
